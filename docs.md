# Project: alvamind-tools

## 📁 Dir Structure:
- scripts/
  • post-install.ts
- src/
  • add-json-script.ts
  • cli.ts
  • index.ts
- src/test/
  • source.test.ts
- src/tools/
  • clean.ts
  • commit.ts
  • npm-publish.ts
  • split-files.ts

- ./
  • changelog.md
  • custom-docs.md
  • package.json
  • README.md
  • source-code.md
  • tsconfig.build.json
  • tsconfig.json
## 🚫 Excludes:
- **/node_modules/**
- **/dist/**
- **/.git/**
- **/generate-source.ts
- **/.zed-settings.json
- **/.vscode/settings.json
- **/package-lock.json
- **/bun.lockb
- **/build/**
- docs.md
- src/tests

## 📁 Dir Structure:
- scripts
- src
- src/test
- src/tools

## 💻 Code:
====================

// changelog.md
# Changelog
All notable changes to this project will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
## [1.0.7] - 2025-01-06
### Added
-   **`generate-source` CLI Tool:**
    -   Added `--remove-blank-lines` option to remove all blank lines from the generated Markdown file.
## [1.0.6] - 2025-01-05
### Added
-   **`add-json-script` CLI Tool:**
    -   Adds example scripts to your `package.json` file for all available tools.
    -   Asks for user confirmation before adding the scripts.
## [1.0.3] - 2025-01-04
### Added
-   **`commit` CLI Tool:**
    -   Now initializes a git repository if none exists.
    -   If `gh` is installed, creates a GitHub repository for you if none exists.
    -   Asks for public or private when creating a new repo.
    -   Asks if you want to set the upstream branch.
### Changed
-   **`generate-source` CLI Tool:**
    -   Now includes the project name at the top of the generated Markdown file, enhancing its readability.
    -   Improved include/exclude functionality with regex support for more flexible filtering.
    -   Add try catch error for exclude parsing.
-   **`commit` CLI Tool:**
    -   Now checks for existing changes before attempting to commit and push.
### Fixed
    -   Fix: prevent error when deleting a file or folder not existing.
## [1.0.2] - 2025-01-04
### Added
-   **`clean` CLI Tool:**
    -   Introduced a new CLI tool, `clean`, which removes common build artifacts, lockfiles, and cache directories.
    -   Deletes the following directories: `.bun`, `.turbo`, `.eslintcache`, `.parcel-cache`, `node_modules`, `.next`, `.cache`, `dist`, `build`, `coverage`, and `.vite`.
    -   Deletes the following files: `.bun.lockb`, `yarn.lock`, `package-lock.json`, `pnpm-lock.yaml` and `.DS_Store`.
    -   Recursively removes all directories named `generated` throughout the project.
    -   Includes basic error handling with console logs for missing directories and files.
-  **Exported `clean` on `index.ts`**
### Changed
-   **`generate-source` CLI Tool:**
    -   Now includes the project name at the top of the generated Markdown file, enhancing its readability.
    -   Improved include/exclude functionality with regex support for more flexible filtering.
    -   Add try catch error for exclude parsing.
-   **`commit` CLI Tool:**
    -   Now checks for existing changes before attempting to commit and push.
### Fixed
    -   Fix: prevent error when deleting a file or folder not existing.
## [1.0.6] - 2025-01-05
### Added
-   **`add-json-script` CLI Tool:**
    -   Adds example scripts to your `package.json` file for all available tools.
    -   Asks for user confirmation before adding the scripts.
## [1.0.1] - 2025-01-02
### Added
-   **Initial Release:**
    -   `generate-source` CLI tool: Generates a Markdown file containing the project's source code, excluding specified files and directories.
    -   `commit` CLI tool: Automates the `git add .`, `git commit -m "message"`, and `git push` workflow.

// custom-docs.md
# Project: alvamind-tools
## 📁 Dir Structure:
- scripts/
  • post-install.ts
- src/
  • add-json-script.ts
  • cli.ts
  • index.ts
- src/test/
  • source.test.ts
- src/tools/
  • clean.ts
  • commit.ts
  • npm-publish.ts
  • split-files.ts
- ./
  • changelog.md
  • docs.md
  • package.json
  • README.md
  • source-code.md
  • tsconfig.build.json
  • tsconfig.json
## 🚫 Excludes:
- **/node_modulesdist.gitgenerate-source.ts
- **/.zed-settings.json
- **/.vscode/settings.json
- **/package-lock.json
- **/bun.lockb
- **/buildnode_modulesdist.gitgenerate-source.ts
- **/.zed-settings.json
- **/.vscode/settings.json
- **/package-lock.json
- **/bun.lockb
- **/build*'); // await here
    expect(fs.existsSync(sourceFile)).toBe(true);
    const content = fs.readFileSync(sourceFile, 'utf-8');
    expect(content).not.toContain('// test.ts');
    expect(content).not.toContain('// src/nested.ts');
    expect(content).not.toContain('// test2.ts');
    expect(content).not.toContain('// src/nested2.ts');
  });
  test('should show help with no args', async () => { // async test
    const result = await runGenerateSource(); // await here
    expect(result).toContain("Usage:");
  });
  test('should show help with --help arg', async () => { // async test
    const result = await runGenerateSource('--help'); // await here
    expect(result).toContain("Usage:");
  });
  test('should return error with invalid arg', async () => { // async test
    try {
      await runGenerateSource('--invalid=arg'); // await here
    } catch (e: any) {
      expect(e.message).toContain("Args error:");
    }
  });
});
const c = 3;
const d = 4; 
 const a = 1;
 const b = 2;
#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import chalk from 'chalk';
const projectDir = process.cwd();
async function cleanProject() {
  const chalk = (await import('chalk')).default;
  const foldersToDelete = [
    '.bun',
    '.turbo',
    '.eslintcache',
    '.parcel-cache',
    'node_modules',
    '.next',
    '.cache',
    'dist',
    'build',
    'coverage',
    '.vite',
  ];
  const filesToDelete = [
    'bun.lockb',
    'yarn.lock',
    'package-lock.json',
    'pnpm-lock.yaml',
    '.DS_Store',
  ];
  let deletedCount = 0;
  try {
    for (const folder of foldersToDelete) {
      const fullPath = path.join(projectDir, folder);
      if (fs.existsSync(fullPath)) {
        fs.rmSync(fullPath, { recursive: true, force: true });
        console.log(`${chalk.green('✓')} Deleted folder: ${chalk.cyan(folder)}`);
        deletedCount++;
      }
    }
    for (const file of filesToDelete) {
      const fullPath = path.join(projectDir, file);
      if (fs.existsSync(fullPath)) {
        fs.rmSync(fullPath, { force: true });
        console.log(`${chalk.green('✓')} Deleted file: ${chalk.cyan(file)}`);
        deletedCount++;
      }
    }
    const generatedDirs = await findGeneratedDirs('.');
    for (const dir of generatedDirs) {
      const fullPath = path.join(projectDir, dir);
      if (fs.existsSync(fullPath)) {
        fs.rmSync(fullPath, { recursive: true, force: true });
        console.log(`${chalk.green('✓')} Deleted generated dir: ${chalk.cyan(dir)}`);
        deletedCount++;
      }
    }
    console.log(chalk.green(`\n✨ Cleaning completed! ${deletedCount} items deleted`));
  } catch (error) {
    console.error(chalk.red('Error during cleaning:'), error);
    process.exit(1);
  }
}
async function findGeneratedDirs(dir: string): Promise<string[]> {
  const entries = fs.readdirSync(path.join(projectDir, dir), { withFileTypes: true });
  let generatedDirs: string[] = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'generated') {
        generatedDirs.push(fullPath);
      }
      generatedDirs = [...generatedDirs, ...(await findGeneratedDirs(fullPath))];
    }
  }
  return generatedDirs;
}
cleanProject().catch((error) => {
  console.error(chalk.red('Fatal Error:'), error);
  process.exit(1);
});
#!/usr/bin/env node
import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';
import chalk from 'chalk';
const defaultGitignore = `# Dependencies
/node_modules
/.pnp
.pnp.js
# Testing
/coverage
# Production
/build
/dist
# Misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local
# Debug logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
# IDE
.idea/
.vscode/
*.swp
*.swo
# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db
# Optional npm cache directory
.npm
# Optional eslint cache
.eslintcache
# Optional REPL history
.node_repl_history
# Output of 'npm pack'
*.tgz
# Yarn Integrity file
.yarn-integrity`;
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const projectDir = process.cwd();
const projectName = path.basename(projectDir);
const args = process.argv.slice(2);
const commitMessage = args.join(' ');
async function askQuestion(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}
async function isGhInstalled(): Promise<boolean> {
  try {
    execSync('gh --version', { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
}
function createGitignore() {
  const gitignorePath = path.join(projectDir, '.gitignore');
  if (!fs.existsSync(gitignorePath)) {
    console.log(chalk.yellow('ℹ️  Creating default .gitignore file...'));
    fs.writeFileSync(gitignorePath, defaultGitignore);
    console.log(chalk.green('✅ Created .gitignore file'));
  }
}
async function commitAndPush() {
  if (!commitMessage) {
    console.error(chalk.red('❌ Commit message is required.'));
    process.exit(1);
  }
  try {
    console.log(chalk.cyan('🚀 Starting commit process...'));
    process.chdir(projectDir);
    console.log(chalk.gray(`📂 Working in: ${projectDir}`));
    const isNewRepo = !fs.existsSync(path.join(projectDir, '.git'));
    if (isNewRepo) {
      console.log(chalk.yellow('⚠️  No git repository found. Initializing...'));
      execSync('git init', { stdio: 'inherit' });
      console.log(chalk.green('✅ Git repository initialized.'));
      createGitignore();
    }
    createGitignore();
    const status = execSync('git status --porcelain').toString();
    if (!status) {
      console.log(chalk.yellow('ℹ️  No changes to commit.'));
      process.exit(0);
    }
    console.log(chalk.cyan('📝 Staging all changes...'));
    execSync('git add .', { stdio: 'inherit' });
    console.log(chalk.cyan('💾 Committing changes...'));
    execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
    if (await !isGhInstalled()) {
      console.log(
        chalk.yellow('⚠️  GitHub CLI (gh) is not installed. Skipping remote repository creation.')
      );
    } else {
      console.log(chalk.cyan('🔍 Checking for remote repository...'));
      try {
        execSync('gh repo view', { stdio: 'ignore' });
        console.log(chalk.green('✅ Remote repository found.'));
      } catch (error) {
        console.log(chalk.yellow('⚠️  No remote repository found. Creating...'));
        const makePrivate = await askQuestion(chalk.cyan('Make repository private? (y/n): '));
        const repoType = makePrivate.toLowerCase() === 'y' ? 'private' : 'public';
        execSync(`gh repo create ${projectName} --${repoType} --source=. --push`, {
          stdio: 'inherit',
        });
        console.log(chalk.green(`✅ Created ${repoType} repository: ${projectName} on GitHub`));
      }
    }
    try {
      execSync('git rev-parse --abbrev-ref --symbolic-full-name @{u}', { stdio: 'ignore' });
      console.log(chalk.cyan('⬆️  Pushing changes...'));
      execSync('git push', { stdio: 'inherit' });
    } catch (error) {
      const remoteName = 'origin';
      const branchName = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
      console.log(chalk.cyan(`⬆️  Setting upstream and pushing to ${remoteName}/${branchName}...`));
      execSync(`git push --set-upstream ${remoteName} ${branchName}`, { stdio: 'inherit' });
    }
    console.log(chalk.green('✅ Changes committed and pushed successfully!'));
  } catch (error) {
    console.error(chalk.red('❌ Error during commit and push:'), error);
    process.exit(1);
  } finally {
    rl.close();
  }
}
commitAndPush();
#!/usr/bin/env node
import { execSync } from 'child_process';
import * as readline from 'readline';
import chalk from 'chalk';
import * as fs from 'fs';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const [, , versionArg, commitMessageArg] = process.argv;
async function askQuestion(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}
function checkGitStatus(): boolean {
  try {
    const status = execSync('git status --porcelain').toString();
    return status.length === 0;
  } catch (error) {
    return false;
  }
}
function getCurrentBranch(): string {
  return execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
}
function validatePackageJson(): void {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const requiredFields = ['name', 'version', 'description', 'main', 'types'];
  for (const field of requiredFields) {
    if (!packageJson[field]) {
      throw new Error(`Missing required field in package.json: ${field}`);
    }
  }
}
async function selectVersionType(): Promise<string> {
  if (versionArg && ['patch', 'minor', 'major'].includes(versionArg)) {
    return versionArg;
  }
  console.log(chalk.cyan('\nSelect version increment type:'));
  console.log(chalk.gray('1. patch (1.0.0 -> 1.0.1)'));
  console.log(chalk.gray('2. minor (1.0.0 -> 1.1.0)'));
  console.log(chalk.gray('3. major (1.0.0 -> 2.0.0)'));
  const answer = await askQuestion('Enter your choice (1-3): ');
  const versionMap: { [key: string]: string } = {
    '1': 'patch',
    '2': 'minor',
    '3': 'major',
  };
  return versionMap[answer] || 'patch';
}
async function getCommitMessage(): Promise<string> {
  if (commitMessageArg) {
    return commitMessageArg;
  }
  const message = await askQuestion(chalk.cyan('Enter commit message: '));
  if (!message.trim()) {
    throw new Error('Commit message is required');
  }
  return message;
}
async function publishPackage() {
  try {
    console.log(chalk.cyan('\n🔍 Running pre-publish checks...\n'));
    console.log(chalk.cyan('📋 Validating package.json...'));
    validatePackageJson();
    console.log(chalk.green('✅ package.json is valid'));
    const currentBranch = getCurrentBranch();
    if (currentBranch !== 'main' && currentBranch !== 'master') {
      console.log(chalk.yellow(`⚠️  You're on branch '${currentBranch}'.`));
    }
    if (!checkGitStatus()) {
      console.log(chalk.yellow('⚠️  You have uncommitted changes'));
      const commitMessage = await getCommitMessage();
      execSync(`bun commit "${commitMessage}"`, { stdio: 'inherit' });
    }
    console.log(chalk.cyan('\n🧹 Cleaning project...'));
    execSync('bun clean', { stdio: 'inherit' });
    console.log(chalk.cyan('\n📦 Installing dependencies...'));
    execSync('bun install', { stdio: 'inherit' });
    console.log(chalk.cyan('\n🔨 Building project...'));
    execSync('bun run build', { stdio: 'inherit' });
    try {
      console.log(chalk.cyan('\n🧪 Running tests...'));
      execSync('bun test', { stdio: 'inherit' });
      console.log(chalk.green('✅ Tests passed'));
    } catch (error) {
      console.log(chalk.yellow('⚠️  No tests found or tests failed'));
    }
    const versionType = await selectVersionType();
    console.log(chalk.cyan(`\n📝 Incrementing ${versionType} version...`));
    execSync(`npm version ${versionType} --no-git-tag-version`, { stdio: 'inherit' });
    console.log(chalk.cyan('\n🚀 Publishing to npm...'));
    execSync('npm publish', { stdio: 'inherit' });
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const tagName = `v${packageJson.version}`;
    execSync(`git tag ${tagName}`, { stdio: 'inherit' });
    execSync('git push && git push --tags', { stdio: 'inherit' });
    console.log(chalk.green('\n✨ Package successfully published to npm!'));
    console.log(chalk.gray(`Version: ${packageJson.version}`));
    console.log(chalk.gray(`Tag: ${tagName}`));
  } catch (error) {
    console.error(chalk.red('\n❌ Error during publish process:'), error);
    process.exit(1);
  } finally {
    rl.close();
  }
}
publishPackage();
#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';
interface FileSection {
  filePath: string;
  start: number;
  end: number;
  content: string;
  created: boolean;
}
function splitFile(singleFilePath: string, markers: string[], outputDirPath?: string): void {
  if (!fs.existsSync(singleFilePath)) {
    console.error(chalk.red(`Error: File not found: ${singleFilePath}`));
    process.exit(1);
  }
  const fileContent = fs.readFileSync(singleFilePath, 'utf-8');
  const fileSections: FileSection[] = [];
  markers.forEach((marker) => {
    const fileRegex = new RegExp(`\\/\\/ ${marker}(.*?\\.ts)`, 'g');
    let match;
    while ((match = fileRegex.exec(fileContent)) !== null) {
      const filePath = match[1].trim();
      const start = match.index;
      fileSections.push({
        filePath,
        start,
        end: start, // Will be updated later
        content: '',
        created: false,
      });
    }
  });
  fileSections.sort((a, b) => a.start - b.start);
  for (let i = 0; i < fileSections.length; i++) {
    const currentSection = fileSections[i];
    const nextSection = fileSections[i + 1];
    currentSection.end = nextSection ? nextSection.start : fileContent.length;
    const markerLineEnd = fileContent.indexOf('\n', currentSection.start) + 1;
    currentSection.content = fileContent.substring(markerLineEnd, currentSection.end).trim();
  }
  fileSections.forEach((section) => {
    const { filePath, content } = section;
    const fileDir = outputDirPath
      ? path.resolve(outputDirPath, path.dirname(filePath))
      : path.resolve(path.dirname(filePath));
    const fileName = path.basename(filePath);
    const fullFilePath = path.join(fileDir, fileName);
    if (!fs.existsSync(fileDir)) {
      fs.mkdirSync(fileDir, { recursive: true });
    }
    fs.writeFileSync(fullFilePath, content);
    console.log(chalk.green(`Created: ${chalk.bold(fullFilePath)}`));
  });
  if (fileSections.length === 0 && fileContent.length > 0) {
    console.log(chalk.yellow('No marker path found in the file.'));
  }
  if (fileSections.length > 0) {
    console.log(chalk.cyan('\nFiles splitted successfully! ✨\n'));
    const openCommand =
      process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open';
    console.log(chalk.blue(`You can open the files with ${chalk.bold('CTRL+Click')}`));
  }
}
const args = process.argv.slice(2);
if (args.length === 0) {
  console.error(
    chalk.red('Usage: split source=<filePath> markers=<marker1,marker2,...> [outputDir=<path>]')
  );
  console.error(
    chalk.yellow('Example: split source=all-in-one.ts markers=src/,custom/ outputDir=./output')
  );
  process.exit(1);
}
const parsedArgs: { [key: string]: string } = {};
args.forEach((arg) => {
  const [key, value] = arg.split('=');
  if (key && value) {
    parsedArgs[key] = value;
  }
});
if (!parsedArgs.source || !parsedArgs.markers) {
  console.error(chalk.red('Error: source and markers parameters are required'));
  console.error(
    chalk.yellow('Example: split source=all-in-one.ts markers=src/,custom/ outputDir=./output')
  );
  process.exit(1);
}
const singleFilePath = parsedArgs.source;
const markers = parsedArgs.markers.split(',');
const outputDirPath = parsedArgs.outputDir;
splitFile(singleFilePath, markers, outputDirPath);
{
  "extends": "./tsconfig.json",
  "exclude": ["node_modules", "test", "dist", "scripts"],
  "compilerOptions": {
    "sourceMap": true,
    "declaration": true,
    "outDir": "./dist"
  }
}
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "declaration": true,
    "outDir": "./dist",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "rootDir": "./src",
    "typeRoots": ["./node_modules/@types", "./src/types"]
  },
  "include": ["src*.ts", "test*.ts"]
}
{
  "name": "alvamind-tools",
  "version": "1.0.22",
  "description": "CLI tools for generating source code documentation and git automation",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/alvamind/alvamind-tools.git"
  },
  "bin": {
    "alvamind": "./dist/cli.js",
    "generate-source": "./dist/tools/generate-source.js",
    "commit": "./dist/tools/commit.js",
    "clean": "./dist/tools/clean.js",
    "split-code": "./dist/tools/split-files.js",
    "publish-npm": "./dist/tools/npm-publish.js",
    "add-json-script": "./dist/add-json-script.js"
  },
  "scripts": {
    "alvamind": "bun src/cli.ts",
    "commit": "bun src/tools/commit.ts commit",
    "source": "bun src/tools/generate-source.ts --exclude=src/tests --output=docs.md",
    "split-code": "bun src/tools/split-files.ts source=all-in-one.ts markers=src/,custom/ outputDir=./output",
    "build": "tsc && tsc -p tsconfig.build.json && chmod +x dist/cli.js dist/toolsnode_modulesdist.gitgenerate-source.ts
- **/.zed-settings.json
- **/.vscode/settings.json
- **/package-lock.json
- **/bun.lockb
- **/buildnode_modulesdist.gitgenerate-source.ts
- **/.zed-settings.json
- **/.vscode/settings.json
- **/package-lock.json
- **/bun.lockb
- **/buildnode_modulesdist.gitgenerate-source.ts
- **/.zed-settings.json
- **/.vscode/settings.json
- **/package-lock.json
- **/bun.lockb
- **/build*'); // await here
    expect(fs.existsSync(sourceFile)).toBe(true);
    const content = fs.readFileSync(sourceFile, 'utf-8');
    expect(content).not.toContain('// test.ts');
    expect(content).not.toContain('// src/nested.ts');
    expect(content).not.toContain('// test2.ts');
    expect(content).not.toContain('// src/nested2.ts');
  });
  test('should show help with no args', async () => { // async test
    const result = await runGenerateSource(); // await here
    expect(result).toContain("Usage:");
  });
  test('should show help with --help arg', async () => { // async test
    const result = await runGenerateSource('--help'); // await here
    expect(result).toContain("Usage:");
  });
  test('should return error with invalid arg', async () => { // async test
    try {
      await runGenerateSource('--invalid=arg'); // await here
    } catch (e: any) {
      expect(e.message).toContain("Args error:");
    }
  });
});
const c = 3;
const d = 4; 
 const a = 1;
 const b = 2;
#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import chalk from 'chalk';
const projectDir = process.cwd();
async function cleanProject() {
  const chalk = (await import('chalk')).default;
  const foldersToDelete = [
    '.bun',
    '.turbo',
    '.eslintcache',
    '.parcel-cache',
    'node_modules',
    '.next',
    '.cache',
    'dist',
    'build',
    'coverage',
    '.vite',
  ];
  const filesToDelete = [
    'bun.lockb',
    'yarn.lock',
    'package-lock.json',
    'pnpm-lock.yaml',
    '.DS_Store',
  ];
  let deletedCount = 0;
  try {
    for (const folder of foldersToDelete) {
      const fullPath = path.join(projectDir, folder);
      if (fs.existsSync(fullPath)) {
        fs.rmSync(fullPath, { recursive: true, force: true });
        console.log(`${chalk.green('✓')} Deleted folder: ${chalk.cyan(folder)}`);
        deletedCount++;
      }
    }
    for (const file of filesToDelete) {
      const fullPath = path.join(projectDir, file);
      if (fs.existsSync(fullPath)) {
        fs.rmSync(fullPath, { force: true });
        console.log(`${chalk.green('✓')} Deleted file: ${chalk.cyan(file)}`);
        deletedCount++;
      }
    }
    const generatedDirs = await findGeneratedDirs('.');
    for (const dir of generatedDirs) {
      const fullPath = path.join(projectDir, dir);
      if (fs.existsSync(fullPath)) {
        fs.rmSync(fullPath, { recursive: true, force: true });
        console.log(`${chalk.green('✓')} Deleted generated dir: ${chalk.cyan(dir)}`);
        deletedCount++;
      }
    }
    console.log(chalk.green(`\n✨ Cleaning completed! ${deletedCount} items deleted`));
  } catch (error) {
    console.error(chalk.red('Error during cleaning:'), error);
    process.exit(1);
  }
}
async function findGeneratedDirs(dir: string): Promise<string[]> {
  const entries = fs.readdirSync(path.join(projectDir, dir), { withFileTypes: true });
  let generatedDirs: string[] = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'generated') {
        generatedDirs.push(fullPath);
      }
      generatedDirs = [...generatedDirs, ...(await findGeneratedDirs(fullPath))];
    }
  }
  return generatedDirs;
}
cleanProject().catch((error) => {
  console.error(chalk.red('Fatal Error:'), error);
  process.exit(1);
});
#!/usr/bin/env node
import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';
import chalk from 'chalk';
const defaultGitignore = `# Dependencies
/node_modules
/.pnp
.pnp.js
# Testing
/coverage
# Production
/build
/dist
# Misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local
# Debug logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
# IDE
.idea/
.vscode/
*.swp
*.swo
# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db
# Optional npm cache directory
.npm
# Optional eslint cache
.eslintcache
# Optional REPL history
.node_repl_history
# Output of 'npm pack'
*.tgz
# Yarn Integrity file
.yarn-integrity`;
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const projectDir = process.cwd();
const projectName = path.basename(projectDir);
const args = process.argv.slice(2);
const commitMessage = args.join(' ');
async function askQuestion(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}
async function isGhInstalled(): Promise<boolean> {
  try {
    execSync('gh --version', { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
}
function createGitignore() {
  const gitignorePath = path.join(projectDir, '.gitignore');
  if (!fs.existsSync(gitignorePath)) {
    console.log(chalk.yellow('ℹ️  Creating default .gitignore file...'));
    fs.writeFileSync(gitignorePath, defaultGitignore);
    console.log(chalk.green('✅ Created .gitignore file'));
  }
}
async function commitAndPush() {
  if (!commitMessage) {
    console.error(chalk.red('❌ Commit message is required.'));
    process.exit(1);
  }
  try {
    console.log(chalk.cyan('🚀 Starting commit process...'));
    process.chdir(projectDir);
    console.log(chalk.gray(`📂 Working in: ${projectDir}`));
    const isNewRepo = !fs.existsSync(path.join(projectDir, '.git'));
    if (isNewRepo) {
      console.log(chalk.yellow('⚠️  No git repository found. Initializing...'));
      execSync('git init', { stdio: 'inherit' });
      console.log(chalk.green('✅ Git repository initialized.'));
      createGitignore();
    }
    createGitignore();
    const status = execSync('git status --porcelain').toString();
    if (!status) {
      console.log(chalk.yellow('ℹ️  No changes to commit.'));
      process.exit(0);
    }
    console.log(chalk.cyan('📝 Staging all changes...'));
    execSync('git add .', { stdio: 'inherit' });
    console.log(chalk.cyan('💾 Committing changes...'));
    execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
    if (await !isGhInstalled()) {
      console.log(
        chalk.yellow('⚠️  GitHub CLI (gh) is not installed. Skipping remote repository creation.')
      );
    } else {
      console.log(chalk.cyan('🔍 Checking for remote repository...'));
      try {
        execSync('gh repo view', { stdio: 'ignore' });
        console.log(chalk.green('✅ Remote repository found.'));
      } catch (error) {
        console.log(chalk.yellow('⚠️  No remote repository found. Creating...'));
        const makePrivate = await askQuestion(chalk.cyan('Make repository private? (y/n): '));
        const repoType = makePrivate.toLowerCase() === 'y' ? 'private' : 'public';
        execSync(`gh repo create ${projectName} --${repoType} --source=. --push`, {
          stdio: 'inherit',
        });
        console.log(chalk.green(`✅ Created ${repoType} repository: ${projectName} on GitHub`));
      }
    }
    try {
      execSync('git rev-parse --abbrev-ref --symbolic-full-name @{u}', { stdio: 'ignore' });
      console.log(chalk.cyan('⬆️  Pushing changes...'));
      execSync('git push', { stdio: 'inherit' });
    } catch (error) {
      const remoteName = 'origin';
      const branchName = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
      console.log(chalk.cyan(`⬆️  Setting upstream and pushing to ${remoteName}/${branchName}...`));
      execSync(`git push --set-upstream ${remoteName} ${branchName}`, { stdio: 'inherit' });
    }
    console.log(chalk.green('✅ Changes committed and pushed successfully!'));
  } catch (error) {
    console.error(chalk.red('❌ Error during commit and push:'), error);
    process.exit(1);
  } finally {
    rl.close();
  }
}
commitAndPush();
#!/usr/bin/env node
import { execSync } from 'child_process';
import * as readline from 'readline';
import chalk from 'chalk';
import * as fs from 'fs';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const [, , versionArg, commitMessageArg] = process.argv;
async function askQuestion(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}
function checkGitStatus(): boolean {
  try {
    const status = execSync('git status --porcelain').toString();
    return status.length === 0;
  } catch (error) {
    return false;
  }
}
function getCurrentBranch(): string {
  return execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
}
function validatePackageJson(): void {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const requiredFields = ['name', 'version', 'description', 'main', 'types'];
  for (const field of requiredFields) {
    if (!packageJson[field]) {
      throw new Error(`Missing required field in package.json: ${field}`);
    }
  }
}
async function selectVersionType(): Promise<string> {
  if (versionArg && ['patch', 'minor', 'major'].includes(versionArg)) {
    return versionArg;
  }
  console.log(chalk.cyan('\nSelect version increment type:'));
  console.log(chalk.gray('1. patch (1.0.0 -> 1.0.1)'));
  console.log(chalk.gray('2. minor (1.0.0 -> 1.1.0)'));
  console.log(chalk.gray('3. major (1.0.0 -> 2.0.0)'));
  const answer = await askQuestion('Enter your choice (1-3): ');
  const versionMap: { [key: string]: string } = {
    '1': 'patch',
    '2': 'minor',
    '3': 'major',
  };
  return versionMap[answer] || 'patch';
}
async function getCommitMessage(): Promise<string> {
  if (commitMessageArg) {
    return commitMessageArg;
  }
  const message = await askQuestion(chalk.cyan('Enter commit message: '));
  if (!message.trim()) {
    throw new Error('Commit message is required');
  }
  return message;
}
async function publishPackage() {
  try {
    console.log(chalk.cyan('\n🔍 Running pre-publish checks...\n'));
    console.log(chalk.cyan('📋 Validating package.json...'));
    validatePackageJson();
    console.log(chalk.green('✅ package.json is valid'));
    const currentBranch = getCurrentBranch();
    if (currentBranch !== 'main' && currentBranch !== 'master') {
      console.log(chalk.yellow(`⚠️  You're on branch '${currentBranch}'.`));
    }
    if (!checkGitStatus()) {
      console.log(chalk.yellow('⚠️  You have uncommitted changes'));
      const commitMessage = await getCommitMessage();
      execSync(`bun commit "${commitMessage}"`, { stdio: 'inherit' });
    }
    console.log(chalk.cyan('\n🧹 Cleaning project...'));
    execSync('bun clean', { stdio: 'inherit' });
    console.log(chalk.cyan('\n📦 Installing dependencies...'));
    execSync('bun install', { stdio: 'inherit' });
    console.log(chalk.cyan('\n🔨 Building project...'));
    execSync('bun run build', { stdio: 'inherit' });
    try {
      console.log(chalk.cyan('\n🧪 Running tests...'));
      execSync('bun test', { stdio: 'inherit' });
      console.log(chalk.green('✅ Tests passed'));
    } catch (error) {
      console.log(chalk.yellow('⚠️  No tests found or tests failed'));
    }
    const versionType = await selectVersionType();
    console.log(chalk.cyan(`\n📝 Incrementing ${versionType} version...`));
    execSync(`npm version ${versionType} --no-git-tag-version`, { stdio: 'inherit' });
    console.log(chalk.cyan('\n🚀 Publishing to npm...'));
    execSync('npm publish', { stdio: 'inherit' });
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const tagName = `v${packageJson.version}`;
    execSync(`git tag ${tagName}`, { stdio: 'inherit' });
    execSync('git push && git push --tags', { stdio: 'inherit' });
    console.log(chalk.green('\n✨ Package successfully published to npm!'));
    console.log(chalk.gray(`Version: ${packageJson.version}`));
    console.log(chalk.gray(`Tag: ${tagName}`));
  } catch (error) {
    console.error(chalk.red('\n❌ Error during publish process:'), error);
    process.exit(1);
  } finally {
    rl.close();
  }
}
publishPackage();
#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';
interface FileSection {
  filePath: string;
  start: number;
  end: number;
  content: string;
  created: boolean;
}
function splitFile(singleFilePath: string, markers: string[], outputDirPath?: string): void {
  if (!fs.existsSync(singleFilePath)) {
    console.error(chalk.red(`Error: File not found: ${singleFilePath}`));
    process.exit(1);
  }
  const fileContent = fs.readFileSync(singleFilePath, 'utf-8');
  const fileSections: FileSection[] = [];
  markers.forEach((marker) => {
    const fileRegex = new RegExp(`\\/\\/ ${marker}(.*?\\.ts)`, 'g');
    let match;
    while ((match = fileRegex.exec(fileContent)) !== null) {
      const filePath = match[1].trim();
      const start = match.index;
      fileSections.push({
        filePath,
        start,
        end: start, // Will be updated later
        content: '',
        created: false,
      });
    }
  });
  fileSections.sort((a, b) => a.start - b.start);
  for (let i = 0; i < fileSections.length; i++) {
    const currentSection = fileSections[i];
    const nextSection = fileSections[i + 1];
    currentSection.end = nextSection ? nextSection.start : fileContent.length;
    const markerLineEnd = fileContent.indexOf('\n', currentSection.start) + 1;
    currentSection.content = fileContent.substring(markerLineEnd, currentSection.end).trim();
  }
  fileSections.forEach((section) => {
    const { filePath, content } = section;
    const fileDir = outputDirPath
      ? path.resolve(outputDirPath, path.dirname(filePath))
      : path.resolve(path.dirname(filePath));
    const fileName = path.basename(filePath);
    const fullFilePath = path.join(fileDir, fileName);
    if (!fs.existsSync(fileDir)) {
      fs.mkdirSync(fileDir, { recursive: true });
    }
    fs.writeFileSync(fullFilePath, content);
    console.log(chalk.green(`Created: ${chalk.bold(fullFilePath)}`));
  });
  if (fileSections.length === 0 && fileContent.length > 0) {
    console.log(chalk.yellow('No marker path found in the file.'));
  }
  if (fileSections.length > 0) {
    console.log(chalk.cyan('\nFiles splitted successfully! ✨\n'));
    const openCommand =
      process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open';
    console.log(chalk.blue(`You can open the files with ${chalk.bold('CTRL+Click')}`));
  }
}
const args = process.argv.slice(2);
if (args.length === 0) {
  console.error(
    chalk.red('Usage: split source=<filePath> markers=<marker1,marker2,...> [outputDir=<path>]')
  );
  console.error(
    chalk.yellow('Example: split source=all-in-one.ts markers=src/,custom/ outputDir=./output')
  );
  process.exit(1);
}
const parsedArgs: { [key: string]: string } = {};
args.forEach((arg) => {
  const [key, value] = arg.split('=');
  if (key && value) {
    parsedArgs[key] = value;
  }
});
if (!parsedArgs.source || !parsedArgs.markers) {
  console.error(chalk.red('Error: source and markers parameters are required'));
  console.error(
    chalk.yellow('Example: split source=all-in-one.ts markers=src/,custom/ outputDir=./output')
  );
  process.exit(1);
}
const singleFilePath = parsedArgs.source;
const markers = parsedArgs.markers.split(',');
const outputDirPath = parsedArgs.outputDir;
splitFile(singleFilePath, markers, outputDirPath);
{
  "extends": "./tsconfig.json",
  "exclude": ["node_modules", "test", "dist", "scripts"],
  "compilerOptions": {
    "sourceMap": true,
    "declaration": true,
    "outDir": "./dist"
  }
}
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "declaration": true,
    "outDir": "./dist",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "rootDir": "./src",
    "typeRoots": ["./node_modules/@types", "./src/types"]
  },
  "include": ["src*.ts", "test*.ts"]
}
{
  "name": "alvamind-tools",
  "version": "1.0.22",
  "description": "CLI tools for generating source code documentation and git automation",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/alvamind/alvamind-tools.git"
  },
  "bin": {
    "alvamind": "./dist/cli.js",
    "generate-source": "./dist/tools/generate-source.js",
    "commit": "./dist/tools/commit.js",
    "clean": "./dist/tools/clean.js",
    "split-code": "./dist/tools/split-files.js",
    "publish-npm": "./dist/tools/npm-publish.js",
    "add-json-script": "./dist/add-json-script.js"
  },
  "scripts": {
    "alvamind": "bun src/cli.ts",
    "commit": "bun src/tools/commit.ts commit",
    "source": "bun src/tools/generate-source.ts --exclude=src/tests --output=docs.md",
    "split-code": "bun src/tools/split-files.ts source=all-in-one.ts markers=src/,custom/ outputDir=./output",
    "build": "tsc && tsc -p tsconfig.build.json && chmod +x dist/cli.js dist/toolsnode_modulesdist.gitgenerate-source.ts
- **/.zed-settings.json
- **/.vscode/settings.json
- **/package-lock.json
- **/bun.lockb
- **/buildnode_modulesdist.gitgenerate-source.ts
- **/.zed-settings.json
- **/.vscode/settings.json
- **/package-lock.json
- **/bun.lockb
- **/build*'); // await here
    expect(fs.existsSync(sourceFile)).toBe(true);
    const content = fs.readFileSync(sourceFile, 'utf-8');
    expect(content).not.toContain('// test.ts');
    expect(content).not.toContain('// src/nested.ts');
    expect(content).not.toContain('// test2.ts');
    expect(content).not.toContain('// src/nested2.ts');
  });
  test('should show help with no args', async () => { // async test
    const result = await runGenerateSource(); // await here
    expect(result).toContain("Usage:");
  });
  test('should show help with --help arg', async () => { // async test
    const result = await runGenerateSource('--help'); // await here
    expect(result).toContain("Usage:");
  });
  test('should return error with invalid arg', async () => { // async test
    try {
      await runGenerateSource('--invalid=arg'); // await here
    } catch (e: any) {
      expect(e.message).toContain("Args error:");
    }
  });
});
const c = 3;
const d = 4; 
 const a = 1;
 const b = 2;
#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import chalk from 'chalk';
const projectDir = process.cwd();
async function cleanProject() {
  const chalk = (await import('chalk')).default;
  const foldersToDelete = [
    '.bun',
    '.turbo',
    '.eslintcache',
    '.parcel-cache',
    'node_modules',
    '.next',
    '.cache',
    'dist',
    'build',
    'coverage',
    '.vite',
  ];
  const filesToDelete = [
    'bun.lockb',
    'yarn.lock',
    'package-lock.json',
    'pnpm-lock.yaml',
    '.DS_Store',
  ];
  let deletedCount = 0;
  try {
    for (const folder of foldersToDelete) {
      const fullPath = path.join(projectDir, folder);
      if (fs.existsSync(fullPath)) {
        fs.rmSync(fullPath, { recursive: true, force: true });
        console.log(`${chalk.green('✓')} Deleted folder: ${chalk.cyan(folder)}`);
        deletedCount++;
      }
    }
    for (const file of filesToDelete) {
      const fullPath = path.join(projectDir, file);
      if (fs.existsSync(fullPath)) {
        fs.rmSync(fullPath, { force: true });
        console.log(`${chalk.green('✓')} Deleted file: ${chalk.cyan(file)}`);
        deletedCount++;
      }
    }
    const generatedDirs = await findGeneratedDirs('.');
    for (const dir of generatedDirs) {
      const fullPath = path.join(projectDir, dir);
      if (fs.existsSync(fullPath)) {
        fs.rmSync(fullPath, { recursive: true, force: true });
        console.log(`${chalk.green('✓')} Deleted generated dir: ${chalk.cyan(dir)}`);
        deletedCount++;
      }
    }
    console.log(chalk.green(`\n✨ Cleaning completed! ${deletedCount} items deleted`));
  } catch (error) {
    console.error(chalk.red('Error during cleaning:'), error);
    process.exit(1);
  }
}
async function findGeneratedDirs(dir: string): Promise<string[]> {
  const entries = fs.readdirSync(path.join(projectDir, dir), { withFileTypes: true });
  let generatedDirs: string[] = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'generated') {
        generatedDirs.push(fullPath);
      }
      generatedDirs = [...generatedDirs, ...(await findGeneratedDirs(fullPath))];
    }
  }
  return generatedDirs;
}
cleanProject().catch((error) => {
  console.error(chalk.red('Fatal Error:'), error);
  process.exit(1);
});
#!/usr/bin/env node
import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';
import chalk from 'chalk';
const defaultGitignore = `# Dependencies
/node_modules
/.pnp
.pnp.js
# Testing
/coverage
# Production
/build
/dist
# Misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local
# Debug logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
# IDE
.idea/
.vscode/
*.swp
*.swo
# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db
# Optional npm cache directory
.npm
# Optional eslint cache
.eslintcache
# Optional REPL history
.node_repl_history
# Output of 'npm pack'
*.tgz
# Yarn Integrity file
.yarn-integrity`;
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const projectDir = process.cwd();
const projectName = path.basename(projectDir);
const args = process.argv.slice(2);
const commitMessage = args.join(' ');
async function askQuestion(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}
async function isGhInstalled(): Promise<boolean> {
  try {
    execSync('gh --version', { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
}
function createGitignore() {
  const gitignorePath = path.join(projectDir, '.gitignore');
  if (!fs.existsSync(gitignorePath)) {
    console.log(chalk.yellow('ℹ️  Creating default .gitignore file...'));
    fs.writeFileSync(gitignorePath, defaultGitignore);
    console.log(chalk.green('✅ Created .gitignore file'));
  }
}
async function commitAndPush() {
  if (!commitMessage) {
    console.error(chalk.red('❌ Commit message is required.'));
    process.exit(1);
  }
  try {
    console.log(chalk.cyan('🚀 Starting commit process...'));
    process.chdir(projectDir);
    console.log(chalk.gray(`📂 Working in: ${projectDir}`));
    const isNewRepo = !fs.existsSync(path.join(projectDir, '.git'));
    if (isNewRepo) {
      console.log(chalk.yellow('⚠️  No git repository found. Initializing...'));
      execSync('git init', { stdio: 'inherit' });
      console.log(chalk.green('✅ Git repository initialized.'));
      createGitignore();
    }
    createGitignore();
    const status = execSync('git status --porcelain').toString();
    if (!status) {
      console.log(chalk.yellow('ℹ️  No changes to commit.'));
      process.exit(0);
    }
    console.log(chalk.cyan('📝 Staging all changes...'));
    execSync('git add .', { stdio: 'inherit' });
    console.log(chalk.cyan('💾 Committing changes...'));
    execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
    if (await !isGhInstalled()) {
      console.log(
        chalk.yellow('⚠️  GitHub CLI (gh) is not installed. Skipping remote repository creation.')
      );
    } else {
      console.log(chalk.cyan('🔍 Checking for remote repository...'));
      try {
        execSync('gh repo view', { stdio: 'ignore' });
        console.log(chalk.green('✅ Remote repository found.'));
      } catch (error) {
        console.log(chalk.yellow('⚠️  No remote repository found. Creating...'));
        const makePrivate = await askQuestion(chalk.cyan('Make repository private? (y/n): '));
        const repoType = makePrivate.toLowerCase() === 'y' ? 'private' : 'public';
        execSync(`gh repo create ${projectName} --${repoType} --source=. --push`, {
          stdio: 'inherit',
        });
        console.log(chalk.green(`✅ Created ${repoType} repository: ${projectName} on GitHub`));
      }
    }
    try {
      execSync('git rev-parse --abbrev-ref --symbolic-full-name @{u}', { stdio: 'ignore' });
      console.log(chalk.cyan('⬆️  Pushing changes...'));
      execSync('git push', { stdio: 'inherit' });
    } catch (error) {
      const remoteName = 'origin';
      const branchName = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
      console.log(chalk.cyan(`⬆️  Setting upstream and pushing to ${remoteName}/${branchName}...`));
      execSync(`git push --set-upstream ${remoteName} ${branchName}`, { stdio: 'inherit' });
    }
    console.log(chalk.green('✅ Changes committed and pushed successfully!'));
  } catch (error) {
    console.error(chalk.red('❌ Error during commit and push:'), error);
    process.exit(1);
  } finally {
    rl.close();
  }
}
commitAndPush();
#!/usr/bin/env node
import { execSync } from 'child_process';
import * as readline from 'readline';
import chalk from 'chalk';
import * as fs from 'fs';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const [, , versionArg, commitMessageArg] = process.argv;
async function askQuestion(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}
function checkGitStatus(): boolean {
  try {
    const status = execSync('git status --porcelain').toString();
    return status.length === 0;
  } catch (error) {
    return false;
  }
}
function getCurrentBranch(): string {
  return execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
}
function validatePackageJson(): void {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const requiredFields = ['name', 'version', 'description', 'main', 'types'];
  for (const field of requiredFields) {
    if (!packageJson[field]) {
      throw new Error(`Missing required field in package.json: ${field}`);
    }
  }
}
async function selectVersionType(): Promise<string> {
  if (versionArg && ['patch', 'minor', 'major'].includes(versionArg)) {
    return versionArg;
  }
  console.log(chalk.cyan('\nSelect version increment type:'));
  console.log(chalk.gray('1. patch (1.0.0 -> 1.0.1)'));
  console.log(chalk.gray('2. minor (1.0.0 -> 1.1.0)'));
  console.log(chalk.gray('3. major (1.0.0 -> 2.0.0)'));
  const answer = await askQuestion('Enter your choice (1-3): ');
  const versionMap: { [key: string]: string } = {
    '1': 'patch',
    '2': 'minor',
    '3': 'major',
  };
  return versionMap[answer] || 'patch';
}
async function getCommitMessage(): Promise<string> {
  if (commitMessageArg) {
    return commitMessageArg;
  }
  const message = await askQuestion(chalk.cyan('Enter commit message: '));
  if (!message.trim()) {
    throw new Error('Commit message is required');
  }
  return message;
}
async function publishPackage() {
  try {
    console.log(chalk.cyan('\n🔍 Running pre-publish checks...\n'));
    console.log(chalk.cyan('📋 Validating package.json...'));
    validatePackageJson();
    console.log(chalk.green('✅ package.json is valid'));
    const currentBranch = getCurrentBranch();
    if (currentBranch !== 'main' && currentBranch !== 'master') {
      console.log(chalk.yellow(`⚠️  You're on branch '${currentBranch}'.`));
    }
    if (!checkGitStatus()) {
      console.log(chalk.yellow('⚠️  You have uncommitted changes'));
      const commitMessage = await getCommitMessage();
      execSync(`bun commit "${commitMessage}"`, { stdio: 'inherit' });
    }
    console.log(chalk.cyan('\n🧹 Cleaning project...'));
    execSync('bun clean', { stdio: 'inherit' });
    console.log(chalk.cyan('\n📦 Installing dependencies...'));
    execSync('bun install', { stdio: 'inherit' });
    console.log(chalk.cyan('\n🔨 Building project...'));
    execSync('bun run build', { stdio: 'inherit' });
    try {
      console.log(chalk.cyan('\n🧪 Running tests...'));
      execSync('bun test', { stdio: 'inherit' });
      console.log(chalk.green('✅ Tests passed'));
    } catch (error) {
      console.log(chalk.yellow('⚠️  No tests found or tests failed'));
    }
    const versionType = await selectVersionType();
    console.log(chalk.cyan(`\n📝 Incrementing ${versionType} version...`));
    execSync(`npm version ${versionType} --no-git-tag-version`, { stdio: 'inherit' });
    console.log(chalk.cyan('\n🚀 Publishing to npm...'));
    execSync('npm publish', { stdio: 'inherit' });
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const tagName = `v${packageJson.version}`;
    execSync(`git tag ${tagName}`, { stdio: 'inherit' });
    execSync('git push && git push --tags', { stdio: 'inherit' });
    console.log(chalk.green('\n✨ Package successfully published to npm!'));
    console.log(chalk.gray(`Version: ${packageJson.version}`));
    console.log(chalk.gray(`Tag: ${tagName}`));
  } catch (error) {
    console.error(chalk.red('\n❌ Error during publish process:'), error);
    process.exit(1);
  } finally {
    rl.close();
  }
}
publishPackage();
#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';
interface FileSection {
  filePath: string;
  start: number;
  end: number;
  content: string;
  created: boolean;
}
function splitFile(singleFilePath: string, markers: string[], outputDirPath?: string): void {
  if (!fs.existsSync(singleFilePath)) {
    console.error(chalk.red(`Error: File not found: ${singleFilePath}`));
    process.exit(1);
  }
  const fileContent = fs.readFileSync(singleFilePath, 'utf-8');
  const fileSections: FileSection[] = [];
  markers.forEach((marker) => {
    const fileRegex = new RegExp(`\\/\\/ ${marker}(.*?\\.ts)`, 'g');
    let match;
    while ((match = fileRegex.exec(fileContent)) !== null) {
      const filePath = match[1].trim();
      const start = match.index;
      fileSections.push({
        filePath,
        start,
        end: start, // Will be updated later
        content: '',
        created: false,
      });
    }
  });
  fileSections.sort((a, b) => a.start - b.start);
  for (let i = 0; i < fileSections.length; i++) {
    const currentSection = fileSections[i];
    const nextSection = fileSections[i + 1];
    currentSection.end = nextSection ? nextSection.start : fileContent.length;
    const markerLineEnd = fileContent.indexOf('\n', currentSection.start) + 1;
    currentSection.content = fileContent.substring(markerLineEnd, currentSection.end).trim();
  }
  fileSections.forEach((section) => {
    const { filePath, content } = section;
    const fileDir = outputDirPath
      ? path.resolve(outputDirPath, path.dirname(filePath))
      : path.resolve(path.dirname(filePath));
    const fileName = path.basename(filePath);
    const fullFilePath = path.join(fileDir, fileName);
    if (!fs.existsSync(fileDir)) {
      fs.mkdirSync(fileDir, { recursive: true });
    }
    fs.writeFileSync(fullFilePath, content);
    console.log(chalk.green(`Created: ${chalk.bold(fullFilePath)}`));
  });
  if (fileSections.length === 0 && fileContent.length > 0) {
    console.log(chalk.yellow('No marker path found in the file.'));
  }
  if (fileSections.length > 0) {
    console.log(chalk.cyan('\nFiles splitted successfully! ✨\n'));
    const openCommand =
      process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open';
    console.log(chalk.blue(`You can open the files with ${chalk.bold('CTRL+Click')}`));
  }
}
const args = process.argv.slice(2);
if (args.length === 0) {
  console.error(
    chalk.red('Usage: split source=<filePath> markers=<marker1,marker2,...> [outputDir=<path>]')
  );
  console.error(
    chalk.yellow('Example: split source=all-in-one.ts markers=src/,custom/ outputDir=./output')
  );
  process.exit(1);
}
const parsedArgs: { [key: string]: string } = {};
args.forEach((arg) => {
  const [key, value] = arg.split('=');
  if (key && value) {
    parsedArgs[key] = value;
  }
});
if (!parsedArgs.source || !parsedArgs.markers) {
  console.error(chalk.red('Error: source and markers parameters are required'));
  console.error(
    chalk.yellow('Example: split source=all-in-one.ts markers=src/,custom/ outputDir=./output')
  );
  process.exit(1);
}
const singleFilePath = parsedArgs.source;
const markers = parsedArgs.markers.split(',');
const outputDirPath = parsedArgs.outputDir;
splitFile(singleFilePath, markers, outputDirPath);
{
  "extends": "./tsconfig.json",
  "exclude": ["node_modules", "test", "dist", "scripts"],
  "compilerOptions": {
    "sourceMap": true,
    "declaration": true,
    "outDir": "./dist"
  }
}
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "declaration": true,
    "outDir": "./dist",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "rootDir": "./src",
    "typeRoots": ["./node_modules/@types", "./src/types"]
  },
  "include": ["src*.ts", "test*.ts"]
}
{
  "name": "alvamind-tools",
  "version": "1.0.22",
  "description": "CLI tools for generating source code documentation and git automation",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/alvamind/alvamind-tools.git"
  },
  "bin": {
    "alvamind": "./dist/cli.js",
    "generate-source": "./dist/tools/generate-source.js",
    "commit": "./dist/tools/commit.js",
    "clean": "./dist/tools/clean.js",
    "split-code": "./dist/tools/split-files.js",
    "publish-npm": "./dist/tools/npm-publish.js",
    "add-json-script": "./dist/add-json-script.js"
  },
  "scripts": {
    "alvamind": "bun src/cli.ts",
    "commit": "bun src/tools/commit.ts commit",
    "source": "bun src/tools/generate-source.ts --exclude=src/tests --output=docs.md",
    "split-code": "bun src/tools/split-files.ts source=all-in-one.ts markers=src/,custom/ outputDir=./output",
    "build": "tsc && tsc -p tsconfig.build.json && chmod +x dist/cli.js dist/tools*'); // await here
    expect(fs.existsSync(sourceFile)).toBe(true);
    const content = fs.readFileSync(sourceFile, 'utf-8');
    expect(content).not.toContain('// test.ts');
    expect(content).not.toContain('// src/nested.ts');
    expect(content).not.toContain('// test2.ts');
    expect(content).not.toContain('// src/nested2.ts');
  });
  test('should show help with no args', async () => { // async test
    const result = await runGenerateSource(); // await here
    expect(result).toContain("Usage:");
  });
  test('should show help with --help arg', async () => { // async test
    const result = await runGenerateSource('--help'); // await here
    expect(result).toContain("Usage:");
  });
  test('should return error with invalid arg', async () => { // async test
    try {
      await runGenerateSource('--invalid=arg'); // await here
    } catch (e: any) {
      expect(e.message).toContain("Args error:");
    }
  });
});
const c = 3;
const d = 4; 
 const a = 1;
 const b = 2;
#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import chalk from 'chalk';
const projectDir = process.cwd();
async function cleanProject() {
  const chalk = (await import('chalk')).default;
  const foldersToDelete = [
    '.bun',
    '.turbo',
    '.eslintcache',
    '.parcel-cache',
    'node_modules',
    '.next',
    '.cache',
    'dist',
    'build',
    'coverage',
    '.vite',
  ];
  const filesToDelete = [
    'bun.lockb',
    'yarn.lock',
    'package-lock.json',
    'pnpm-lock.yaml',
    '.DS_Store',
  ];
  let deletedCount = 0;
  try {
    for (const folder of foldersToDelete) {
      const fullPath = path.join(projectDir, folder);
      if (fs.existsSync(fullPath)) {
        fs.rmSync(fullPath, { recursive: true, force: true });
        console.log(`${chalk.green('✓')} Deleted folder: ${chalk.cyan(folder)}`);
        deletedCount++;
      }
    }
    for (const file of filesToDelete) {
      const fullPath = path.join(projectDir, file);
      if (fs.existsSync(fullPath)) {
        fs.rmSync(fullPath, { force: true });
        console.log(`${chalk.green('✓')} Deleted file: ${chalk.cyan(file)}`);
        deletedCount++;
      }
    }
    const generatedDirs = await findGeneratedDirs('.');
    for (const dir of generatedDirs) {
      const fullPath = path.join(projectDir, dir);
      if (fs.existsSync(fullPath)) {
        fs.rmSync(fullPath, { recursive: true, force: true });
        console.log(`${chalk.green('✓')} Deleted generated dir: ${chalk.cyan(dir)}`);
        deletedCount++;
      }
    }
    console.log(chalk.green(`\n✨ Cleaning completed! ${deletedCount} items deleted`));
  } catch (error) {
    console.error(chalk.red('Error during cleaning:'), error);
    process.exit(1);
  }
}
async function findGeneratedDirs(dir: string): Promise<string[]> {
  const entries = fs.readdirSync(path.join(projectDir, dir), { withFileTypes: true });
  let generatedDirs: string[] = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'generated') {
        generatedDirs.push(fullPath);
      }
      generatedDirs = [...generatedDirs, ...(await findGeneratedDirs(fullPath))];
    }
  }
  return generatedDirs;
}
cleanProject().catch((error) => {
  console.error(chalk.red('Fatal Error:'), error);
  process.exit(1);
});
#!/usr/bin/env node
import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';
import chalk from 'chalk';
const defaultGitignore = `# Dependencies
/node_modules
/.pnp
.pnp.js
# Testing
/coverage
# Production
/build
/dist
# Misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local
# Debug logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
# IDE
.idea/
.vscode/
*.swp
*.swo
# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db
# Optional npm cache directory
.npm
# Optional eslint cache
.eslintcache
# Optional REPL history
.node_repl_history
# Output of 'npm pack'
*.tgz
# Yarn Integrity file
.yarn-integrity`;
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const projectDir = process.cwd();
const projectName = path.basename(projectDir);
const args = process.argv.slice(2);
const commitMessage = args.join(' ');
async function askQuestion(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}
async function isGhInstalled(): Promise<boolean> {
  try {
    execSync('gh --version', { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
}
function createGitignore() {
  const gitignorePath = path.join(projectDir, '.gitignore');
  if (!fs.existsSync(gitignorePath)) {
    console.log(chalk.yellow('ℹ️  Creating default .gitignore file...'));
    fs.writeFileSync(gitignorePath, defaultGitignore);
    console.log(chalk.green('✅ Created .gitignore file'));
  }
}
async function commitAndPush() {
  if (!commitMessage) {
    console.error(chalk.red('❌ Commit message is required.'));
    process.exit(1);
  }
  try {
    console.log(chalk.cyan('🚀 Starting commit process...'));
    process.chdir(projectDir);
    console.log(chalk.gray(`📂 Working in: ${projectDir}`));
    const isNewRepo = !fs.existsSync(path.join(projectDir, '.git'));
    if (isNewRepo) {
      console.log(chalk.yellow('⚠️  No git repository found. Initializing...'));
      execSync('git init', { stdio: 'inherit' });
      console.log(chalk.green('✅ Git repository initialized.'));
      createGitignore();
    }
    createGitignore();
    const status = execSync('git status --porcelain').toString();
    if (!status) {
      console.log(chalk.yellow('ℹ️  No changes to commit.'));
      process.exit(0);
    }
    console.log(chalk.cyan('📝 Staging all changes...'));
    execSync('git add .', { stdio: 'inherit' });
    console.log(chalk.cyan('💾 Committing changes...'));
    execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
    if (await !isGhInstalled()) {
      console.log(
        chalk.yellow('⚠️  GitHub CLI (gh) is not installed. Skipping remote repository creation.')
      );
    } else {
      console.log(chalk.cyan('🔍 Checking for remote repository...'));
      try {
        execSync('gh repo view', { stdio: 'ignore' });
        console.log(chalk.green('✅ Remote repository found.'));
      } catch (error) {
        console.log(chalk.yellow('⚠️  No remote repository found. Creating...'));
        const makePrivate = await askQuestion(chalk.cyan('Make repository private? (y/n): '));
        const repoType = makePrivate.toLowerCase() === 'y' ? 'private' : 'public';
        execSync(`gh repo create ${projectName} --${repoType} --source=. --push`, {
          stdio: 'inherit',
        });
        console.log(chalk.green(`✅ Created ${repoType} repository: ${projectName} on GitHub`));
      }
    }
    try {
      execSync('git rev-parse --abbrev-ref --symbolic-full-name @{u}', { stdio: 'ignore' });
      console.log(chalk.cyan('⬆️  Pushing changes...'));
      execSync('git push', { stdio: 'inherit' });
    } catch (error) {
      const remoteName = 'origin';
      const branchName = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
      console.log(chalk.cyan(`⬆️  Setting upstream and pushing to ${remoteName}/${branchName}...`));
      execSync(`git push --set-upstream ${remoteName} ${branchName}`, { stdio: 'inherit' });
    }
    console.log(chalk.green('✅ Changes committed and pushed successfully!'));
  } catch (error) {
    console.error(chalk.red('❌ Error during commit and push:'), error);
    process.exit(1);
  } finally {
    rl.close();
  }
}
commitAndPush();
#!/usr/bin/env node
import { execSync } from 'child_process';
import * as readline from 'readline';
import chalk from 'chalk';
import * as fs from 'fs';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const [, , versionArg, commitMessageArg] = process.argv;
async function askQuestion(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}
function checkGitStatus(): boolean {
  try {
    const status = execSync('git status --porcelain').toString();
    return status.length === 0;
  } catch (error) {
    return false;
  }
}
function getCurrentBranch(): string {
  return execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
}
function validatePackageJson(): void {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const requiredFields = ['name', 'version', 'description', 'main', 'types'];
  for (const field of requiredFields) {
    if (!packageJson[field]) {
      throw new Error(`Missing required field in package.json: ${field}`);
    }
  }
}
async function selectVersionType(): Promise<string> {
  if (versionArg && ['patch', 'minor', 'major'].includes(versionArg)) {
    return versionArg;
  }
  console.log(chalk.cyan('\nSelect version increment type:'));
  console.log(chalk.gray('1. patch (1.0.0 -> 1.0.1)'));
  console.log(chalk.gray('2. minor (1.0.0 -> 1.1.0)'));
  console.log(chalk.gray('3. major (1.0.0 -> 2.0.0)'));
  const answer = await askQuestion('Enter your choice (1-3): ');
  const versionMap: { [key: string]: string } = {
    '1': 'patch',
    '2': 'minor',
    '3': 'major',
  };
  return versionMap[answer] || 'patch';
}
async function getCommitMessage(version: string): Promise<string> {
  if (commitMessageArg) {
    return commitMessageArg;
  }
  const defaultMessage = `chore: release v${version}`;
  const message = await askQuestion(
    chalk.cyan(`Enter commit message (default: "${defaultMessage}"): `)
  );
  return message.trim() || defaultMessage;
}
async function publishPackage() {
  try {
    console.log(chalk.cyan('\n🔍 Running pre-publish checks...\n'));
    console.log(chalk.cyan('📋 Validating package.json...'));
    validatePackageJson();
    console.log(chalk.green('✅ package.json is valid'));
    const currentBranch = getCurrentBranch();
    if (currentBranch !== 'main' && currentBranch !== 'master') {
      console.log(chalk.yellow(`⚠️  You're on branch '${currentBranch}'.`));
    }
    console.log(chalk.cyan('\n🧹 Cleaning project...'));
    execSync('bun clean', { stdio: 'inherit' });
    console.log(chalk.cyan('\n📦 Installing dependencies...'));
    execSync('bun install', { stdio: 'inherit' });
    console.log(chalk.cyan('\n🔨 Building project...'));
    execSync('bun run build', { stdio: 'inherit' });
    try {
      console.log(chalk.cyan('\n🧪 Running tests...'));
      execSync('bun test', { stdio: 'inherit' });
      console.log(chalk.green('✅ Tests passed'));
    } catch (error) {
      console.log(chalk.yellow('⚠️  No tests found or tests failed'));
    }
    const versionType = await selectVersionType();
    console.log(chalk.cyan(`\n📝 Incrementing ${versionType} version...`));
    execSync(`npm version ${versionType} --no-git-tag-version`, { stdio: 'inherit' });
    console.log(chalk.cyan('\n🚀 Publishing to npm...'));
    execSync('npm publish', { stdio: 'inherit' });
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const newVersion = packageJson.version;
    const tagName = `v${newVersion}`;
    const commitMessage = await getCommitMessage(newVersion);
    console.log(chalk.cyan('\n📝 Committing changes...'));
    execSync(`bun commit "${commitMessage}"`, { stdio: 'inherit' });
    console.log(chalk.cyan('\n🏷️  Creating and pushing tag...'));
    execSync(`git tag ${tagName}`, { stdio: 'inherit' });
    execSync('git push --tags', { stdio: 'inherit' });
    console.log(chalk.green('\n✨ Package successfully published to npm!'));
    console.log(chalk.gray(`Version: ${newVersion}`));
    console.log(chalk.gray(`Tag: ${tagName}`));
    console.log(chalk.gray(`Commit: ${commitMessage}`));
  } catch (error) {
    console.error(chalk.red('\n❌ Error during publish process:'), error);
    process.exit(1);
  } finally {
    rl.close();
  }
}
publishPackage();
#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';
interface FileSection {
  filePath: string;
  start: number;
  end: number;
  content: string;
  created: boolean;
}
function splitFile(singleFilePath: string, markers: string[], outputDirPath?: string): void {
  if (!fs.existsSync(singleFilePath)) {
    console.error(chalk.red(`Error: File not found: ${singleFilePath}`));
    process.exit(1);
  }
  const fileContent = fs.readFileSync(singleFilePath, 'utf-8');
  const fileSections: FileSection[] = [];
  markers.forEach((marker) => {
    const fileRegex = new RegExp(`\\/\\/ ${marker}(.*?\\.ts)`, 'g');
    let match;
    while ((match = fileRegex.exec(fileContent)) !== null) {
      const filePath = match[1].trim();
      const start = match.index;
      fileSections.push({
        filePath,
        start,
        end: start, // Will be updated later
        content: '',
        created: false,
      });
    }
  });
  fileSections.sort((a, b) => a.start - b.start);
  for (let i = 0; i < fileSections.length; i++) {
    const currentSection = fileSections[i];
    const nextSection = fileSections[i + 1];
    currentSection.end = nextSection ? nextSection.start : fileContent.length;
    const markerLineEnd = fileContent.indexOf('\n', currentSection.start) + 1;
    currentSection.content = fileContent.substring(markerLineEnd, currentSection.end).trim();
  }
  fileSections.forEach((section) => {
    const { filePath, content } = section;
    const fileDir = outputDirPath
      ? path.resolve(outputDirPath, path.dirname(filePath))
      : path.resolve(path.dirname(filePath));
    const fileName = path.basename(filePath);
    const fullFilePath = path.join(fileDir, fileName);
    if (!fs.existsSync(fileDir)) {
      fs.mkdirSync(fileDir, { recursive: true });
    }
    fs.writeFileSync(fullFilePath, content);
    console.log(chalk.green(`Created: ${chalk.bold(fullFilePath)}`));
  });
  if (fileSections.length === 0 && fileContent.length > 0) {
    console.log(chalk.yellow('No marker path found in the file.'));
  }
  if (fileSections.length > 0) {
    console.log(chalk.cyan('\nFiles splitted successfully! ✨\n'));
    const openCommand =
      process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open';
    console.log(chalk.blue(`You can open the files with ${chalk.bold('CTRL+Click')}`));
  }
}
const args = process.argv.slice(2);
if (args.length === 0) {
  console.error(
    chalk.red('Usage: split source=<filePath> markers=<marker1,marker2,...> [outputDir=<path>]')
  );
  console.error(
    chalk.yellow('Example: split source=all-in-one.ts markers=src/,custom/ outputDir=./output')
  );
  process.exit(1);
}
const parsedArgs: { [key: string]: string } = {};
args.forEach((arg) => {
  const [key, value] = arg.split('=');
  if (key && value) {
    parsedArgs[key] = value;
  }
});
if (!parsedArgs.source || !parsedArgs.markers) {
  console.error(chalk.red('Error: source and markers parameters are required'));
  console.error(
    chalk.yellow('Example: split source=all-in-one.ts markers=src/,custom/ outputDir=./output')
  );
  process.exit(1);
}
const singleFilePath = parsedArgs.source;
const markers = parsedArgs.markers.split(',');
const outputDirPath = parsedArgs.outputDir;
splitFile(singleFilePath, markers, outputDirPath);
{
  "extends": "./tsconfig.json",
  "exclude": ["node_modules", "test", "dist", "scripts"],
  "compilerOptions": {
    "sourceMap": true,
    "declaration": true,
    "outDir": "./dist"
  }
}
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "declaration": true,
    "outDir": "./dist",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "rootDir": "./src",
    "typeRoots": ["./node_modules/@types", "./src/types"]
  },
  "include": ["src*.ts", "test*.ts"]
}
#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';
const projectDir = process.cwd();
const exampleScripts = {
    'source': 'generate-source output=documentation.md exclude=dist/,node_modules/,.git/',
    'commit': 'commit',
    'clean': 'clean',
    'split-code': 'split-code source=combined.ts markers=src/,lib/ outputDir=./output',
    'publish-npm': 'publish-npm patch'
};
async function addScriptsToPackageJson() {
    try {
        const packageJsonPath = path.join(projectDir, 'package.json');
        if (!fs.existsSync(packageJsonPath)) {
            console.error(chalk.red('❌ package.json not found in the current directory'));
            process.exit(1);
        }
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        if (!packageJson.scripts) {
            packageJson.scripts = {};
        }
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
#!/usr/bin/env node
import chalk from 'chalk';
const showHelp = () => {
  console.log(`
${chalk.bold.blue('Alvamind Tools')} - CLI utilities for code generation and git automation
${chalk.bold('Usage:')}
  ${chalk.cyan()} ${chalk.green('<command>')} [options]
${chalk.bold('Commands:')}
  ${chalk.green('alvamind')}          Show this
  ${chalk.green('generate-source')}   Generate source code documentation
  ${chalk.green('commit')}            Automate git commits
  ${chalk.green('clean')}             Clean project files
  ${chalk.green('split-code')}        Split code files
  ${chalk.green('publish-npm')}       Publish to npm
  ${chalk.green('add-json-script')}   Add scripts to package.json
${chalk.bold('Examples:')}
${chalk.bold('1. Generate Source Code Documentation:')}
   $ ${chalk.cyan('generate-source')} --include=src/,scripts/ --exclude=tests/ --output=docs.md
   $ ${chalk.cyan('generate-source')} --preserve-blank-lines --preserve-comments
   ${chalk.yellow('Options:')}
   --include=<paths>         Comma-separated list of paths to include
   --exclude=<paths>         Comma-separated list of paths to exclude
   --output=<filename>       Output filename (default: source-code.md)
   --preserve-blank-lines    Preserve blank lines in output
   --preserve-comments       Preserve comments in output
${chalk.bold('2. Commit Changes:')}
   $ ${chalk.cyan('commit')} "feat: add new feature"
   $ ${chalk.cyan('commit')} "fix: resolve bug in login"
   ${chalk.gray('- Automatically initializes git repository if needed')}
   ${chalk.gray('- Creates .gitignore if missing')}
   ${chalk.gray('- Creates GitHub repository if gh CLI is installed')}
   ${chalk.gray('- Commits and pushes changes')}
${chalk.bold('3. Clean Project:')}
   $ ${chalk.cyan('clean')}
   ${chalk.gray('Removes common development artifacts:')}
   ${chalk.gray('- node_modules, dist, build directories')}
   ${chalk.gray('- Lock files (package-lock.json, yarn.lock, etc.)')}
   ${chalk.gray('- Cache directories (.cache, .parcel-cache, etc.)')}
   ${chalk.gray('- Generated directories')}
${chalk.bold('4. Split Code Files:')}
   $ ${chalk.cyan('split-code')} source=combined.ts markers=src/,lib/ outputDir=./output
   ${chalk.yellow('Options:')}
   source=<file>     Source file to split
   markers=<paths>   Comma-separated list of path markers
   outputDir=<path>  Output directory for split files
${chalk.bold('5. Publish to NPM:')}
   $ ${chalk.cyan('publish-npm')} patch "fix: update dependencies"
   $ ${chalk.cyan('publish-npm')} minor "feat: add new feature"
   ${chalk.yellow('Arguments:')}
   First:   Version type (patch|minor|major)
   Second:  Commit message (optional)
${chalk.bold('Options:')}
  --help, -h        Show this help message
  --version, -v     Show version number
${chalk.italic('For more detailed information about a specific command, run:')}
  ${chalk.cyan('alvamind')} ${chalk.green('<command>')} --help
`);
};
const showVersion = () => {
  const packageJson = require('../package.json');
  console.log(chalk.bold(`v${packageJson.version}`));
};
const args = process.argv.slice(2);
if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
  showHelp();
} else if (args.includes('--version') || args.includes('-v')) {
  showVersion();
} else {
  console.log(
    chalk.red(`Unknown command. Run '${chalk.cyan('alvamind --help')}' for usage information.`)
  );
}
export * from './tools/generate-source';
export * from './tools/commit';
export * from './tools/clean';
export * from './tools/split-files';
export * from './tools/npm-publish';
export * from './add-json-script';
import { describe, test, expect, beforeAll, afterAll, beforeEach, afterEach } from 'bun:test';
import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
const testDir = path.join(__dirname, 'test-temp');
const sourceFile = path.join(testDir, 'source-code.md');
async function runGenerateSource(args: string = ''): Promise<string> { // make async and return Promise<string>
  try {
    const projectRoot = path.join(__dirname, '..', '..'); // Adjust based on your actual project structure
    const scriptPath = path.join(projectRoot, 'src', 'tools', 'generate-source.ts');
    const command = `bun ${scriptPath} ${args}`; // Use absolute path
    return execSync(command, { encoding: 'utf-8', cwd: projectRoot }); // Set cwd
  } catch (error: any) {
    console.error('Error executing command:', error.stdout || error);
    throw new Error(`Failed to execute generate-source: ${error.message || error.stdout || error}`);
  }
}
function createTempFile(filePath: string, content: string): void {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  fs.writeFileSync(filePath, content)
}
beforeAll(() => {
  fs.mkdirSync(testDir, { recursive: true })
  createTempFile(path.join(testDir, 'test.ts'), '// Test file\n const a = 1;');
  createTempFile(path.join(testDir, 'test2.ts'), ' \n const b = 2;');
  createTempFile(path.join(testDir, 'src', 'nested.ts'), 'const c = 3;\n\n// This is nested');
  createTempFile(path.join(testDir, 'src', 'nested2.ts'), 'const d = 4; \n // Second nested')
});
afterAll(() => {
  if (fs.existsSync(testDir)) {
    fs.rmSync(testDir, { recursive: true, force: true });
  }
});
beforeEach(() => {
  if (fs.existsSync(sourceFile)) {
    fs.rmSync(sourceFile);
  }
});
afterEach(() => {
  if (fs.existsSync(sourceFile)) {
    fs.rmSync(sourceFile);
  }
});
describe('generate-source.ts Parameter Testing', () => {
  test('should generate source code documentation with default options', async () => { // async test
    await runGenerateSource(); // await here
    expect(fs.existsSync(sourceFile)).toBe(true);
    const content = fs.readFileSync(sourceFile, 'utf-8');
    expect(content).toContain('// test.ts');
    expect(content).toContain('// test2.ts');
    expect(content).toContain('// src/nested.ts');
    expect(content).toContain('// src/nested2.ts');
  });
  describe('--include parameter', () => {
    test('should include a single file', async () => { // async test
      await runGenerateSource('--include=test.ts'); // await here
      expect(fs.existsSync(sourceFile)).toBe(true);
      const content = fs.readFileSync(sourceFile, 'utf-8');
      expect(content).toContain('// test.ts');
      expect(content).not.toContain('// test2.ts');
      expect(content).not.toContain('// src/nested.ts');
      expect(content).not.toContain('// src/nested2.ts');
    });
    test('should include multiple files', async () => { // async test
      await runGenerateSource('--include=test.ts,test2.ts'); // await here
      expect(fs.existsSync(sourceFile)).toBe(true);
      const content = fs.readFileSync(sourceFile, 'utf-8');
      expect(content).toContain('// test.ts');
      expect(content).toContain('// test2.ts');
      expect(content).not.toContain('// src/nested.ts');
      expect(content).not.toContain('// src/nested2.ts');
    });
    test('should include a nested file', async () => { // async test
      await runGenerateSource('--include=src/nested.ts'); // await here
      expect(fs.existsSync(sourceFile)).toBe(true);
      const content = fs.readFileSync(sourceFile, 'utf-8');
      expect(content).toContain('// src/nested.ts');
      expect(content).not.toContain('// test.ts');
      expect(content).not.toContain('// test2.ts');
      expect(content).not.toContain('// src/nested2.ts');
    });
    test('should include multiple nested files', async () => { // async test
      await runGenerateSource('--include=src/nested.ts,src/nested2.ts'); // await here
      expect(fs.existsSync(sourceFile)).toBe(true);
      const content = fs.readFileSync(sourceFile, 'utf-8');
      expect(content).toContain('// src/nested.ts');
      expect(content).toContain('// src/nested2.ts');
      expect(content).not.toContain('// test.ts');
      expect(content).not.toContain('// test2.ts');
    });
    test('should handle glob patterns', async () => { // async test
      await runGenerateSource('--include=src');
      expect(content).toContain('// Test file');
      expect(content).toContain('// This is nested');
      expect(content).toContain('// Second nested');
    });
  });
  test('should handle missing files gracefully', async () => { // async test
    const result = await runGenerateSource('--include=nonexistent.ts'); // await here
    expect(result).toContain("Found 0 files");
  });
  test('should handle no files gracefully', async () => { // async test
    await runGenerateSource('--exclude=**node_modulesdist.gitgenerate-source.ts
- **/.zed-settings.json
- **/.vscode/settings.json
- **/package-lock.json
- **/bun.lockb
- **/build*'); // await here
    expect(fs.existsSync(sourceFile)).toBe(true);
    const content = fs.readFileSync(sourceFile, 'utf-8');
    expect(content).not.toContain('// test.ts');
    expect(content).not.toContain('// src/nested.ts');
    expect(content).not.toContain('// test2.ts');
    expect(content).not.toContain('// src/nested2.ts');
  });
  test('should show help with no args', async () => { // async test
    const result = await runGenerateSource(); // await here
    expect(result).toContain("Usage:");
  });
  test('should show help with --help arg', async () => { // async test
    const result = await runGenerateSource('--help'); // await here
    expect(result).toContain("Usage:");
  });
  test('should return error with invalid arg', async () => { // async test
    try {
      await runGenerateSource('--invalid=arg'); // await here
    } catch (e: any) {
      expect(e.message).toContain("Args error:");
    }
  });
});
const c = 3;
const d = 4; 
 const a = 1;
 const b = 2;
#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import chalk from 'chalk';
const projectDir = process.cwd();
async function cleanProject() {
  const chalk = (await import('chalk')).default;
  const foldersToDelete = [
    '.bun',
    '.turbo',
    '.eslintcache',
    '.parcel-cache',
    'node_modules',
    '.next',
    '.cache',
    'dist',
    'build',
    'coverage',
    '.vite',
  ];
  const filesToDelete = [
    'bun.lockb',
    'yarn.lock',
    'package-lock.json',
    'pnpm-lock.yaml',
    '.DS_Store',
  ];
  let deletedCount = 0;
  try {
    for (const folder of foldersToDelete) {
      const fullPath = path.join(projectDir, folder);
      if (fs.existsSync(fullPath)) {
        fs.rmSync(fullPath, { recursive: true, force: true });
        console.log(`${chalk.green('✓')} Deleted folder: ${chalk.cyan(folder)}`);
        deletedCount++;
      }
    }
    for (const file of filesToDelete) {
      const fullPath = path.join(projectDir, file);
      if (fs.existsSync(fullPath)) {
        fs.rmSync(fullPath, { force: true });
        console.log(`${chalk.green('✓')} Deleted file: ${chalk.cyan(file)}`);
        deletedCount++;
      }
    }
    const generatedDirs = await findGeneratedDirs('.');
    for (const dir of generatedDirs) {
      const fullPath = path.join(projectDir, dir);
      if (fs.existsSync(fullPath)) {
        fs.rmSync(fullPath, { recursive: true, force: true });
        console.log(`${chalk.green('✓')} Deleted generated dir: ${chalk.cyan(dir)}`);
        deletedCount++;
      }
    }
    console.log(chalk.green(`\n✨ Cleaning completed! ${deletedCount} items deleted`));
  } catch (error) {
    console.error(chalk.red('Error during cleaning:'), error);
    process.exit(1);
  }
}
async function findGeneratedDirs(dir: string): Promise<string[]> {
  const entries = fs.readdirSync(path.join(projectDir, dir), { withFileTypes: true });
  let generatedDirs: string[] = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'generated') {
        generatedDirs.push(fullPath);
      }
      generatedDirs = [...generatedDirs, ...(await findGeneratedDirs(fullPath))];
    }
  }
  return generatedDirs;
}
cleanProject().catch((error) => {
  console.error(chalk.red('Fatal Error:'), error);
  process.exit(1);
});
#!/usr/bin/env node
import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';
import chalk from 'chalk';
const defaultGitignore = `# Dependencies
/node_modules
/.pnp
.pnp.js
# Testing
/coverage
# Production
/build
/dist
# Misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local
# Debug logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
# IDE
.idea/
.vscode/
*.swp
*.swo
# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db
# Optional npm cache directory
.npm
# Optional eslint cache
.eslintcache
# Optional REPL history
.node_repl_history
# Output of 'npm pack'
*.tgz
# Yarn Integrity file
.yarn-integrity`;
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const projectDir = process.cwd();
const projectName = path.basename(projectDir);
const args = process.argv.slice(2);
const commitMessage = args.join(' ');
async function askQuestion(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}
async function isGhInstalled(): Promise<boolean> {
  try {
    execSync('gh --version', { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
}
function createGitignore() {
  const gitignorePath = path.join(projectDir, '.gitignore');
  if (!fs.existsSync(gitignorePath)) {
    console.log(chalk.yellow('ℹ️  Creating default .gitignore file...'));
    fs.writeFileSync(gitignorePath, defaultGitignore);
    console.log(chalk.green('✅ Created .gitignore file'));
  }
}
async function commitAndPush() {
  if (!commitMessage) {
    console.error(chalk.red('❌ Commit message is required.'));
    process.exit(1);
  }
  try {
    console.log(chalk.cyan('🚀 Starting commit process...'));
    process.chdir(projectDir);
    console.log(chalk.gray(`📂 Working in: ${projectDir}`));
    const isNewRepo = !fs.existsSync(path.join(projectDir, '.git'));
    if (isNewRepo) {
      console.log(chalk.yellow('⚠️  No git repository found. Initializing...'));
      execSync('git init', { stdio: 'inherit' });
      console.log(chalk.green('✅ Git repository initialized.'));
      createGitignore();
    }
    createGitignore();
    const status = execSync('git status --porcelain').toString();
    if (!status) {
      console.log(chalk.yellow('ℹ️  No changes to commit.'));
      process.exit(0);
    }
    console.log(chalk.cyan('📝 Staging all changes...'));
    execSync('git add .', { stdio: 'inherit' });
    console.log(chalk.cyan('💾 Committing changes...'));
    execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
    if (await !isGhInstalled()) {
      console.log(
        chalk.yellow('⚠️  GitHub CLI (gh) is not installed. Skipping remote repository creation.')
      );
    } else {
      console.log(chalk.cyan('🔍 Checking for remote repository...'));
      try {
        execSync('gh repo view', { stdio: 'ignore' });
        console.log(chalk.green('✅ Remote repository found.'));
      } catch (error) {
        console.log(chalk.yellow('⚠️  No remote repository found. Creating...'));
        const makePrivate = await askQuestion(chalk.cyan('Make repository private? (y/n): '));
        const repoType = makePrivate.toLowerCase() === 'y' ? 'private' : 'public';
        execSync(`gh repo create ${projectName} --${repoType} --source=. --push`, {
          stdio: 'inherit',
        });
        console.log(chalk.green(`✅ Created ${repoType} repository: ${projectName} on GitHub`));
      }
    }
    try {
      execSync('git rev-parse --abbrev-ref --symbolic-full-name @{u}', { stdio: 'ignore' });
      console.log(chalk.cyan('⬆️  Pushing changes...'));
      execSync('git push', { stdio: 'inherit' });
    } catch (error) {
      const remoteName = 'origin';
      const branchName = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
      console.log(chalk.cyan(`⬆️  Setting upstream and pushing to ${remoteName}/${branchName}...`));
      execSync(`git push --set-upstream ${remoteName} ${branchName}`, { stdio: 'inherit' });
    }
    console.log(chalk.green('✅ Changes committed and pushed successfully!'));
  } catch (error) {
    console.error(chalk.red('❌ Error during commit and push:'), error);
    process.exit(1);
  } finally {
    rl.close();
  }
}
commitAndPush();
#!/usr/bin/env node
import { execSync } from 'child_process';
import * as readline from 'readline';
import chalk from 'chalk';
import * as fs from 'fs';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const [, , versionArg, commitMessageArg] = process.argv;
async function askQuestion(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}
function checkGitStatus(): boolean {
  try {
    const status = execSync('git status --porcelain').toString();
    return status.length === 0;
  } catch (error) {
    return false;
  }
}
function getCurrentBranch(): string {
  return execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
}
function validatePackageJson(): void {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const requiredFields = ['name', 'version', 'description', 'main', 'types'];
  for (const field of requiredFields) {
    if (!packageJson[field]) {
      throw new Error(`Missing required field in package.json: ${field}`);
    }
  }
}
async function selectVersionType(): Promise<string> {
  if (versionArg && ['patch', 'minor', 'major'].includes(versionArg)) {
    return versionArg;
  }
  console.log(chalk.cyan('\nSelect version increment type:'));
  console.log(chalk.gray('1. patch (1.0.0 -> 1.0.1)'));
  console.log(chalk.gray('2. minor (1.0.0 -> 1.1.0)'));
  console.log(chalk.gray('3. major (1.0.0 -> 2.0.0)'));
  const answer = await askQuestion('Enter your choice (1-3): ');
  const versionMap: { [key: string]: string } = {
    '1': 'patch',
    '2': 'minor',
    '3': 'major',
  };
  return versionMap[answer] || 'patch';
}
async function getCommitMessage(): Promise<string> {
  if (commitMessageArg) {
    return commitMessageArg;
  }
  const message = await askQuestion(chalk.cyan('Enter commit message: '));
  if (!message.trim()) {
    throw new Error('Commit message is required');
  }
  return message;
}
async function publishPackage() {
  try {
    console.log(chalk.cyan('\n🔍 Running pre-publish checks...\n'));
    console.log(chalk.cyan('📋 Validating package.json...'));
    validatePackageJson();
    console.log(chalk.green('✅ package.json is valid'));
    const currentBranch = getCurrentBranch();
    if (currentBranch !== 'main' && currentBranch !== 'master') {
      console.log(chalk.yellow(`⚠️  You're on branch '${currentBranch}'.`));
    }
    if (!checkGitStatus()) {
      console.log(chalk.yellow('⚠️  You have uncommitted changes'));
      const commitMessage = await getCommitMessage();
      execSync(`bun commit "${commitMessage}"`, { stdio: 'inherit' });
    }
    console.log(chalk.cyan('\n🧹 Cleaning project...'));
    execSync('bun clean', { stdio: 'inherit' });
    console.log(chalk.cyan('\n📦 Installing dependencies...'));
    execSync('bun install', { stdio: 'inherit' });
    console.log(chalk.cyan('\n🔨 Building project...'));
    execSync('bun run build', { stdio: 'inherit' });
    try {
      console.log(chalk.cyan('\n🧪 Running tests...'));
      execSync('bun test', { stdio: 'inherit' });
      console.log(chalk.green('✅ Tests passed'));
    } catch (error) {
      console.log(chalk.yellow('⚠️  No tests found or tests failed'));
    }
    const versionType = await selectVersionType();
    console.log(chalk.cyan(`\n📝 Incrementing ${versionType} version...`));
    execSync(`npm version ${versionType} --no-git-tag-version`, { stdio: 'inherit' });
    console.log(chalk.cyan('\n🚀 Publishing to npm...'));
    execSync('npm publish', { stdio: 'inherit' });
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const tagName = `v${packageJson.version}`;
    execSync(`git tag ${tagName}`, { stdio: 'inherit' });
    execSync('git push && git push --tags', { stdio: 'inherit' });
    console.log(chalk.green('\n✨ Package successfully published to npm!'));
    console.log(chalk.gray(`Version: ${packageJson.version}`));
    console.log(chalk.gray(`Tag: ${tagName}`));
  } catch (error) {
    console.error(chalk.red('\n❌ Error during publish process:'), error);
    process.exit(1);
  } finally {
    rl.close();
  }
}
publishPackage();
#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';
interface FileSection {
  filePath: string;
  start: number;
  end: number;
  content: string;
  created: boolean;
}
function splitFile(singleFilePath: string, markers: string[], outputDirPath?: string): void {
  if (!fs.existsSync(singleFilePath)) {
    console.error(chalk.red(`Error: File not found: ${singleFilePath}`));
    process.exit(1);
  }
  const fileContent = fs.readFileSync(singleFilePath, 'utf-8');
  const fileSections: FileSection[] = [];
  markers.forEach((marker) => {
    const fileRegex = new RegExp(`\\/\\/ ${marker}(.*?\\.ts)`, 'g');
    let match;
    while ((match = fileRegex.exec(fileContent)) !== null) {
      const filePath = match[1].trim();
      const start = match.index;
      fileSections.push({
        filePath,
        start,
        end: start, // Will be updated later
        content: '',
        created: false,
      });
    }
  });
  fileSections.sort((a, b) => a.start - b.start);
  for (let i = 0; i < fileSections.length; i++) {
    const currentSection = fileSections[i];
    const nextSection = fileSections[i + 1];
    currentSection.end = nextSection ? nextSection.start : fileContent.length;
    const markerLineEnd = fileContent.indexOf('\n', currentSection.start) + 1;
    currentSection.content = fileContent.substring(markerLineEnd, currentSection.end).trim();
  }
  fileSections.forEach((section) => {
    const { filePath, content } = section;
    const fileDir = outputDirPath
      ? path.resolve(outputDirPath, path.dirname(filePath))
      : path.resolve(path.dirname(filePath));
    const fileName = path.basename(filePath);
    const fullFilePath = path.join(fileDir, fileName);
    if (!fs.existsSync(fileDir)) {
      fs.mkdirSync(fileDir, { recursive: true });
    }
    fs.writeFileSync(fullFilePath, content);
    console.log(chalk.green(`Created: ${chalk.bold(fullFilePath)}`));
  });
  if (fileSections.length === 0 && fileContent.length > 0) {
    console.log(chalk.yellow('No marker path found in the file.'));
  }
  if (fileSections.length > 0) {
    console.log(chalk.cyan('\nFiles splitted successfully! ✨\n'));
    const openCommand =
      process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open';
    console.log(chalk.blue(`You can open the files with ${chalk.bold('CTRL+Click')}`));
  }
}
const args = process.argv.slice(2);
if (args.length === 0) {
  console.error(
    chalk.red('Usage: split source=<filePath> markers=<marker1,marker2,...> [outputDir=<path>]')
  );
  console.error(
    chalk.yellow('Example: split source=all-in-one.ts markers=src/,custom/ outputDir=./output')
  );
  process.exit(1);
}
const parsedArgs: { [key: string]: string } = {};
args.forEach((arg) => {
  const [key, value] = arg.split('=');
  if (key && value) {
    parsedArgs[key] = value;
  }
});
if (!parsedArgs.source || !parsedArgs.markers) {
  console.error(chalk.red('Error: source and markers parameters are required'));
  console.error(
    chalk.yellow('Example: split source=all-in-one.ts markers=src/,custom/ outputDir=./output')
  );
  process.exit(1);
}
const singleFilePath = parsedArgs.source;
const markers = parsedArgs.markers.split(',');
const outputDirPath = parsedArgs.outputDir;
splitFile(singleFilePath, markers, outputDirPath);
{
  "extends": "./tsconfig.json",
  "exclude": ["node_modules", "test", "dist", "scripts"],
  "compilerOptions": {
    "sourceMap": true,
    "declaration": true,
    "outDir": "./dist"
  }
}
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "declaration": true,
    "outDir": "./dist",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "rootDir": "./src",
    "typeRoots": ["./node_modules/@types", "./src/types"]
  },
  "include": ["src*.ts", "test*.ts"]
}
{
  "name": "alvamind-tools",
  "version": "1.0.22",
  "description": "CLI tools for generating source code documentation and git automation",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/alvamind/alvamind-tools.git"
  },
  "bin": {
    "alvamind": "./dist/cli.js",
    "generate-source": "./dist/tools/generate-source.js",
    "commit": "./dist/tools/commit.js",
    "clean": "./dist/tools/clean.js",
    "split-code": "./dist/tools/split-files.js",
    "publish-npm": "./dist/tools/npm-publish.js",
    "add-json-script": "./dist/add-json-script.js"
  },
  "scripts": {
    "alvamind": "bun src/cli.ts",
    "commit": "bun src/tools/commit.ts commit",
    "source": "bun src/tools/generate-source.ts --exclude=src/tests --output=docs.md",
    "split-code": "bun src/tools/split-files.ts source=all-in-one.ts markers=src/,custom/ outputDir=./output",
    "build": "tsc && tsc -p tsconfig.build.json && chmod +x dist/cli.js dist/tools*'); // await here
    expect(fs.existsSync(sourceFile)).toBe(true);
    const content = fs.readFileSync(sourceFile, 'utf-8');
    expect(content).not.toContain('// test.ts');
    expect(content).not.toContain('// src/nested.ts');
    expect(content).not.toContain('// test2.ts');
    expect(content).not.toContain('// src/nested2.ts');
  });
  test('should show help with no args', async () => { // async test
    const result = await runGenerateSource(); // await here
    expect(result).toContain("Usage:");
  });
  test('should show help with --help arg', async () => { // async test
    const result = await runGenerateSource('--help'); // await here
    expect(result).toContain("Usage:");
  });
  test('should return error with invalid arg', async () => { // async test
    try {
      await runGenerateSource('--invalid=arg'); // await here
    } catch (e: any) {
      expect(e.message).toContain("Args error:");
    }
  });
});
#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import chalk from 'chalk';
const projectDir = process.cwd();
async function cleanProject() {
  const chalk = (await import('chalk')).default;
  const foldersToDelete = [
    '.bun',
    '.turbo',
    '.eslintcache',
    '.parcel-cache',
    'node_modules',
    '.next',
    '.cache',
    'dist',
    'build',
    'coverage',
    '.vite',
  ];
  const filesToDelete = [
    'bun.lockb',
    'yarn.lock',
    'package-lock.json',
    'pnpm-lock.yaml',
    '.DS_Store',
  ];
  let deletedCount = 0;
  try {
    for (const folder of foldersToDelete) {
      const fullPath = path.join(projectDir, folder);
      if (fs.existsSync(fullPath)) {
        fs.rmSync(fullPath, { recursive: true, force: true });
        console.log(`${chalk.green('✓')} Deleted folder: ${chalk.cyan(folder)}`);
        deletedCount++;
      }
    }
    for (const file of filesToDelete) {
      const fullPath = path.join(projectDir, file);
      if (fs.existsSync(fullPath)) {
        fs.rmSync(fullPath, { force: true });
        console.log(`${chalk.green('✓')} Deleted file: ${chalk.cyan(file)}`);
        deletedCount++;
      }
    }
    const generatedDirs = await findGeneratedDirs('.');
    for (const dir of generatedDirs) {
      const fullPath = path.join(projectDir, dir);
      if (fs.existsSync(fullPath)) {
        fs.rmSync(fullPath, { recursive: true, force: true });
        console.log(`${chalk.green('✓')} Deleted generated dir: ${chalk.cyan(dir)}`);
        deletedCount++;
      }
    }
    console.log(chalk.green(`\n✨ Cleaning completed! ${deletedCount} items deleted`));
  } catch (error) {
    console.error(chalk.red('Error during cleaning:'), error);
    process.exit(1);
  }
}
async function findGeneratedDirs(dir: string): Promise<string[]> {
  const entries = fs.readdirSync(path.join(projectDir, dir), { withFileTypes: true });
  let generatedDirs: string[] = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'generated') {
        generatedDirs.push(fullPath);
      }
      generatedDirs = [...generatedDirs, ...(await findGeneratedDirs(fullPath))];
    }
  }
  return generatedDirs;
}
cleanProject().catch((error) => {
  console.error(chalk.red('Fatal Error:'), error);
  process.exit(1);
});
#!/usr/bin/env node
import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';
import chalk from 'chalk';
const defaultGitignore = `# Dependencies
/node_modules
/.pnp
.pnp.js
# Testing
/coverage
# Production
/build
/dist
# Misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local
# Debug logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
# IDE
.idea/
.vscode/
*.swp
*.swo
# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db
# Optional npm cache directory
.npm
# Optional eslint cache
.eslintcache
# Optional REPL history
.node_repl_history
# Output of 'npm pack'
*.tgz
# Yarn Integrity file
.yarn-integrity`;
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const projectDir = process.cwd();
const projectName = path.basename(projectDir);
const args = process.argv.slice(2);
const commitMessage = args.join(' ');
async function askQuestion(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}
async function isGhInstalled(): Promise<boolean> {
  try {
    execSync('gh --version', { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
}
function createGitignore() {
  const gitignorePath = path.join(projectDir, '.gitignore');
  if (!fs.existsSync(gitignorePath)) {
    console.log(chalk.yellow('ℹ️  Creating default .gitignore file...'));
    fs.writeFileSync(gitignorePath, defaultGitignore);
    console.log(chalk.green('✅ Created .gitignore file'));
  }
}
async function commitAndPush() {
  if (!commitMessage) {
    console.error(chalk.red('❌ Commit message is required.'));
    process.exit(1);
  }
  try {
    console.log(chalk.cyan('🚀 Starting commit process...'));
    process.chdir(projectDir);
    console.log(chalk.gray(`📂 Working in: ${projectDir}`));
    const isNewRepo = !fs.existsSync(path.join(projectDir, '.git'));
    if (isNewRepo) {
      console.log(chalk.yellow('⚠️  No git repository found. Initializing...'));
      execSync('git init', { stdio: 'inherit' });
      console.log(chalk.green('✅ Git repository initialized.'));
      createGitignore();
    }
    createGitignore();
    const status = execSync('git status --porcelain').toString();
    if (!status) {
      console.log(chalk.yellow('ℹ️  No changes to commit.'));
      process.exit(0);
    }
    console.log(chalk.cyan('📝 Staging all changes...'));
    execSync('git add .', { stdio: 'inherit' });
    console.log(chalk.cyan('💾 Committing changes...'));
    execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
    if (await !isGhInstalled()) {
      console.log(
        chalk.yellow('⚠️  GitHub CLI (gh) is not installed. Skipping remote repository creation.')
      );
    } else {
      console.log(chalk.cyan('🔍 Checking for remote repository...'));
      try {
        execSync('gh repo view', { stdio: 'ignore' });
        console.log(chalk.green('✅ Remote repository found.'));
      } catch (error) {
        console.log(chalk.yellow('⚠️  No remote repository found. Creating...'));
        const makePrivate = await askQuestion(chalk.cyan('Make repository private? (y/n): '));
        const repoType = makePrivate.toLowerCase() === 'y' ? 'private' : 'public';
        execSync(`gh repo create ${projectName} --${repoType} --source=. --push`, {
          stdio: 'inherit',
        });
        console.log(chalk.green(`✅ Created ${repoType} repository: ${projectName} on GitHub`));
      }
    }
    try {
      execSync('git rev-parse --abbrev-ref --symbolic-full-name @{u}', { stdio: 'ignore' });
      console.log(chalk.cyan('⬆️  Pushing changes...'));
      execSync('git push', { stdio: 'inherit' });
    } catch (error) {
      const remoteName = 'origin';
      const branchName = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
      console.log(chalk.cyan(`⬆️  Setting upstream and pushing to ${remoteName}/${branchName}...`));
      execSync(`git push --set-upstream ${remoteName} ${branchName}`, { stdio: 'inherit' });
    }
    console.log(chalk.green('✅ Changes committed and pushed successfully!'));
  } catch (error) {
    console.error(chalk.red('❌ Error during commit and push:'), error);
    process.exit(1);
  } finally {
    rl.close();
  }
}
commitAndPush();
#!/usr/bin/env node
import { execSync } from 'child_process';
import * as readline from 'readline';
import chalk from 'chalk';
import * as fs from 'fs';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const [, , versionArg, commitMessageArg] = process.argv;
async function askQuestion(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}
function checkGitStatus(): boolean {
  try {
    const status = execSync('git status --porcelain').toString();
    return status.length === 0;
  } catch (error) {
    return false;
  }
}
function getCurrentBranch(): string {
  return execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
}
function validatePackageJson(): void {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const requiredFields = ['name', 'version', 'description', 'main', 'types'];
  for (const field of requiredFields) {
    if (!packageJson[field]) {
      throw new Error(`Missing required field in package.json: ${field}`);
    }
  }
}
async function selectVersionType(): Promise<string> {
  if (versionArg && ['patch', 'minor', 'major'].includes(versionArg)) {
    return versionArg;
  }
  console.log(chalk.cyan('\nSelect version increment type:'));
  console.log(chalk.gray('1. patch (1.0.0 -> 1.0.1)'));
  console.log(chalk.gray('2. minor (1.0.0 -> 1.1.0)'));
  console.log(chalk.gray('3. major (1.0.0 -> 2.0.0)'));
  const answer = await askQuestion('Enter your choice (1-3): ');
  const versionMap: { [key: string]: string } = {
    '1': 'patch',
    '2': 'minor',
    '3': 'major',
  };
  return versionMap[answer] || 'patch';
}
async function getCommitMessage(version: string): Promise<string> {
  if (commitMessageArg) {
    return commitMessageArg;
  }
  const defaultMessage = `chore: release v${version}`;
  const message = await askQuestion(
    chalk.cyan(`Enter commit message (default: "${defaultMessage}"): `)
  );
  return message.trim() || defaultMessage;
}
async function publishPackage() {
  try {
    console.log(chalk.cyan('\n🔍 Running pre-publish checks...\n'));
    console.log(chalk.cyan('📋 Validating package.json...'));
    validatePackageJson();
    console.log(chalk.green('✅ package.json is valid'));
    const currentBranch = getCurrentBranch();
    if (currentBranch !== 'main' && currentBranch !== 'master') {
      console.log(chalk.yellow(`⚠️  You're on branch '${currentBranch}'.`));
    }
    console.log(chalk.cyan('\n🧹 Cleaning project...'));
    execSync('bun clean', { stdio: 'inherit' });
    console.log(chalk.cyan('\n📦 Installing dependencies...'));
    execSync('bun install', { stdio: 'inherit' });
    console.log(chalk.cyan('\n🔨 Building project...'));
    execSync('bun run build', { stdio: 'inherit' });
    try {
      console.log(chalk.cyan('\n🧪 Running tests...'));
      execSync('bun test', { stdio: 'inherit' });
      console.log(chalk.green('✅ Tests passed'));
    } catch (error) {
      console.log(chalk.yellow('⚠️  No tests found or tests failed'));
    }
    const versionType = await selectVersionType();
    console.log(chalk.cyan(`\n📝 Incrementing ${versionType} version...`));
    execSync(`npm version ${versionType} --no-git-tag-version`, { stdio: 'inherit' });
    console.log(chalk.cyan('\n🚀 Publishing to npm...'));
    execSync('npm publish', { stdio: 'inherit' });
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const newVersion = packageJson.version;
    const tagName = `v${newVersion}`;
    const commitMessage = await getCommitMessage(newVersion);
    console.log(chalk.cyan('\n📝 Committing changes...'));
    execSync(`bun commit "${commitMessage}"`, { stdio: 'inherit' });
    console.log(chalk.cyan('\n🏷️  Creating and pushing tag...'));
    execSync(`git tag ${tagName}`, { stdio: 'inherit' });
    execSync('git push --tags', { stdio: 'inherit' });
    console.log(chalk.green('\n✨ Package successfully published to npm!'));
    console.log(chalk.gray(`Version: ${newVersion}`));
    console.log(chalk.gray(`Tag: ${tagName}`));
    console.log(chalk.gray(`Commit: ${commitMessage}`));
  } catch (error) {
    console.error(chalk.red('\n❌ Error during publish process:'), error);
    process.exit(1);
  } finally {
    rl.close();
  }
}
publishPackage();
#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';
interface FileSection {
  filePath: string;
  start: number;
  end: number;
  content: string;
  created: boolean;
}
function splitFile(singleFilePath: string, markers: string[], outputDirPath?: string): void {
  if (!fs.existsSync(singleFilePath)) {
    console.error(chalk.red(`Error: File not found: ${singleFilePath}`));
    process.exit(1);
  }
  const fileContent = fs.readFileSync(singleFilePath, 'utf-8');
  const fileSections: FileSection[] = [];
  markers.forEach((marker) => {
    const fileRegex = new RegExp(`\\/\\/ ${marker}(.*?\\.ts)`, 'g');
    let match;
    while ((match = fileRegex.exec(fileContent)) !== null) {
      const filePath = match[1].trim();
      const start = match.index;
      fileSections.push({
        filePath,
        start,
        end: start, // Will be updated later
        content: '',
        created: false,
      });
    }
  });
  fileSections.sort((a, b) => a.start - b.start);
  for (let i = 0; i < fileSections.length; i++) {
    const currentSection = fileSections[i];
    const nextSection = fileSections[i + 1];
    currentSection.end = nextSection ? nextSection.start : fileContent.length;
    const markerLineEnd = fileContent.indexOf('\n', currentSection.start) + 1;
    currentSection.content = fileContent.substring(markerLineEnd, currentSection.end).trim();
  }
  fileSections.forEach((section) => {
    const { filePath, content } = section;
    const fileDir = outputDirPath
      ? path.resolve(outputDirPath, path.dirname(filePath))
      : path.resolve(path.dirname(filePath));
    const fileName = path.basename(filePath);
    const fullFilePath = path.join(fileDir, fileName);
    if (!fs.existsSync(fileDir)) {
      fs.mkdirSync(fileDir, { recursive: true });
    }
    fs.writeFileSync(fullFilePath, content);
    console.log(chalk.green(`Created: ${chalk.bold(fullFilePath)}`));
  });
  if (fileSections.length === 0 && fileContent.length > 0) {
    console.log(chalk.yellow('No marker path found in the file.'));
  }
  if (fileSections.length > 0) {
    console.log(chalk.cyan('\nFiles splitted successfully! ✨\n'));
    const openCommand =
      process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open';
    console.log(chalk.blue(`You can open the files with ${chalk.bold('CTRL+Click')}`));
  }
}
const args = process.argv.slice(2);
if (args.length === 0) {
  console.error(
    chalk.red('Usage: split source=<filePath> markers=<marker1,marker2,...> [outputDir=<path>]')
  );
  console.error(
    chalk.yellow('Example: split source=all-in-one.ts markers=src/,custom/ outputDir=./output')
  );
  process.exit(1);
}
const parsedArgs: { [key: string]: string } = {};
args.forEach((arg) => {
  const [key, value] = arg.split('=');
  if (key && value) {
    parsedArgs[key] = value;
  }
});
if (!parsedArgs.source || !parsedArgs.markers) {
  console.error(chalk.red('Error: source and markers parameters are required'));
  console.error(
    chalk.yellow('Example: split source=all-in-one.ts markers=src/,custom/ outputDir=./output')
  );
  process.exit(1);
}
const singleFilePath = parsedArgs.source;
const markers = parsedArgs.markers.split(',');
const outputDirPath = parsedArgs.outputDir;
splitFile(singleFilePath, markers, outputDirPath);
{
  "extends": "./tsconfig.json",
  "exclude": ["node_modules", "test", "dist", "scripts"],
  "compilerOptions": {
    "sourceMap": true,
    "declaration": true,
    "outDir": "./dist"
  }
}
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "declaration": true,
    "outDir": "./dist",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "rootDir": "./src",
    "typeRoots": ["./node_modules/@types", "./src/types"]
  },
  "include": ["src*.ts", "test*.ts"]
}
#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';
const projectDir = process.cwd();
const exampleScripts = {
    'source': 'generate-source output=documentation.md exclude=dist/,node_modules/,.git/',
    'commit': 'commit',
    'clean': 'clean',
    'split-code': 'split-code source=combined.ts markers=src/,lib/ outputDir=./output',
    'publish-npm': 'publish-npm patch'
};
async function addScriptsToPackageJson() {
    try {
        const packageJsonPath = path.join(projectDir, 'package.json');
        if (!fs.existsSync(packageJsonPath)) {
            console.error(chalk.red('❌ package.json not found in the current directory'));
            process.exit(1);
        }
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        if (!packageJson.scripts) {
            packageJson.scripts = {};
        }
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
#!/usr/bin/env node
import chalk from 'chalk';
const showHelp = () => {
  console.log(`
${chalk.bold.blue('Alvamind Tools')} - CLI utilities for code generation and git automation
${chalk.bold('Usage:')}
  ${chalk.cyan()} ${chalk.green('<command>')} [options]
${chalk.bold('Commands:')}
  ${chalk.green('alvamind')}          Show this
  ${chalk.green('generate-source')}   Generate source code documentation
  ${chalk.green('commit')}            Automate git commits
  ${chalk.green('clean')}             Clean project files
  ${chalk.green('split-code')}        Split code files
  ${chalk.green('publish-npm')}       Publish to npm
  ${chalk.green('add-json-script')}   Add scripts to package.json
${chalk.bold('Examples:')}
${chalk.bold('1. Generate Source Code Documentation:')}
   $ ${chalk.cyan('generate-source')} --include=src/,scripts/ --exclude=tests/ --output=docs.md
   $ ${chalk.cyan('generate-source')} --preserve-blank-lines --preserve-comments
   ${chalk.yellow('Options:')}
   --include=<paths>         Comma-separated list of paths to include
   --exclude=<paths>         Comma-separated list of paths to exclude
   --output=<filename>       Output filename (default: source-code.md)
   --preserve-blank-lines    Preserve blank lines in output
   --preserve-comments       Preserve comments in output
${chalk.bold('2. Commit Changes:')}
   $ ${chalk.cyan('commit')} "feat: add new feature"
   $ ${chalk.cyan('commit')} "fix: resolve bug in login"
   ${chalk.gray('- Automatically initializes git repository if needed')}
   ${chalk.gray('- Creates .gitignore if missing')}
   ${chalk.gray('- Creates GitHub repository if gh CLI is installed')}
   ${chalk.gray('- Commits and pushes changes')}
${chalk.bold('3. Clean Project:')}
   $ ${chalk.cyan('clean')}
   ${chalk.gray('Removes common development artifacts:')}
   ${chalk.gray('- node_modules, dist, build directories')}
   ${chalk.gray('- Lock files (package-lock.json, yarn.lock, etc.)')}
   ${chalk.gray('- Cache directories (.cache, .parcel-cache, etc.)')}
   ${chalk.gray('- Generated directories')}
${chalk.bold('4. Split Code Files:')}
   $ ${chalk.cyan('split-code')} source=combined.ts markers=src/,lib/ outputDir=./output
   ${chalk.yellow('Options:')}
   source=<file>     Source file to split
   markers=<paths>   Comma-separated list of path markers
   outputDir=<path>  Output directory for split files
${chalk.bold('5. Publish to NPM:')}
   $ ${chalk.cyan('publish-npm')} patch "fix: update dependencies"
   $ ${chalk.cyan('publish-npm')} minor "feat: add new feature"
   ${chalk.yellow('Arguments:')}
   First:   Version type (patch|minor|major)
   Second:  Commit message (optional)
${chalk.bold('Options:')}
  --help, -h        Show this help message
  --version, -v     Show version number
${chalk.italic('For more detailed information about a specific command, run:')}
  ${chalk.cyan('alvamind')} ${chalk.green('<command>')} --help
`);
};
const showVersion = () => {
  const packageJson = require('../package.json');
  console.log(chalk.bold(`v${packageJson.version}`));
};
const args = process.argv.slice(2);
if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
  showHelp();
} else if (args.includes('--version') || args.includes('-v')) {
  showVersion();
} else {
  console.log(
    chalk.red(`Unknown command. Run '${chalk.cyan('alvamind --help')}' for usage information.`)
  );
}
export * from './tools/generate-source';
export * from './tools/commit';
export * from './tools/clean';
export * from './tools/split-files';
export * from './tools/npm-publish';
export * from './add-json-script';
import { describe, test, expect, beforeAll, afterAll, beforeEach, afterEach } from 'bun:test';
import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
const testDir = path.join(__dirname, 'test-temp');
const sourceFile = path.join(testDir, 'source-code.md');
async function runGenerateSource(args: string = ''): Promise<string> { // make async and return Promise<string>
  try {
    const projectRoot = path.join(__dirname, '..', '..'); // Adjust based on your actual project structure
    const scriptPath = path.join(projectRoot, 'src', 'tools', 'generate-source.ts');
    const command = `bun ${scriptPath} ${args}`; // Use absolute path
    return execSync(command, { encoding: 'utf-8', cwd: projectRoot }); // Set cwd
  } catch (error: any) {
    console.error('Error executing command:', error.stdout || error);
    throw new Error(`Failed to execute generate-source: ${error.message || error.stdout || error}`);
  }
}
function createTempFile(filePath: string, content: string): void {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  fs.writeFileSync(filePath, content)
}
beforeAll(() => {
  fs.mkdirSync(testDir, { recursive: true })
  createTempFile(path.join(testDir, 'test.ts'), '// Test file\n const a = 1;');
  createTempFile(path.join(testDir, 'test2.ts'), ' \n const b = 2;');
  createTempFile(path.join(testDir, 'src', 'nested.ts'), 'const c = 3;\n\n// This is nested');
  createTempFile(path.join(testDir, 'src', 'nested2.ts'), 'const d = 4; \n // Second nested')
});
afterAll(() => {
  if (fs.existsSync(testDir)) {
    fs.rmSync(testDir, { recursive: true, force: true });
  }
});
beforeEach(() => {
  if (fs.existsSync(sourceFile)) {
    fs.rmSync(sourceFile);
  }
});
afterEach(() => {
  if (fs.existsSync(sourceFile)) {
    fs.rmSync(sourceFile);
  }
});
describe('generate-source.ts Parameter Testing', () => {
  test('should generate source code documentation with default options', async () => { // async test
    await runGenerateSource(); // await here
    expect(fs.existsSync(sourceFile)).toBe(true);
    const content = fs.readFileSync(sourceFile, 'utf-8');
    expect(content).toContain('// test.ts');
    expect(content).toContain('// test2.ts');
    expect(content).toContain('// src/nested.ts');
    expect(content).toContain('// src/nested2.ts');
  });
  describe('--include parameter', () => {
    test('should include a single file', async () => { // async test
      await runGenerateSource('--include=test.ts'); // await here
      expect(fs.existsSync(sourceFile)).toBe(true);
      const content = fs.readFileSync(sourceFile, 'utf-8');
      expect(content).toContain('// test.ts');
      expect(content).not.toContain('// test2.ts');
      expect(content).not.toContain('// src/nested.ts');
      expect(content).not.toContain('// src/nested2.ts');
    });
    test('should include multiple files', async () => { // async test
      await runGenerateSource('--include=test.ts,test2.ts'); // await here
      expect(fs.existsSync(sourceFile)).toBe(true);
      const content = fs.readFileSync(sourceFile, 'utf-8');
      expect(content).toContain('// test.ts');
      expect(content).toContain('// test2.ts');
      expect(content).not.toContain('// src/nested.ts');
      expect(content).not.toContain('// src/nested2.ts');
    });
    test('should include a nested file', async () => { // async test
      await runGenerateSource('--include=src/nested.ts'); // await here
      expect(fs.existsSync(sourceFile)).toBe(true);
      const content = fs.readFileSync(sourceFile, 'utf-8');
      expect(content).toContain('// src/nested.ts');
      expect(content).not.toContain('// test.ts');
      expect(content).not.toContain('// test2.ts');
      expect(content).not.toContain('// src/nested2.ts');
    });
    test('should include multiple nested files', async () => { // async test
      await runGenerateSource('--include=src/nested.ts,src/nested2.ts'); // await here
      expect(fs.existsSync(sourceFile)).toBe(true);
      const content = fs.readFileSync(sourceFile, 'utf-8');
      expect(content).toContain('// src/nested.ts');
      expect(content).toContain('// src/nested2.ts');
      expect(content).not.toContain('// test.ts');
      expect(content).not.toContain('// test2.ts');
    });
    test('should handle glob patterns', async () => { // async test
      await runGenerateSource('--include=src');
      expect(content).toContain('// Test file');
      expect(content).toContain('// This is nested');
      expect(content).toContain('// Second nested');
    });
  });
  test('should handle missing files gracefully', async () => { // async test
    const result = await runGenerateSource('--include=nonexistent.ts'); // await here
    expect(result).toContain("Found 0 files");
  });
  test('should handle no files gracefully', async () => { // async test
    await runGenerateSource('--exclude=**/*'); // await here
    expect(fs.existsSync(sourceFile)).toBe(true);
    const content = fs.readFileSync(sourceFile, 'utf-8');
    expect(content).not.toContain('// test.ts');
    expect(content).not.toContain('// src/nested.ts');
    expect(content).not.toContain('// test2.ts');
    expect(content).not.toContain('// src/nested2.ts');
  });
  test('should show help with no args', async () => { // async test
    const result = await runGenerateSource(); // await here
    expect(result).toContain("Usage:");
  });
  test('should show help with --help arg', async () => { // async test
    const result = await runGenerateSource('--help'); // await here
    expect(result).toContain("Usage:");
  });
  test('should return error with invalid arg', async () => { // async test
    try {
      await runGenerateSource('--invalid=arg'); // await here
    } catch (e: any) {
      expect(e.message).toContain("Args error:");
    }
  });
});
#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import chalk from 'chalk';
const projectDir = process.cwd();
async function cleanProject() {
  const chalk = (await import('chalk')).default;
  const foldersToDelete = [
    '.bun',
    '.turbo',
    '.eslintcache',
    '.parcel-cache',
    'node_modules',
    '.next',
    '.cache',
    'dist',
    'build',
    'coverage',
    '.vite',
  ];
  const filesToDelete = [
    'bun.lockb',
    'yarn.lock',
    'package-lock.json',
    'pnpm-lock.yaml',
    '.DS_Store',
  ];
  let deletedCount = 0;
  try {
    for (const folder of foldersToDelete) {
      const fullPath = path.join(projectDir, folder);
      if (fs.existsSync(fullPath)) {
        fs.rmSync(fullPath, { recursive: true, force: true });
        console.log(`${chalk.green('✓')} Deleted folder: ${chalk.cyan(folder)}`);
        deletedCount++;
      }
    }
    for (const file of filesToDelete) {
      const fullPath = path.join(projectDir, file);
      if (fs.existsSync(fullPath)) {
        fs.rmSync(fullPath, { force: true });
        console.log(`${chalk.green('✓')} Deleted file: ${chalk.cyan(file)}`);
        deletedCount++;
      }
    }
    const generatedDirs = await findGeneratedDirs('.');
    for (const dir of generatedDirs) {
      const fullPath = path.join(projectDir, dir);
      if (fs.existsSync(fullPath)) {
        fs.rmSync(fullPath, { recursive: true, force: true });
        console.log(`${chalk.green('✓')} Deleted generated dir: ${chalk.cyan(dir)}`);
        deletedCount++;
      }
    }
    console.log(chalk.green(`\n✨ Cleaning completed! ${deletedCount} items deleted`));
  } catch (error) {
    console.error(chalk.red('Error during cleaning:'), error);
    process.exit(1);
  }
}
async function findGeneratedDirs(dir: string): Promise<string[]> {
  const entries = fs.readdirSync(path.join(projectDir, dir), { withFileTypes: true });
  let generatedDirs: string[] = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'generated') {
        generatedDirs.push(fullPath);
      }
      generatedDirs = [...generatedDirs, ...(await findGeneratedDirs(fullPath))];
    }
  }
  return generatedDirs;
}
cleanProject().catch((error) => {
  console.error(chalk.red('Fatal Error:'), error);
  process.exit(1);
});
#!/usr/bin/env node
import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';
import chalk from 'chalk';
const defaultGitignore = `# Dependencies
/node_modules
/.pnp
.pnp.js
# Testing
/coverage
# Production
/build
/dist
# Misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local
# Debug logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
# IDE
.idea/
.vscode/
*.swp
*.swo
# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db
# Optional npm cache directory
.npm
# Optional eslint cache
.eslintcache
# Optional REPL history
.node_repl_history
# Output of 'npm pack'
*.tgz
# Yarn Integrity file
.yarn-integrity`;
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const projectDir = process.cwd();
const projectName = path.basename(projectDir);
const args = process.argv.slice(2);
const commitMessage = args.join(' ');
async function askQuestion(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}
async function isGhInstalled(): Promise<boolean> {
  try {
    execSync('gh --version', { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
}
function createGitignore() {
  const gitignorePath = path.join(projectDir, '.gitignore');
  if (!fs.existsSync(gitignorePath)) {
    console.log(chalk.yellow('ℹ️  Creating default .gitignore file...'));
    fs.writeFileSync(gitignorePath, defaultGitignore);
    console.log(chalk.green('✅ Created .gitignore file'));
  }
}
async function commitAndPush() {
  if (!commitMessage) {
    console.error(chalk.red('❌ Commit message is required.'));
    process.exit(1);
  }
  try {
    console.log(chalk.cyan('🚀 Starting commit process...'));
    process.chdir(projectDir);
    console.log(chalk.gray(`📂 Working in: ${projectDir}`));
    const isNewRepo = !fs.existsSync(path.join(projectDir, '.git'));
    if (isNewRepo) {
      console.log(chalk.yellow('⚠️  No git repository found. Initializing...'));
      execSync('git init', { stdio: 'inherit' });
      console.log(chalk.green('✅ Git repository initialized.'));
      createGitignore();
    }
    createGitignore();
    const status = execSync('git status --porcelain').toString();
    if (!status) {
      console.log(chalk.yellow('ℹ️  No changes to commit.'));
      process.exit(0);
    }
    console.log(chalk.cyan('📝 Staging all changes...'));
    execSync('git add .', { stdio: 'inherit' });
    console.log(chalk.cyan('💾 Committing changes...'));
    execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
    if (await !isGhInstalled()) {
      console.log(
        chalk.yellow('⚠️  GitHub CLI (gh) is not installed. Skipping remote repository creation.')
      );
    } else {
      console.log(chalk.cyan('🔍 Checking for remote repository...'));
      try {
        execSync('gh repo view', { stdio: 'ignore' });
        console.log(chalk.green('✅ Remote repository found.'));
      } catch (error) {
        console.log(chalk.yellow('⚠️  No remote repository found. Creating...'));
        const makePrivate = await askQuestion(chalk.cyan('Make repository private? (y/n): '));
        const repoType = makePrivate.toLowerCase() === 'y' ? 'private' : 'public';
        execSync(`gh repo create ${projectName} --${repoType} --source=. --push`, {
          stdio: 'inherit',
        });
        console.log(chalk.green(`✅ Created ${repoType} repository: ${projectName} on GitHub`));
      }
    }
    try {
      execSync('git rev-parse --abbrev-ref --symbolic-full-name @{u}', { stdio: 'ignore' });
      console.log(chalk.cyan('⬆️  Pushing changes...'));
      execSync('git push', { stdio: 'inherit' });
    } catch (error) {
      const remoteName = 'origin';
      const branchName = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
      console.log(chalk.cyan(`⬆️  Setting upstream and pushing to ${remoteName}/${branchName}...`));
      execSync(`git push --set-upstream ${remoteName} ${branchName}`, { stdio: 'inherit' });
    }
    console.log(chalk.green('✅ Changes committed and pushed successfully!'));
  } catch (error) {
    console.error(chalk.red('❌ Error during commit and push:'), error);
    process.exit(1);
  } finally {
    rl.close();
  }
}
commitAndPush();
#!/usr/bin/env node
import { execSync } from 'child_process';
import * as readline from 'readline';
import chalk from 'chalk';
import * as fs from 'fs';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const [, , versionArg, commitMessageArg] = process.argv;
async function askQuestion(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}
function checkGitStatus(): boolean {
  try {
    const status = execSync('git status --porcelain').toString();
    return status.length === 0;
  } catch (error) {
    return false;
  }
}
function getCurrentBranch(): string {
  return execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
}
function validatePackageJson(): void {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const requiredFields = ['name', 'version', 'description', 'main', 'types'];
  for (const field of requiredFields) {
    if (!packageJson[field]) {
      throw new Error(`Missing required field in package.json: ${field}`);
    }
  }
}
async function selectVersionType(): Promise<string> {
  if (versionArg && ['patch', 'minor', 'major'].includes(versionArg)) {
    return versionArg;
  }
  console.log(chalk.cyan('\nSelect version increment type:'));
  console.log(chalk.gray('1. patch (1.0.0 -> 1.0.1)'));
  console.log(chalk.gray('2. minor (1.0.0 -> 1.1.0)'));
  console.log(chalk.gray('3. major (1.0.0 -> 2.0.0)'));
  const answer = await askQuestion('Enter your choice (1-3): ');
  const versionMap: { [key: string]: string } = {
    '1': 'patch',
    '2': 'minor',
    '3': 'major',
  };
  return versionMap[answer] || 'patch';
}
async function getCommitMessage(version: string): Promise<string> {
  if (commitMessageArg) {
    return commitMessageArg;
  }
  const defaultMessage = `chore: release v${version}`;
  const message = await askQuestion(
    chalk.cyan(`Enter commit message (default: "${defaultMessage}"): `)
  );
  return message.trim() || defaultMessage;
}
async function publishPackage() {
  try {
    console.log(chalk.cyan('\n🔍 Running pre-publish checks...\n'));
    console.log(chalk.cyan('📋 Validating package.json...'));
    validatePackageJson();
    console.log(chalk.green('✅ package.json is valid'));
    const currentBranch = getCurrentBranch();
    if (currentBranch !== 'main' && currentBranch !== 'master') {
      console.log(chalk.yellow(`⚠️  You're on branch '${currentBranch}'.`));
    }
    console.log(chalk.cyan('\n🧹 Cleaning project...'));
    execSync('bun clean', { stdio: 'inherit' });
    console.log(chalk.cyan('\n📦 Installing dependencies...'));
    execSync('bun install', { stdio: 'inherit' });
    console.log(chalk.cyan('\n🔨 Building project...'));
    execSync('bun run build', { stdio: 'inherit' });
    try {
      console.log(chalk.cyan('\n🧪 Running tests...'));
      execSync('bun test', { stdio: 'inherit' });
      console.log(chalk.green('✅ Tests passed'));
    } catch (error) {
      console.log(chalk.yellow('⚠️  No tests found or tests failed'));
    }
    const versionType = await selectVersionType();
    console.log(chalk.cyan(`\n📝 Incrementing ${versionType} version...`));
    execSync(`npm version ${versionType} --no-git-tag-version`, { stdio: 'inherit' });
    console.log(chalk.cyan('\n🚀 Publishing to npm...'));
    execSync('npm publish', { stdio: 'inherit' });
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const newVersion = packageJson.version;
    const tagName = `v${newVersion}`;
    const commitMessage = await getCommitMessage(newVersion);
    console.log(chalk.cyan('\n📝 Committing changes...'));
    execSync(`bun commit "${commitMessage}"`, { stdio: 'inherit' });
    console.log(chalk.cyan('\n🏷️  Creating and pushing tag...'));
    execSync(`git tag ${tagName}`, { stdio: 'inherit' });
    execSync('git push --tags', { stdio: 'inherit' });
    console.log(chalk.green('\n✨ Package successfully published to npm!'));
    console.log(chalk.gray(`Version: ${newVersion}`));
    console.log(chalk.gray(`Tag: ${tagName}`));
    console.log(chalk.gray(`Commit: ${commitMessage}`));
  } catch (error) {
    console.error(chalk.red('\n❌ Error during publish process:'), error);
    process.exit(1);
  } finally {
    rl.close();
  }
}
publishPackage();
#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';
interface FileSection {
  filePath: string;
  start: number;
  end: number;
  content: string;
  created: boolean;
}
function splitFile(singleFilePath: string, markers: string[], outputDirPath?: string): void {
  if (!fs.existsSync(singleFilePath)) {
    console.error(chalk.red(`Error: File not found: ${singleFilePath}`));
    process.exit(1);
  }
  const fileContent = fs.readFileSync(singleFilePath, 'utf-8');
  const fileSections: FileSection[] = [];
  markers.forEach((marker) => {
    const fileRegex = new RegExp(`\\/\\/ ${marker}(.*?\\.ts)`, 'g');
    let match;
    while ((match = fileRegex.exec(fileContent)) !== null) {
      const filePath = match[1].trim();
      const start = match.index;
      fileSections.push({
        filePath,
        start,
        end: start, // Will be updated later
        content: '',
        created: false,
      });
    }
  });
  fileSections.sort((a, b) => a.start - b.start);
  for (let i = 0; i < fileSections.length; i++) {
    const currentSection = fileSections[i];
    const nextSection = fileSections[i + 1];
    currentSection.end = nextSection ? nextSection.start : fileContent.length;
    const markerLineEnd = fileContent.indexOf('\n', currentSection.start) + 1;
    currentSection.content = fileContent.substring(markerLineEnd, currentSection.end).trim();
  }
  fileSections.forEach((section) => {
    const { filePath, content } = section;
    const fileDir = outputDirPath
      ? path.resolve(outputDirPath, path.dirname(filePath))
      : path.resolve(path.dirname(filePath));
    const fileName = path.basename(filePath);
    const fullFilePath = path.join(fileDir, fileName);
    if (!fs.existsSync(fileDir)) {
      fs.mkdirSync(fileDir, { recursive: true });
    }
    fs.writeFileSync(fullFilePath, content);
    console.log(chalk.green(`Created: ${chalk.bold(fullFilePath)}`));
  });
  if (fileSections.length === 0 && fileContent.length > 0) {
    console.log(chalk.yellow('No marker path found in the file.'));
  }
  if (fileSections.length > 0) {
    console.log(chalk.cyan('\nFiles splitted successfully! ✨\n'));
    const openCommand =
      process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open';
    console.log(chalk.blue(`You can open the files with ${chalk.bold('CTRL+Click')}`));
  }
}
const args = process.argv.slice(2);
if (args.length === 0) {
  console.error(
    chalk.red('Usage: split source=<filePath> markers=<marker1,marker2,...> [outputDir=<path>]')
  );
  console.error(
    chalk.yellow('Example: split source=all-in-one.ts markers=src/,custom/ outputDir=./output')
  );
  process.exit(1);
}
const parsedArgs: { [key: string]: string } = {};
args.forEach((arg) => {
  const [key, value] = arg.split('=');
  if (key && value) {
    parsedArgs[key] = value;
  }
});
if (!parsedArgs.source || !parsedArgs.markers) {
  console.error(chalk.red('Error: source and markers parameters are required'));
  console.error(
    chalk.yellow('Example: split source=all-in-one.ts markers=src/,custom/ outputDir=./output')
  );
  process.exit(1);
}
const singleFilePath = parsedArgs.source;
const markers = parsedArgs.markers.split(',');
const outputDirPath = parsedArgs.outputDir;
splitFile(singleFilePath, markers, outputDirPath);
{
  "extends": "./tsconfig.json",
  "exclude": ["node_modules", "test", "dist", "scripts"],
  "compilerOptions": {
    "sourceMap": true,
    "declaration": true,
    "outDir": "./dist"
  }
}
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "declaration": true,
    "outDir": "./dist",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "rootDir": "./src",
    "typeRoots": ["./node_modules/@types", "./src/types"]
  },
  "include": ["src*.ts", "test*.ts"]
}

// package.json
{
  "name": "alvamind-tools",
  "version": "1.0.23",
  "description": "CLI tools for generating source code documentation and git automation",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/alvamind/alvamind-tools.git"
  },
  "bin": {
    "alvamind": "./dist/cli.js",
    "generate-source": "./dist/tools/generate-source.js",
    "commit": "./dist/tools/commit.js",
    "clean": "./dist/tools/clean.js",
    "split-code": "./dist/tools/split-files.js",
    "publish-npm": "./dist/tools/npm-publish.js",
    "add-json-script": "./dist/add-json-script.js"
  },
  "scripts": {
    "alvamind": "bun src/cli.ts",
    "commit": "bun src/tools/commit.ts commit",
    "source": "bun src/tools/generate-source.ts --exclude=src/tests --output=docs.md",
    "split-code": "bun src/tools/split-files.ts source=all-in-one.ts markers=src/,custom/ outputDir=./output",
    "build": "tsc && tsc -p tsconfig.build.json && chmod +x dist/cli.js dist/tools/*.js",
    "clean": "bun src/tools/clean.ts",
    "publish-npm": "bun src/tools/npm-publish.ts patch",
    "test": "jest",
    "lint": "eslint src*.ts",
    "format": "prettier --write \"src*.ts\""
  },
  "files": [
    "dist",
    "src",
    "scripts",
    "README.md",
    "LICENSE"
  ],
  "keywords": [
    "typescript",
    "documentation",
    "git",
    "automation",
    "cli",
    "source-code",
    "tools",
    "utilities"
  ],
  "author": "Alvamind",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/alvamind/alvamind-tools/issues"
  },
  "homepage": "https://github.com/alvamind/alvamind-tools#readme",
  "dependencies": {
    "@types/glob": "^8.1.0",
    "chalk": "4.1.2",
    "glob": "^8.1.0"
  },
  "devDependencies": {
    "@types/bun": "^1.1.15",
    "@types/jest": "^29.5.14",
    "@types/node": "^22.10.5",
    "@typescript-eslint/eslint-plugin": "^8.19.1",
    "@typescript-eslint/parser": "^8.19.1",
    "eslint": "^9.17.0",
    "jest": "^29.7.0",
    "prettier": "^3.4.2",
    "rimraf": "^6.0.1",
    "ts-jest": "^29.2.5",
    "typescript": "^5.7.2"
  },
  "engines": {
    "node": ">=14.0.0"
  },
  "preferGlobal": true
}

// README.md
# 🔥 alvamind-tools: Your CLI Power-Up for TypeScript Projects 🚀
![alvamind-tools Banner](https://placehold.co/1000x300/00aaff/fff?text=alvamind-tools)
Hey there, code slingers! 👋 Welcome to `alvamind-tools`, your new go-to arsenal for supercharging your TypeScript projects. We're talking automation, documentation, and clean-up – all in one slick package. Think of it as your AI sidekick for common dev tasks. 🤖
## ✨ Features & Benefits: Why You Need This
This ain't your grandma's CLI toolset. Here's why `alvamind-tools` is a game-changer:
### 1. ✍️ Auto Source Code Documentation with `generate-source`
*   **AI-Powered Markdown Magic:** Generates a markdown file of your entire codebase, perfect for documentation or sharing. No more copy-pasting code snippets! 🧙‍♂️
*   **Project Name Magic:** Automatically includes the project name at the top, so you know exactly what you're looking at. 🏷️
*   **Comment Slayer:** Strips out those pesky single-line and multi-line comments, keeping your docs clean and focused on the code. 🧹
*   **Customizable Include/Exclude:** Fine-tune what's included and excluded with regex-powered arguments. Perfect for keeping those test files out of your docs. ✂️
*   **Line Count Wizardry:** Tells you the total lines of code in your project, because who doesn't love some data? 📊
*   **Blank Line Removal:** Optionally remove all blank lines from the generated Markdown file for a cleaner look. 🧼
*   **Why This is Lit:** Imagine having a up-to-date source code documentation generated every time before you commit. Save you precious time.
### 2. 🚀 Git Automation with `commit`
*   **Git Init Power:** Initializes a git repository if none exists. 🎛️
*   **GitHub Repo Creation:** If `gh` is installed, creates a GitHub repository for you if none exists, asks for public or private. ➕
*   **Commit & Push in One Go:**  A single command to add all changes, commit with a message, and push to your remote. No more remembering git commands! 💨
*   **Safety First:** Checks for changes before committing. If no changes, it'll push existing commits. 🛡️
*  **Set Upstream:** Asks if you want to set the upstream branch. ⬆️
*   **User-Friendly Prompts:** Error if commit message is missing. Ain't no sneaky commits going on here! 🚫
*   **Why This is Lit:** It's like having your own personal git butler. Makes the entire commit process seamless.
        ```bash
      Starting commit process...
      Changed directory to: /path/to/your/project
      No git repository found. Initializing...
      Git repository initialized.
      Checking for remote repository...
      No remote repository found. Creating...
      Create a public or private repository? (public/private): private
      Created private repository: your-project-name on github.
      No changes to commit.
      Existing commits pushed successfully.
      Do you want to set the upstream? (yes/no): yes
      Setting upstream...
      Upstream set successfully.
      Changes committed and pushed successfully.
       ```
### 3. 🧹  One-Click Project Cleaning with `clean`
*   **Deep Clean Mastery:**  Clears out all those pesky build directories, cache folders, lock files, and other junk you don't need. 🗑️
*   **Generated Dir Destroyer:** Automatically finds and deletes all directories named "generated" from the entire project. 💪
*   **Why This is Lit:** Imagine starting fresh with a clean slate. Perfect for when you just need to nuke everything and start fresh.
### 4. 📂 Smart File Splitting with `split`
* **Marker-Based Splitting:** Splits a single file into multiple files based on marker comments. 🔄
* **Path Preservation:** Maintains the original file structure as specified in the markers. 📁
* **Custom Output Directory:** Optionally specify where the split files should go. 📍
* **Multiple Markers Support:** Use different markers for different file types or directories. 🎯
* **Why This is Lit:** Perfect for when you need to break down a large file into a proper project structure. No more manual copy-pasting!
### 5. ⚙️ Add Example Scripts with `add-json-script`
* **Adds Example Scripts:** Adds example scripts to your `package.json` file for all available tools.
* **User Confirmation:** Asks for user confirmation before adding the scripts.
* **Why This is Lit:** Makes it easy to get started with all the available tools by adding working example scripts to your project.
      ```bash
      # Example file content:
      export interface User {
        id: string;
        name: string;
      }
      import { User } from '../models/user';
      export class UserController {
      }
      # Command to split:
      split all-in-one.ts "src/" ./output
      ```
## 🛠️ How to Use: Getting Started
1.  **Install:**
    ```bash
    npm install alvamind-tools -g
    ```
2.  **Generate Source Code Doc:**
    ```bash
    generate-source --output=source.md --exclude=dist/,README.md,*.test.ts --remove-blank-lines
    # or with npm run
    npm run source
    ```
    This will create a `source.md` file with your source code (excluding the `dist` folder, `README.md` and test files), and remove all blank lines.
3.  **Commit Your Changes:**
    ```bash
    commit "Your commit message here"
    # or with npm run
    npm run commit "Your commit message here"
    ```
    This will stage all changes, commit with the message, and push to remote. It also checks if you have `gh` installed to create a new repo.
4.  **Clean Your Project:**
    ```bash
    clean
    # or with npm run
    npm run clean
    ```
    This will clean all the junk out.
5. **Split Your Files:**
   ```bash
   split-code source=all-in-one.ts markers=src/,custom/ outputDir=./output
   # or with npm run
   npm run split your-file.ts "src/,custom/" ./output
   ```
   This will split your file based on marker comments into separate files.
6. **Add Example Scripts:**
   ```bash
   add-json-script
   # or with npm run
   npm run add-json-script
   ```
   This will add example scripts to your package.json file.
## ⚙️ Configuration: Tweak it Your Way
The magic is in the details! Here's how you can customize each tool:
### `generate-source` Options:
*   `--output`:  Specify the output filename (default: `source-code.md`).
    ```bash
    generate-source --output=my-awesome-docs.md
    ```
*   `--include`:  Comma-separated list of file endings to include, even if they're in default exclude regex.
    ```bash
    generate-source --include=route.ts
    ```
*   `--exclude`:  Comma-separated list of paths or regex patterns to exclude.
    ```bash
    generate-source --exclude=dist/,node_modules/,*.test.ts
     generate-source --exclude="/.*\.test\.ts$/"
    ```
*  *Regex exclude example*
    ```bash
       generate-source --exclude="/.*\.route\.ts$/,/.*\.test\.ts$/"
    ```
*   `--remove-blank-lines`:  Remove all blank lines from the generated Markdown file.
    ```bash
    generate-source --remove-blank-lines
    ```
###  `commit` Options:
    *   No option, all you need is a message after the command
    ```bash
    commit "feat: added new feature"
    ```
###  `clean` Options:
    *  No options, it does everything for you.
    ```bash
    clean
    ```
### `split` Options:
* `[singleFilePath]`: Path to the file you want to split
* `[markers]`: Comma-separated list of markers to look for
* `[outputDirPath]`: (Optional) Where to output the split files
  ```bash
  split all-in-one.ts "src/,custom/" ./output
  ```
## 🧠 AI & the Future of `alvamind-tools`
We're not stopping here! We're constantly thinking about how AI can make our tools even better:
*   **Intelligent Documentation:** Imagine an AI that can automatically generate code comments and README.md based on your source code.
*   **AI-Powered Code Analysis:** Get suggestions on code improvements, detect potential bugs, and more.
*   **Automated Refactoring:** Let AI take care of the heavy lifting of code refactoring.
*   **Personalized Recommendations:** Based on your project setup, our AI would suggest which tools to use.
## 🗺️ Roadmap: What's Next?
*   **[✅] v1.0.0:** Initial release with `generate-source` and `commit` tools
*   **[✅] v1.0.1:** Added include and exclude arguments.
*   **[✅] v1.0.2:** Added clean functionality
*   **[✅] v1.0.3:** Added git init and github repo creation on commit command.
*   **[✅] v1.0.5:** Added split-files functionality
*   **[✅] v1.0.6:** Added add-json-script functionality
*   **[✅] v1.0.7:** Added remove-blank-lines functionality
*   **[ ] v1.1.0:**  Automated commit message generation using AI.
*   **[ ] v1.2.0:**  Enhanced documentation with AI-powered code summarization.
*   **[ ] v1.3.0:**  Integration with common CI/CD pipelines.
## 💖 Support & Donation: Fuel Our Development
If `alvamind-tools` makes your life easier, consider showing some love! You can help us keep developing by:
*   **Starring the Repo:** Head to our GitHub and give us a star! ⭐
*   **Contributing Code:**  See a way to make it better? Fork and send us a pull request! 🛠️
*   **Donating:** Buy us a coffee via [PayPal](https://paypal.me/alvamind). ☕
*   **Sharing:** Spread the word with fellow devs! 🗣️
## 🤝 Contribution: Join the Squad
We're an open-source project, and we welcome contributors! Whether you're a coding pro or just getting started, there's a place for you in our squad. To contribute:
1.  **Fork the Repo:** Create your own copy on GitHub.
2.  **Make Changes:** Add your magic and test your code.
3.  **Create a Pull Request:** Let us know your changes are ready for review!
4.  **Review:** After review, your code will be merged!
## 📜 License
`alvamind-tools` is released under the MIT License. Do what you want with it, no worries! 🤘
## 🤔 Questions?
Have a question or need help? Open an issue on our GitHub page, and we'll get back to you. 💬
<br>
<br>
***
_Built with passion by the Alvamind Team_ 💖

// scripts/post-install.ts
#!/usr/bin/env node
import * as readline from 'readline';
import { execSync } from 'child_process';
import * as chalk from 'chalk';
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
async function askQuestion(query: string): Promise<string> {
    return new Promise((resolve) => {
        rl.question(query, resolve);
    });
}
async function postInstall() {
    try {
        console.log('\n' + '='.repeat(80));
        console.log(chalk.cyan.bold(`
    🚀 Welcome to Alvamind Tools! 🛠️
    `));
        console.log(chalk.white(`A powerful collection of development workflow automation tools:`));
        console.log(chalk.gray(`
    📝 generate-source  - Generate comprehensive source code documentation
    🔄 commit          - Streamlined git commit and push with repository setup
    🧹 clean           - Clean up project directories and generated files
    ✂️  split-code      - Split large code files into organized modules
    📦 publish-npm     - Automated npm package publishing workflow
    `));
        console.log(chalk.yellow(`
    Would you like to add example scripts to your package.json? 
    This will add convenient npm commands for all tools above.
    `));
        console.log(chalk.gray(`
    Example scripts that will be added:
    • npm run source        → generate source code documentation
    • npm run commit       → commit and push changes
    • npm run clean        → clean project folders
    • npm run split-code   → split combined code files
    • npm run publish-npm  → publish to npm
    `));
        const answer = await askQuestion(chalk.cyan('Add these scripts to package.json? (y/N): '));
        if (answer.toLowerCase() === 'y') {
            console.log(chalk.cyan('\n🔧 Adding scripts to package.json...'));
            try {
                execSync('npx alvamind-tools add-json-script', { stdio: 'inherit' });
                console.log(chalk.green('\n✅ Scripts added successfully!'));
                console.log(chalk.white('\n📘 Quick Start:'));
                console.log(chalk.gray(`
    1. Run ${chalk.cyan('npm run source')} to generate documentation
    2. Use ${chalk.cyan('npm run commit "your message"')} for git operations
    3. Try ${chalk.cyan('npm run clean')} to cleanup project
    4. Split code with ${chalk.cyan('npm run split-code')}
    5. Publish with ${chalk.cyan('npm run publish-npm')}
        `));
            } catch (error) {
                console.error(chalk.red('\n❌ Error adding scripts:', error));
            }
        } else {
            console.log(chalk.yellow('\nℹ️  Scripts not added. You can add them later using:'));
            console.log(chalk.cyan('npx alvamind-tools add-json-script'));
        }
        console.log(chalk.white('\n📚 Documentation:'));
        console.log(chalk.gray('Visit: https://github.com/alvamind/alvamind-tools#readme'));
        console.log('\n' + '='.repeat(80) + '\n');
    } catch (error) {
        console.error(chalk.red('Error during post-install:', error));
    } finally {
        rl.close();
    }
}
postInstall();

// source-code.md
# Project: alvamind-tools
## 📁 Dir Structure:
- scripts/
  • post-install.ts
- src/
  • add-json-script.ts
  • cli.ts
  • index.ts
- src/test/
  • source.test.ts
- src/tools/
  • clean.ts
  • commit.ts
  • npm-publish.ts
  • split-files.ts
- ./
  • changelog.md
  • custom-docs.md
  • docs.md
  • package.json
  • README.md
  • tsconfig.build.json
  • tsconfig.json
## 🚫 Excludes:
- **/node_modulesdist.gitgenerate-source.ts
- **/.zed-settings.json
- **/.vscode/settings.json
- **/package-lock.json
- **/bun.lockb
- **/buildnode_modulesdist.gitgenerate-source.ts
- **/.zed-settings.json
- **/.vscode/settings.json
- **/package-lock.json
- **/bun.lockb
- **/buildnode_modulesdist.gitgenerate-source.ts
- **/.zed-settings.json
- **/.vscode/settings.json
- **/package-lock.json
- **/bun.lockb
- **/build*'); // await here
    expect(fs.existsSync(sourceFile)).toBe(true);
    const content = fs.readFileSync(sourceFile, 'utf-8');
    expect(content).not.toContain('// test.ts');
    expect(content).not.toContain('// src/nested.ts');
    expect(content).not.toContain('// test2.ts');
    expect(content).not.toContain('// src/nested2.ts');
  });
  test('should show help with no args', async () => { // async test
    const result = await runGenerateSource(); // await here
    expect(result).toContain("Usage:");
  });
  test('should show help with --help arg', async () => { // async test
    const result = await runGenerateSource('--help'); // await here
    expect(result).toContain("Usage:");
  });
  test('should return error with invalid arg', async () => { // async test
    try {
      await runGenerateSource('--invalid=arg'); // await here
    } catch (e: any) {
      expect(e.message).toContain("Args error:");
    }
  });
});
const c = 3;
const d = 4; 
 const a = 1;
 const b = 2;
#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import chalk from 'chalk';
const projectDir = process.cwd();
async function cleanProject() {
  const chalk = (await import('chalk')).default;
  const foldersToDelete = [
    '.bun',
    '.turbo',
    '.eslintcache',
    '.parcel-cache',
    'node_modules',
    '.next',
    '.cache',
    'dist',
    'build',
    'coverage',
    '.vite',
  ];
  const filesToDelete = [
    'bun.lockb',
    'yarn.lock',
    'package-lock.json',
    'pnpm-lock.yaml',
    '.DS_Store',
  ];
  let deletedCount = 0;
  try {
    for (const folder of foldersToDelete) {
      const fullPath = path.join(projectDir, folder);
      if (fs.existsSync(fullPath)) {
        fs.rmSync(fullPath, { recursive: true, force: true });
        console.log(`${chalk.green('✓')} Deleted folder: ${chalk.cyan(folder)}`);
        deletedCount++;
      }
    }
    for (const file of filesToDelete) {
      const fullPath = path.join(projectDir, file);
      if (fs.existsSync(fullPath)) {
        fs.rmSync(fullPath, { force: true });
        console.log(`${chalk.green('✓')} Deleted file: ${chalk.cyan(file)}`);
        deletedCount++;
      }
    }
    const generatedDirs = await findGeneratedDirs('.');
    for (const dir of generatedDirs) {
      const fullPath = path.join(projectDir, dir);
      if (fs.existsSync(fullPath)) {
        fs.rmSync(fullPath, { recursive: true, force: true });
        console.log(`${chalk.green('✓')} Deleted generated dir: ${chalk.cyan(dir)}`);
        deletedCount++;
      }
    }
    console.log(chalk.green(`\n✨ Cleaning completed! ${deletedCount} items deleted`));
  } catch (error) {
    console.error(chalk.red('Error during cleaning:'), error);
    process.exit(1);
  }
}
async function findGeneratedDirs(dir: string): Promise<string[]> {
  const entries = fs.readdirSync(path.join(projectDir, dir), { withFileTypes: true });
  let generatedDirs: string[] = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'generated') {
        generatedDirs.push(fullPath);
      }
      generatedDirs = [...generatedDirs, ...(await findGeneratedDirs(fullPath))];
    }
  }
  return generatedDirs;
}
cleanProject().catch((error) => {
  console.error(chalk.red('Fatal Error:'), error);
  process.exit(1);
});
#!/usr/bin/env node
import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';
import chalk from 'chalk';
const defaultGitignore = `# Dependencies
/node_modules
/.pnp
.pnp.js
# Testing
/coverage
# Production
/build
/dist
# Misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local
# Debug logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
# IDE
.idea/
.vscode/
*.swp
*.swo
# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db
# Optional npm cache directory
.npm
# Optional eslint cache
.eslintcache
# Optional REPL history
.node_repl_history
# Output of 'npm pack'
*.tgz
# Yarn Integrity file
.yarn-integrity`;
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const projectDir = process.cwd();
const projectName = path.basename(projectDir);
const args = process.argv.slice(2);
const commitMessage = args.join(' ');
async function askQuestion(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}
async function isGhInstalled(): Promise<boolean> {
  try {
    execSync('gh --version', { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
}
function createGitignore() {
  const gitignorePath = path.join(projectDir, '.gitignore');
  if (!fs.existsSync(gitignorePath)) {
    console.log(chalk.yellow('ℹ️  Creating default .gitignore file...'));
    fs.writeFileSync(gitignorePath, defaultGitignore);
    console.log(chalk.green('✅ Created .gitignore file'));
  }
}
async function commitAndPush() {
  if (!commitMessage) {
    console.error(chalk.red('❌ Commit message is required.'));
    process.exit(1);
  }
  try {
    console.log(chalk.cyan('🚀 Starting commit process...'));
    process.chdir(projectDir);
    console.log(chalk.gray(`📂 Working in: ${projectDir}`));
    const isNewRepo = !fs.existsSync(path.join(projectDir, '.git'));
    if (isNewRepo) {
      console.log(chalk.yellow('⚠️  No git repository found. Initializing...'));
      execSync('git init', { stdio: 'inherit' });
      console.log(chalk.green('✅ Git repository initialized.'));
      createGitignore();
    }
    createGitignore();
    const status = execSync('git status --porcelain').toString();
    if (!status) {
      console.log(chalk.yellow('ℹ️  No changes to commit.'));
      process.exit(0);
    }
    console.log(chalk.cyan('📝 Staging all changes...'));
    execSync('git add .', { stdio: 'inherit' });
    console.log(chalk.cyan('💾 Committing changes...'));
    execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
    if (await !isGhInstalled()) {
      console.log(
        chalk.yellow('⚠️  GitHub CLI (gh) is not installed. Skipping remote repository creation.')
      );
    } else {
      console.log(chalk.cyan('🔍 Checking for remote repository...'));
      try {
        execSync('gh repo view', { stdio: 'ignore' });
        console.log(chalk.green('✅ Remote repository found.'));
      } catch (error) {
        console.log(chalk.yellow('⚠️  No remote repository found. Creating...'));
        const makePrivate = await askQuestion(chalk.cyan('Make repository private? (y/n): '));
        const repoType = makePrivate.toLowerCase() === 'y' ? 'private' : 'public';
        execSync(`gh repo create ${projectName} --${repoType} --source=. --push`, {
          stdio: 'inherit',
        });
        console.log(chalk.green(`✅ Created ${repoType} repository: ${projectName} on GitHub`));
      }
    }
    try {
      execSync('git rev-parse --abbrev-ref --symbolic-full-name @{u}', { stdio: 'ignore' });
      console.log(chalk.cyan('⬆️  Pushing changes...'));
      execSync('git push', { stdio: 'inherit' });
    } catch (error) {
      const remoteName = 'origin';
      const branchName = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
      console.log(chalk.cyan(`⬆️  Setting upstream and pushing to ${remoteName}/${branchName}...`));
      execSync(`git push --set-upstream ${remoteName} ${branchName}`, { stdio: 'inherit' });
    }
    console.log(chalk.green('✅ Changes committed and pushed successfully!'));
  } catch (error) {
    console.error(chalk.red('❌ Error during commit and push:'), error);
    process.exit(1);
  } finally {
    rl.close();
  }
}
commitAndPush();
#!/usr/bin/env node
import { execSync } from 'child_process';
import * as readline from 'readline';
import chalk from 'chalk';
import * as fs from 'fs';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const [, , versionArg, commitMessageArg] = process.argv;
async function askQuestion(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}
function checkGitStatus(): boolean {
  try {
    const status = execSync('git status --porcelain').toString();
    return status.length === 0;
  } catch (error) {
    return false;
  }
}
function getCurrentBranch(): string {
  return execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
}
function validatePackageJson(): void {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const requiredFields = ['name', 'version', 'description', 'main', 'types'];
  for (const field of requiredFields) {
    if (!packageJson[field]) {
      throw new Error(`Missing required field in package.json: ${field}`);
    }
  }
}
async function selectVersionType(): Promise<string> {
  if (versionArg && ['patch', 'minor', 'major'].includes(versionArg)) {
    return versionArg;
  }
  console.log(chalk.cyan('\nSelect version increment type:'));
  console.log(chalk.gray('1. patch (1.0.0 -> 1.0.1)'));
  console.log(chalk.gray('2. minor (1.0.0 -> 1.1.0)'));
  console.log(chalk.gray('3. major (1.0.0 -> 2.0.0)'));
  const answer = await askQuestion('Enter your choice (1-3): ');
  const versionMap: { [key: string]: string } = {
    '1': 'patch',
    '2': 'minor',
    '3': 'major',
  };
  return versionMap[answer] || 'patch';
}
async function getCommitMessage(): Promise<string> {
  if (commitMessageArg) {
    return commitMessageArg;
  }
  const message = await askQuestion(chalk.cyan('Enter commit message: '));
  if (!message.trim()) {
    throw new Error('Commit message is required');
  }
  return message;
}
async function publishPackage() {
  try {
    console.log(chalk.cyan('\n🔍 Running pre-publish checks...\n'));
    console.log(chalk.cyan('📋 Validating package.json...'));
    validatePackageJson();
    console.log(chalk.green('✅ package.json is valid'));
    const currentBranch = getCurrentBranch();
    if (currentBranch !== 'main' && currentBranch !== 'master') {
      console.log(chalk.yellow(`⚠️  You're on branch '${currentBranch}'.`));
    }
    if (!checkGitStatus()) {
      console.log(chalk.yellow('⚠️  You have uncommitted changes'));
      const commitMessage = await getCommitMessage();
      execSync(`bun commit "${commitMessage}"`, { stdio: 'inherit' });
    }
    console.log(chalk.cyan('\n🧹 Cleaning project...'));
    execSync('bun clean', { stdio: 'inherit' });
    console.log(chalk.cyan('\n📦 Installing dependencies...'));
    execSync('bun install', { stdio: 'inherit' });
    console.log(chalk.cyan('\n🔨 Building project...'));
    execSync('bun run build', { stdio: 'inherit' });
    try {
      console.log(chalk.cyan('\n🧪 Running tests...'));
      execSync('bun test', { stdio: 'inherit' });
      console.log(chalk.green('✅ Tests passed'));
    } catch (error) {
      console.log(chalk.yellow('⚠️  No tests found or tests failed'));
    }
    const versionType = await selectVersionType();
    console.log(chalk.cyan(`\n📝 Incrementing ${versionType} version...`));
    execSync(`npm version ${versionType} --no-git-tag-version`, { stdio: 'inherit' });
    console.log(chalk.cyan('\n🚀 Publishing to npm...'));
    execSync('npm publish', { stdio: 'inherit' });
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const tagName = `v${packageJson.version}`;
    execSync(`git tag ${tagName}`, { stdio: 'inherit' });
    execSync('git push && git push --tags', { stdio: 'inherit' });
    console.log(chalk.green('\n✨ Package successfully published to npm!'));
    console.log(chalk.gray(`Version: ${packageJson.version}`));
    console.log(chalk.gray(`Tag: ${tagName}`));
  } catch (error) {
    console.error(chalk.red('\n❌ Error during publish process:'), error);
    process.exit(1);
  } finally {
    rl.close();
  }
}
publishPackage();
#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';
interface FileSection {
  filePath: string;
  start: number;
  end: number;
  content: string;
  created: boolean;
}
function splitFile(singleFilePath: string, markers: string[], outputDirPath?: string): void {
  if (!fs.existsSync(singleFilePath)) {
    console.error(chalk.red(`Error: File not found: ${singleFilePath}`));
    process.exit(1);
  }
  const fileContent = fs.readFileSync(singleFilePath, 'utf-8');
  const fileSections: FileSection[] = [];
  markers.forEach((marker) => {
    const fileRegex = new RegExp(`\\/\\/ ${marker}(.*?\\.ts)`, 'g');
    let match;
    while ((match = fileRegex.exec(fileContent)) !== null) {
      const filePath = match[1].trim();
      const start = match.index;
      fileSections.push({
        filePath,
        start,
        end: start, // Will be updated later
        content: '',
        created: false,
      });
    }
  });
  fileSections.sort((a, b) => a.start - b.start);
  for (let i = 0; i < fileSections.length; i++) {
    const currentSection = fileSections[i];
    const nextSection = fileSections[i + 1];
    currentSection.end = nextSection ? nextSection.start : fileContent.length;
    const markerLineEnd = fileContent.indexOf('\n', currentSection.start) + 1;
    currentSection.content = fileContent.substring(markerLineEnd, currentSection.end).trim();
  }
  fileSections.forEach((section) => {
    const { filePath, content } = section;
    const fileDir = outputDirPath
      ? path.resolve(outputDirPath, path.dirname(filePath))
      : path.resolve(path.dirname(filePath));
    const fileName = path.basename(filePath);
    const fullFilePath = path.join(fileDir, fileName);
    if (!fs.existsSync(fileDir)) {
      fs.mkdirSync(fileDir, { recursive: true });
    }
    fs.writeFileSync(fullFilePath, content);
    console.log(chalk.green(`Created: ${chalk.bold(fullFilePath)}`));
  });
  if (fileSections.length === 0 && fileContent.length > 0) {
    console.log(chalk.yellow('No marker path found in the file.'));
  }
  if (fileSections.length > 0) {
    console.log(chalk.cyan('\nFiles splitted successfully! ✨\n'));
    const openCommand =
      process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open';
    console.log(chalk.blue(`You can open the files with ${chalk.bold('CTRL+Click')}`));
  }
}
const args = process.argv.slice(2);
if (args.length === 0) {
  console.error(
    chalk.red('Usage: split source=<filePath> markers=<marker1,marker2,...> [outputDir=<path>]')
  );
  console.error(
    chalk.yellow('Example: split source=all-in-one.ts markers=src/,custom/ outputDir=./output')
  );
  process.exit(1);
}
const parsedArgs: { [key: string]: string } = {};
args.forEach((arg) => {
  const [key, value] = arg.split('=');
  if (key && value) {
    parsedArgs[key] = value;
  }
});
if (!parsedArgs.source || !parsedArgs.markers) {
  console.error(chalk.red('Error: source and markers parameters are required'));
  console.error(
    chalk.yellow('Example: split source=all-in-one.ts markers=src/,custom/ outputDir=./output')
  );
  process.exit(1);
}
const singleFilePath = parsedArgs.source;
const markers = parsedArgs.markers.split(',');
const outputDirPath = parsedArgs.outputDir;
splitFile(singleFilePath, markers, outputDirPath);
{
  "extends": "./tsconfig.json",
  "exclude": ["node_modules", "test", "dist", "scripts"],
  "compilerOptions": {
    "sourceMap": true,
    "declaration": true,
    "outDir": "./dist"
  }
}
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "declaration": true,
    "outDir": "./dist",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "rootDir": "./src",
    "typeRoots": ["./node_modules/@types", "./src/types"]
  },
  "include": ["src*.ts", "test*.ts"]
}
{
  "name": "alvamind-tools",
  "version": "1.0.22",
  "description": "CLI tools for generating source code documentation and git automation",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/alvamind/alvamind-tools.git"
  },
  "bin": {
    "alvamind": "./dist/cli.js",
    "generate-source": "./dist/tools/generate-source.js",
    "commit": "./dist/tools/commit.js",
    "clean": "./dist/tools/clean.js",
    "split-code": "./dist/tools/split-files.js",
    "publish-npm": "./dist/tools/npm-publish.js",
    "add-json-script": "./dist/add-json-script.js"
  },
  "scripts": {
    "alvamind": "bun src/cli.ts",
    "commit": "bun src/tools/commit.ts commit",
    "source": "bun src/tools/generate-source.ts --exclude=src/tests --output=docs.md",
    "split-code": "bun src/tools/split-files.ts source=all-in-one.ts markers=src/,custom/ outputDir=./output",
    "build": "tsc && tsc -p tsconfig.build.json && chmod +x dist/cli.js dist/toolsnode_modulesdist.gitgenerate-source.ts
- **/.zed-settings.json
- **/.vscode/settings.json
- **/package-lock.json
- **/bun.lockb
- **/buildnode_modulesdist.gitgenerate-source.ts
- **/.zed-settings.json
- **/.vscode/settings.json
- **/package-lock.json
- **/bun.lockb
- **/buildnode_modulesdist.gitgenerate-source.ts
- **/.zed-settings.json
- **/.vscode/settings.json
- **/package-lock.json
- **/bun.lockb
- **/build*'); // await here
    expect(fs.existsSync(sourceFile)).toBe(true);
    const content = fs.readFileSync(sourceFile, 'utf-8');
    expect(content).not.toContain('// test.ts');
    expect(content).not.toContain('// src/nested.ts');
    expect(content).not.toContain('// test2.ts');
    expect(content).not.toContain('// src/nested2.ts');
  });
  test('should show help with no args', async () => { // async test
    const result = await runGenerateSource(); // await here
    expect(result).toContain("Usage:");
  });
  test('should show help with --help arg', async () => { // async test
    const result = await runGenerateSource('--help'); // await here
    expect(result).toContain("Usage:");
  });
  test('should return error with invalid arg', async () => { // async test
    try {
      await runGenerateSource('--invalid=arg'); // await here
    } catch (e: any) {
      expect(e.message).toContain("Args error:");
    }
  });
});
const c = 3;
const d = 4; 
 const a = 1;
 const b = 2;
#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import chalk from 'chalk';
const projectDir = process.cwd();
async function cleanProject() {
  const chalk = (await import('chalk')).default;
  const foldersToDelete = [
    '.bun',
    '.turbo',
    '.eslintcache',
    '.parcel-cache',
    'node_modules',
    '.next',
    '.cache',
    'dist',
    'build',
    'coverage',
    '.vite',
  ];
  const filesToDelete = [
    'bun.lockb',
    'yarn.lock',
    'package-lock.json',
    'pnpm-lock.yaml',
    '.DS_Store',
  ];
  let deletedCount = 0;
  try {
    for (const folder of foldersToDelete) {
      const fullPath = path.join(projectDir, folder);
      if (fs.existsSync(fullPath)) {
        fs.rmSync(fullPath, { recursive: true, force: true });
        console.log(`${chalk.green('✓')} Deleted folder: ${chalk.cyan(folder)}`);
        deletedCount++;
      }
    }
    for (const file of filesToDelete) {
      const fullPath = path.join(projectDir, file);
      if (fs.existsSync(fullPath)) {
        fs.rmSync(fullPath, { force: true });
        console.log(`${chalk.green('✓')} Deleted file: ${chalk.cyan(file)}`);
        deletedCount++;
      }
    }
    const generatedDirs = await findGeneratedDirs('.');
    for (const dir of generatedDirs) {
      const fullPath = path.join(projectDir, dir);
      if (fs.existsSync(fullPath)) {
        fs.rmSync(fullPath, { recursive: true, force: true });
        console.log(`${chalk.green('✓')} Deleted generated dir: ${chalk.cyan(dir)}`);
        deletedCount++;
      }
    }
    console.log(chalk.green(`\n✨ Cleaning completed! ${deletedCount} items deleted`));
  } catch (error) {
    console.error(chalk.red('Error during cleaning:'), error);
    process.exit(1);
  }
}
async function findGeneratedDirs(dir: string): Promise<string[]> {
  const entries = fs.readdirSync(path.join(projectDir, dir), { withFileTypes: true });
  let generatedDirs: string[] = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'generated') {
        generatedDirs.push(fullPath);
      }
      generatedDirs = [...generatedDirs, ...(await findGeneratedDirs(fullPath))];
    }
  }
  return generatedDirs;
}
cleanProject().catch((error) => {
  console.error(chalk.red('Fatal Error:'), error);
  process.exit(1);
});
#!/usr/bin/env node
import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';
import chalk from 'chalk';
const defaultGitignore = `# Dependencies
/node_modules
/.pnp
.pnp.js
# Testing
/coverage
# Production
/build
/dist
# Misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local
# Debug logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
# IDE
.idea/
.vscode/
*.swp
*.swo
# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db
# Optional npm cache directory
.npm
# Optional eslint cache
.eslintcache
# Optional REPL history
.node_repl_history
# Output of 'npm pack'
*.tgz
# Yarn Integrity file
.yarn-integrity`;
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const projectDir = process.cwd();
const projectName = path.basename(projectDir);
const args = process.argv.slice(2);
const commitMessage = args.join(' ');
async function askQuestion(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}
async function isGhInstalled(): Promise<boolean> {
  try {
    execSync('gh --version', { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
}
function createGitignore() {
  const gitignorePath = path.join(projectDir, '.gitignore');
  if (!fs.existsSync(gitignorePath)) {
    console.log(chalk.yellow('ℹ️  Creating default .gitignore file...'));
    fs.writeFileSync(gitignorePath, defaultGitignore);
    console.log(chalk.green('✅ Created .gitignore file'));
  }
}
async function commitAndPush() {
  if (!commitMessage) {
    console.error(chalk.red('❌ Commit message is required.'));
    process.exit(1);
  }
  try {
    console.log(chalk.cyan('🚀 Starting commit process...'));
    process.chdir(projectDir);
    console.log(chalk.gray(`📂 Working in: ${projectDir}`));
    const isNewRepo = !fs.existsSync(path.join(projectDir, '.git'));
    if (isNewRepo) {
      console.log(chalk.yellow('⚠️  No git repository found. Initializing...'));
      execSync('git init', { stdio: 'inherit' });
      console.log(chalk.green('✅ Git repository initialized.'));
      createGitignore();
    }
    createGitignore();
    const status = execSync('git status --porcelain').toString();
    if (!status) {
      console.log(chalk.yellow('ℹ️  No changes to commit.'));
      process.exit(0);
    }
    console.log(chalk.cyan('📝 Staging all changes...'));
    execSync('git add .', { stdio: 'inherit' });
    console.log(chalk.cyan('💾 Committing changes...'));
    execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
    if (await !isGhInstalled()) {
      console.log(
        chalk.yellow('⚠️  GitHub CLI (gh) is not installed. Skipping remote repository creation.')
      );
    } else {
      console.log(chalk.cyan('🔍 Checking for remote repository...'));
      try {
        execSync('gh repo view', { stdio: 'ignore' });
        console.log(chalk.green('✅ Remote repository found.'));
      } catch (error) {
        console.log(chalk.yellow('⚠️  No remote repository found. Creating...'));
        const makePrivate = await askQuestion(chalk.cyan('Make repository private? (y/n): '));
        const repoType = makePrivate.toLowerCase() === 'y' ? 'private' : 'public';
        execSync(`gh repo create ${projectName} --${repoType} --source=. --push`, {
          stdio: 'inherit',
        });
        console.log(chalk.green(`✅ Created ${repoType} repository: ${projectName} on GitHub`));
      }
    }
    try {
      execSync('git rev-parse --abbrev-ref --symbolic-full-name @{u}', { stdio: 'ignore' });
      console.log(chalk.cyan('⬆️  Pushing changes...'));
      execSync('git push', { stdio: 'inherit' });
    } catch (error) {
      const remoteName = 'origin';
      const branchName = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
      console.log(chalk.cyan(`⬆️  Setting upstream and pushing to ${remoteName}/${branchName}...`));
      execSync(`git push --set-upstream ${remoteName} ${branchName}`, { stdio: 'inherit' });
    }
    console.log(chalk.green('✅ Changes committed and pushed successfully!'));
  } catch (error) {
    console.error(chalk.red('❌ Error during commit and push:'), error);
    process.exit(1);
  } finally {
    rl.close();
  }
}
commitAndPush();
#!/usr/bin/env node
import { execSync } from 'child_process';
import * as readline from 'readline';
import chalk from 'chalk';
import * as fs from 'fs';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const [, , versionArg, commitMessageArg] = process.argv;
async function askQuestion(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}
function checkGitStatus(): boolean {
  try {
    const status = execSync('git status --porcelain').toString();
    return status.length === 0;
  } catch (error) {
    return false;
  }
}
function getCurrentBranch(): string {
  return execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
}
function validatePackageJson(): void {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const requiredFields = ['name', 'version', 'description', 'main', 'types'];
  for (const field of requiredFields) {
    if (!packageJson[field]) {
      throw new Error(`Missing required field in package.json: ${field}`);
    }
  }
}
async function selectVersionType(): Promise<string> {
  if (versionArg && ['patch', 'minor', 'major'].includes(versionArg)) {
    return versionArg;
  }
  console.log(chalk.cyan('\nSelect version increment type:'));
  console.log(chalk.gray('1. patch (1.0.0 -> 1.0.1)'));
  console.log(chalk.gray('2. minor (1.0.0 -> 1.1.0)'));
  console.log(chalk.gray('3. major (1.0.0 -> 2.0.0)'));
  const answer = await askQuestion('Enter your choice (1-3): ');
  const versionMap: { [key: string]: string } = {
    '1': 'patch',
    '2': 'minor',
    '3': 'major',
  };
  return versionMap[answer] || 'patch';
}
async function getCommitMessage(): Promise<string> {
  if (commitMessageArg) {
    return commitMessageArg;
  }
  const message = await askQuestion(chalk.cyan('Enter commit message: '));
  if (!message.trim()) {
    throw new Error('Commit message is required');
  }
  return message;
}
async function publishPackage() {
  try {
    console.log(chalk.cyan('\n🔍 Running pre-publish checks...\n'));
    console.log(chalk.cyan('📋 Validating package.json...'));
    validatePackageJson();
    console.log(chalk.green('✅ package.json is valid'));
    const currentBranch = getCurrentBranch();
    if (currentBranch !== 'main' && currentBranch !== 'master') {
      console.log(chalk.yellow(`⚠️  You're on branch '${currentBranch}'.`));
    }
    if (!checkGitStatus()) {
      console.log(chalk.yellow('⚠️  You have uncommitted changes'));
      const commitMessage = await getCommitMessage();
      execSync(`bun commit "${commitMessage}"`, { stdio: 'inherit' });
    }
    console.log(chalk.cyan('\n🧹 Cleaning project...'));
    execSync('bun clean', { stdio: 'inherit' });
    console.log(chalk.cyan('\n📦 Installing dependencies...'));
    execSync('bun install', { stdio: 'inherit' });
    console.log(chalk.cyan('\n🔨 Building project...'));
    execSync('bun run build', { stdio: 'inherit' });
    try {
      console.log(chalk.cyan('\n🧪 Running tests...'));
      execSync('bun test', { stdio: 'inherit' });
      console.log(chalk.green('✅ Tests passed'));
    } catch (error) {
      console.log(chalk.yellow('⚠️  No tests found or tests failed'));
    }
    const versionType = await selectVersionType();
    console.log(chalk.cyan(`\n📝 Incrementing ${versionType} version...`));
    execSync(`npm version ${versionType} --no-git-tag-version`, { stdio: 'inherit' });
    console.log(chalk.cyan('\n🚀 Publishing to npm...'));
    execSync('npm publish', { stdio: 'inherit' });
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const tagName = `v${packageJson.version}`;
    execSync(`git tag ${tagName}`, { stdio: 'inherit' });
    execSync('git push && git push --tags', { stdio: 'inherit' });
    console.log(chalk.green('\n✨ Package successfully published to npm!'));
    console.log(chalk.gray(`Version: ${packageJson.version}`));
    console.log(chalk.gray(`Tag: ${tagName}`));
  } catch (error) {
    console.error(chalk.red('\n❌ Error during publish process:'), error);
    process.exit(1);
  } finally {
    rl.close();
  }
}
publishPackage();
#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';
interface FileSection {
  filePath: string;
  start: number;
  end: number;
  content: string;
  created: boolean;
}
function splitFile(singleFilePath: string, markers: string[], outputDirPath?: string): void {
  if (!fs.existsSync(singleFilePath)) {
    console.error(chalk.red(`Error: File not found: ${singleFilePath}`));
    process.exit(1);
  }
  const fileContent = fs.readFileSync(singleFilePath, 'utf-8');
  const fileSections: FileSection[] = [];
  markers.forEach((marker) => {
    const fileRegex = new RegExp(`\\/\\/ ${marker}(.*?\\.ts)`, 'g');
    let match;
    while ((match = fileRegex.exec(fileContent)) !== null) {
      const filePath = match[1].trim();
      const start = match.index;
      fileSections.push({
        filePath,
        start,
        end: start, // Will be updated later
        content: '',
        created: false,
      });
    }
  });
  fileSections.sort((a, b) => a.start - b.start);
  for (let i = 0; i < fileSections.length; i++) {
    const currentSection = fileSections[i];
    const nextSection = fileSections[i + 1];
    currentSection.end = nextSection ? nextSection.start : fileContent.length;
    const markerLineEnd = fileContent.indexOf('\n', currentSection.start) + 1;
    currentSection.content = fileContent.substring(markerLineEnd, currentSection.end).trim();
  }
  fileSections.forEach((section) => {
    const { filePath, content } = section;
    const fileDir = outputDirPath
      ? path.resolve(outputDirPath, path.dirname(filePath))
      : path.resolve(path.dirname(filePath));
    const fileName = path.basename(filePath);
    const fullFilePath = path.join(fileDir, fileName);
    if (!fs.existsSync(fileDir)) {
      fs.mkdirSync(fileDir, { recursive: true });
    }
    fs.writeFileSync(fullFilePath, content);
    console.log(chalk.green(`Created: ${chalk.bold(fullFilePath)}`));
  });
  if (fileSections.length === 0 && fileContent.length > 0) {
    console.log(chalk.yellow('No marker path found in the file.'));
  }
  if (fileSections.length > 0) {
    console.log(chalk.cyan('\nFiles splitted successfully! ✨\n'));
    const openCommand =
      process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open';
    console.log(chalk.blue(`You can open the files with ${chalk.bold('CTRL+Click')}`));
  }
}
const args = process.argv.slice(2);
if (args.length === 0) {
  console.error(
    chalk.red('Usage: split source=<filePath> markers=<marker1,marker2,...> [outputDir=<path>]')
  );
  console.error(
    chalk.yellow('Example: split source=all-in-one.ts markers=src/,custom/ outputDir=./output')
  );
  process.exit(1);
}
const parsedArgs: { [key: string]: string } = {};
args.forEach((arg) => {
  const [key, value] = arg.split('=');
  if (key && value) {
    parsedArgs[key] = value;
  }
});
if (!parsedArgs.source || !parsedArgs.markers) {
  console.error(chalk.red('Error: source and markers parameters are required'));
  console.error(
    chalk.yellow('Example: split source=all-in-one.ts markers=src/,custom/ outputDir=./output')
  );
  process.exit(1);
}
const singleFilePath = parsedArgs.source;
const markers = parsedArgs.markers.split(',');
const outputDirPath = parsedArgs.outputDir;
splitFile(singleFilePath, markers, outputDirPath);
{
  "extends": "./tsconfig.json",
  "exclude": ["node_modules", "test", "dist", "scripts"],
  "compilerOptions": {
    "sourceMap": true,
    "declaration": true,
    "outDir": "./dist"
  }
}
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "declaration": true,
    "outDir": "./dist",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "rootDir": "./src",
    "typeRoots": ["./node_modules/@types", "./src/types"]
  },
  "include": ["src*.ts", "test*.ts"]
}
{
  "name": "alvamind-tools",
  "version": "1.0.22",
  "description": "CLI tools for generating source code documentation and git automation",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/alvamind/alvamind-tools.git"
  },
  "bin": {
    "alvamind": "./dist/cli.js",
    "generate-source": "./dist/tools/generate-source.js",
    "commit": "./dist/tools/commit.js",
    "clean": "./dist/tools/clean.js",
    "split-code": "./dist/tools/split-files.js",
    "publish-npm": "./dist/tools/npm-publish.js",
    "add-json-script": "./dist/add-json-script.js"
  },
  "scripts": {
    "alvamind": "bun src/cli.ts",
    "commit": "bun src/tools/commit.ts commit",
    "source": "bun src/tools/generate-source.ts --exclude=src/tests --output=docs.md",
    "split-code": "bun src/tools/split-files.ts source=all-in-one.ts markers=src/,custom/ outputDir=./output",
    "build": "tsc && tsc -p tsconfig.build.json && chmod +x dist/cli.js dist/toolsnode_modulesdist.gitgenerate-source.ts
- **/.zed-settings.json
- **/.vscode/settings.json
- **/package-lock.json
- **/bun.lockb
- **/buildnode_modulesdist.gitgenerate-source.ts
- **/.zed-settings.json
- **/.vscode/settings.json
- **/package-lock.json
- **/bun.lockb
- **/build*'); // await here
    expect(fs.existsSync(sourceFile)).toBe(true);
    const content = fs.readFileSync(sourceFile, 'utf-8');
    expect(content).not.toContain('// test.ts');
    expect(content).not.toContain('// src/nested.ts');
    expect(content).not.toContain('// test2.ts');
    expect(content).not.toContain('// src/nested2.ts');
  });
  test('should show help with no args', async () => { // async test
    const result = await runGenerateSource(); // await here
    expect(result).toContain("Usage:");
  });
  test('should show help with --help arg', async () => { // async test
    const result = await runGenerateSource('--help'); // await here
    expect(result).toContain("Usage:");
  });
  test('should return error with invalid arg', async () => { // async test
    try {
      await runGenerateSource('--invalid=arg'); // await here
    } catch (e: any) {
      expect(e.message).toContain("Args error:");
    }
  });
});
const c = 3;
const d = 4; 
 const a = 1;
 const b = 2;
#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import chalk from 'chalk';
const projectDir = process.cwd();
async function cleanProject() {
  const chalk = (await import('chalk')).default;
  const foldersToDelete = [
    '.bun',
    '.turbo',
    '.eslintcache',
    '.parcel-cache',
    'node_modules',
    '.next',
    '.cache',
    'dist',
    'build',
    'coverage',
    '.vite',
  ];
  const filesToDelete = [
    'bun.lockb',
    'yarn.lock',
    'package-lock.json',
    'pnpm-lock.yaml',
    '.DS_Store',
  ];
  let deletedCount = 0;
  try {
    for (const folder of foldersToDelete) {
      const fullPath = path.join(projectDir, folder);
      if (fs.existsSync(fullPath)) {
        fs.rmSync(fullPath, { recursive: true, force: true });
        console.log(`${chalk.green('✓')} Deleted folder: ${chalk.cyan(folder)}`);
        deletedCount++;
      }
    }
    for (const file of filesToDelete) {
      const fullPath = path.join(projectDir, file);
      if (fs.existsSync(fullPath)) {
        fs.rmSync(fullPath, { force: true });
        console.log(`${chalk.green('✓')} Deleted file: ${chalk.cyan(file)}`);
        deletedCount++;
      }
    }
    const generatedDirs = await findGeneratedDirs('.');
    for (const dir of generatedDirs) {
      const fullPath = path.join(projectDir, dir);
      if (fs.existsSync(fullPath)) {
        fs.rmSync(fullPath, { recursive: true, force: true });
        console.log(`${chalk.green('✓')} Deleted generated dir: ${chalk.cyan(dir)}`);
        deletedCount++;
      }
    }
    console.log(chalk.green(`\n✨ Cleaning completed! ${deletedCount} items deleted`));
  } catch (error) {
    console.error(chalk.red('Error during cleaning:'), error);
    process.exit(1);
  }
}
async function findGeneratedDirs(dir: string): Promise<string[]> {
  const entries = fs.readdirSync(path.join(projectDir, dir), { withFileTypes: true });
  let generatedDirs: string[] = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'generated') {
        generatedDirs.push(fullPath);
      }
      generatedDirs = [...generatedDirs, ...(await findGeneratedDirs(fullPath))];
    }
  }
  return generatedDirs;
}
cleanProject().catch((error) => {
  console.error(chalk.red('Fatal Error:'), error);
  process.exit(1);
});
#!/usr/bin/env node
import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';
import chalk from 'chalk';
const defaultGitignore = `# Dependencies
/node_modules
/.pnp
.pnp.js
# Testing
/coverage
# Production
/build
/dist
# Misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local
# Debug logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
# IDE
.idea/
.vscode/
*.swp
*.swo
# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db
# Optional npm cache directory
.npm
# Optional eslint cache
.eslintcache
# Optional REPL history
.node_repl_history
# Output of 'npm pack'
*.tgz
# Yarn Integrity file
.yarn-integrity`;
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const projectDir = process.cwd();
const projectName = path.basename(projectDir);
const args = process.argv.slice(2);
const commitMessage = args.join(' ');
async function askQuestion(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}
async function isGhInstalled(): Promise<boolean> {
  try {
    execSync('gh --version', { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
}
function createGitignore() {
  const gitignorePath = path.join(projectDir, '.gitignore');
  if (!fs.existsSync(gitignorePath)) {
    console.log(chalk.yellow('ℹ️  Creating default .gitignore file...'));
    fs.writeFileSync(gitignorePath, defaultGitignore);
    console.log(chalk.green('✅ Created .gitignore file'));
  }
}
async function commitAndPush() {
  if (!commitMessage) {
    console.error(chalk.red('❌ Commit message is required.'));
    process.exit(1);
  }
  try {
    console.log(chalk.cyan('🚀 Starting commit process...'));
    process.chdir(projectDir);
    console.log(chalk.gray(`📂 Working in: ${projectDir}`));
    const isNewRepo = !fs.existsSync(path.join(projectDir, '.git'));
    if (isNewRepo) {
      console.log(chalk.yellow('⚠️  No git repository found. Initializing...'));
      execSync('git init', { stdio: 'inherit' });
      console.log(chalk.green('✅ Git repository initialized.'));
      createGitignore();
    }
    createGitignore();
    const status = execSync('git status --porcelain').toString();
    if (!status) {
      console.log(chalk.yellow('ℹ️  No changes to commit.'));
      process.exit(0);
    }
    console.log(chalk.cyan('📝 Staging all changes...'));
    execSync('git add .', { stdio: 'inherit' });
    console.log(chalk.cyan('💾 Committing changes...'));
    execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
    if (await !isGhInstalled()) {
      console.log(
        chalk.yellow('⚠️  GitHub CLI (gh) is not installed. Skipping remote repository creation.')
      );
    } else {
      console.log(chalk.cyan('🔍 Checking for remote repository...'));
      try {
        execSync('gh repo view', { stdio: 'ignore' });
        console.log(chalk.green('✅ Remote repository found.'));
      } catch (error) {
        console.log(chalk.yellow('⚠️  No remote repository found. Creating...'));
        const makePrivate = await askQuestion(chalk.cyan('Make repository private? (y/n): '));
        const repoType = makePrivate.toLowerCase() === 'y' ? 'private' : 'public';
        execSync(`gh repo create ${projectName} --${repoType} --source=. --push`, {
          stdio: 'inherit',
        });
        console.log(chalk.green(`✅ Created ${repoType} repository: ${projectName} on GitHub`));
      }
    }
    try {
      execSync('git rev-parse --abbrev-ref --symbolic-full-name @{u}', { stdio: 'ignore' });
      console.log(chalk.cyan('⬆️  Pushing changes...'));
      execSync('git push', { stdio: 'inherit' });
    } catch (error) {
      const remoteName = 'origin';
      const branchName = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
      console.log(chalk.cyan(`⬆️  Setting upstream and pushing to ${remoteName}/${branchName}...`));
      execSync(`git push --set-upstream ${remoteName} ${branchName}`, { stdio: 'inherit' });
    }
    console.log(chalk.green('✅ Changes committed and pushed successfully!'));
  } catch (error) {
    console.error(chalk.red('❌ Error during commit and push:'), error);
    process.exit(1);
  } finally {
    rl.close();
  }
}
commitAndPush();
#!/usr/bin/env node
import { execSync } from 'child_process';
import * as readline from 'readline';
import chalk from 'chalk';
import * as fs from 'fs';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const [, , versionArg, commitMessageArg] = process.argv;
async function askQuestion(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}
function checkGitStatus(): boolean {
  try {
    const status = execSync('git status --porcelain').toString();
    return status.length === 0;
  } catch (error) {
    return false;
  }
}
function getCurrentBranch(): string {
  return execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
}
function validatePackageJson(): void {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const requiredFields = ['name', 'version', 'description', 'main', 'types'];
  for (const field of requiredFields) {
    if (!packageJson[field]) {
      throw new Error(`Missing required field in package.json: ${field}`);
    }
  }
}
async function selectVersionType(): Promise<string> {
  if (versionArg && ['patch', 'minor', 'major'].includes(versionArg)) {
    return versionArg;
  }
  console.log(chalk.cyan('\nSelect version increment type:'));
  console.log(chalk.gray('1. patch (1.0.0 -> 1.0.1)'));
  console.log(chalk.gray('2. minor (1.0.0 -> 1.1.0)'));
  console.log(chalk.gray('3. major (1.0.0 -> 2.0.0)'));
  const answer = await askQuestion('Enter your choice (1-3): ');
  const versionMap: { [key: string]: string } = {
    '1': 'patch',
    '2': 'minor',
    '3': 'major',
  };
  return versionMap[answer] || 'patch';
}
async function getCommitMessage(): Promise<string> {
  if (commitMessageArg) {
    return commitMessageArg;
  }
  const message = await askQuestion(chalk.cyan('Enter commit message: '));
  if (!message.trim()) {
    throw new Error('Commit message is required');
  }
  return message;
}
async function publishPackage() {
  try {
    console.log(chalk.cyan('\n🔍 Running pre-publish checks...\n'));
    console.log(chalk.cyan('📋 Validating package.json...'));
    validatePackageJson();
    console.log(chalk.green('✅ package.json is valid'));
    const currentBranch = getCurrentBranch();
    if (currentBranch !== 'main' && currentBranch !== 'master') {
      console.log(chalk.yellow(`⚠️  You're on branch '${currentBranch}'.`));
    }
    if (!checkGitStatus()) {
      console.log(chalk.yellow('⚠️  You have uncommitted changes'));
      const commitMessage = await getCommitMessage();
      execSync(`bun commit "${commitMessage}"`, { stdio: 'inherit' });
    }
    console.log(chalk.cyan('\n🧹 Cleaning project...'));
    execSync('bun clean', { stdio: 'inherit' });
    console.log(chalk.cyan('\n📦 Installing dependencies...'));
    execSync('bun install', { stdio: 'inherit' });
    console.log(chalk.cyan('\n🔨 Building project...'));
    execSync('bun run build', { stdio: 'inherit' });
    try {
      console.log(chalk.cyan('\n🧪 Running tests...'));
      execSync('bun test', { stdio: 'inherit' });
      console.log(chalk.green('✅ Tests passed'));
    } catch (error) {
      console.log(chalk.yellow('⚠️  No tests found or tests failed'));
    }
    const versionType = await selectVersionType();
    console.log(chalk.cyan(`\n📝 Incrementing ${versionType} version...`));
    execSync(`npm version ${versionType} --no-git-tag-version`, { stdio: 'inherit' });
    console.log(chalk.cyan('\n🚀 Publishing to npm...'));
    execSync('npm publish', { stdio: 'inherit' });
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const tagName = `v${packageJson.version}`;
    execSync(`git tag ${tagName}`, { stdio: 'inherit' });
    execSync('git push && git push --tags', { stdio: 'inherit' });
    console.log(chalk.green('\n✨ Package successfully published to npm!'));
    console.log(chalk.gray(`Version: ${packageJson.version}`));
    console.log(chalk.gray(`Tag: ${tagName}`));
  } catch (error) {
    console.error(chalk.red('\n❌ Error during publish process:'), error);
    process.exit(1);
  } finally {
    rl.close();
  }
}
publishPackage();
#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';
interface FileSection {
  filePath: string;
  start: number;
  end: number;
  content: string;
  created: boolean;
}
function splitFile(singleFilePath: string, markers: string[], outputDirPath?: string): void {
  if (!fs.existsSync(singleFilePath)) {
    console.error(chalk.red(`Error: File not found: ${singleFilePath}`));
    process.exit(1);
  }
  const fileContent = fs.readFileSync(singleFilePath, 'utf-8');
  const fileSections: FileSection[] = [];
  markers.forEach((marker) => {
    const fileRegex = new RegExp(`\\/\\/ ${marker}(.*?\\.ts)`, 'g');
    let match;
    while ((match = fileRegex.exec(fileContent)) !== null) {
      const filePath = match[1].trim();
      const start = match.index;
      fileSections.push({
        filePath,
        start,
        end: start, // Will be updated later
        content: '',
        created: false,
      });
    }
  });
  fileSections.sort((a, b) => a.start - b.start);
  for (let i = 0; i < fileSections.length; i++) {
    const currentSection = fileSections[i];
    const nextSection = fileSections[i + 1];
    currentSection.end = nextSection ? nextSection.start : fileContent.length;
    const markerLineEnd = fileContent.indexOf('\n', currentSection.start) + 1;
    currentSection.content = fileContent.substring(markerLineEnd, currentSection.end).trim();
  }
  fileSections.forEach((section) => {
    const { filePath, content } = section;
    const fileDir = outputDirPath
      ? path.resolve(outputDirPath, path.dirname(filePath))
      : path.resolve(path.dirname(filePath));
    const fileName = path.basename(filePath);
    const fullFilePath = path.join(fileDir, fileName);
    if (!fs.existsSync(fileDir)) {
      fs.mkdirSync(fileDir, { recursive: true });
    }
    fs.writeFileSync(fullFilePath, content);
    console.log(chalk.green(`Created: ${chalk.bold(fullFilePath)}`));
  });
  if (fileSections.length === 0 && fileContent.length > 0) {
    console.log(chalk.yellow('No marker path found in the file.'));
  }
  if (fileSections.length > 0) {
    console.log(chalk.cyan('\nFiles splitted successfully! ✨\n'));
    const openCommand =
      process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open';
    console.log(chalk.blue(`You can open the files with ${chalk.bold('CTRL+Click')}`));
  }
}
const args = process.argv.slice(2);
if (args.length === 0) {
  console.error(
    chalk.red('Usage: split source=<filePath> markers=<marker1,marker2,...> [outputDir=<path>]')
  );
  console.error(
    chalk.yellow('Example: split source=all-in-one.ts markers=src/,custom/ outputDir=./output')
  );
  process.exit(1);
}
const parsedArgs: { [key: string]: string } = {};
args.forEach((arg) => {
  const [key, value] = arg.split('=');
  if (key && value) {
    parsedArgs[key] = value;
  }
});
if (!parsedArgs.source || !parsedArgs.markers) {
  console.error(chalk.red('Error: source and markers parameters are required'));
  console.error(
    chalk.yellow('Example: split source=all-in-one.ts markers=src/,custom/ outputDir=./output')
  );
  process.exit(1);
}
const singleFilePath = parsedArgs.source;
const markers = parsedArgs.markers.split(',');
const outputDirPath = parsedArgs.outputDir;
splitFile(singleFilePath, markers, outputDirPath);
{
  "extends": "./tsconfig.json",
  "exclude": ["node_modules", "test", "dist", "scripts"],
  "compilerOptions": {
    "sourceMap": true,
    "declaration": true,
    "outDir": "./dist"
  }
}
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "declaration": true,
    "outDir": "./dist",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "rootDir": "./src",
    "typeRoots": ["./node_modules/@types", "./src/types"]
  },
  "include": ["src*.ts", "test*.ts"]
}
{
  "name": "alvamind-tools",
  "version": "1.0.22",
  "description": "CLI tools for generating source code documentation and git automation",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/alvamind/alvamind-tools.git"
  },
  "bin": {
    "alvamind": "./dist/cli.js",
    "generate-source": "./dist/tools/generate-source.js",
    "commit": "./dist/tools/commit.js",
    "clean": "./dist/tools/clean.js",
    "split-code": "./dist/tools/split-files.js",
    "publish-npm": "./dist/tools/npm-publish.js",
    "add-json-script": "./dist/add-json-script.js"
  },
  "scripts": {
    "alvamind": "bun src/cli.ts",
    "commit": "bun src/tools/commit.ts commit",
    "source": "bun src/tools/generate-source.ts --exclude=src/tests --output=docs.md",
    "split-code": "bun src/tools/split-files.ts source=all-in-one.ts markers=src/,custom/ outputDir=./output",
    "build": "tsc && tsc -p tsconfig.build.json && chmod +x dist/cli.js dist/tools*'); // await here
    expect(fs.existsSync(sourceFile)).toBe(true);
    const content = fs.readFileSync(sourceFile, 'utf-8');
    expect(content).not.toContain('// test.ts');
    expect(content).not.toContain('// src/nested.ts');
    expect(content).not.toContain('// test2.ts');
    expect(content).not.toContain('// src/nested2.ts');
  });
  test('should show help with no args', async () => { // async test
    const result = await runGenerateSource(); // await here
    expect(result).toContain("Usage:");
  });
  test('should show help with --help arg', async () => { // async test
    const result = await runGenerateSource('--help'); // await here
    expect(result).toContain("Usage:");
  });
  test('should return error with invalid arg', async () => { // async test
    try {
      await runGenerateSource('--invalid=arg'); // await here
    } catch (e: any) {
      expect(e.message).toContain("Args error:");
    }
  });
});
const c = 3;
const d = 4; 
 const a = 1;
 const b = 2;
#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import chalk from 'chalk';
const projectDir = process.cwd();
async function cleanProject() {
  const chalk = (await import('chalk')).default;
  const foldersToDelete = [
    '.bun',
    '.turbo',
    '.eslintcache',
    '.parcel-cache',
    'node_modules',
    '.next',
    '.cache',
    'dist',
    'build',
    'coverage',
    '.vite',
  ];
  const filesToDelete = [
    'bun.lockb',
    'yarn.lock',
    'package-lock.json',
    'pnpm-lock.yaml',
    '.DS_Store',
  ];
  let deletedCount = 0;
  try {
    for (const folder of foldersToDelete) {
      const fullPath = path.join(projectDir, folder);
      if (fs.existsSync(fullPath)) {
        fs.rmSync(fullPath, { recursive: true, force: true });
        console.log(`${chalk.green('✓')} Deleted folder: ${chalk.cyan(folder)}`);
        deletedCount++;
      }
    }
    for (const file of filesToDelete) {
      const fullPath = path.join(projectDir, file);
      if (fs.existsSync(fullPath)) {
        fs.rmSync(fullPath, { force: true });
        console.log(`${chalk.green('✓')} Deleted file: ${chalk.cyan(file)}`);
        deletedCount++;
      }
    }
    const generatedDirs = await findGeneratedDirs('.');
    for (const dir of generatedDirs) {
      const fullPath = path.join(projectDir, dir);
      if (fs.existsSync(fullPath)) {
        fs.rmSync(fullPath, { recursive: true, force: true });
        console.log(`${chalk.green('✓')} Deleted generated dir: ${chalk.cyan(dir)}`);
        deletedCount++;
      }
    }
    console.log(chalk.green(`\n✨ Cleaning completed! ${deletedCount} items deleted`));
  } catch (error) {
    console.error(chalk.red('Error during cleaning:'), error);
    process.exit(1);
  }
}
async function findGeneratedDirs(dir: string): Promise<string[]> {
  const entries = fs.readdirSync(path.join(projectDir, dir), { withFileTypes: true });
  let generatedDirs: string[] = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'generated') {
        generatedDirs.push(fullPath);
      }
      generatedDirs = [...generatedDirs, ...(await findGeneratedDirs(fullPath))];
    }
  }
  return generatedDirs;
}
cleanProject().catch((error) => {
  console.error(chalk.red('Fatal Error:'), error);
  process.exit(1);
});
#!/usr/bin/env node
import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';
import chalk from 'chalk';
const defaultGitignore = `# Dependencies
/node_modules
/.pnp
.pnp.js
# Testing
/coverage
# Production
/build
/dist
# Misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local
# Debug logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
# IDE
.idea/
.vscode/
*.swp
*.swo
# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db
# Optional npm cache directory
.npm
# Optional eslint cache
.eslintcache
# Optional REPL history
.node_repl_history
# Output of 'npm pack'
*.tgz
# Yarn Integrity file
.yarn-integrity`;
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const projectDir = process.cwd();
const projectName = path.basename(projectDir);
const args = process.argv.slice(2);
const commitMessage = args.join(' ');
async function askQuestion(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}
async function isGhInstalled(): Promise<boolean> {
  try {
    execSync('gh --version', { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
}
function createGitignore() {
  const gitignorePath = path.join(projectDir, '.gitignore');
  if (!fs.existsSync(gitignorePath)) {
    console.log(chalk.yellow('ℹ️  Creating default .gitignore file...'));
    fs.writeFileSync(gitignorePath, defaultGitignore);
    console.log(chalk.green('✅ Created .gitignore file'));
  }
}
async function commitAndPush() {
  if (!commitMessage) {
    console.error(chalk.red('❌ Commit message is required.'));
    process.exit(1);
  }
  try {
    console.log(chalk.cyan('🚀 Starting commit process...'));
    process.chdir(projectDir);
    console.log(chalk.gray(`📂 Working in: ${projectDir}`));
    const isNewRepo = !fs.existsSync(path.join(projectDir, '.git'));
    if (isNewRepo) {
      console.log(chalk.yellow('⚠️  No git repository found. Initializing...'));
      execSync('git init', { stdio: 'inherit' });
      console.log(chalk.green('✅ Git repository initialized.'));
      createGitignore();
    }
    createGitignore();
    const status = execSync('git status --porcelain').toString();
    if (!status) {
      console.log(chalk.yellow('ℹ️  No changes to commit.'));
      process.exit(0);
    }
    console.log(chalk.cyan('📝 Staging all changes...'));
    execSync('git add .', { stdio: 'inherit' });
    console.log(chalk.cyan('💾 Committing changes...'));
    execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
    if (await !isGhInstalled()) {
      console.log(
        chalk.yellow('⚠️  GitHub CLI (gh) is not installed. Skipping remote repository creation.')
      );
    } else {
      console.log(chalk.cyan('🔍 Checking for remote repository...'));
      try {
        execSync('gh repo view', { stdio: 'ignore' });
        console.log(chalk.green('✅ Remote repository found.'));
      } catch (error) {
        console.log(chalk.yellow('⚠️  No remote repository found. Creating...'));
        const makePrivate = await askQuestion(chalk.cyan('Make repository private? (y/n): '));
        const repoType = makePrivate.toLowerCase() === 'y' ? 'private' : 'public';
        execSync(`gh repo create ${projectName} --${repoType} --source=. --push`, {
          stdio: 'inherit',
        });
        console.log(chalk.green(`✅ Created ${repoType} repository: ${projectName} on GitHub`));
      }
    }
    try {
      execSync('git rev-parse --abbrev-ref --symbolic-full-name @{u}', { stdio: 'ignore' });
      console.log(chalk.cyan('⬆️  Pushing changes...'));
      execSync('git push', { stdio: 'inherit' });
    } catch (error) {
      const remoteName = 'origin';
      const branchName = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
      console.log(chalk.cyan(`⬆️  Setting upstream and pushing to ${remoteName}/${branchName}...`));
      execSync(`git push --set-upstream ${remoteName} ${branchName}`, { stdio: 'inherit' });
    }
    console.log(chalk.green('✅ Changes committed and pushed successfully!'));
  } catch (error) {
    console.error(chalk.red('❌ Error during commit and push:'), error);
    process.exit(1);
  } finally {
    rl.close();
  }
}
commitAndPush();
#!/usr/bin/env node
import { execSync } from 'child_process';
import * as readline from 'readline';
import chalk from 'chalk';
import * as fs from 'fs';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const [, , versionArg, commitMessageArg] = process.argv;
async function askQuestion(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}
function checkGitStatus(): boolean {
  try {
    const status = execSync('git status --porcelain').toString();
    return status.length === 0;
  } catch (error) {
    return false;
  }
}
function getCurrentBranch(): string {
  return execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
}
function validatePackageJson(): void {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const requiredFields = ['name', 'version', 'description', 'main', 'types'];
  for (const field of requiredFields) {
    if (!packageJson[field]) {
      throw new Error(`Missing required field in package.json: ${field}`);
    }
  }
}
async function selectVersionType(): Promise<string> {
  if (versionArg && ['patch', 'minor', 'major'].includes(versionArg)) {
    return versionArg;
  }
  console.log(chalk.cyan('\nSelect version increment type:'));
  console.log(chalk.gray('1. patch (1.0.0 -> 1.0.1)'));
  console.log(chalk.gray('2. minor (1.0.0 -> 1.1.0)'));
  console.log(chalk.gray('3. major (1.0.0 -> 2.0.0)'));
  const answer = await askQuestion('Enter your choice (1-3): ');
  const versionMap: { [key: string]: string } = {
    '1': 'patch',
    '2': 'minor',
    '3': 'major',
  };
  return versionMap[answer] || 'patch';
}
async function getCommitMessage(version: string): Promise<string> {
  if (commitMessageArg) {
    return commitMessageArg;
  }
  const defaultMessage = `chore: release v${version}`;
  const message = await askQuestion(
    chalk.cyan(`Enter commit message (default: "${defaultMessage}"): `)
  );
  return message.trim() || defaultMessage;
}
async function publishPackage() {
  try {
    console.log(chalk.cyan('\n🔍 Running pre-publish checks...\n'));
    console.log(chalk.cyan('📋 Validating package.json...'));
    validatePackageJson();
    console.log(chalk.green('✅ package.json is valid'));
    const currentBranch = getCurrentBranch();
    if (currentBranch !== 'main' && currentBranch !== 'master') {
      console.log(chalk.yellow(`⚠️  You're on branch '${currentBranch}'.`));
    }
    console.log(chalk.cyan('\n🧹 Cleaning project...'));
    execSync('bun clean', { stdio: 'inherit' });
    console.log(chalk.cyan('\n📦 Installing dependencies...'));
    execSync('bun install', { stdio: 'inherit' });
    console.log(chalk.cyan('\n🔨 Building project...'));
    execSync('bun run build', { stdio: 'inherit' });
    try {
      console.log(chalk.cyan('\n🧪 Running tests...'));
      execSync('bun test', { stdio: 'inherit' });
      console.log(chalk.green('✅ Tests passed'));
    } catch (error) {
      console.log(chalk.yellow('⚠️  No tests found or tests failed'));
    }
    const versionType = await selectVersionType();
    console.log(chalk.cyan(`\n📝 Incrementing ${versionType} version...`));
    execSync(`npm version ${versionType} --no-git-tag-version`, { stdio: 'inherit' });
    console.log(chalk.cyan('\n🚀 Publishing to npm...'));
    execSync('npm publish', { stdio: 'inherit' });
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const newVersion = packageJson.version;
    const tagName = `v${newVersion}`;
    const commitMessage = await getCommitMessage(newVersion);
    console.log(chalk.cyan('\n📝 Committing changes...'));
    execSync(`bun commit "${commitMessage}"`, { stdio: 'inherit' });
    console.log(chalk.cyan('\n🏷️  Creating and pushing tag...'));
    execSync(`git tag ${tagName}`, { stdio: 'inherit' });
    execSync('git push --tags', { stdio: 'inherit' });
    console.log(chalk.green('\n✨ Package successfully published to npm!'));
    console.log(chalk.gray(`Version: ${newVersion}`));
    console.log(chalk.gray(`Tag: ${tagName}`));
    console.log(chalk.gray(`Commit: ${commitMessage}`));
  } catch (error) {
    console.error(chalk.red('\n❌ Error during publish process:'), error);
    process.exit(1);
  } finally {
    rl.close();
  }
}
publishPackage();
#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';
interface FileSection {
  filePath: string;
  start: number;
  end: number;
  content: string;
  created: boolean;
}
function splitFile(singleFilePath: string, markers: string[], outputDirPath?: string): void {
  if (!fs.existsSync(singleFilePath)) {
    console.error(chalk.red(`Error: File not found: ${singleFilePath}`));
    process.exit(1);
  }
  const fileContent = fs.readFileSync(singleFilePath, 'utf-8');
  const fileSections: FileSection[] = [];
  markers.forEach((marker) => {
    const fileRegex = new RegExp(`\\/\\/ ${marker}(.*?\\.ts)`, 'g');
    let match;
    while ((match = fileRegex.exec(fileContent)) !== null) {
      const filePath = match[1].trim();
      const start = match.index;
      fileSections.push({
        filePath,
        start,
        end: start, // Will be updated later
        content: '',
        created: false,
      });
    }
  });
  fileSections.sort((a, b) => a.start - b.start);
  for (let i = 0; i < fileSections.length; i++) {
    const currentSection = fileSections[i];
    const nextSection = fileSections[i + 1];
    currentSection.end = nextSection ? nextSection.start : fileContent.length;
    const markerLineEnd = fileContent.indexOf('\n', currentSection.start) + 1;
    currentSection.content = fileContent.substring(markerLineEnd, currentSection.end).trim();
  }
  fileSections.forEach((section) => {
    const { filePath, content } = section;
    const fileDir = outputDirPath
      ? path.resolve(outputDirPath, path.dirname(filePath))
      : path.resolve(path.dirname(filePath));
    const fileName = path.basename(filePath);
    const fullFilePath = path.join(fileDir, fileName);
    if (!fs.existsSync(fileDir)) {
      fs.mkdirSync(fileDir, { recursive: true });
    }
    fs.writeFileSync(fullFilePath, content);
    console.log(chalk.green(`Created: ${chalk.bold(fullFilePath)}`));
  });
  if (fileSections.length === 0 && fileContent.length > 0) {
    console.log(chalk.yellow('No marker path found in the file.'));
  }
  if (fileSections.length > 0) {
    console.log(chalk.cyan('\nFiles splitted successfully! ✨\n'));
    const openCommand =
      process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open';
    console.log(chalk.blue(`You can open the files with ${chalk.bold('CTRL+Click')}`));
  }
}
const args = process.argv.slice(2);
if (args.length === 0) {
  console.error(
    chalk.red('Usage: split source=<filePath> markers=<marker1,marker2,...> [outputDir=<path>]')
  );
  console.error(
    chalk.yellow('Example: split source=all-in-one.ts markers=src/,custom/ outputDir=./output')
  );
  process.exit(1);
}
const parsedArgs: { [key: string]: string } = {};
args.forEach((arg) => {
  const [key, value] = arg.split('=');
  if (key && value) {
    parsedArgs[key] = value;
  }
});
if (!parsedArgs.source || !parsedArgs.markers) {
  console.error(chalk.red('Error: source and markers parameters are required'));
  console.error(
    chalk.yellow('Example: split source=all-in-one.ts markers=src/,custom/ outputDir=./output')
  );
  process.exit(1);
}
const singleFilePath = parsedArgs.source;
const markers = parsedArgs.markers.split(',');
const outputDirPath = parsedArgs.outputDir;
splitFile(singleFilePath, markers, outputDirPath);
{
  "extends": "./tsconfig.json",
  "exclude": ["node_modules", "test", "dist", "scripts"],
  "compilerOptions": {
    "sourceMap": true,
    "declaration": true,
    "outDir": "./dist"
  }
}
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "declaration": true,
    "outDir": "./dist",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "rootDir": "./src",
    "typeRoots": ["./node_modules/@types", "./src/types"]
  },
  "include": ["src*.ts", "test*.ts"]
}
#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';
const projectDir = process.cwd();
const exampleScripts = {
    'source': 'generate-source output=documentation.md exclude=dist/,node_modules/,.git/',
    'commit': 'commit',
    'clean': 'clean',
    'split-code': 'split-code source=combined.ts markers=src/,lib/ outputDir=./output',
    'publish-npm': 'publish-npm patch'
};
async function addScriptsToPackageJson() {
    try {
        const packageJsonPath = path.join(projectDir, 'package.json');
        if (!fs.existsSync(packageJsonPath)) {
            console.error(chalk.red('❌ package.json not found in the current directory'));
            process.exit(1);
        }
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        if (!packageJson.scripts) {
            packageJson.scripts = {};
        }
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
#!/usr/bin/env node
import chalk from 'chalk';
const showHelp = () => {
  console.log(`
${chalk.bold.blue('Alvamind Tools')} - CLI utilities for code generation and git automation
${chalk.bold('Usage:')}
  ${chalk.cyan()} ${chalk.green('<command>')} [options]
${chalk.bold('Commands:')}
  ${chalk.green('alvamind')}          Show this
  ${chalk.green('generate-source')}   Generate source code documentation
  ${chalk.green('commit')}            Automate git commits
  ${chalk.green('clean')}             Clean project files
  ${chalk.green('split-code')}        Split code files
  ${chalk.green('publish-npm')}       Publish to npm
  ${chalk.green('add-json-script')}   Add scripts to package.json
${chalk.bold('Examples:')}
${chalk.bold('1. Generate Source Code Documentation:')}
   $ ${chalk.cyan('generate-source')} --include=src/,scripts/ --exclude=tests/ --output=docs.md
   $ ${chalk.cyan('generate-source')} --preserve-blank-lines --preserve-comments
   ${chalk.yellow('Options:')}
   --include=<paths>         Comma-separated list of paths to include
   --exclude=<paths>         Comma-separated list of paths to exclude
   --output=<filename>       Output filename (default: source-code.md)
   --preserve-blank-lines    Preserve blank lines in output
   --preserve-comments       Preserve comments in output
${chalk.bold('2. Commit Changes:')}
   $ ${chalk.cyan('commit')} "feat: add new feature"
   $ ${chalk.cyan('commit')} "fix: resolve bug in login"
   ${chalk.gray('- Automatically initializes git repository if needed')}
   ${chalk.gray('- Creates .gitignore if missing')}
   ${chalk.gray('- Creates GitHub repository if gh CLI is installed')}
   ${chalk.gray('- Commits and pushes changes')}
${chalk.bold('3. Clean Project:')}
   $ ${chalk.cyan('clean')}
   ${chalk.gray('Removes common development artifacts:')}
   ${chalk.gray('- node_modules, dist, build directories')}
   ${chalk.gray('- Lock files (package-lock.json, yarn.lock, etc.)')}
   ${chalk.gray('- Cache directories (.cache, .parcel-cache, etc.)')}
   ${chalk.gray('- Generated directories')}
${chalk.bold('4. Split Code Files:')}
   $ ${chalk.cyan('split-code')} source=combined.ts markers=src/,lib/ outputDir=./output
   ${chalk.yellow('Options:')}
   source=<file>     Source file to split
   markers=<paths>   Comma-separated list of path markers
   outputDir=<path>  Output directory for split files
${chalk.bold('5. Publish to NPM:')}
   $ ${chalk.cyan('publish-npm')} patch "fix: update dependencies"
   $ ${chalk.cyan('publish-npm')} minor "feat: add new feature"
   ${chalk.yellow('Arguments:')}
   First:   Version type (patch|minor|major)
   Second:  Commit message (optional)
${chalk.bold('Options:')}
  --help, -h        Show this help message
  --version, -v     Show version number
${chalk.italic('For more detailed information about a specific command, run:')}
  ${chalk.cyan('alvamind')} ${chalk.green('<command>')} --help
`);
};
const showVersion = () => {
  const packageJson = require('../package.json');
  console.log(chalk.bold(`v${packageJson.version}`));
};
const args = process.argv.slice(2);
if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
  showHelp();
} else if (args.includes('--version') || args.includes('-v')) {
  showVersion();
} else {
  console.log(
    chalk.red(`Unknown command. Run '${chalk.cyan('alvamind --help')}' for usage information.`)
  );
}
export * from './tools/generate-source';
export * from './tools/commit';
export * from './tools/clean';
export * from './tools/split-files';
export * from './tools/npm-publish';
export * from './add-json-script';
import { describe, test, expect, beforeAll, afterAll, beforeEach, afterEach } from 'bun:test';
import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
const testDir = path.join(__dirname, 'test-temp');
const sourceFile = path.join(testDir, 'source-code.md');
async function runGenerateSource(args: string = ''): Promise<string> { // make async and return Promise<string>
  try {
    const projectRoot = path.join(__dirname, '..', '..'); // Adjust based on your actual project structure
    const scriptPath = path.join(projectRoot, 'src', 'tools', 'generate-source.ts');
    const command = `bun ${scriptPath} ${args}`; // Use absolute path
    return execSync(command, { encoding: 'utf-8', cwd: projectRoot }); // Set cwd
  } catch (error: any) {
    console.error('Error executing command:', error.stdout || error);
    throw new Error(`Failed to execute generate-source: ${error.message || error.stdout || error}`);
  }
}
function createTempFile(filePath: string, content: string): void {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  fs.writeFileSync(filePath, content)
}
beforeAll(() => {
  fs.mkdirSync(testDir, { recursive: true })
  createTempFile(path.join(testDir, 'test.ts'), '// Test file\n const a = 1;');
  createTempFile(path.join(testDir, 'test2.ts'), ' \n const b = 2;');
  createTempFile(path.join(testDir, 'src', 'nested.ts'), 'const c = 3;\n\n// This is nested');
  createTempFile(path.join(testDir, 'src', 'nested2.ts'), 'const d = 4; \n // Second nested')
});
afterAll(() => {
  if (fs.existsSync(testDir)) {
    fs.rmSync(testDir, { recursive: true, force: true });
  }
});
beforeEach(() => {
  if (fs.existsSync(sourceFile)) {
    fs.rmSync(sourceFile);
  }
});
afterEach(() => {
  if (fs.existsSync(sourceFile)) {
    fs.rmSync(sourceFile);
  }
});
describe('generate-source.ts Parameter Testing', () => {
  test('should generate source code documentation with default options', async () => { // async test
    await runGenerateSource(); // await here
    expect(fs.existsSync(sourceFile)).toBe(true);
    const content = fs.readFileSync(sourceFile, 'utf-8');
    expect(content).toContain('// test.ts');
    expect(content).toContain('// test2.ts');
    expect(content).toContain('// src/nested.ts');
    expect(content).toContain('// src/nested2.ts');
  });
  describe('--include parameter', () => {
    test('should include a single file', async () => { // async test
      await runGenerateSource('--include=test.ts'); // await here
      expect(fs.existsSync(sourceFile)).toBe(true);
      const content = fs.readFileSync(sourceFile, 'utf-8');
      expect(content).toContain('// test.ts');
      expect(content).not.toContain('// test2.ts');
      expect(content).not.toContain('// src/nested.ts');
      expect(content).not.toContain('// src/nested2.ts');
    });
    test('should include multiple files', async () => { // async test
      await runGenerateSource('--include=test.ts,test2.ts'); // await here
      expect(fs.existsSync(sourceFile)).toBe(true);
      const content = fs.readFileSync(sourceFile, 'utf-8');
      expect(content).toContain('// test.ts');
      expect(content).toContain('// test2.ts');
      expect(content).not.toContain('// src/nested.ts');
      expect(content).not.toContain('// src/nested2.ts');
    });
    test('should include a nested file', async () => { // async test
      await runGenerateSource('--include=src/nested.ts'); // await here
      expect(fs.existsSync(sourceFile)).toBe(true);
      const content = fs.readFileSync(sourceFile, 'utf-8');
      expect(content).toContain('// src/nested.ts');
      expect(content).not.toContain('// test.ts');
      expect(content).not.toContain('// test2.ts');
      expect(content).not.toContain('// src/nested2.ts');
    });
    test('should include multiple nested files', async () => { // async test
      await runGenerateSource('--include=src/nested.ts,src/nested2.ts'); // await here
      expect(fs.existsSync(sourceFile)).toBe(true);
      const content = fs.readFileSync(sourceFile, 'utf-8');
      expect(content).toContain('// src/nested.ts');
      expect(content).toContain('// src/nested2.ts');
      expect(content).not.toContain('// test.ts');
      expect(content).not.toContain('// test2.ts');
    });
    test('should handle glob patterns', async () => { // async test
      await runGenerateSource('--include=src');
      expect(content).toContain('// Test file');
      expect(content).toContain('// This is nested');
      expect(content).toContain('// Second nested');
    });
  });
  test('should handle missing files gracefully', async () => { // async test
    const result = await runGenerateSource('--include=nonexistent.ts'); // await here
    expect(result).toContain("Found 0 files");
  });
  test('should handle no files gracefully', async () => { // async test
    await runGenerateSource('--exclude=**node_modulesdist.gitgenerate-source.ts
- **/.zed-settings.json
- **/.vscode/settings.json
- **/package-lock.json
- **/bun.lockb
- **/build*'); // await here
    expect(fs.existsSync(sourceFile)).toBe(true);
    const content = fs.readFileSync(sourceFile, 'utf-8');
    expect(content).not.toContain('// test.ts');
    expect(content).not.toContain('// src/nested.ts');
    expect(content).not.toContain('// test2.ts');
    expect(content).not.toContain('// src/nested2.ts');
  });
  test('should show help with no args', async () => { // async test
    const result = await runGenerateSource(); // await here
    expect(result).toContain("Usage:");
  });
  test('should show help with --help arg', async () => { // async test
    const result = await runGenerateSource('--help'); // await here
    expect(result).toContain("Usage:");
  });
  test('should return error with invalid arg', async () => { // async test
    try {
      await runGenerateSource('--invalid=arg'); // await here
    } catch (e: any) {
      expect(e.message).toContain("Args error:");
    }
  });
});
const c = 3;
const d = 4; 
 const a = 1;
 const b = 2;
#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import chalk from 'chalk';
const projectDir = process.cwd();
async function cleanProject() {
  const chalk = (await import('chalk')).default;
  const foldersToDelete = [
    '.bun',
    '.turbo',
    '.eslintcache',
    '.parcel-cache',
    'node_modules',
    '.next',
    '.cache',
    'dist',
    'build',
    'coverage',
    '.vite',
  ];
  const filesToDelete = [
    'bun.lockb',
    'yarn.lock',
    'package-lock.json',
    'pnpm-lock.yaml',
    '.DS_Store',
  ];
  let deletedCount = 0;
  try {
    for (const folder of foldersToDelete) {
      const fullPath = path.join(projectDir, folder);
      if (fs.existsSync(fullPath)) {
        fs.rmSync(fullPath, { recursive: true, force: true });
        console.log(`${chalk.green('✓')} Deleted folder: ${chalk.cyan(folder)}`);
        deletedCount++;
      }
    }
    for (const file of filesToDelete) {
      const fullPath = path.join(projectDir, file);
      if (fs.existsSync(fullPath)) {
        fs.rmSync(fullPath, { force: true });
        console.log(`${chalk.green('✓')} Deleted file: ${chalk.cyan(file)}`);
        deletedCount++;
      }
    }
    const generatedDirs = await findGeneratedDirs('.');
    for (const dir of generatedDirs) {
      const fullPath = path.join(projectDir, dir);
      if (fs.existsSync(fullPath)) {
        fs.rmSync(fullPath, { recursive: true, force: true });
        console.log(`${chalk.green('✓')} Deleted generated dir: ${chalk.cyan(dir)}`);
        deletedCount++;
      }
    }
    console.log(chalk.green(`\n✨ Cleaning completed! ${deletedCount} items deleted`));
  } catch (error) {
    console.error(chalk.red('Error during cleaning:'), error);
    process.exit(1);
  }
}
async function findGeneratedDirs(dir: string): Promise<string[]> {
  const entries = fs.readdirSync(path.join(projectDir, dir), { withFileTypes: true });
  let generatedDirs: string[] = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'generated') {
        generatedDirs.push(fullPath);
      }
      generatedDirs = [...generatedDirs, ...(await findGeneratedDirs(fullPath))];
    }
  }
  return generatedDirs;
}
cleanProject().catch((error) => {
  console.error(chalk.red('Fatal Error:'), error);
  process.exit(1);
});
#!/usr/bin/env node
import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';
import chalk from 'chalk';
const defaultGitignore = `# Dependencies
/node_modules
/.pnp
.pnp.js
# Testing
/coverage
# Production
/build
/dist
# Misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local
# Debug logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
# IDE
.idea/
.vscode/
*.swp
*.swo
# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db
# Optional npm cache directory
.npm
# Optional eslint cache
.eslintcache
# Optional REPL history
.node_repl_history
# Output of 'npm pack'
*.tgz
# Yarn Integrity file
.yarn-integrity`;
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const projectDir = process.cwd();
const projectName = path.basename(projectDir);
const args = process.argv.slice(2);
const commitMessage = args.join(' ');
async function askQuestion(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}
async function isGhInstalled(): Promise<boolean> {
  try {
    execSync('gh --version', { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
}
function createGitignore() {
  const gitignorePath = path.join(projectDir, '.gitignore');
  if (!fs.existsSync(gitignorePath)) {
    console.log(chalk.yellow('ℹ️  Creating default .gitignore file...'));
    fs.writeFileSync(gitignorePath, defaultGitignore);
    console.log(chalk.green('✅ Created .gitignore file'));
  }
}
async function commitAndPush() {
  if (!commitMessage) {
    console.error(chalk.red('❌ Commit message is required.'));
    process.exit(1);
  }
  try {
    console.log(chalk.cyan('🚀 Starting commit process...'));
    process.chdir(projectDir);
    console.log(chalk.gray(`📂 Working in: ${projectDir}`));
    const isNewRepo = !fs.existsSync(path.join(projectDir, '.git'));
    if (isNewRepo) {
      console.log(chalk.yellow('⚠️  No git repository found. Initializing...'));
      execSync('git init', { stdio: 'inherit' });
      console.log(chalk.green('✅ Git repository initialized.'));
      createGitignore();
    }
    createGitignore();
    const status = execSync('git status --porcelain').toString();
    if (!status) {
      console.log(chalk.yellow('ℹ️  No changes to commit.'));
      process.exit(0);
    }
    console.log(chalk.cyan('📝 Staging all changes...'));
    execSync('git add .', { stdio: 'inherit' });
    console.log(chalk.cyan('💾 Committing changes...'));
    execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
    if (await !isGhInstalled()) {
      console.log(
        chalk.yellow('⚠️  GitHub CLI (gh) is not installed. Skipping remote repository creation.')
      );
    } else {
      console.log(chalk.cyan('🔍 Checking for remote repository...'));
      try {
        execSync('gh repo view', { stdio: 'ignore' });
        console.log(chalk.green('✅ Remote repository found.'));
      } catch (error) {
        console.log(chalk.yellow('⚠️  No remote repository found. Creating...'));
        const makePrivate = await askQuestion(chalk.cyan('Make repository private? (y/n): '));
        const repoType = makePrivate.toLowerCase() === 'y' ? 'private' : 'public';
        execSync(`gh repo create ${projectName} --${repoType} --source=. --push`, {
          stdio: 'inherit',
        });
        console.log(chalk.green(`✅ Created ${repoType} repository: ${projectName} on GitHub`));
      }
    }
    try {
      execSync('git rev-parse --abbrev-ref --symbolic-full-name @{u}', { stdio: 'ignore' });
      console.log(chalk.cyan('⬆️  Pushing changes...'));
      execSync('git push', { stdio: 'inherit' });
    } catch (error) {
      const remoteName = 'origin';
      const branchName = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
      console.log(chalk.cyan(`⬆️  Setting upstream and pushing to ${remoteName}/${branchName}...`));
      execSync(`git push --set-upstream ${remoteName} ${branchName}`, { stdio: 'inherit' });
    }
    console.log(chalk.green('✅ Changes committed and pushed successfully!'));
  } catch (error) {
    console.error(chalk.red('❌ Error during commit and push:'), error);
    process.exit(1);
  } finally {
    rl.close();
  }
}
commitAndPush();
#!/usr/bin/env node
import { execSync } from 'child_process';
import * as readline from 'readline';
import chalk from 'chalk';
import * as fs from 'fs';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const [, , versionArg, commitMessageArg] = process.argv;
async function askQuestion(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}
function checkGitStatus(): boolean {
  try {
    const status = execSync('git status --porcelain').toString();
    return status.length === 0;
  } catch (error) {
    return false;
  }
}
function getCurrentBranch(): string {
  return execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
}
function validatePackageJson(): void {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const requiredFields = ['name', 'version', 'description', 'main', 'types'];
  for (const field of requiredFields) {
    if (!packageJson[field]) {
      throw new Error(`Missing required field in package.json: ${field}`);
    }
  }
}
async function selectVersionType(): Promise<string> {
  if (versionArg && ['patch', 'minor', 'major'].includes(versionArg)) {
    return versionArg;
  }
  console.log(chalk.cyan('\nSelect version increment type:'));
  console.log(chalk.gray('1. patch (1.0.0 -> 1.0.1)'));
  console.log(chalk.gray('2. minor (1.0.0 -> 1.1.0)'));
  console.log(chalk.gray('3. major (1.0.0 -> 2.0.0)'));
  const answer = await askQuestion('Enter your choice (1-3): ');
  const versionMap: { [key: string]: string } = {
    '1': 'patch',
    '2': 'minor',
    '3': 'major',
  };
  return versionMap[answer] || 'patch';
}
async function getCommitMessage(): Promise<string> {
  if (commitMessageArg) {
    return commitMessageArg;
  }
  const message = await askQuestion(chalk.cyan('Enter commit message: '));
  if (!message.trim()) {
    throw new Error('Commit message is required');
  }
  return message;
}
async function publishPackage() {
  try {
    console.log(chalk.cyan('\n🔍 Running pre-publish checks...\n'));
    console.log(chalk.cyan('📋 Validating package.json...'));
    validatePackageJson();
    console.log(chalk.green('✅ package.json is valid'));
    const currentBranch = getCurrentBranch();
    if (currentBranch !== 'main' && currentBranch !== 'master') {
      console.log(chalk.yellow(`⚠️  You're on branch '${currentBranch}'.`));
    }
    if (!checkGitStatus()) {
      console.log(chalk.yellow('⚠️  You have uncommitted changes'));
      const commitMessage = await getCommitMessage();
      execSync(`bun commit "${commitMessage}"`, { stdio: 'inherit' });
    }
    console.log(chalk.cyan('\n🧹 Cleaning project...'));
    execSync('bun clean', { stdio: 'inherit' });
    console.log(chalk.cyan('\n📦 Installing dependencies...'));
    execSync('bun install', { stdio: 'inherit' });
    console.log(chalk.cyan('\n🔨 Building project...'));
    execSync('bun run build', { stdio: 'inherit' });
    try {
      console.log(chalk.cyan('\n🧪 Running tests...'));
      execSync('bun test', { stdio: 'inherit' });
      console.log(chalk.green('✅ Tests passed'));
    } catch (error) {
      console.log(chalk.yellow('⚠️  No tests found or tests failed'));
    }
    const versionType = await selectVersionType();
    console.log(chalk.cyan(`\n📝 Incrementing ${versionType} version...`));
    execSync(`npm version ${versionType} --no-git-tag-version`, { stdio: 'inherit' });
    console.log(chalk.cyan('\n🚀 Publishing to npm...'));
    execSync('npm publish', { stdio: 'inherit' });
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const tagName = `v${packageJson.version}`;
    execSync(`git tag ${tagName}`, { stdio: 'inherit' });
    execSync('git push && git push --tags', { stdio: 'inherit' });
    console.log(chalk.green('\n✨ Package successfully published to npm!'));
    console.log(chalk.gray(`Version: ${packageJson.version}`));
    console.log(chalk.gray(`Tag: ${tagName}`));
  } catch (error) {
    console.error(chalk.red('\n❌ Error during publish process:'), error);
    process.exit(1);
  } finally {
    rl.close();
  }
}
publishPackage();
#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';
interface FileSection {
  filePath: string;
  start: number;
  end: number;
  content: string;
  created: boolean;
}
function splitFile(singleFilePath: string, markers: string[], outputDirPath?: string): void {
  if (!fs.existsSync(singleFilePath)) {
    console.error(chalk.red(`Error: File not found: ${singleFilePath}`));
    process.exit(1);
  }
  const fileContent = fs.readFileSync(singleFilePath, 'utf-8');
  const fileSections: FileSection[] = [];
  markers.forEach((marker) => {
    const fileRegex = new RegExp(`\\/\\/ ${marker}(.*?\\.ts)`, 'g');
    let match;
    while ((match = fileRegex.exec(fileContent)) !== null) {
      const filePath = match[1].trim();
      const start = match.index;
      fileSections.push({
        filePath,
        start,
        end: start, // Will be updated later
        content: '',
        created: false,
      });
    }
  });
  fileSections.sort((a, b) => a.start - b.start);
  for (let i = 0; i < fileSections.length; i++) {
    const currentSection = fileSections[i];
    const nextSection = fileSections[i + 1];
    currentSection.end = nextSection ? nextSection.start : fileContent.length;
    const markerLineEnd = fileContent.indexOf('\n', currentSection.start) + 1;
    currentSection.content = fileContent.substring(markerLineEnd, currentSection.end).trim();
  }
  fileSections.forEach((section) => {
    const { filePath, content } = section;
    const fileDir = outputDirPath
      ? path.resolve(outputDirPath, path.dirname(filePath))
      : path.resolve(path.dirname(filePath));
    const fileName = path.basename(filePath);
    const fullFilePath = path.join(fileDir, fileName);
    if (!fs.existsSync(fileDir)) {
      fs.mkdirSync(fileDir, { recursive: true });
    }
    fs.writeFileSync(fullFilePath, content);
    console.log(chalk.green(`Created: ${chalk.bold(fullFilePath)}`));
  });
  if (fileSections.length === 0 && fileContent.length > 0) {
    console.log(chalk.yellow('No marker path found in the file.'));
  }
  if (fileSections.length > 0) {
    console.log(chalk.cyan('\nFiles splitted successfully! ✨\n'));
    const openCommand =
      process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open';
    console.log(chalk.blue(`You can open the files with ${chalk.bold('CTRL+Click')}`));
  }
}
const args = process.argv.slice(2);
if (args.length === 0) {
  console.error(
    chalk.red('Usage: split source=<filePath> markers=<marker1,marker2,...> [outputDir=<path>]')
  );
  console.error(
    chalk.yellow('Example: split source=all-in-one.ts markers=src/,custom/ outputDir=./output')
  );
  process.exit(1);
}
const parsedArgs: { [key: string]: string } = {};
args.forEach((arg) => {
  const [key, value] = arg.split('=');
  if (key && value) {
    parsedArgs[key] = value;
  }
});
if (!parsedArgs.source || !parsedArgs.markers) {
  console.error(chalk.red('Error: source and markers parameters are required'));
  console.error(
    chalk.yellow('Example: split source=all-in-one.ts markers=src/,custom/ outputDir=./output')
  );
  process.exit(1);
}
const singleFilePath = parsedArgs.source;
const markers = parsedArgs.markers.split(',');
const outputDirPath = parsedArgs.outputDir;
splitFile(singleFilePath, markers, outputDirPath);
{
  "extends": "./tsconfig.json",
  "exclude": ["node_modules", "test", "dist", "scripts"],
  "compilerOptions": {
    "sourceMap": true,
    "declaration": true,
    "outDir": "./dist"
  }
}
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "declaration": true,
    "outDir": "./dist",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "rootDir": "./src",
    "typeRoots": ["./node_modules/@types", "./src/types"]
  },
  "include": ["src*.ts", "test*.ts"]
}
{
  "name": "alvamind-tools",
  "version": "1.0.22",
  "description": "CLI tools for generating source code documentation and git automation",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/alvamind/alvamind-tools.git"
  },
  "bin": {
    "alvamind": "./dist/cli.js",
    "generate-source": "./dist/tools/generate-source.js",
    "commit": "./dist/tools/commit.js",
    "clean": "./dist/tools/clean.js",
    "split-code": "./dist/tools/split-files.js",
    "publish-npm": "./dist/tools/npm-publish.js",
    "add-json-script": "./dist/add-json-script.js"
  },
  "scripts": {
    "alvamind": "bun src/cli.ts",
    "commit": "bun src/tools/commit.ts commit",
    "source": "bun src/tools/generate-source.ts --exclude=src/tests --output=docs.md",
    "split-code": "bun src/tools/split-files.ts source=all-in-one.ts markers=src/,custom/ outputDir=./output",
    "build": "tsc && tsc -p tsconfig.build.json && chmod +x dist/cli.js dist/tools*'); // await here
    expect(fs.existsSync(sourceFile)).toBe(true);
    const content = fs.readFileSync(sourceFile, 'utf-8');
    expect(content).not.toContain('// test.ts');
    expect(content).not.toContain('// src/nested.ts');
    expect(content).not.toContain('// test2.ts');
    expect(content).not.toContain('// src/nested2.ts');
  });
  test('should show help with no args', async () => { // async test
    const result = await runGenerateSource(); // await here
    expect(result).toContain("Usage:");
  });
  test('should show help with --help arg', async () => { // async test
    const result = await runGenerateSource('--help'); // await here
    expect(result).toContain("Usage:");
  });
  test('should return error with invalid arg', async () => { // async test
    try {
      await runGenerateSource('--invalid=arg'); // await here
    } catch (e: any) {
      expect(e.message).toContain("Args error:");
    }
  });
});
#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import chalk from 'chalk';
const projectDir = process.cwd();
async function cleanProject() {
  const chalk = (await import('chalk')).default;
  const foldersToDelete = [
    '.bun',
    '.turbo',
    '.eslintcache',
    '.parcel-cache',
    'node_modules',
    '.next',
    '.cache',
    'dist',
    'build',
    'coverage',
    '.vite',
  ];
  const filesToDelete = [
    'bun.lockb',
    'yarn.lock',
    'package-lock.json',
    'pnpm-lock.yaml',
    '.DS_Store',
  ];
  let deletedCount = 0;
  try {
    for (const folder of foldersToDelete) {
      const fullPath = path.join(projectDir, folder);
      if (fs.existsSync(fullPath)) {
        fs.rmSync(fullPath, { recursive: true, force: true });
        console.log(`${chalk.green('✓')} Deleted folder: ${chalk.cyan(folder)}`);
        deletedCount++;
      }
    }
    for (const file of filesToDelete) {
      const fullPath = path.join(projectDir, file);
      if (fs.existsSync(fullPath)) {
        fs.rmSync(fullPath, { force: true });
        console.log(`${chalk.green('✓')} Deleted file: ${chalk.cyan(file)}`);
        deletedCount++;
      }
    }
    const generatedDirs = await findGeneratedDirs('.');
    for (const dir of generatedDirs) {
      const fullPath = path.join(projectDir, dir);
      if (fs.existsSync(fullPath)) {
        fs.rmSync(fullPath, { recursive: true, force: true });
        console.log(`${chalk.green('✓')} Deleted generated dir: ${chalk.cyan(dir)}`);
        deletedCount++;
      }
    }
    console.log(chalk.green(`\n✨ Cleaning completed! ${deletedCount} items deleted`));
  } catch (error) {
    console.error(chalk.red('Error during cleaning:'), error);
    process.exit(1);
  }
}
async function findGeneratedDirs(dir: string): Promise<string[]> {
  const entries = fs.readdirSync(path.join(projectDir, dir), { withFileTypes: true });
  let generatedDirs: string[] = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'generated') {
        generatedDirs.push(fullPath);
      }
      generatedDirs = [...generatedDirs, ...(await findGeneratedDirs(fullPath))];
    }
  }
  return generatedDirs;
}
cleanProject().catch((error) => {
  console.error(chalk.red('Fatal Error:'), error);
  process.exit(1);
});
#!/usr/bin/env node
import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';
import chalk from 'chalk';
const defaultGitignore = `# Dependencies
/node_modules
/.pnp
.pnp.js
# Testing
/coverage
# Production
/build
/dist
# Misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local
# Debug logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
# IDE
.idea/
.vscode/
*.swp
*.swo
# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db
# Optional npm cache directory
.npm
# Optional eslint cache
.eslintcache
# Optional REPL history
.node_repl_history
# Output of 'npm pack'
*.tgz
# Yarn Integrity file
.yarn-integrity`;
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const projectDir = process.cwd();
const projectName = path.basename(projectDir);
const args = process.argv.slice(2);
const commitMessage = args.join(' ');
async function askQuestion(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}
async function isGhInstalled(): Promise<boolean> {
  try {
    execSync('gh --version', { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
}
function createGitignore() {
  const gitignorePath = path.join(projectDir, '.gitignore');
  if (!fs.existsSync(gitignorePath)) {
    console.log(chalk.yellow('ℹ️  Creating default .gitignore file...'));
    fs.writeFileSync(gitignorePath, defaultGitignore);
    console.log(chalk.green('✅ Created .gitignore file'));
  }
}
async function commitAndPush() {
  if (!commitMessage) {
    console.error(chalk.red('❌ Commit message is required.'));
    process.exit(1);
  }
  try {
    console.log(chalk.cyan('🚀 Starting commit process...'));
    process.chdir(projectDir);
    console.log(chalk.gray(`📂 Working in: ${projectDir}`));
    const isNewRepo = !fs.existsSync(path.join(projectDir, '.git'));
    if (isNewRepo) {
      console.log(chalk.yellow('⚠️  No git repository found. Initializing...'));
      execSync('git init', { stdio: 'inherit' });
      console.log(chalk.green('✅ Git repository initialized.'));
      createGitignore();
    }
    createGitignore();
    const status = execSync('git status --porcelain').toString();
    if (!status) {
      console.log(chalk.yellow('ℹ️  No changes to commit.'));
      process.exit(0);
    }
    console.log(chalk.cyan('📝 Staging all changes...'));
    execSync('git add .', { stdio: 'inherit' });
    console.log(chalk.cyan('💾 Committing changes...'));
    execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
    if (await !isGhInstalled()) {
      console.log(
        chalk.yellow('⚠️  GitHub CLI (gh) is not installed. Skipping remote repository creation.')
      );
    } else {
      console.log(chalk.cyan('🔍 Checking for remote repository...'));
      try {
        execSync('gh repo view', { stdio: 'ignore' });
        console.log(chalk.green('✅ Remote repository found.'));
      } catch (error) {
        console.log(chalk.yellow('⚠️  No remote repository found. Creating...'));
        const makePrivate = await askQuestion(chalk.cyan('Make repository private? (y/n): '));
        const repoType = makePrivate.toLowerCase() === 'y' ? 'private' : 'public';
        execSync(`gh repo create ${projectName} --${repoType} --source=. --push`, {
          stdio: 'inherit',
        });
        console.log(chalk.green(`✅ Created ${repoType} repository: ${projectName} on GitHub`));
      }
    }
    try {
      execSync('git rev-parse --abbrev-ref --symbolic-full-name @{u}', { stdio: 'ignore' });
      console.log(chalk.cyan('⬆️  Pushing changes...'));
      execSync('git push', { stdio: 'inherit' });
    } catch (error) {
      const remoteName = 'origin';
      const branchName = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
      console.log(chalk.cyan(`⬆️  Setting upstream and pushing to ${remoteName}/${branchName}...`));
      execSync(`git push --set-upstream ${remoteName} ${branchName}`, { stdio: 'inherit' });
    }
    console.log(chalk.green('✅ Changes committed and pushed successfully!'));
  } catch (error) {
    console.error(chalk.red('❌ Error during commit and push:'), error);
    process.exit(1);
  } finally {
    rl.close();
  }
}
commitAndPush();
#!/usr/bin/env node
import { execSync } from 'child_process';
import * as readline from 'readline';
import chalk from 'chalk';
import * as fs from 'fs';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const [, , versionArg, commitMessageArg] = process.argv;
async function askQuestion(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}
function checkGitStatus(): boolean {
  try {
    const status = execSync('git status --porcelain').toString();
    return status.length === 0;
  } catch (error) {
    return false;
  }
}
function getCurrentBranch(): string {
  return execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
}
function validatePackageJson(): void {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const requiredFields = ['name', 'version', 'description', 'main', 'types'];
  for (const field of requiredFields) {
    if (!packageJson[field]) {
      throw new Error(`Missing required field in package.json: ${field}`);
    }
  }
}
async function selectVersionType(): Promise<string> {
  if (versionArg && ['patch', 'minor', 'major'].includes(versionArg)) {
    return versionArg;
  }
  console.log(chalk.cyan('\nSelect version increment type:'));
  console.log(chalk.gray('1. patch (1.0.0 -> 1.0.1)'));
  console.log(chalk.gray('2. minor (1.0.0 -> 1.1.0)'));
  console.log(chalk.gray('3. major (1.0.0 -> 2.0.0)'));
  const answer = await askQuestion('Enter your choice (1-3): ');
  const versionMap: { [key: string]: string } = {
    '1': 'patch',
    '2': 'minor',
    '3': 'major',
  };
  return versionMap[answer] || 'patch';
}
async function getCommitMessage(version: string): Promise<string> {
  if (commitMessageArg) {
    return commitMessageArg;
  }
  const defaultMessage = `chore: release v${version}`;
  const message = await askQuestion(
    chalk.cyan(`Enter commit message (default: "${defaultMessage}"): `)
  );
  return message.trim() || defaultMessage;
}
async function publishPackage() {
  try {
    console.log(chalk.cyan('\n🔍 Running pre-publish checks...\n'));
    console.log(chalk.cyan('📋 Validating package.json...'));
    validatePackageJson();
    console.log(chalk.green('✅ package.json is valid'));
    const currentBranch = getCurrentBranch();
    if (currentBranch !== 'main' && currentBranch !== 'master') {
      console.log(chalk.yellow(`⚠️  You're on branch '${currentBranch}'.`));
    }
    console.log(chalk.cyan('\n🧹 Cleaning project...'));
    execSync('bun clean', { stdio: 'inherit' });
    console.log(chalk.cyan('\n📦 Installing dependencies...'));
    execSync('bun install', { stdio: 'inherit' });
    console.log(chalk.cyan('\n🔨 Building project...'));
    execSync('bun run build', { stdio: 'inherit' });
    try {
      console.log(chalk.cyan('\n🧪 Running tests...'));
      execSync('bun test', { stdio: 'inherit' });
      console.log(chalk.green('✅ Tests passed'));
    } catch (error) {
      console.log(chalk.yellow('⚠️  No tests found or tests failed'));
    }
    const versionType = await selectVersionType();
    console.log(chalk.cyan(`\n📝 Incrementing ${versionType} version...`));
    execSync(`npm version ${versionType} --no-git-tag-version`, { stdio: 'inherit' });
    console.log(chalk.cyan('\n🚀 Publishing to npm...'));
    execSync('npm publish', { stdio: 'inherit' });
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const newVersion = packageJson.version;
    const tagName = `v${newVersion}`;
    const commitMessage = await getCommitMessage(newVersion);
    console.log(chalk.cyan('\n📝 Committing changes...'));
    execSync(`bun commit "${commitMessage}"`, { stdio: 'inherit' });
    console.log(chalk.cyan('\n🏷️  Creating and pushing tag...'));
    execSync(`git tag ${tagName}`, { stdio: 'inherit' });
    execSync('git push --tags', { stdio: 'inherit' });
    console.log(chalk.green('\n✨ Package successfully published to npm!'));
    console.log(chalk.gray(`Version: ${newVersion}`));
    console.log(chalk.gray(`Tag: ${tagName}`));
    console.log(chalk.gray(`Commit: ${commitMessage}`));
  } catch (error) {
    console.error(chalk.red('\n❌ Error during publish process:'), error);
    process.exit(1);
  } finally {
    rl.close();
  }
}
publishPackage();
#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';
interface FileSection {
  filePath: string;
  start: number;
  end: number;
  content: string;
  created: boolean;
}
function splitFile(singleFilePath: string, markers: string[], outputDirPath?: string): void {
  if (!fs.existsSync(singleFilePath)) {
    console.error(chalk.red(`Error: File not found: ${singleFilePath}`));
    process.exit(1);
  }
  const fileContent = fs.readFileSync(singleFilePath, 'utf-8');
  const fileSections: FileSection[] = [];
  markers.forEach((marker) => {
    const fileRegex = new RegExp(`\\/\\/ ${marker}(.*?\\.ts)`, 'g');
    let match;
    while ((match = fileRegex.exec(fileContent)) !== null) {
      const filePath = match[1].trim();
      const start = match.index;
      fileSections.push({
        filePath,
        start,
        end: start, // Will be updated later
        content: '',
        created: false,
      });
    }
  });
  fileSections.sort((a, b) => a.start - b.start);
  for (let i = 0; i < fileSections.length; i++) {
    const currentSection = fileSections[i];
    const nextSection = fileSections[i + 1];
    currentSection.end = nextSection ? nextSection.start : fileContent.length;
    const markerLineEnd = fileContent.indexOf('\n', currentSection.start) + 1;
    currentSection.content = fileContent.substring(markerLineEnd, currentSection.end).trim();
  }
  fileSections.forEach((section) => {
    const { filePath, content } = section;
    const fileDir = outputDirPath
      ? path.resolve(outputDirPath, path.dirname(filePath))
      : path.resolve(path.dirname(filePath));
    const fileName = path.basename(filePath);
    const fullFilePath = path.join(fileDir, fileName);
    if (!fs.existsSync(fileDir)) {
      fs.mkdirSync(fileDir, { recursive: true });
    }
    fs.writeFileSync(fullFilePath, content);
    console.log(chalk.green(`Created: ${chalk.bold(fullFilePath)}`));
  });
  if (fileSections.length === 0 && fileContent.length > 0) {
    console.log(chalk.yellow('No marker path found in the file.'));
  }
  if (fileSections.length > 0) {
    console.log(chalk.cyan('\nFiles splitted successfully! ✨\n'));
    const openCommand =
      process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open';
    console.log(chalk.blue(`You can open the files with ${chalk.bold('CTRL+Click')}`));
  }
}
const args = process.argv.slice(2);
if (args.length === 0) {
  console.error(
    chalk.red('Usage: split source=<filePath> markers=<marker1,marker2,...> [outputDir=<path>]')
  );
  console.error(
    chalk.yellow('Example: split source=all-in-one.ts markers=src/,custom/ outputDir=./output')
  );
  process.exit(1);
}
const parsedArgs: { [key: string]: string } = {};
args.forEach((arg) => {
  const [key, value] = arg.split('=');
  if (key && value) {
    parsedArgs[key] = value;
  }
});
if (!parsedArgs.source || !parsedArgs.markers) {
  console.error(chalk.red('Error: source and markers parameters are required'));
  console.error(
    chalk.yellow('Example: split source=all-in-one.ts markers=src/,custom/ outputDir=./output')
  );
  process.exit(1);
}
const singleFilePath = parsedArgs.source;
const markers = parsedArgs.markers.split(',');
const outputDirPath = parsedArgs.outputDir;
splitFile(singleFilePath, markers, outputDirPath);
{
  "extends": "./tsconfig.json",
  "exclude": ["node_modules", "test", "dist", "scripts"],
  "compilerOptions": {
    "sourceMap": true,
    "declaration": true,
    "outDir": "./dist"
  }
}
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "declaration": true,
    "outDir": "./dist",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "rootDir": "./src",
    "typeRoots": ["./node_modules/@types", "./src/types"]
  },
  "include": ["src*.ts", "test*.ts"]
}
#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';
const projectDir = process.cwd();
const exampleScripts = {
    'source': 'generate-source output=documentation.md exclude=dist/,node_modules/,.git/',
    'commit': 'commit',
    'clean': 'clean',
    'split-code': 'split-code source=combined.ts markers=src/,lib/ outputDir=./output',
    'publish-npm': 'publish-npm patch'
};
async function addScriptsToPackageJson() {
    try {
        const packageJsonPath = path.join(projectDir, 'package.json');
        if (!fs.existsSync(packageJsonPath)) {
            console.error(chalk.red('❌ package.json not found in the current directory'));
            process.exit(1);
        }
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        if (!packageJson.scripts) {
            packageJson.scripts = {};
        }
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
#!/usr/bin/env node
import chalk from 'chalk';
const showHelp = () => {
  console.log(`
${chalk.bold.blue('Alvamind Tools')} - CLI utilities for code generation and git automation
${chalk.bold('Usage:')}
  ${chalk.cyan()} ${chalk.green('<command>')} [options]
${chalk.bold('Commands:')}
  ${chalk.green('alvamind')}          Show this
  ${chalk.green('generate-source')}   Generate source code documentation
  ${chalk.green('commit')}            Automate git commits
  ${chalk.green('clean')}             Clean project files
  ${chalk.green('split-code')}        Split code files
  ${chalk.green('publish-npm')}       Publish to npm
  ${chalk.green('add-json-script')}   Add scripts to package.json
${chalk.bold('Examples:')}
${chalk.bold('1. Generate Source Code Documentation:')}
   $ ${chalk.cyan('generate-source')} --include=src/,scripts/ --exclude=tests/ --output=docs.md
   $ ${chalk.cyan('generate-source')} --preserve-blank-lines --preserve-comments
   ${chalk.yellow('Options:')}
   --include=<paths>         Comma-separated list of paths to include
   --exclude=<paths>         Comma-separated list of paths to exclude
   --output=<filename>       Output filename (default: source-code.md)
   --preserve-blank-lines    Preserve blank lines in output
   --preserve-comments       Preserve comments in output
${chalk.bold('2. Commit Changes:')}
   $ ${chalk.cyan('commit')} "feat: add new feature"
   $ ${chalk.cyan('commit')} "fix: resolve bug in login"
   ${chalk.gray('- Automatically initializes git repository if needed')}
   ${chalk.gray('- Creates .gitignore if missing')}
   ${chalk.gray('- Creates GitHub repository if gh CLI is installed')}
   ${chalk.gray('- Commits and pushes changes')}
${chalk.bold('3. Clean Project:')}
   $ ${chalk.cyan('clean')}
   ${chalk.gray('Removes common development artifacts:')}
   ${chalk.gray('- node_modules, dist, build directories')}
   ${chalk.gray('- Lock files (package-lock.json, yarn.lock, etc.)')}
   ${chalk.gray('- Cache directories (.cache, .parcel-cache, etc.)')}
   ${chalk.gray('- Generated directories')}
${chalk.bold('4. Split Code Files:')}
   $ ${chalk.cyan('split-code')} source=combined.ts markers=src/,lib/ outputDir=./output
   ${chalk.yellow('Options:')}
   source=<file>     Source file to split
   markers=<paths>   Comma-separated list of path markers
   outputDir=<path>  Output directory for split files
${chalk.bold('5. Publish to NPM:')}
   $ ${chalk.cyan('publish-npm')} patch "fix: update dependencies"
   $ ${chalk.cyan('publish-npm')} minor "feat: add new feature"
   ${chalk.yellow('Arguments:')}
   First:   Version type (patch|minor|major)
   Second:  Commit message (optional)
${chalk.bold('Options:')}
  --help, -h        Show this help message
  --version, -v     Show version number
${chalk.italic('For more detailed information about a specific command, run:')}
  ${chalk.cyan('alvamind')} ${chalk.green('<command>')} --help
`);
};
const showVersion = () => {
  const packageJson = require('../package.json');
  console.log(chalk.bold(`v${packageJson.version}`));
};
const args = process.argv.slice(2);
if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
  showHelp();
} else if (args.includes('--version') || args.includes('-v')) {
  showVersion();
} else {
  console.log(
    chalk.red(`Unknown command. Run '${chalk.cyan('alvamind --help')}' for usage information.`)
  );
}
export * from './tools/generate-source';
export * from './tools/commit';
export * from './tools/clean';
export * from './tools/split-files';
export * from './tools/npm-publish';
export * from './add-json-script';
import { describe, test, expect, beforeAll, afterAll, beforeEach, afterEach } from 'bun:test';
import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
const testDir = path.join(__dirname, 'test-temp');
const sourceFile = path.join(testDir, 'source-code.md');
async function runGenerateSource(args: string = ''): Promise<string> { // make async and return Promise<string>
  try {
    const projectRoot = path.join(__dirname, '..', '..'); // Adjust based on your actual project structure
    const scriptPath = path.join(projectRoot, 'src', 'tools', 'generate-source.ts');
    const command = `bun ${scriptPath} ${args}`; // Use absolute path
    return execSync(command, { encoding: 'utf-8', cwd: projectRoot }); // Set cwd
  } catch (error: any) {
    console.error('Error executing command:', error.stdout || error);
    throw new Error(`Failed to execute generate-source: ${error.message || error.stdout || error}`);
  }
}
function createTempFile(filePath: string, content: string): void {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  fs.writeFileSync(filePath, content)
}
beforeAll(() => {
  fs.mkdirSync(testDir, { recursive: true })
  createTempFile(path.join(testDir, 'test.ts'), '// Test file\n const a = 1;');
  createTempFile(path.join(testDir, 'test2.ts'), ' \n const b = 2;');
  createTempFile(path.join(testDir, 'src', 'nested.ts'), 'const c = 3;\n\n// This is nested');
  createTempFile(path.join(testDir, 'src', 'nested2.ts'), 'const d = 4; \n // Second nested')
});
afterAll(() => {
  if (fs.existsSync(testDir)) {
    fs.rmSync(testDir, { recursive: true, force: true });
  }
});
beforeEach(() => {
  if (fs.existsSync(sourceFile)) {
    fs.rmSync(sourceFile);
  }
});
afterEach(() => {
  if (fs.existsSync(sourceFile)) {
    fs.rmSync(sourceFile);
  }
});
describe('generate-source.ts Parameter Testing', () => {
  test('should generate source code documentation with default options', async () => { // async test
    await runGenerateSource(); // await here
    expect(fs.existsSync(sourceFile)).toBe(true);
    const content = fs.readFileSync(sourceFile, 'utf-8');
    expect(content).toContain('// test.ts');
    expect(content).toContain('// test2.ts');
    expect(content).toContain('// src/nested.ts');
    expect(content).toContain('// src/nested2.ts');
  });
  describe('--include parameter', () => {
    test('should include a single file', async () => { // async test
      await runGenerateSource('--include=test.ts'); // await here
      expect(fs.existsSync(sourceFile)).toBe(true);
      const content = fs.readFileSync(sourceFile, 'utf-8');
      expect(content).toContain('// test.ts');
      expect(content).not.toContain('// test2.ts');
      expect(content).not.toContain('// src/nested.ts');
      expect(content).not.toContain('// src/nested2.ts');
    });
    test('should include multiple files', async () => { // async test
      await runGenerateSource('--include=test.ts,test2.ts'); // await here
      expect(fs.existsSync(sourceFile)).toBe(true);
      const content = fs.readFileSync(sourceFile, 'utf-8');
      expect(content).toContain('// test.ts');
      expect(content).toContain('// test2.ts');
      expect(content).not.toContain('// src/nested.ts');
      expect(content).not.toContain('// src/nested2.ts');
    });
    test('should include a nested file', async () => { // async test
      await runGenerateSource('--include=src/nested.ts'); // await here
      expect(fs.existsSync(sourceFile)).toBe(true);
      const content = fs.readFileSync(sourceFile, 'utf-8');
      expect(content).toContain('// src/nested.ts');
      expect(content).not.toContain('// test.ts');
      expect(content).not.toContain('// test2.ts');
      expect(content).not.toContain('// src/nested2.ts');
    });
    test('should include multiple nested files', async () => { // async test
      await runGenerateSource('--include=src/nested.ts,src/nested2.ts'); // await here
      expect(fs.existsSync(sourceFile)).toBe(true);
      const content = fs.readFileSync(sourceFile, 'utf-8');
      expect(content).toContain('// src/nested.ts');
      expect(content).toContain('// src/nested2.ts');
      expect(content).not.toContain('// test.ts');
      expect(content).not.toContain('// test2.ts');
    });
    test('should handle glob patterns', async () => { // async test
      await runGenerateSource('--include=src');
      expect(content).toContain('// Test file');
      expect(content).toContain('// This is nested');
      expect(content).toContain('// Second nested');
    });
  });
  test('should handle missing files gracefully', async () => { // async test
    const result = await runGenerateSource('--include=nonexistent.ts'); // await here
    expect(result).toContain("Found 0 files");
  });
  test('should handle no files gracefully', async () => { // async test
    await runGenerateSource('--exclude=**node_modulesdist.gitgenerate-source.ts
- **/.zed-settings.json
- **/.vscode/settings.json
- **/package-lock.json
- **/bun.lockb
- **/build*'); // await here
    expect(fs.existsSync(sourceFile)).toBe(true);
    const content = fs.readFileSync(sourceFile, 'utf-8');
    expect(content).not.toContain('// test.ts');
    expect(content).not.toContain('// src/nested.ts');
    expect(content).not.toContain('// test2.ts');
    expect(content).not.toContain('// src/nested2.ts');
  });
  test('should show help with no args', async () => { // async test
    const result = await runGenerateSource(); // await here
    expect(result).toContain("Usage:");
  });
  test('should show help with --help arg', async () => { // async test
    const result = await runGenerateSource('--help'); // await here
    expect(result).toContain("Usage:");
  });
  test('should return error with invalid arg', async () => { // async test
    try {
      await runGenerateSource('--invalid=arg'); // await here
    } catch (e: any) {
      expect(e.message).toContain("Args error:");
    }
  });
});
const c = 3;
const d = 4; 
 const a = 1;
 const b = 2;
#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import chalk from 'chalk';
const projectDir = process.cwd();
async function cleanProject() {
  const chalk = (await import('chalk')).default;
  const foldersToDelete = [
    '.bun',
    '.turbo',
    '.eslintcache',
    '.parcel-cache',
    'node_modules',
    '.next',
    '.cache',
    'dist',
    'build',
    'coverage',
    '.vite',
  ];
  const filesToDelete = [
    'bun.lockb',
    'yarn.lock',
    'package-lock.json',
    'pnpm-lock.yaml',
    '.DS_Store',
  ];
  let deletedCount = 0;
  try {
    for (const folder of foldersToDelete) {
      const fullPath = path.join(projectDir, folder);
      if (fs.existsSync(fullPath)) {
        fs.rmSync(fullPath, { recursive: true, force: true });
        console.log(`${chalk.green('✓')} Deleted folder: ${chalk.cyan(folder)}`);
        deletedCount++;
      }
    }
    for (const file of filesToDelete) {
      const fullPath = path.join(projectDir, file);
      if (fs.existsSync(fullPath)) {
        fs.rmSync(fullPath, { force: true });
        console.log(`${chalk.green('✓')} Deleted file: ${chalk.cyan(file)}`);
        deletedCount++;
      }
    }
    const generatedDirs = await findGeneratedDirs('.');
    for (const dir of generatedDirs) {
      const fullPath = path.join(projectDir, dir);
      if (fs.existsSync(fullPath)) {
        fs.rmSync(fullPath, { recursive: true, force: true });
        console.log(`${chalk.green('✓')} Deleted generated dir: ${chalk.cyan(dir)}`);
        deletedCount++;
      }
    }
    console.log(chalk.green(`\n✨ Cleaning completed! ${deletedCount} items deleted`));
  } catch (error) {
    console.error(chalk.red('Error during cleaning:'), error);
    process.exit(1);
  }
}
async function findGeneratedDirs(dir: string): Promise<string[]> {
  const entries = fs.readdirSync(path.join(projectDir, dir), { withFileTypes: true });
  let generatedDirs: string[] = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'generated') {
        generatedDirs.push(fullPath);
      }
      generatedDirs = [...generatedDirs, ...(await findGeneratedDirs(fullPath))];
    }
  }
  return generatedDirs;
}
cleanProject().catch((error) => {
  console.error(chalk.red('Fatal Error:'), error);
  process.exit(1);
});
#!/usr/bin/env node
import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';
import chalk from 'chalk';
const defaultGitignore = `# Dependencies
/node_modules
/.pnp
.pnp.js
# Testing
/coverage
# Production
/build
/dist
# Misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local
# Debug logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
# IDE
.idea/
.vscode/
*.swp
*.swo
# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db
# Optional npm cache directory
.npm
# Optional eslint cache
.eslintcache
# Optional REPL history
.node_repl_history
# Output of 'npm pack'
*.tgz
# Yarn Integrity file
.yarn-integrity`;
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const projectDir = process.cwd();
const projectName = path.basename(projectDir);
const args = process.argv.slice(2);
const commitMessage = args.join(' ');
async function askQuestion(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}
async function isGhInstalled(): Promise<boolean> {
  try {
    execSync('gh --version', { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
}
function createGitignore() {
  const gitignorePath = path.join(projectDir, '.gitignore');
  if (!fs.existsSync(gitignorePath)) {
    console.log(chalk.yellow('ℹ️  Creating default .gitignore file...'));
    fs.writeFileSync(gitignorePath, defaultGitignore);
    console.log(chalk.green('✅ Created .gitignore file'));
  }
}
async function commitAndPush() {
  if (!commitMessage) {
    console.error(chalk.red('❌ Commit message is required.'));
    process.exit(1);
  }
  try {
    console.log(chalk.cyan('🚀 Starting commit process...'));
    process.chdir(projectDir);
    console.log(chalk.gray(`📂 Working in: ${projectDir}`));
    const isNewRepo = !fs.existsSync(path.join(projectDir, '.git'));
    if (isNewRepo) {
      console.log(chalk.yellow('⚠️  No git repository found. Initializing...'));
      execSync('git init', { stdio: 'inherit' });
      console.log(chalk.green('✅ Git repository initialized.'));
      createGitignore();
    }
    createGitignore();
    const status = execSync('git status --porcelain').toString();
    if (!status) {
      console.log(chalk.yellow('ℹ️  No changes to commit.'));
      process.exit(0);
    }
    console.log(chalk.cyan('📝 Staging all changes...'));
    execSync('git add .', { stdio: 'inherit' });
    console.log(chalk.cyan('💾 Committing changes...'));
    execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
    if (await !isGhInstalled()) {
      console.log(
        chalk.yellow('⚠️  GitHub CLI (gh) is not installed. Skipping remote repository creation.')
      );
    } else {
      console.log(chalk.cyan('🔍 Checking for remote repository...'));
      try {
        execSync('gh repo view', { stdio: 'ignore' });
        console.log(chalk.green('✅ Remote repository found.'));
      } catch (error) {
        console.log(chalk.yellow('⚠️  No remote repository found. Creating...'));
        const makePrivate = await askQuestion(chalk.cyan('Make repository private? (y/n): '));
        const repoType = makePrivate.toLowerCase() === 'y' ? 'private' : 'public';
        execSync(`gh repo create ${projectName} --${repoType} --source=. --push`, {
          stdio: 'inherit',
        });
        console.log(chalk.green(`✅ Created ${repoType} repository: ${projectName} on GitHub`));
      }
    }
    try {
      execSync('git rev-parse --abbrev-ref --symbolic-full-name @{u}', { stdio: 'ignore' });
      console.log(chalk.cyan('⬆️  Pushing changes...'));
      execSync('git push', { stdio: 'inherit' });
    } catch (error) {
      const remoteName = 'origin';
      const branchName = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
      console.log(chalk.cyan(`⬆️  Setting upstream and pushing to ${remoteName}/${branchName}...`));
      execSync(`git push --set-upstream ${remoteName} ${branchName}`, { stdio: 'inherit' });
    }
    console.log(chalk.green('✅ Changes committed and pushed successfully!'));
  } catch (error) {
    console.error(chalk.red('❌ Error during commit and push:'), error);
    process.exit(1);
  } finally {
    rl.close();
  }
}
commitAndPush();
#!/usr/bin/env node
import { execSync } from 'child_process';
import * as readline from 'readline';
import chalk from 'chalk';
import * as fs from 'fs';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const [, , versionArg, commitMessageArg] = process.argv;
async function askQuestion(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}
function checkGitStatus(): boolean {
  try {
    const status = execSync('git status --porcelain').toString();
    return status.length === 0;
  } catch (error) {
    return false;
  }
}
function getCurrentBranch(): string {
  return execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
}
function validatePackageJson(): void {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const requiredFields = ['name', 'version', 'description', 'main', 'types'];
  for (const field of requiredFields) {
    if (!packageJson[field]) {
      throw new Error(`Missing required field in package.json: ${field}`);
    }
  }
}
async function selectVersionType(): Promise<string> {
  if (versionArg && ['patch', 'minor', 'major'].includes(versionArg)) {
    return versionArg;
  }
  console.log(chalk.cyan('\nSelect version increment type:'));
  console.log(chalk.gray('1. patch (1.0.0 -> 1.0.1)'));
  console.log(chalk.gray('2. minor (1.0.0 -> 1.1.0)'));
  console.log(chalk.gray('3. major (1.0.0 -> 2.0.0)'));
  const answer = await askQuestion('Enter your choice (1-3): ');
  const versionMap: { [key: string]: string } = {
    '1': 'patch',
    '2': 'minor',
    '3': 'major',
  };
  return versionMap[answer] || 'patch';
}
async function getCommitMessage(): Promise<string> {
  if (commitMessageArg) {
    return commitMessageArg;
  }
  const message = await askQuestion(chalk.cyan('Enter commit message: '));
  if (!message.trim()) {
    throw new Error('Commit message is required');
  }
  return message;
}
async function publishPackage() {
  try {
    console.log(chalk.cyan('\n🔍 Running pre-publish checks...\n'));
    console.log(chalk.cyan('📋 Validating package.json...'));
    validatePackageJson();
    console.log(chalk.green('✅ package.json is valid'));
    const currentBranch = getCurrentBranch();
    if (currentBranch !== 'main' && currentBranch !== 'master') {
      console.log(chalk.yellow(`⚠️  You're on branch '${currentBranch}'.`));
    }
    if (!checkGitStatus()) {
      console.log(chalk.yellow('⚠️  You have uncommitted changes'));
      const commitMessage = await getCommitMessage();
      execSync(`bun commit "${commitMessage}"`, { stdio: 'inherit' });
    }
    console.log(chalk.cyan('\n🧹 Cleaning project...'));
    execSync('bun clean', { stdio: 'inherit' });
    console.log(chalk.cyan('\n📦 Installing dependencies...'));
    execSync('bun install', { stdio: 'inherit' });
    console.log(chalk.cyan('\n🔨 Building project...'));
    execSync('bun run build', { stdio: 'inherit' });
    try {
      console.log(chalk.cyan('\n🧪 Running tests...'));
      execSync('bun test', { stdio: 'inherit' });
      console.log(chalk.green('✅ Tests passed'));
    } catch (error) {
      console.log(chalk.yellow('⚠️  No tests found or tests failed'));
    }
    const versionType = await selectVersionType();
    console.log(chalk.cyan(`\n📝 Incrementing ${versionType} version...`));
    execSync(`npm version ${versionType} --no-git-tag-version`, { stdio: 'inherit' });
    console.log(chalk.cyan('\n🚀 Publishing to npm...'));
    execSync('npm publish', { stdio: 'inherit' });
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const tagName = `v${packageJson.version}`;
    execSync(`git tag ${tagName}`, { stdio: 'inherit' });
    execSync('git push && git push --tags', { stdio: 'inherit' });
    console.log(chalk.green('\n✨ Package successfully published to npm!'));
    console.log(chalk.gray(`Version: ${packageJson.version}`));
    console.log(chalk.gray(`Tag: ${tagName}`));
  } catch (error) {
    console.error(chalk.red('\n❌ Error during publish process:'), error);
    process.exit(1);
  } finally {
    rl.close();
  }
}
publishPackage();
#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';
interface FileSection {
  filePath: string;
  start: number;
  end: number;
  content: string;
  created: boolean;
}
function splitFile(singleFilePath: string, markers: string[], outputDirPath?: string): void {
  if (!fs.existsSync(singleFilePath)) {
    console.error(chalk.red(`Error: File not found: ${singleFilePath}`));
    process.exit(1);
  }
  const fileContent = fs.readFileSync(singleFilePath, 'utf-8');
  const fileSections: FileSection[] = [];
  markers.forEach((marker) => {
    const fileRegex = new RegExp(`\\/\\/ ${marker}(.*?\\.ts)`, 'g');
    let match;
    while ((match = fileRegex.exec(fileContent)) !== null) {
      const filePath = match[1].trim();
      const start = match.index;
      fileSections.push({
        filePath,
        start,
        end: start, // Will be updated later
        content: '',
        created: false,
      });
    }
  });
  fileSections.sort((a, b) => a.start - b.start);
  for (let i = 0; i < fileSections.length; i++) {
    const currentSection = fileSections[i];
    const nextSection = fileSections[i + 1];
    currentSection.end = nextSection ? nextSection.start : fileContent.length;
    const markerLineEnd = fileContent.indexOf('\n', currentSection.start) + 1;
    currentSection.content = fileContent.substring(markerLineEnd, currentSection.end).trim();
  }
  fileSections.forEach((section) => {
    const { filePath, content } = section;
    const fileDir = outputDirPath
      ? path.resolve(outputDirPath, path.dirname(filePath))
      : path.resolve(path.dirname(filePath));
    const fileName = path.basename(filePath);
    const fullFilePath = path.join(fileDir, fileName);
    if (!fs.existsSync(fileDir)) {
      fs.mkdirSync(fileDir, { recursive: true });
    }
    fs.writeFileSync(fullFilePath, content);
    console.log(chalk.green(`Created: ${chalk.bold(fullFilePath)}`));
  });
  if (fileSections.length === 0 && fileContent.length > 0) {
    console.log(chalk.yellow('No marker path found in the file.'));
  }
  if (fileSections.length > 0) {
    console.log(chalk.cyan('\nFiles splitted successfully! ✨\n'));
    const openCommand =
      process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open';
    console.log(chalk.blue(`You can open the files with ${chalk.bold('CTRL+Click')}`));
  }
}
const args = process.argv.slice(2);
if (args.length === 0) {
  console.error(
    chalk.red('Usage: split source=<filePath> markers=<marker1,marker2,...> [outputDir=<path>]')
  );
  console.error(
    chalk.yellow('Example: split source=all-in-one.ts markers=src/,custom/ outputDir=./output')
  );
  process.exit(1);
}
const parsedArgs: { [key: string]: string } = {};
args.forEach((arg) => {
  const [key, value] = arg.split('=');
  if (key && value) {
    parsedArgs[key] = value;
  }
});
if (!parsedArgs.source || !parsedArgs.markers) {
  console.error(chalk.red('Error: source and markers parameters are required'));
  console.error(
    chalk.yellow('Example: split source=all-in-one.ts markers=src/,custom/ outputDir=./output')
  );
  process.exit(1);
}
const singleFilePath = parsedArgs.source;
const markers = parsedArgs.markers.split(',');
const outputDirPath = parsedArgs.outputDir;
splitFile(singleFilePath, markers, outputDirPath);
{
  "extends": "./tsconfig.json",
  "exclude": ["node_modules", "test", "dist", "scripts"],
  "compilerOptions": {
    "sourceMap": true,
    "declaration": true,
    "outDir": "./dist"
  }
}
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "declaration": true,
    "outDir": "./dist",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "rootDir": "./src",
    "typeRoots": ["./node_modules/@types", "./src/types"]
  },
  "include": ["src*.ts", "test*.ts"]
}
{
  "name": "alvamind-tools",
  "version": "1.0.22",
  "description": "CLI tools for generating source code documentation and git automation",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/alvamind/alvamind-tools.git"
  },
  "bin": {
    "alvamind": "./dist/cli.js",
    "generate-source": "./dist/tools/generate-source.js",
    "commit": "./dist/tools/commit.js",
    "clean": "./dist/tools/clean.js",
    "split-code": "./dist/tools/split-files.js",
    "publish-npm": "./dist/tools/npm-publish.js",
    "add-json-script": "./dist/add-json-script.js"
  },
  "scripts": {
    "alvamind": "bun src/cli.ts",
    "commit": "bun src/tools/commit.ts commit",
    "source": "bun src/tools/generate-source.ts --exclude=src/tests --output=docs.md",
    "split-code": "bun src/tools/split-files.ts source=all-in-one.ts markers=src/,custom/ outputDir=./output",
    "build": "tsc && tsc -p tsconfig.build.json && chmod +x dist/cli.js dist/tools*'); // await here
    expect(fs.existsSync(sourceFile)).toBe(true);
    const content = fs.readFileSync(sourceFile, 'utf-8');
    expect(content).not.toContain('// test.ts');
    expect(content).not.toContain('// src/nested.ts');
    expect(content).not.toContain('// test2.ts');
    expect(content).not.toContain('// src/nested2.ts');
  });
  test('should show help with no args', async () => { // async test
    const result = await runGenerateSource(); // await here
    expect(result).toContain("Usage:");
  });
  test('should show help with --help arg', async () => { // async test
    const result = await runGenerateSource('--help'); // await here
    expect(result).toContain("Usage:");
  });
  test('should return error with invalid arg', async () => { // async test
    try {
      await runGenerateSource('--invalid=arg'); // await here
    } catch (e: any) {
      expect(e.message).toContain("Args error:");
    }
  });
});
#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import chalk from 'chalk';
const projectDir = process.cwd();
async function cleanProject() {
  const chalk = (await import('chalk')).default;
  const foldersToDelete = [
    '.bun',
    '.turbo',
    '.eslintcache',
    '.parcel-cache',
    'node_modules',
    '.next',
    '.cache',
    'dist',
    'build',
    'coverage',
    '.vite',
  ];
  const filesToDelete = [
    'bun.lockb',
    'yarn.lock',
    'package-lock.json',
    'pnpm-lock.yaml',
    '.DS_Store',
  ];
  let deletedCount = 0;
  try {
    for (const folder of foldersToDelete) {
      const fullPath = path.join(projectDir, folder);
      if (fs.existsSync(fullPath)) {
        fs.rmSync(fullPath, { recursive: true, force: true });
        console.log(`${chalk.green('✓')} Deleted folder: ${chalk.cyan(folder)}`);
        deletedCount++;
      }
    }
    for (const file of filesToDelete) {
      const fullPath = path.join(projectDir, file);
      if (fs.existsSync(fullPath)) {
        fs.rmSync(fullPath, { force: true });
        console.log(`${chalk.green('✓')} Deleted file: ${chalk.cyan(file)}`);
        deletedCount++;
      }
    }
    const generatedDirs = await findGeneratedDirs('.');
    for (const dir of generatedDirs) {
      const fullPath = path.join(projectDir, dir);
      if (fs.existsSync(fullPath)) {
        fs.rmSync(fullPath, { recursive: true, force: true });
        console.log(`${chalk.green('✓')} Deleted generated dir: ${chalk.cyan(dir)}`);
        deletedCount++;
      }
    }
    console.log(chalk.green(`\n✨ Cleaning completed! ${deletedCount} items deleted`));
  } catch (error) {
    console.error(chalk.red('Error during cleaning:'), error);
    process.exit(1);
  }
}
async function findGeneratedDirs(dir: string): Promise<string[]> {
  const entries = fs.readdirSync(path.join(projectDir, dir), { withFileTypes: true });
  let generatedDirs: string[] = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'generated') {
        generatedDirs.push(fullPath);
      }
      generatedDirs = [...generatedDirs, ...(await findGeneratedDirs(fullPath))];
    }
  }
  return generatedDirs;
}
cleanProject().catch((error) => {
  console.error(chalk.red('Fatal Error:'), error);
  process.exit(1);
});
#!/usr/bin/env node
import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';
import chalk from 'chalk';
const defaultGitignore = `# Dependencies
/node_modules
/.pnp
.pnp.js
# Testing
/coverage
# Production
/build
/dist
# Misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local
# Debug logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
# IDE
.idea/
.vscode/
*.swp
*.swo
# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db
# Optional npm cache directory
.npm
# Optional eslint cache
.eslintcache
# Optional REPL history
.node_repl_history
# Output of 'npm pack'
*.tgz
# Yarn Integrity file
.yarn-integrity`;
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const projectDir = process.cwd();
const projectName = path.basename(projectDir);
const args = process.argv.slice(2);
const commitMessage = args.join(' ');
async function askQuestion(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}
async function isGhInstalled(): Promise<boolean> {
  try {
    execSync('gh --version', { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
}
function createGitignore() {
  const gitignorePath = path.join(projectDir, '.gitignore');
  if (!fs.existsSync(gitignorePath)) {
    console.log(chalk.yellow('ℹ️  Creating default .gitignore file...'));
    fs.writeFileSync(gitignorePath, defaultGitignore);
    console.log(chalk.green('✅ Created .gitignore file'));
  }
}
async function commitAndPush() {
  if (!commitMessage) {
    console.error(chalk.red('❌ Commit message is required.'));
    process.exit(1);
  }
  try {
    console.log(chalk.cyan('🚀 Starting commit process...'));
    process.chdir(projectDir);
    console.log(chalk.gray(`📂 Working in: ${projectDir}`));
    const isNewRepo = !fs.existsSync(path.join(projectDir, '.git'));
    if (isNewRepo) {
      console.log(chalk.yellow('⚠️  No git repository found. Initializing...'));
      execSync('git init', { stdio: 'inherit' });
      console.log(chalk.green('✅ Git repository initialized.'));
      createGitignore();
    }
    createGitignore();
    const status = execSync('git status --porcelain').toString();
    if (!status) {
      console.log(chalk.yellow('ℹ️  No changes to commit.'));
      process.exit(0);
    }
    console.log(chalk.cyan('📝 Staging all changes...'));
    execSync('git add .', { stdio: 'inherit' });
    console.log(chalk.cyan('💾 Committing changes...'));
    execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
    if (await !isGhInstalled()) {
      console.log(
        chalk.yellow('⚠️  GitHub CLI (gh) is not installed. Skipping remote repository creation.')
      );
    } else {
      console.log(chalk.cyan('🔍 Checking for remote repository...'));
      try {
        execSync('gh repo view', { stdio: 'ignore' });
        console.log(chalk.green('✅ Remote repository found.'));
      } catch (error) {
        console.log(chalk.yellow('⚠️  No remote repository found. Creating...'));
        const makePrivate = await askQuestion(chalk.cyan('Make repository private? (y/n): '));
        const repoType = makePrivate.toLowerCase() === 'y' ? 'private' : 'public';
        execSync(`gh repo create ${projectName} --${repoType} --source=. --push`, {
          stdio: 'inherit',
        });
        console.log(chalk.green(`✅ Created ${repoType} repository: ${projectName} on GitHub`));
      }
    }
    try {
      execSync('git rev-parse --abbrev-ref --symbolic-full-name @{u}', { stdio: 'ignore' });
      console.log(chalk.cyan('⬆️  Pushing changes...'));
      execSync('git push', { stdio: 'inherit' });
    } catch (error) {
      const remoteName = 'origin';
      const branchName = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
      console.log(chalk.cyan(`⬆️  Setting upstream and pushing to ${remoteName}/${branchName}...`));
      execSync(`git push --set-upstream ${remoteName} ${branchName}`, { stdio: 'inherit' });
    }
    console.log(chalk.green('✅ Changes committed and pushed successfully!'));
  } catch (error) {
    console.error(chalk.red('❌ Error during commit and push:'), error);
    process.exit(1);
  } finally {
    rl.close();
  }
}
commitAndPush();
#!/usr/bin/env node
import { execSync } from 'child_process';
import * as readline from 'readline';
import chalk from 'chalk';
import * as fs from 'fs';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const [, , versionArg, commitMessageArg] = process.argv;
async function askQuestion(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}
function checkGitStatus(): boolean {
  try {
    const status = execSync('git status --porcelain').toString();
    return status.length === 0;
  } catch (error) {
    return false;
  }
}
function getCurrentBranch(): string {
  return execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
}
function validatePackageJson(): void {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const requiredFields = ['name', 'version', 'description', 'main', 'types'];
  for (const field of requiredFields) {
    if (!packageJson[field]) {
      throw new Error(`Missing required field in package.json: ${field}`);
    }
  }
}
async function selectVersionType(): Promise<string> {
  if (versionArg && ['patch', 'minor', 'major'].includes(versionArg)) {
    return versionArg;
  }
  console.log(chalk.cyan('\nSelect version increment type:'));
  console.log(chalk.gray('1. patch (1.0.0 -> 1.0.1)'));
  console.log(chalk.gray('2. minor (1.0.0 -> 1.1.0)'));
  console.log(chalk.gray('3. major (1.0.0 -> 2.0.0)'));
  const answer = await askQuestion('Enter your choice (1-3): ');
  const versionMap: { [key: string]: string } = {
    '1': 'patch',
    '2': 'minor',
    '3': 'major',
  };
  return versionMap[answer] || 'patch';
}
async function getCommitMessage(version: string): Promise<string> {
  if (commitMessageArg) {
    return commitMessageArg;
  }
  const defaultMessage = `chore: release v${version}`;
  const message = await askQuestion(
    chalk.cyan(`Enter commit message (default: "${defaultMessage}"): `)
  );
  return message.trim() || defaultMessage;
}
async function publishPackage() {
  try {
    console.log(chalk.cyan('\n🔍 Running pre-publish checks...\n'));
    console.log(chalk.cyan('📋 Validating package.json...'));
    validatePackageJson();
    console.log(chalk.green('✅ package.json is valid'));
    const currentBranch = getCurrentBranch();
    if (currentBranch !== 'main' && currentBranch !== 'master') {
      console.log(chalk.yellow(`⚠️  You're on branch '${currentBranch}'.`));
    }
    console.log(chalk.cyan('\n🧹 Cleaning project...'));
    execSync('bun clean', { stdio: 'inherit' });
    console.log(chalk.cyan('\n📦 Installing dependencies...'));
    execSync('bun install', { stdio: 'inherit' });
    console.log(chalk.cyan('\n🔨 Building project...'));
    execSync('bun run build', { stdio: 'inherit' });
    try {
      console.log(chalk.cyan('\n🧪 Running tests...'));
      execSync('bun test', { stdio: 'inherit' });
      console.log(chalk.green('✅ Tests passed'));
    } catch (error) {
      console.log(chalk.yellow('⚠️  No tests found or tests failed'));
    }
    const versionType = await selectVersionType();
    console.log(chalk.cyan(`\n📝 Incrementing ${versionType} version...`));
    execSync(`npm version ${versionType} --no-git-tag-version`, { stdio: 'inherit' });
    console.log(chalk.cyan('\n🚀 Publishing to npm...'));
    execSync('npm publish', { stdio: 'inherit' });
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const newVersion = packageJson.version;
    const tagName = `v${newVersion}`;
    const commitMessage = await getCommitMessage(newVersion);
    console.log(chalk.cyan('\n📝 Committing changes...'));
    execSync(`bun commit "${commitMessage}"`, { stdio: 'inherit' });
    console.log(chalk.cyan('\n🏷️  Creating and pushing tag...'));
    execSync(`git tag ${tagName}`, { stdio: 'inherit' });
    execSync('git push --tags', { stdio: 'inherit' });
    console.log(chalk.green('\n✨ Package successfully published to npm!'));
    console.log(chalk.gray(`Version: ${newVersion}`));
    console.log(chalk.gray(`Tag: ${tagName}`));
    console.log(chalk.gray(`Commit: ${commitMessage}`));
  } catch (error) {
    console.error(chalk.red('\n❌ Error during publish process:'), error);
    process.exit(1);
  } finally {
    rl.close();
  }
}
publishPackage();
#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';
interface FileSection {
  filePath: string;
  start: number;
  end: number;
  content: string;
  created: boolean;
}
function splitFile(singleFilePath: string, markers: string[], outputDirPath?: string): void {
  if (!fs.existsSync(singleFilePath)) {
    console.error(chalk.red(`Error: File not found: ${singleFilePath}`));
    process.exit(1);
  }
  const fileContent = fs.readFileSync(singleFilePath, 'utf-8');
  const fileSections: FileSection[] = [];
  markers.forEach((marker) => {
    const fileRegex = new RegExp(`\\/\\/ ${marker}(.*?\\.ts)`, 'g');
    let match;
    while ((match = fileRegex.exec(fileContent)) !== null) {
      const filePath = match[1].trim();
      const start = match.index;
      fileSections.push({
        filePath,
        start,
        end: start, // Will be updated later
        content: '',
        created: false,
      });
    }
  });
  fileSections.sort((a, b) => a.start - b.start);
  for (let i = 0; i < fileSections.length; i++) {
    const currentSection = fileSections[i];
    const nextSection = fileSections[i + 1];
    currentSection.end = nextSection ? nextSection.start : fileContent.length;
    const markerLineEnd = fileContent.indexOf('\n', currentSection.start) + 1;
    currentSection.content = fileContent.substring(markerLineEnd, currentSection.end).trim();
  }
  fileSections.forEach((section) => {
    const { filePath, content } = section;
    const fileDir = outputDirPath
      ? path.resolve(outputDirPath, path.dirname(filePath))
      : path.resolve(path.dirname(filePath));
    const fileName = path.basename(filePath);
    const fullFilePath = path.join(fileDir, fileName);
    if (!fs.existsSync(fileDir)) {
      fs.mkdirSync(fileDir, { recursive: true });
    }
    fs.writeFileSync(fullFilePath, content);
    console.log(chalk.green(`Created: ${chalk.bold(fullFilePath)}`));
  });
  if (fileSections.length === 0 && fileContent.length > 0) {
    console.log(chalk.yellow('No marker path found in the file.'));
  }
  if (fileSections.length > 0) {
    console.log(chalk.cyan('\nFiles splitted successfully! ✨\n'));
    const openCommand =
      process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open';
    console.log(chalk.blue(`You can open the files with ${chalk.bold('CTRL+Click')}`));
  }
}
const args = process.argv.slice(2);
if (args.length === 0) {
  console.error(
    chalk.red('Usage: split source=<filePath> markers=<marker1,marker2,...> [outputDir=<path>]')
  );
  console.error(
    chalk.yellow('Example: split source=all-in-one.ts markers=src/,custom/ outputDir=./output')
  );
  process.exit(1);
}
const parsedArgs: { [key: string]: string } = {};
args.forEach((arg) => {
  const [key, value] = arg.split('=');
  if (key && value) {
    parsedArgs[key] = value;
  }
});
if (!parsedArgs.source || !parsedArgs.markers) {
  console.error(chalk.red('Error: source and markers parameters are required'));
  console.error(
    chalk.yellow('Example: split source=all-in-one.ts markers=src/,custom/ outputDir=./output')
  );
  process.exit(1);
}
const singleFilePath = parsedArgs.source;
const markers = parsedArgs.markers.split(',');
const outputDirPath = parsedArgs.outputDir;
splitFile(singleFilePath, markers, outputDirPath);
{
  "extends": "./tsconfig.json",
  "exclude": ["node_modules", "test", "dist", "scripts"],
  "compilerOptions": {
    "sourceMap": true,
    "declaration": true,
    "outDir": "./dist"
  }
}
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "declaration": true,
    "outDir": "./dist",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "rootDir": "./src",
    "typeRoots": ["./node_modules/@types", "./src/types"]
  },
  "include": ["src*.ts", "test*.ts"]
}

// src/add-json-script.ts
#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';
const projectDir = process.cwd();
const exampleScripts = {
    'source': 'generate-source output=documentation.md exclude=dist/,node_modules/,.git/',
    'commit': 'commit',
    'clean': 'clean',
    'split-code': 'split-code source=combined.ts markers=src/,lib/ outputDir=./output',
    'publish-npm': 'publish-npm patch'
};
async function addScriptsToPackageJson() {
    try {
        const packageJsonPath = path.join(projectDir, 'package.json');
        if (!fs.existsSync(packageJsonPath)) {
            console.error(chalk.red('❌ package.json not found in the current directory'));
            process.exit(1);
        }
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        if (!packageJson.scripts) {
            packageJson.scripts = {};
        }
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

// src/cli.ts
#!/usr/bin/env node
import chalk from 'chalk';
const showHelp = () => {
  console.log(`
${chalk.bold.blue('Alvamind Tools')} - CLI utilities for code generation and git automation
${chalk.bold('Usage:')}
  ${chalk.cyan()} ${chalk.green('<command>')} [options]
${chalk.bold('Commands:')}
  ${chalk.green('alvamind')}          Show this
  ${chalk.green('generate-source')}   Generate source code documentation
  ${chalk.green('commit')}            Automate git commits
  ${chalk.green('clean')}             Clean project files
  ${chalk.green('split-code')}        Split code files
  ${chalk.green('publish-npm')}       Publish to npm
  ${chalk.green('add-json-script')}   Add scripts to package.json
${chalk.bold('Examples:')}
${chalk.bold('1. Generate Source Code Documentation:')}
   $ ${chalk.cyan('generate-source')} --include=src/,scripts/ --exclude=tests/ --output=docs.md
   $ ${chalk.cyan('generate-source')} --preserve-blank-lines --preserve-comments
   ${chalk.yellow('Options:')}
   --include=<paths>         Comma-separated list of paths to include
   --exclude=<paths>         Comma-separated list of paths to exclude
   --output=<filename>       Output filename (default: source-code.md)
   --preserve-blank-lines    Preserve blank lines in output
   --preserve-comments       Preserve comments in output
${chalk.bold('2. Commit Changes:')}
   $ ${chalk.cyan('commit')} "feat: add new feature"
   $ ${chalk.cyan('commit')} "fix: resolve bug in login"
   ${chalk.gray('- Automatically initializes git repository if needed')}
   ${chalk.gray('- Creates .gitignore if missing')}
   ${chalk.gray('- Creates GitHub repository if gh CLI is installed')}
   ${chalk.gray('- Commits and pushes changes')}
${chalk.bold('3. Clean Project:')}
   $ ${chalk.cyan('clean')}
   ${chalk.gray('Removes common development artifacts:')}
   ${chalk.gray('- node_modules, dist, build directories')}
   ${chalk.gray('- Lock files (package-lock.json, yarn.lock, etc.)')}
   ${chalk.gray('- Cache directories (.cache, .parcel-cache, etc.)')}
   ${chalk.gray('- Generated directories')}
${chalk.bold('4. Split Code Files:')}
   $ ${chalk.cyan('split-code')} source=combined.ts markers=src/,lib/ outputDir=./output
   ${chalk.yellow('Options:')}
   source=<file>     Source file to split
   markers=<paths>   Comma-separated list of path markers
   outputDir=<path>  Output directory for split files
${chalk.bold('5. Publish to NPM:')}
   $ ${chalk.cyan('publish-npm')} patch "fix: update dependencies"
   $ ${chalk.cyan('publish-npm')} minor "feat: add new feature"
   ${chalk.yellow('Arguments:')}
   First:   Version type (patch|minor|major)
   Second:  Commit message (optional)
${chalk.bold('Options:')}
  --help, -h        Show this help message
  --version, -v     Show version number
${chalk.italic('For more detailed information about a specific command, run:')}
  ${chalk.cyan('alvamind')} ${chalk.green('<command>')} --help
`);
};
const showVersion = () => {
  const packageJson = require('../package.json');
  console.log(chalk.bold(`v${packageJson.version}`));
};
const args = process.argv.slice(2);
if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
  showHelp();
} else if (args.includes('--version') || args.includes('-v')) {
  showVersion();
} else {
  console.log(
    chalk.red(`Unknown command. Run '${chalk.cyan('alvamind --help')}' for usage information.`)
  );
}

// src/index.ts
export * from './tools/generate-source';
export * from './tools/commit';
export * from './tools/clean';
export * from './tools/split-files';
export * from './tools/npm-publish';
export * from './add-json-script';

// src/test/source.test.ts
import { describe, test, expect, beforeAll, afterAll, beforeEach, afterEach } from 'bun:test';
import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
const testDir = path.join(__dirname, 'test-temp');
const sourceFile = path.join(testDir, 'source-code.md');
async function runGenerateSource(args: string = ''): Promise<string> { // make async and return Promise<string>
  try {
    const projectRoot = path.join(__dirname, '..', '..'); // Adjust based on your actual project structure
    const scriptPath = path.join(projectRoot, 'src', 'tools', 'generate-source.ts');
    const command = `bun ${scriptPath} ${args}`; // Use absolute path
    return execSync(command, { encoding: 'utf-8', cwd: projectRoot }); // Set cwd
  } catch (error: any) {
    console.error('Error executing command:', error.stdout || error);
    throw new Error(`Failed to execute generate-source: ${error.message || error.stdout || error}`);
  }
}
function createTempFile(filePath: string, content: string): void {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  fs.writeFileSync(filePath, content)
}
beforeAll(() => {
  fs.mkdirSync(testDir, { recursive: true })
  createTempFile(path.join(testDir, 'test.ts'), '// Test file\n const a = 1;');
  createTempFile(path.join(testDir, 'test2.ts'), ' \n const b = 2;');
  createTempFile(path.join(testDir, 'src', 'nested.ts'), 'const c = 3;\n\n// This is nested');
  createTempFile(path.join(testDir, 'src', 'nested2.ts'), 'const d = 4; \n // Second nested')
});
afterAll(() => {
  if (fs.existsSync(testDir)) {
    fs.rmSync(testDir, { recursive: true, force: true });
  }
});
beforeEach(() => {
  if (fs.existsSync(sourceFile)) {
    fs.rmSync(sourceFile);
  }
});
afterEach(() => {
  if (fs.existsSync(sourceFile)) {
    fs.rmSync(sourceFile);
  }
});
describe('generate-source.ts Parameter Testing', () => {
  test('should generate source code documentation with default options', async () => { // async test
    await runGenerateSource(); // await here
    expect(fs.existsSync(sourceFile)).toBe(true);
    const content = fs.readFileSync(sourceFile, 'utf-8');
    expect(content).toContain('// test.ts');
    expect(content).toContain('// test2.ts');
    expect(content).toContain('// src/nested.ts');
    expect(content).toContain('// src/nested2.ts');
  });
  describe('--include parameter', () => {
    test('should include a single file', async () => { // async test
      await runGenerateSource('--include=test.ts'); // await here
      expect(fs.existsSync(sourceFile)).toBe(true);
      const content = fs.readFileSync(sourceFile, 'utf-8');
      expect(content).toContain('// test.ts');
      expect(content).not.toContain('// test2.ts');
      expect(content).not.toContain('// src/nested.ts');
      expect(content).not.toContain('// src/nested2.ts');
    });
    test('should include multiple files', async () => { // async test
      await runGenerateSource('--include=test.ts,test2.ts'); // await here
      expect(fs.existsSync(sourceFile)).toBe(true);
      const content = fs.readFileSync(sourceFile, 'utf-8');
      expect(content).toContain('// test.ts');
      expect(content).toContain('// test2.ts');
      expect(content).not.toContain('// src/nested.ts');
      expect(content).not.toContain('// src/nested2.ts');
    });
    test('should include a nested file', async () => { // async test
      await runGenerateSource('--include=src/nested.ts'); // await here
      expect(fs.existsSync(sourceFile)).toBe(true);
      const content = fs.readFileSync(sourceFile, 'utf-8');
      expect(content).toContain('// src/nested.ts');
      expect(content).not.toContain('// test.ts');
      expect(content).not.toContain('// test2.ts');
      expect(content).not.toContain('// src/nested2.ts');
    });
    test('should include multiple nested files', async () => { // async test
      await runGenerateSource('--include=src/nested.ts,src/nested2.ts'); // await here
      expect(fs.existsSync(sourceFile)).toBe(true);
      const content = fs.readFileSync(sourceFile, 'utf-8');
      expect(content).toContain('// src/nested.ts');
      expect(content).toContain('// src/nested2.ts');
      expect(content).not.toContain('// test.ts');
      expect(content).not.toContain('// test2.ts');
    });
    test('should handle glob patterns', async () => { // async test
      await runGenerateSource('--include=src');
      expect(content).toContain('// Test file');
      expect(content).toContain('// This is nested');
      expect(content).toContain('// Second nested');
    });
  });
  test('should handle missing files gracefully', async () => { // async test
    const result = await runGenerateSource('--include=nonexistent.ts'); // await here
    expect(result).toContain("Found 0 files");
  });
  test('should handle no files gracefully', async () => { // async test
    await runGenerateSource('--exclude=**/*'); // await here
    expect(fs.existsSync(sourceFile)).toBe(true);
    const content = fs.readFileSync(sourceFile, 'utf-8');
    expect(content).not.toContain('// test.ts');
    expect(content).not.toContain('// src/nested.ts');
    expect(content).not.toContain('// test2.ts');
    expect(content).not.toContain('// src/nested2.ts');
  });
  test('should show help with no args', async () => { // async test
    const result = await runGenerateSource(); // await here
    expect(result).toContain("Usage:");
  });
  test('should show help with --help arg', async () => { // async test
    const result = await runGenerateSource('--help'); // await here
    expect(result).toContain("Usage:");
  });
  test('should return error with invalid arg', async () => { // async test
    try {
      await runGenerateSource('--invalid=arg'); // await here
    } catch (e: any) {
      expect(e.message).toContain("Args error:");
    }
  });
});

// src/tools/clean.ts
#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import chalk from 'chalk';
const projectDir = process.cwd();
async function cleanProject() {
  const chalk = (await import('chalk')).default;
  const foldersToDelete = [
    '.bun',
    '.turbo',
    '.eslintcache',
    '.parcel-cache',
    'node_modules',
    '.next',
    '.cache',
    'dist',
    'build',
    'coverage',
    '.vite',
  ];
  const filesToDelete = [
    'bun.lockb',
    'yarn.lock',
    'package-lock.json',
    'pnpm-lock.yaml',
    '.DS_Store',
  ];
  let deletedCount = 0;
  try {
    for (const folder of foldersToDelete) {
      const fullPath = path.join(projectDir, folder);
      if (fs.existsSync(fullPath)) {
        fs.rmSync(fullPath, { recursive: true, force: true });
        console.log(`${chalk.green('✓')} Deleted folder: ${chalk.cyan(folder)}`);
        deletedCount++;
      }
    }
    for (const file of filesToDelete) {
      const fullPath = path.join(projectDir, file);
      if (fs.existsSync(fullPath)) {
        fs.rmSync(fullPath, { force: true });
        console.log(`${chalk.green('✓')} Deleted file: ${chalk.cyan(file)}`);
        deletedCount++;
      }
    }
    const generatedDirs = await findGeneratedDirs('.');
    for (const dir of generatedDirs) {
      const fullPath = path.join(projectDir, dir);
      if (fs.existsSync(fullPath)) {
        fs.rmSync(fullPath, { recursive: true, force: true });
        console.log(`${chalk.green('✓')} Deleted generated dir: ${chalk.cyan(dir)}`);
        deletedCount++;
      }
    }
    console.log(chalk.green(`\n✨ Cleaning completed! ${deletedCount} items deleted`));
  } catch (error) {
    console.error(chalk.red('Error during cleaning:'), error);
    process.exit(1);
  }
}
async function findGeneratedDirs(dir: string): Promise<string[]> {
  const entries = fs.readdirSync(path.join(projectDir, dir), { withFileTypes: true });
  let generatedDirs: string[] = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'generated') {
        generatedDirs.push(fullPath);
      }
      generatedDirs = [...generatedDirs, ...(await findGeneratedDirs(fullPath))];
    }
  }
  return generatedDirs;
}
cleanProject().catch((error) => {
  console.error(chalk.red('Fatal Error:'), error);
  process.exit(1);
});

// src/tools/commit.ts
#!/usr/bin/env node
import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';
import chalk from 'chalk';
const defaultGitignore = `# Dependencies
/node_modules
/.pnp
.pnp.js
# Testing
/coverage
# Production
/build
/dist
# Misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local
# Debug logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
# IDE
.idea/
.vscode/
*.swp
*.swo
# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db
# Optional npm cache directory
.npm
# Optional eslint cache
.eslintcache
# Optional REPL history
.node_repl_history
# Output of 'npm pack'
*.tgz
# Yarn Integrity file
.yarn-integrity`;
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const projectDir = process.cwd();
const projectName = path.basename(projectDir);
const args = process.argv.slice(2);
const commitMessage = args.join(' ');
async function askQuestion(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}
async function isGhInstalled(): Promise<boolean> {
  try {
    execSync('gh --version', { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
}
function createGitignore() {
  const gitignorePath = path.join(projectDir, '.gitignore');
  if (!fs.existsSync(gitignorePath)) {
    console.log(chalk.yellow('ℹ️  Creating default .gitignore file...'));
    fs.writeFileSync(gitignorePath, defaultGitignore);
    console.log(chalk.green('✅ Created .gitignore file'));
  }
}
async function commitAndPush() {
  if (!commitMessage) {
    console.error(chalk.red('❌ Commit message is required.'));
    process.exit(1);
  }
  try {
    console.log(chalk.cyan('🚀 Starting commit process...'));
    process.chdir(projectDir);
    console.log(chalk.gray(`📂 Working in: ${projectDir}`));
    const isNewRepo = !fs.existsSync(path.join(projectDir, '.git'));
    if (isNewRepo) {
      console.log(chalk.yellow('⚠️  No git repository found. Initializing...'));
      execSync('git init', { stdio: 'inherit' });
      console.log(chalk.green('✅ Git repository initialized.'));
      createGitignore();
    }
    createGitignore();
    const status = execSync('git status --porcelain').toString();
    if (!status) {
      console.log(chalk.yellow('ℹ️  No changes to commit.'));
      process.exit(0);
    }
    console.log(chalk.cyan('📝 Staging all changes...'));
    execSync('git add .', { stdio: 'inherit' });
    console.log(chalk.cyan('💾 Committing changes...'));
    execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
    if (await !isGhInstalled()) {
      console.log(
        chalk.yellow('⚠️  GitHub CLI (gh) is not installed. Skipping remote repository creation.')
      );
    } else {
      console.log(chalk.cyan('🔍 Checking for remote repository...'));
      try {
        execSync('gh repo view', { stdio: 'ignore' });
        console.log(chalk.green('✅ Remote repository found.'));
      } catch (error) {
        console.log(chalk.yellow('⚠️  No remote repository found. Creating...'));
        const makePrivate = await askQuestion(chalk.cyan('Make repository private? (y/n): '));
        const repoType = makePrivate.toLowerCase() === 'y' ? 'private' : 'public';
        execSync(`gh repo create ${projectName} --${repoType} --source=. --push`, {
          stdio: 'inherit',
        });
        console.log(chalk.green(`✅ Created ${repoType} repository: ${projectName} on GitHub`));
      }
    }
    try {
      execSync('git rev-parse --abbrev-ref --symbolic-full-name @{u}', { stdio: 'ignore' });
      console.log(chalk.cyan('⬆️  Pushing changes...'));
      execSync('git push', { stdio: 'inherit' });
    } catch (error) {
      const remoteName = 'origin';
      const branchName = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
      console.log(chalk.cyan(`⬆️  Setting upstream and pushing to ${remoteName}/${branchName}...`));
      execSync(`git push --set-upstream ${remoteName} ${branchName}`, { stdio: 'inherit' });
    }
    console.log(chalk.green('✅ Changes committed and pushed successfully!'));
  } catch (error) {
    console.error(chalk.red('❌ Error during commit and push:'), error);
    process.exit(1);
  } finally {
    rl.close();
  }
}
commitAndPush();

// src/tools/npm-publish.ts
#!/usr/bin/env node
import { execSync } from 'child_process';
import * as readline from 'readline';
import chalk from 'chalk';
import * as fs from 'fs';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const [, , versionArg, commitMessageArg] = process.argv;
async function askQuestion(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}
function checkGitStatus(): boolean {
  try {
    const status = execSync('git status --porcelain').toString();
    return status.length === 0;
  } catch (error) {
    return false;
  }
}
function getCurrentBranch(): string {
  return execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
}
function validatePackageJson(): void {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const requiredFields = ['name', 'version', 'description', 'main', 'types'];
  for (const field of requiredFields) {
    if (!packageJson[field]) {
      throw new Error(`Missing required field in package.json: ${field}`);
    }
  }
}
async function selectVersionType(): Promise<string> {
  if (versionArg && ['patch', 'minor', 'major'].includes(versionArg)) {
    return versionArg;
  }
  console.log(chalk.cyan('\nSelect version increment type:'));
  console.log(chalk.gray('1. patch (1.0.0 -> 1.0.1)'));
  console.log(chalk.gray('2. minor (1.0.0 -> 1.1.0)'));
  console.log(chalk.gray('3. major (1.0.0 -> 2.0.0)'));
  const answer = await askQuestion('Enter your choice (1-3): ');
  const versionMap: { [key: string]: string } = {
    '1': 'patch',
    '2': 'minor',
    '3': 'major',
  };
  return versionMap[answer] || 'patch';
}
async function getCommitMessage(version: string): Promise<string> {
  if (commitMessageArg) {
    return commitMessageArg;
  }
  const defaultMessage = `chore: release v${version}`;
  const message = await askQuestion(
    chalk.cyan(`Enter commit message (default: "${defaultMessage}"): `)
  );
  return message.trim() || defaultMessage;
}
async function publishPackage() {
  try {
    console.log(chalk.cyan('\n🔍 Running pre-publish checks...\n'));
    console.log(chalk.cyan('📋 Validating package.json...'));
    validatePackageJson();
    console.log(chalk.green('✅ package.json is valid'));
    const currentBranch = getCurrentBranch();
    if (currentBranch !== 'main' && currentBranch !== 'master') {
      console.log(chalk.yellow(`⚠️  You're on branch '${currentBranch}'.`));
    }
    console.log(chalk.cyan('\n🧹 Cleaning project...'));
    execSync('bun clean', { stdio: 'inherit' });
    console.log(chalk.cyan('\n📦 Installing dependencies...'));
    execSync('bun install', { stdio: 'inherit' });
    console.log(chalk.cyan('\n🔨 Building project...'));
    execSync('bun run build', { stdio: 'inherit' });
    try {
      console.log(chalk.cyan('\n🧪 Running tests...'));
      execSync('bun test', { stdio: 'inherit' });
      console.log(chalk.green('✅ Tests passed'));
    } catch (error) {
      console.log(chalk.yellow('⚠️  No tests found or tests failed'));
    }
    const versionType = await selectVersionType();
    console.log(chalk.cyan(`\n📝 Incrementing ${versionType} version...`));
    execSync(`npm version ${versionType} --no-git-tag-version`, { stdio: 'inherit' });
    console.log(chalk.cyan('\n🚀 Publishing to npm...'));
    execSync('npm publish', { stdio: 'inherit' });
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const newVersion = packageJson.version;
    const tagName = `v${newVersion}`;
    const commitMessage = await getCommitMessage(newVersion);
    console.log(chalk.cyan('\n📝 Committing changes...'));
    execSync(`bun commit "${commitMessage}"`, { stdio: 'inherit' });
    console.log(chalk.cyan('\n🏷️  Creating and pushing tag...'));
    execSync(`git tag ${tagName}`, { stdio: 'inherit' });
    execSync('git push --tags', { stdio: 'inherit' });
    console.log(chalk.green('\n✨ Package successfully published to npm!'));
    console.log(chalk.gray(`Version: ${newVersion}`));
    console.log(chalk.gray(`Tag: ${tagName}`));
    console.log(chalk.gray(`Commit: ${commitMessage}`));
  } catch (error) {
    console.error(chalk.red('\n❌ Error during publish process:'), error);
    process.exit(1);
  } finally {
    rl.close();
  }
}
publishPackage();

// src/tools/split-files.ts
#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';
interface FileSection {
  filePath: string;
  start: number;
  end: number;
  content: string;
  created: boolean;
}
function splitFile(singleFilePath: string, markers: string[], outputDirPath?: string): void {
  if (!fs.existsSync(singleFilePath)) {
    console.error(chalk.red(`Error: File not found: ${singleFilePath}`));
    process.exit(1);
  }
  const fileContent = fs.readFileSync(singleFilePath, 'utf-8');
  const fileSections: FileSection[] = [];
  markers.forEach((marker) => {
    const fileRegex = new RegExp(`\\/\\/ ${marker}(.*?\\.ts)`, 'g');
    let match;
    while ((match = fileRegex.exec(fileContent)) !== null) {
      const filePath = match[1].trim();
      const start = match.index;
      fileSections.push({
        filePath,
        start,
        end: start, // Will be updated later
        content: '',
        created: false,
      });
    }
  });
  fileSections.sort((a, b) => a.start - b.start);
  for (let i = 0; i < fileSections.length; i++) {
    const currentSection = fileSections[i];
    const nextSection = fileSections[i + 1];
    currentSection.end = nextSection ? nextSection.start : fileContent.length;
    const markerLineEnd = fileContent.indexOf('\n', currentSection.start) + 1;
    currentSection.content = fileContent.substring(markerLineEnd, currentSection.end).trim();
  }
  fileSections.forEach((section) => {
    const { filePath, content } = section;
    const fileDir = outputDirPath
      ? path.resolve(outputDirPath, path.dirname(filePath))
      : path.resolve(path.dirname(filePath));
    const fileName = path.basename(filePath);
    const fullFilePath = path.join(fileDir, fileName);
    if (!fs.existsSync(fileDir)) {
      fs.mkdirSync(fileDir, { recursive: true });
    }
    fs.writeFileSync(fullFilePath, content);
    console.log(chalk.green(`Created: ${chalk.bold(fullFilePath)}`));
  });
  if (fileSections.length === 0 && fileContent.length > 0) {
    console.log(chalk.yellow('No marker path found in the file.'));
  }
  if (fileSections.length > 0) {
    console.log(chalk.cyan('\nFiles splitted successfully! ✨\n'));
    const openCommand =
      process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open';
    console.log(chalk.blue(`You can open the files with ${chalk.bold('CTRL+Click')}`));
  }
}
const args = process.argv.slice(2);
if (args.length === 0) {
  console.error(
    chalk.red('Usage: split source=<filePath> markers=<marker1,marker2,...> [outputDir=<path>]')
  );
  console.error(
    chalk.yellow('Example: split source=all-in-one.ts markers=src/,custom/ outputDir=./output')
  );
  process.exit(1);
}
const parsedArgs: { [key: string]: string } = {};
args.forEach((arg) => {
  const [key, value] = arg.split('=');
  if (key && value) {
    parsedArgs[key] = value;
  }
});
if (!parsedArgs.source || !parsedArgs.markers) {
  console.error(chalk.red('Error: source and markers parameters are required'));
  console.error(
    chalk.yellow('Example: split source=all-in-one.ts markers=src/,custom/ outputDir=./output')
  );
  process.exit(1);
}
const singleFilePath = parsedArgs.source;
const markers = parsedArgs.markers.split(',');
const outputDirPath = parsedArgs.outputDir;
splitFile(singleFilePath, markers, outputDirPath);

// tsconfig.build.json
{
  "extends": "./tsconfig.json",
  "exclude": ["node_modules", "test", "dist", "scripts"],
  "compilerOptions": {
    "sourceMap": true,
    "declaration": true,
    "outDir": "./dist"
  }
}

// tsconfig.json
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "declaration": true,
    "outDir": "./dist",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "rootDir": "./src",
    "typeRoots": ["./node_modules/@types", "./src/types"]
  },
  "include": ["src*.ts", "test*.ts"]
}

