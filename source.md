# Project: alvamind-tools

src
dist
====================
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

// README.md
# alvamind-tools
Utility tools for TypeScript projects that provide source code generation and git commit automation.
## Installation
```bash
npm install ts-project-utils --save-dev
```
## Usage
Add these scripts to your package.json:
```json
{
  "scripts": {
    "generate-source": "generate-source",
    "commit": "commit"
  }
}
```
### Generate Source Code
This utility generates a markdown file containing all your project's source code, with options to include or exclude specific files.
```bash
npm run generate-source [options]
```
Options:
- `output=filename.md`: Specify output filename (default: source-code.md)
- `include=file1.ts,file2.ts`: Files to include (supports glob patterns)
- `exclude=file1.ts,*.test.ts`: Files to exclude (supports glob patterns)
Example:
```bash
npm run generate-source output=docs.md include=main.ts,utils/*.ts exclude=*.test.ts,*.spec.ts
```
Default excludes:
- node_modules
- .git
- build directories
- test files
- and more (see source code for complete list)
### Git Commit
Quick git add, commit, and push in one command.
```bash
npm run commit "your commit message"
```
This will:
1. Add all changes (`git add .`)
2. Commit with your message (`git commit -m "your message"`)
3. Push to the current branch (`git push`)
If there are no changes to commit, it will try to push any unpushed commits.
## Features
- 📝 Source code documentation generation
- 🔄 Automated git workflow
- ⚡ Simple CLI interface
- 🎯 Customizable file inclusion/exclusion
- 💡 Comment removal in generated docs
## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.
## License
MIT License - feel free to use this in your projects!
## Author
Alvamind
## Support
If you encounter any issues or have questions, please file an issue on the GitHub repository.

// src/index.ts
export * from './generate-source';
export * from './commit';

// src/commit.ts
#!/usr/bin/env node
import { execSync } from 'child_process';
const args = process.argv.slice(2);
const commitMessage = args.join(' ');
if (!commitMessage) {
  console.error('Commit message is required.');
  process.exit(1);
}
try {
  const projectDir = process.cwd();
  process.chdir(projectDir);
  const status = execSync('git status --porcelain').toString();
  if (!status) {
    console.log('No changes to commit.');
    try {
      execSync('git push', { stdio: 'inherit' });
      console.log('Existing commits pushed successfully.');
    } catch (pushError) {
      console.error('Error pushing commits:', pushError);
      process.exit(1);
    }
    process.exit(0);
  }
  execSync('git add .', { stdio: 'inherit' });
  execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
  execSync('git push', { stdio: 'inherit' });
  console.log('Changes committed and pushed successfully.');
} catch (error) {
  console.error('Error during commit and push:', error);
  process.exit(1);
}

// src/generate-source.js
#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const projectDir = process.cwd();
function generateSourceCodeMarkdown() {
    return __awaiter(this, arguments, void 0, function* (outputFilename = 'source-code.md', customInclude = [], customExclude = []) {
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
            ...customExclude,
        ];
        const defaultExcludes = [/\.route\.ts$/, /\.test\.ts$/];
        const singleLineCommentRegex = /^\s*\/\/.*$/gm;
        const multiLineCommentRegex = /\/\*[\s\S]*?\*\//g;
        let allPaths = [];
        let allFiles = [];
        function isExcluded(filePath) {
            const normalizedFilePath = path.normalize(filePath);
            if (excludedPathsAndFiles.includes(normalizedFilePath)) {
                return true;
            }
            if (excludedPathsAndFiles.some((excludedPath) => normalizedFilePath.startsWith(path.normalize(excludedPath) + '/'))) {
                return true;
            }
            const isDefaultExcluded = defaultExcludes.some((regex) => regex.test(normalizedFilePath));
            if (isDefaultExcluded && !customInclude.some((include) => normalizedFilePath.endsWith(include))) {
                return true;
            }
            return false;
        }
        function traverseDir(dir) {
            const entries = fs.readdirSync(path.join(projectDir, dir), { withFileTypes: true });
            for (const entry of entries) {
                const fullPath = path.join(dir, entry.name);
                if (isExcluded(fullPath)) {
                    continue;
                }
                if (entry.isDirectory()) {
                    allPaths.push(fullPath);
                    traverseDir(fullPath);
                }
                else if (entry.isFile()) {
                    allFiles.push(fullPath);
                }
            }
        }
        traverseDir('.');
        const filteredPaths = allPaths.filter((p) => !isExcluded(p));
        const filteredFiles = allFiles.filter((f) => !isExcluded(f));
        let output = filteredPaths.join('\n') + '\n====================\n';
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
    });
}
const args = process.argv.slice(2);
let outputFilename = 'source-code.md';
let customInclude = [];
let customExclude = [];
args.forEach((arg) => {
    if (arg.startsWith('output=')) {
        outputFilename = arg.split('=')[1];
    }
    else if (arg.startsWith('include=')) {
        customInclude = arg.split('=')[1].split(',');
    }
    else if (arg.startsWith('exclude=')) {
        customExclude = arg.split('=')[1].split(',');
    }
});
generateSourceCodeMarkdown(outputFilename, customInclude, customExclude).catch((err) => console.error('Error:', err));

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

// src/commit.js
#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const args = process.argv.slice(2);
const commitMessage = args.join(' ');
if (!commitMessage) {
    console.error('Commit message is required.');
    process.exit(1);
}
try {
    const projectDir = process.cwd();
    process.chdir(projectDir);
    const status = (0, child_process_1.execSync)('git status --porcelain').toString();
    if (!status) {
        console.log('No changes to commit.');
        try {
            (0, child_process_1.execSync)('git push', { stdio: 'inherit' });
            console.log('Existing commits pushed successfully.');
        }
        catch (pushError) {
            console.error('Error pushing commits:', pushError);
            process.exit(1);
        }
        process.exit(0);
    }
    (0, child_process_1.execSync)('git add .', { stdio: 'inherit' });
    (0, child_process_1.execSync)(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
    (0, child_process_1.execSync)('git push', { stdio: 'inherit' });
    console.log('Changes committed and pushed successfully.');
}
catch (error) {
    console.error('Error during commit and push:', error);
    process.exit(1);
}

// dist/index.js
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./generate-source"), exports);
__exportStar(require("./commit"), exports);

// dist/index.d.ts
export * from './generate-source';
export * from './commit';

// dist/generate-source.js
#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const projectDir = process.cwd();
function generateSourceCodeMarkdown() {
    return __awaiter(this, arguments, void 0, function* (outputFilename = 'source-code.md', customInclude = [], customExclude = []) {
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
            ...customExclude,
        ];
        const defaultExcludes = [/\.route\.ts$/, /\.test\.ts$/];
        const singleLineCommentRegex = /^\s*\/\/.*$/gm;
        const multiLineCommentRegex = /\/\*[\s\S]*?\*\//g;
        let allPaths = [];
        let allFiles = [];
        function isExcluded(filePath) {
            const normalizedFilePath = path.normalize(filePath);
            if (excludedPathsAndFiles.includes(normalizedFilePath)) {
                return true;
            }
            if (excludedPathsAndFiles.some((excludedPath) => normalizedFilePath.startsWith(path.normalize(excludedPath) + '/'))) {
                return true;
            }
            const isDefaultExcluded = defaultExcludes.some((regex) => regex.test(normalizedFilePath));
            if (isDefaultExcluded && !customInclude.some((include) => normalizedFilePath.endsWith(include))) {
                return true;
            }
            return false;
        }
        function traverseDir(dir) {
            const entries = fs.readdirSync(path.join(projectDir, dir), { withFileTypes: true });
            for (const entry of entries) {
                const fullPath = path.join(dir, entry.name);
                if (isExcluded(fullPath)) {
                    continue;
                }
                if (entry.isDirectory()) {
                    allPaths.push(fullPath);
                    traverseDir(fullPath);
                }
                else if (entry.isFile()) {
                    allFiles.push(fullPath);
                }
            }
        }
        traverseDir('.');
        const filteredPaths = allPaths.filter((p) => !isExcluded(p));
        const filteredFiles = allFiles.filter((f) => !isExcluded(f));
        let output = filteredPaths.join('\n') + '\n====================\n';
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
    });
}
const args = process.argv.slice(2);
let outputFilename = 'source-code.md';
let customInclude = [];
let customExclude = [];
args.forEach((arg) => {
    if (arg.startsWith('output=')) {
        outputFilename = arg.split('=')[1];
    }
    else if (arg.startsWith('include=')) {
        customInclude = arg.split('=')[1].split(',');
    }
    else if (arg.startsWith('exclude=')) {
        customExclude = arg.split('=')[1].split(',');
    }
});
generateSourceCodeMarkdown(outputFilename, customInclude, customExclude).catch((err) => console.error('Error:', err));

// dist/commit.d.ts
#!/usr/bin/env node
export {};

// dist/commit.js
#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const args = process.argv.slice(2);
const commitMessage = args.join(' ');
if (!commitMessage) {
    console.error('Commit message is required.');
    process.exit(1);
}
try {
    const projectDir = process.cwd();
    process.chdir(projectDir);
    const status = (0, child_process_1.execSync)('git status --porcelain').toString();
    if (!status) {
        console.log('No changes to commit.');
        try {
            (0, child_process_1.execSync)('git push', { stdio: 'inherit' });
            console.log('Existing commits pushed successfully.');
        }
        catch (pushError) {
            console.error('Error pushing commits:', pushError);
            process.exit(1);
        }
        process.exit(0);
    }
    (0, child_process_1.execSync)('git add .', { stdio: 'inherit' });
    (0, child_process_1.execSync)(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
    (0, child_process_1.execSync)('git push', { stdio: 'inherit' });
    console.log('Changes committed and pushed successfully.');
}
catch (error) {
    console.error('Error during commit and push:', error);
    process.exit(1);
}

// dist/generate-source.d.ts
#!/usr/bin/env node
export {};

// package.json
{
  "name": "alvamind-tools",
  "version": "1.0.1",
  "description": "Utilities for TypeScript projects",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/alvamind/alvamind-tools.git"
  },
  "bin": {
    "generate-source": "./dist/generate-source.js",
    "commit": "./dist/commit.js"
  },
  "scripts": {
    "build": "tsc",
    "prepare": "npm run build"
  },
  "files": [
    "dist",
    "src",
    "README.md"
  ],
  "keywords": [
    "typescript",
    "utilities"
  ],
  "author": "Alvamind",
  "license": "MIT"
}

