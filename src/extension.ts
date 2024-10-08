import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as handlebars from 'handlebars';

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

async function generateFiles(projectName: string, domainName: string, attributes: any[], selectedFolderPath: string) {
    console.log('Generating files...');
    const templatesDir = path.join(__dirname, '..', 'templates'); // Adjusted path
    const projectDir = path.join(selectedFolderPath, projectName);

    // Ensure the project directory exists
    if (!fs.existsSync(projectDir)) {
        fs.mkdirSync(projectDir, { recursive: true });
    }

    // Read all template files, including those in subdirectories
    const templateFiles = getAllFiles(templatesDir);

    for (const templateFile of templateFiles) {
        const templatePath = path.join(templatesDir, templateFile);
        const templateContent = fs.readFileSync(templatePath, 'utf8');

        // Compile the template
        const template = handlebars.compile(templateContent);

        // Generate the file content
        const fileContent = template({ projectName, domainName, attributes });

        // Determine the output file path
        const outputFilePath = path.join(projectDir, templateFile.replace('-template', ''));

        // Ensure the output directory exists
        const outputDir = path.dirname(outputFilePath);
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        // Write the generated content to the output file
        fs.writeFileSync(outputFilePath, fileContent, 'utf8');
    }

    vscode.window.showInformationMessage(`Files generated successfully in ${projectDir}`);
}

function getAllFiles(dir: string, fileList: string[] = [], baseDir: string = dir): string[] {
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