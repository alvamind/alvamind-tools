# Project: alvamind-tools

src
====================
// changelog.md
# Changelog
All notable changes to this project will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
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
## [1.0.1] - 2025-01-02
### Added
-   **Initial Release:**
    -   `generate-source` CLI tool: Generates a Markdown file containing the project's source code, excluding specified files and directories.
    -   `commit` CLI tool: Automates the `git add .`, `git commit -m "message"`, and `git push` workflow.

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
    "skipLibCheck": true
  },
  "include": ["src*"]
}

// src/index.ts
export * from './generate-source';
export * from './commit';
export * from './clean';
export * from './split-files';

// src/commit.ts
#!/usr/bin/env node
import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';
import chalk from 'chalk';
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
    }
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
    const status = execSync('git status --porcelain').toString();
    if (!status) {
      console.log(chalk.yellow('ℹ️  No changes to commit.'));
      process.exit(0);
    }
    console.log(chalk.cyan('📝 Staging all changes...'));
    execSync('git add .', { stdio: 'inherit' });
    console.log(chalk.cyan('💾 Committing changes...'));
    execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
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

// src/clean.ts
#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import chalk from 'chalk';
const projectDir = process.cwd();
async function cleanProject() {
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

// src/split-files.ts
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
  let lastIndex = 0;
  markers.forEach((marker) => {
    const fileRegex = new RegExp(`\\/\\/ ${marker}(.*?\\.ts)`, 'g');
    let match;
    while ((match = fileRegex.exec(fileContent)) !== null) {
      const filePath = match[1];
      const start = match.index;
      const end = fileRegex.lastIndex;
      fileSections.push({ filePath, start, end, content: '', created: false });
    }
  });
  fileSections.sort((a, b) => a.start - b.start);
  for (let i = 0; i < fileSections.length; i++) {
    const { filePath, start, end, created } = fileSections[i];
    const fileDir = outputDirPath
      ? path.resolve(outputDirPath, path.dirname(filePath))
      : path.resolve(path.dirname(filePath));
    const fileName = path.basename(filePath);
    const fullFilePath = path.join(fileDir, fileName);
    if (!fs.existsSync(fileDir)) {
      fs.mkdirSync(fileDir, { recursive: true });
    }
    const content =
      i === 0 ? fileContent.substring(lastIndex, start) : fileContent.substring(lastIndex, start);
    if (i !== 0) {
      const previousFile = fileSections[i - 1];
      if (previousFile && !previousFile.created) {
        previousFile.content = fileContent.substring(previousFile.start, start);
        fs.writeFileSync(fullFilePath, previousFile.content.trim());
        console.log(chalk.green(`Created: ${chalk.bold(fullFilePath)}`));
        previousFile.created = true;
      }
    }
    lastIndex = end;
    if (i === fileSections.length - 1) {
      const content = fileContent.substring(start, fileContent.length);
      fs.writeFileSync(fullFilePath, content.trim());
      console.log(chalk.green(`Created: ${chalk.bold(fullFilePath)}`));
    }
  }
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

// src/generate-source.ts
#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';
const projectDir = process.cwd();
async function generateSourceCodeMarkdown(
  outputFilename: string = 'source-code.md',
  customInclude: string[] = [],
  customExclude: string[] = [],
) {
  const projectName = path.basename(projectDir); // ambil nama project dari root dir
  const excludedPathsAndFiles = [
    'node_modules',
    '.git',
    'generate-source.ts',
    '.zed-settings.json',
    '.vscode/settings.json',
    'package-lock.json',
    'src/common/dtos/generated',
    'src/persistence/seed.ts',
    'bun.lockb',
    'src/common/exceptions',
    'prisma/schema.prisma',
    'build',
    'documentation/tsyringe-neo.md',
    'src/common/utils',
    outputFilename,
  ];
  const defaultExcludes: RegExp[] = [];
  const singleLineCommentRegex = /^\s*\/\/.*$/gm;
  const multiLineCommentRegex = /\/\*[\s\S]*?\*\//g;
  let allPaths: string[] = [];
  let allFiles: string[] = [];
  function isExcluded(filePath: string): boolean {
    const normalizedFilePath = path.normalize(filePath);
    if (
      excludedPathsAndFiles.includes(normalizedFilePath) ||
      excludedPathsAndFiles.some((excludedPath) => normalizedFilePath.startsWith(path.normalize(excludedPath) + '/'))
    ) {
      return true;
    }
    const isCustomExcluded = customExclude.some((exclude) => {
      try {
        let pattern = exclude;
        if (!exclude.startsWith('/') || !exclude.endsWith('/')) {
          pattern = exclude
            .replace(/\./g, '\\.') // Escape dots
            .replace(/\*/g, '.*'); // Convert * to .*
        } else {
          pattern = exclude.slice(1, -1);
        }
        const regex = new RegExp(pattern);
        return regex.test(normalizedFilePath);
      } catch (e) {
        console.error(`Invalid regex: ${exclude}`, e);
        return false;
      }
    });
    if (isCustomExcluded && !customInclude.some((include) => normalizedFilePath.endsWith(include))) {
      return true;
    }
    return false;
  }
  function traverseDir(dir: string) {
    const entries = fs.readdirSync(path.join(projectDir, dir), { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (isExcluded(fullPath)) {
        continue;
      }
      if (entry.isDirectory()) {
        allPaths.push(fullPath);
        traverseDir(fullPath);
      } else if (entry.isFile()) {
        allFiles.push(fullPath);
      }
    }
  }
  traverseDir('.');
  const filteredPaths = allPaths.filter((p) => !isExcluded(p));
  const filteredFiles = allFiles.filter((f) => !isExcluded(f));
  let output = `# Project: ${projectName}\n\n`; // Tambahin judul project di awal output
  output += filteredPaths.join('\n') + '\n====================\n';
  let totalLines = 0;
  for (const file of filteredFiles) {
    output += `// ${file}\n`;
    let content = fs.readFileSync(path.join(projectDir, file), 'utf-8');
    content = content.replace(multiLineCommentRegex, '');
    content = content.replace(singleLineCommentRegex, '');
    content = content.replace(/^\s*[\r\n]/gm, '');
    const lines = content.split('\n');
    totalLines += lines.length;
    output += content + '\n';
  }
  fs.writeFileSync(path.join(projectDir, outputFilename), output);
  console.log(`Source code info written to ${outputFilename}. Total lines: ${totalLines}`);
}
const args = process.argv.slice(2);
let outputFilename = 'source-code.md';
let customInclude: string[] = [];
let customExclude: string[] = [];
args.forEach((arg) => {
  if (arg.startsWith('output=')) {
    outputFilename = arg.split('=')[1];
  } else if (arg.startsWith('include=')) {
    customInclude = arg.split('=')[1].split(',');
  } else if (arg.startsWith('exclude=')) {
    try {
      const excludeValue = arg.split('=')[1];
      if (excludeValue) {
        customExclude = excludeValue.split(',').map((pattern) => pattern.trim());
      }
    } catch (error) {
      console.error('Error parsing exclude patterns:', error);
      customExclude = [];
    }
  }
});
generateSourceCodeMarkdown(outputFilename, customInclude, customExclude).catch((err) => console.error('Error:', err));

// .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "trailingComma": "es5"
}

// .eslintrc.json
{
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended"]
}

// .npmignore
# Source
src/
tests/
__tests__/
*.test.ts
*.spec.ts
# Config files
.eslintrc.json
.prettierrc
.editorconfig
.github/
.gitignore
.travis.yml
jest.config.js
tsconfig.json
.vscode/
.idea/
.zed-settings.json
# Build tools
webpack.config.js
rollup.config.js
gulpfile.js
Gruntfile.js
# Documentation source
docs/
example/
documentation/
CONTRIBUTING.md
CODE_OF_CONDUCT.md
# Development files
coverage/
.nyc_output/
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.env
.env.*
# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db
# Dependencies
node_modules/
package-lock.json
yarn.lock
bun.lockb
# TypeScript source maps
*.map
# Test files
__mocks__/
*.test.js
*.spec.js
test/
tests/
# Misc
*.gz
*.tgz
*.zip
*.rar
.git/
tmp/
temp/
.tmp/
.temp/
# Debug files
*.log
logs/
debug/
# Build artifacts
build/
dist/*.test.js
dist/*.spec.js
dist/__tests__/
dist/tests/
# Project specific
source-code.md
source.md
```
Dan sebagai pelengkap, berikut `.gitignore` yang sesuai:
```gitignore
# Dependencies
node_modules/
package-lock.json
yarn.lock
bun.lockb
# Build output
dist/
build/
*.tsbuildinfo
# Environment variables
.env
.env.*
!.env.example
# Logs
logs/
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
# Coverage directory used by tools like istanbul
coverage/
.nyc_output/
# IDEs and editors
.idea/
.vscode/
*.swp
*.swo
.project
.classpath
*.launch
.settings/
*.sublime-workspace
*.sublime-project
# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db
# Debug
debug/
.debug/
# Temporary files
tmp/
temp/
.tmp/
.temp/
# Project specific
source-code.md
source.md
# Test generated files
__snapshots__/
*.snap
# TypeScript cache
*.tsbuildinfo
# Optional npm cache directory
.npm
# Optional eslint cache
.eslintcache
# Optional REPL history
.node_repl_history
# Output of 'npm pack'
*.tgz
# Yarn Integrity file
.yarn-integrity

// tsconfig.build.json
{
  "extends": "./tsconfig.json",
  "exclude": ["test", "dist", "scripts"],
  "compilerOptions": {
    "declaration": true,
    "outDir": "./dist"
  }
}

// package.json
{
  "name": "alvamind-tools",
  "version": "1.0.5",
  "description": "CLI tools for generating source code documentation and git automation",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/alvamind/alvamind-tools.git"
  },
  "bin": {
    "generate-source": "./dist/generate-source.js",
    "commit": "./dist/commit.js",
    "clean": "./dist/clean.js",
    "split-code": "./dist/split-files.js"
  },
  "scripts": {
    "commit": "bun src/commit.ts commit",
    "source": "bun src/generate-source.ts output=source.md exclude=dist/,README.md,nats-rpc.test.ts,rpc-nats-alvamind-1.0.0.tgz,.gitignore",
    "build": "tsc && tsc -p tsconfig.build.json",
    "clean": "bun src/clean.ts",
    "test": "jest",
    "lint": "eslint src*.ts",
    "format": "prettier --write \"src*.ts\""
  },
  "files": [
    "dist",
    "src",
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
    "chalk": "^5.4.1",
    "glob": "^8.1.0"
  },
  "devDependencies": {
    "@types/node": "^18.19.69",
    "@types/jest": "^29.5.14",
    "@typescript-eslint/eslint-plugin": "^5.62.0",
    "@typescript-eslint/parser": "^5.62.0",
    "eslint": "^8.57.1",
    "jest": "^29.7.0",
    "prettier": "^2.8.8",
    "rimraf": "^5.0.10",
    "ts-jest": "^29.2.5",
    "typescript": "^4.9.5"
  },
  "engines": {
    "node": ">=14.0.0"
  }
}

