#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';

const projectDir = process.cwd();

interface GenerateOptions {
  outputFilename: string;
  includePaths: string[];
  excludePaths: string[];
  removeBlankLines: boolean;
  removeComments: boolean;
}

async function generateSourceCodeMarkdown(options: GenerateOptions) {
  const {
    outputFilename = 'source-code.md',
    includePaths = [],
    excludePaths = [],
    removeBlankLines = true,
    removeComments = true,
  } = options;

  const projectName = path.basename(projectDir);

  console.log(chalk.cyan.bold('\n📝 Generating Source Code Documentation'));
  console.log(chalk.dim('=====================================\n'));

  // Default excluded paths
  const defaultExcludedPaths = [
    'node_modules',
    '.git',
    'generate-source.ts',
    '.zed-settings.json',
    '.vscode/settings.json',
    'package-lock.json',
    'bun.lockb',
    'build',
    outputFilename,
  ];

  const singleLineCommentRegex = /^\s*\/\/.*$/gm;
  const multiLineCommentRegex = /\/\*[\s\S]*?\*\//g;

  let allPaths: string[] = [];
  let allFiles: string[] = [];

  function isExcluded(filePath: string): boolean {
    const normalizedFilePath = path.normalize(filePath);

    // Check default exclusions
    if (
      defaultExcludedPaths.some(
        (excludedPath) =>
          normalizedFilePath === excludedPath ||
          normalizedFilePath.startsWith(path.normalize(excludedPath) + path.sep)
      )
    ) {
      return true;
    }

    // Check custom exclusions
    if (
      excludePaths.some((excludePath) => {
        const normalizedExcludePath = path.normalize(excludePath);
        return normalizedFilePath.startsWith(normalizedExcludePath);
      })
    ) {
      return true;
    }

    // If include paths are specified, only include files within those paths
    if (includePaths.length > 0) {
      return !includePaths.some((includePath) => {
        const normalizedIncludePath = path.normalize(includePath);
        return normalizedFilePath.startsWith(normalizedIncludePath);
      });
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

  console.log(chalk.yellow('🔍 Scanning project files...'));
  traverseDir('.');

  const filteredPaths = allPaths.filter((p) => !isExcluded(p));
  const filteredFiles = allFiles.filter((f) => !isExcluded(f));

  // Log scanning results
  console.log(
    chalk.green(
      `✓ Found ${chalk.bold(filteredFiles.length)} files in ${chalk.bold(filteredPaths.length)} directories\n`
    )
  );

  // Generate markdown content
  let output = `# Project: ${projectName}\n\n`;

  output += `## 📂 Included Paths:\n${
    includePaths.length ? includePaths.map((p) => `- ${p}`).join('\n') : '- (all project files)'
  }\n\n`;

  output += `## 🚫 Excluded Paths:\n${[...defaultExcludedPaths, ...excludePaths]
    .map((p) => `- ${p}`)
    .join('\n')}\n\n`;

  output += `## 📁 Directory Structure:\n${filteredPaths.map((p) => `- ${p}`).join('\n')}\n\n`;

  output += '## 💻 Source Code:\n====================\n\n';

  let totalLines = 0;
  let processedFiles = 0;

  console.log(chalk.yellow('📋 Processing files...'));

  for (const file of filteredFiles) {
    process.stdout.write(
      `\r${chalk.dim(`Processing: ${processedFiles}/${filteredFiles.length} files`)}`
    );

    output += `// ${file}\n`;
    let content = fs.readFileSync(path.join(projectDir, file), 'utf-8');

    // Remove comments if option is enabled
    if (removeComments) {
      content = content.replace(multiLineCommentRegex, '');
      content = content.replace(singleLineCommentRegex, '');
    }

    // Remove blank lines if option is enabled
    if (removeBlankLines) {
      content = content
        .split('\n')
        .filter((line) => line.trim() !== '')
        .join('\n');
    } else {
      // Just remove excessive blank lines (more than one consecutive blank line)
      content = content.replace(/\n\s*\n\s*\n/g, '\n\n');
    }

    const lines = content.split('\n');
    totalLines += lines.length;
    output += content + '\n\n';

    processedFiles++;
  }

  process.stdout.write('\r' + ' '.repeat(60) + '\r'); // Clear processing line

  // Write output file
  fs.writeFileSync(path.join(projectDir, outputFilename), output);

  // Final summary
  console.log(chalk.green('\n✨ Documentation generated successfully!'));
  console.log(chalk.dim('────────────────────────────────────'));
  console.log(chalk.white(`📊 Statistics:`));
  console.log(chalk.dim(`• Output file: ${chalk.cyan(outputFilename)}`));
  console.log(chalk.dim(`• Total files: ${chalk.cyan(filteredFiles.length)}`));
  console.log(chalk.dim(`• Total directories: ${chalk.cyan(filteredPaths.length)}`));
  console.log(chalk.dim(`• Total lines of code: ${chalk.cyan(totalLines)}`));
  console.log(
    chalk.dim(`• Blank lines: ${chalk.cyan(removeBlankLines ? 'Removed' : 'Preserved')}`)
  );
  console.log(chalk.dim(`• Comments: ${chalk.cyan(removeComments ? 'Removed' : 'Preserved')}`));
  console.log(chalk.dim('────────────────────────────────────\n'));
}

function parseArgs(args: string[]): GenerateOptions {
  const options: GenerateOptions = {
    outputFilename: 'source-code.md',
    includePaths: [],
    excludePaths: [],
    removeBlankLines: true,
    removeComments: true,
  };

  try {
    for (let i = 0; i < args.length; i++) {
      const arg = args[i];

      if (arg.startsWith('--output=')) {
        options.outputFilename = arg.split('=')[1];
      } else if (arg.startsWith('--include=')) {
        options.includePaths = arg
          .split('=')[1]
          .split(',')
          .map((p) => p.trim());
      } else if (arg.startsWith('--exclude=')) {
        options.excludePaths = arg
          .split('=')[1]
          .split(',')
          .map((p) => p.trim());
      } else if (arg === '--preserve-blank-lines') {
        options.removeBlankLines = false;
      } else if (arg === '--preserve-comments') {
        options.removeComments = false;
      }
    }
  } catch (error) {
    console.log(chalk.red('\n❌ Error parsing arguments:'));
    console.log(chalk.dim(error));
    console.log(chalk.yellow('\nUsage:'));
    console.log(
      chalk.dim(
        'generate-source --include=src/,scripts/ --exclude=src/tests --output=docs.md --preserve-blank-lines --preserve-comments\n'
      )
    );
    process.exit(1);
  }

  return options;
}

const args = process.argv.slice(2);

// Show help if no arguments or --help
if (args.length === 0 || args.includes('--help')) {
  console.log(chalk.cyan.bold('\n📘 Source Code Documentation Generator'));
  console.log(chalk.dim('====================================='));
  console.log(chalk.white('\nUsage:'));
  console.log(chalk.dim('  generate-source [options]'));
  console.log(chalk.white('\nOptions:'));
  console.log(chalk.dim('  --include=<paths>         Comma-separated list of paths to include'));
  console.log(chalk.dim('  --exclude=<paths>         Comma-separated list of paths to exclude'));
  console.log(chalk.dim('  --output=<filename>       Output filename (default: source-code.md)'));
  console.log(chalk.dim('  --preserve-blank-lines    Preserve blank lines in output'));
  console.log(chalk.dim('  --preserve-comments       Preserve comments in output'));
  console.log(chalk.white('\nExamples:'));
  console.log(chalk.dim('  generate-source --include=src/,scripts/'));
  console.log(chalk.dim('  generate-source --exclude=tests/,temp/'));
  console.log(chalk.dim('  generate-source --include=src/ --exclude=src/tests --output=docs.md'));
  console.log(
    chalk.dim('  generate-source --include=src/ --preserve-blank-lines --preserve-comments\n')
  );
  process.exit(0);
}

const options = parseArgs(args);

generateSourceCodeMarkdown(options).catch((err) => {
  console.log(chalk.red('\n❌ Error generating documentation:'));
  console.log(chalk.dim(err));
  process.exit(1);
});
