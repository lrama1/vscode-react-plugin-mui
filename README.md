# Project Name: vscode-react-plugin

## Description
This project is a plugin for Visual Studio Code that enhances the development experience for React applications. It provides useful features and tools specifically tailored for React developers, making it easier to write, debug, and maintain React code.

## Features
- Syntax highlighting for JSX and React components
- IntelliSense for React-specific code snippets
- Automatic import suggestions for React components and libraries
- Code formatting and linting for consistent code style
- Debugging support for React applications
- Integration with popular React development tools and frameworks

## Running while developing
To run the plugin while developing it, follow these steps:
1. Within VSCode type **F5** (this will open a new VSCode Window)
2. Type **Ctrl-Shift-P** and locate **React: Project Wizard** from the list

## Creating a VSIX file for distribution
1. Run compile
```
npm run compile
```
2. Run VSCE package
```
npm run vsce:package
```