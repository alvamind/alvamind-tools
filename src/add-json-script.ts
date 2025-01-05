#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';

const projectDir = process.cwd();

const exampleScripts = {
    // Generate source code documentation
    'source': 'generate-source output=documentation.md exclude=dist/,node_modules/,.git/',

    // Git commit and push
    'commit': 'commit',

    // Clean project folders and files
    'clean': 'clean',

    // Split combined code file
    'split-code': 'split-code source=combined.ts markers=src/,lib/ outputDir=./output',

    // NPM publish helper
    'publish-npm': 'publish-npm patch'
};

async function addScriptsToPackageJson() {
    try {
        const packageJsonPath = path.join(projectDir, 'package.json');

        if (!fs.existsSync(packageJsonPath)) {
            console.error(chalk.red('❌ package.json not found in the current directory'));
            process.exit(1);
        }

        // Read existing package.json
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

        // Initialize scripts object if it doesn't exist
        if (!packageJson.scripts) {
            packageJson.scripts = {};
        }

        // Add example scripts
        let scriptsAdded = 0;
        for (const [scriptName, scriptCommand] of Object.entries(exampleScripts)) {
            if (!packageJson.scripts[scriptName]) {
                packageJson.scripts[scriptName] = scriptCommand;
                scriptsAdded++;
                console.log(chalk.green(`✅ Added script: ${chalk.cyan(scriptName)}`));
            } else {
                console.log(chalk.yellow(`ℹ️  Script ${chalk.cyan(scriptName)} already exists, skipping...`));
            }
        }

        // Write updated package.json
        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

        if (scriptsAdded > 0) {
            console.log(chalk.green(`\n✨ Successfully added ${scriptsAdded} example scripts!`));
            console.log(chalk.cyan('\nAvailable commands:'));
            Object.entries(exampleScripts).forEach(([name, command]) => {
                console.log(chalk.gray(`npm run ${name}`), chalk.dim(`→ ${command}`));
            });
        } else {
            console.log(chalk.yellow('\nℹ️  No new scripts were added (all already exist)'));
        }

    } catch (error) {
        console.error(chalk.red('Error adding scripts:'), error);
        process.exit(1);
    }
}

addScriptsToPackageJson();