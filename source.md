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

// package.json
{
  "name": "alvamind-tools",
  "version": "1.0.2",
  "description": "CLI tools for generating source code documentation and git automation",
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
    "commit": "bun src/commit.ts commit",
    "source": "bun src/generate-source.ts output=source.md exclude=dist/,README.md,nats-rpc.test.ts,rpc-nats-alvamind-1.0.0.tgz,.gitignore",
    "build": "tsc",
    "clean": "rimraf dist",
    "prebuild": "npm run clean",
    "prepare": "npm run build",
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
    "glob": "^8.0.3"
  },
  "devDependencies": {
    "@types/node": "^18.0.0",
    "@types/jest": "^29.0.0",
    "@typescript-eslint/eslint-plugin": "^5.0.0",
    "@typescript-eslint/parser": "^5.0.0",
    "eslint": "^8.0.0",
    "jest": "^29.0.0",
    "prettier": "^2.8.0",
    "rimraf": "^5.0.0",
    "ts-jest": "^29.0.0",
    "typescript": "^4.9.0"
  },
  "engines": {
    "node": ">=14.0.0"
  }
}

