import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as handlebars from 'handlebars';

// Register a comparison helper for Handlebars
// Removed the helper registration from here

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.startWizard', async () => {
        const panel = vscode.window.createWebviewPanel(
            'projectWizard',
            'React Project Wizard',
            vscode.ViewColumn.One,
            {
                enableScripts: true
            }
        );

        panel.webview.html = await getWebviewContent(context, panel.webview);

        panel.webview.onDidReceiveMessage(
            async message => {
                switch (message.command) {
                    case 'submit':
                        const { projectName, domainName, attributes } = message;
                        vscode.window.showInformationMessage(`Creating project: ${projectName}, Domain: ${domainName}, Attributes: ${JSON.stringify(attributes)}`);
                        
                        // Prompt user to select a folder
                        const folderUri = await vscode.window.showOpenDialog({
                            canSelectFolders: true,
                            canSelectFiles: false,
                            canSelectMany: false,
                            openLabel: 'Select Folder'
                        });

                        if (folderUri && folderUri[0]) {
                            const selectedFolderPath = folderUri[0].fsPath;
                            const projectPath = path.join(selectedFolderPath, projectName);

                            // Create project directory
                            if (!fs.existsSync(projectPath)) {
                                fs.mkdirSync(projectPath);
                            }

                            // Create React app structure
                            createReactAppStructure(projectPath);

                            // Generate project files
                            await generateFiles(projectName, domainName, attributes, selectedFolderPath);

                            // Open the project folder in VS Code
                            const uri = vscode.Uri.file(projectPath);
                            await vscode.commands.executeCommand('vscode.openFolder', uri, true);

                            // Close the WebViewContent tab
                            panel.dispose();
                        } else {
                            vscode.window.showErrorMessage('No folder selected. Project creation aborted.');
                        }

                        return;
                }
            },
            undefined,
            context.subscriptions
        );
    });

    context.subscriptions.push(disposable);
}

async function getWebviewContent(context: vscode.ExtensionContext, webview: vscode.Webview) {
    const htmlPath = path.join(context.extensionPath, 'media', 'wizard.html');
    const stylePath = vscode.Uri.file(
        path.join(context.extensionPath, 'media', 'style.css')
    );
    const styleUri = webview.asWebviewUri(stylePath);

    // Add a cache-busting query parameter
    const cacheBustingUri = `${styleUri.toString()}?${new Date().getTime()}`;

    let html = await fs.promises.readFile(htmlPath, 'utf8');
    html = html.replace('<link rel="stylesheet" type="text/css" href="">', `<link rel="stylesheet" type="text/css" href="${cacheBustingUri}">`);
    return html;
}

function registerHandlebarsHelpers() {
    // Register the helper right before we use it
    try {
        handlebars.registerHelper('eq', function(arg1: any, arg2: any) {
            const result =  arg1 === arg2;
            console.log('eq helper called with:', arg1, arg2, 'result:', result);
            return result;
        });
    } catch (error) {
        console.error('Error registering helper:', error);
    }
}

export async function generateFiles(projectName: string, domainName: string, attributes: any[], selectedFolderPath: string) {
    console.log('Generating files...');
    registerHandlebarsHelpers();
    
    const templatesDir = path.join(__dirname, '..', 'templates'); // Adjusted path
    const projectDir = path.join(selectedFolderPath, projectName);
    const domainCamelCase = domainName.charAt(0).toLowerCase() + domainName.slice(1);

    console.log('Attributes:', attributes);

    // Find the attribute marked as idFlag
    const idAttribute = attributes.find(attr => attr.idFlag)?.attributeName || '';
    console.log('ID Attribute:', idAttribute);

    // Ensure the project directory exists
    if (!fs.existsSync(projectDir)) {
        fs.mkdirSync(projectDir, { recursive: true });
    }

    // Read all template files, including those in subdirectories
    const templateFiles = getAllFiles(templatesDir);

    for (const templateFile of templateFiles) {
        try {
            const templatePath = path.join(templatesDir, templateFile);
            const templateContent = fs.readFileSync(templatePath, 'utf8');

            vscode.window.showInformationMessage(`Generating file: ${templateFile}`);
            console.log(`Generating file: ${templateFile}`); // Add logging
            // Compile the template
            const template = handlebars.compile(templateContent);

            // Generate the file content
            const fileContent = template({ projectName, domainName, domainCamelCase, attributes, idAttribute });

            // Determine the output file path
            let outputFilePath = "";       
            if(templateFile.includes('domain') || templateFile.includes('Domain')) {
                console.debug('Generating file:', templateFile);
                const domainCamelCase = domainName.charAt(0).toLowerCase() + domainName.slice(1);
                outputFilePath = path.join(projectDir, templateFile
                    .replace('features', 'features/' + domainCamelCase)            
                    .replace('Domain-', domainName)
                    .replace('domain-', domainCamelCase)
                    .replace('domains-', domainCamelCase + 's')
                    .replace('-template', ''));
            } else {
                console.debug('Generating file:', templateFile);
                outputFilePath = path.join(projectDir, templateFile.replace('-template', ''));
            }

            // Ensure the output directory exists
            const outputDir = path.dirname(outputFilePath);
            if (!fs.existsSync(outputDir)) {
                fs.mkdirSync(outputDir, { recursive: true });
            }

            // Write the generated content to the output file
            fs.writeFileSync(outputFilePath, fileContent, 'utf8');
            console.log(`File written: ${outputFilePath}`);
        } catch (error) {
            console.error('Error generating file:', error);
        }
    }

    vscode.window.showInformationMessage(`Files generated successfully in ${projectDir}`);
}

export function getAllFiles(dir: string, fileList: string[] = [], baseDir: string = dir): string[] {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            getAllFiles(filePath, fileList, baseDir);
        } else {
            fileList.push(path.relative(baseDir, filePath));
        }
    });

    return fileList;
}

function createReactAppStructure(projectPath: string) {
    const directories = [
        'src',
        'src/assets',
        'src/features',
        'mock',
        'public'
    ];

    directories.forEach(dir => {
        const dirPath = path.join(projectPath, dir);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
    });

    vscode.window.showInformationMessage(`React app structure created in ${projectPath}`);
}