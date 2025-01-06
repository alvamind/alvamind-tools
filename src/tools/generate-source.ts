#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';
import glob from 'glob'; // Add glob package for better file matching

const projectDir = process.cwd();

interface GenerateOptions {
  outputFilename: string;
  includePatterns: string[];
  excludePatterns: string[];
  removeBlankLines: boolean;
  removeComments: boolean;
}

async function generateSourceCodeMarkdown(options: GenerateOptions) {
  const {
    outputFilename = 'source-code.md',
    includePatterns = [],
    excludePatterns = [],
    removeBlankLines = true,
    removeComments = true,
  } = options;

  const projectName = path.basename(projectDir);

  console.log(chalk.cyan.bold('\n📝 Generating Source Code Documentation'));
  console.log(chalk.dim('=====================================\n'));

  // Default excluded patterns
  const defaultExcludedPatterns = [
    '**/node_modules/**',
    '**/.git/**',
    '**/generate-source.ts',
    '**/.zed-settings.json',
    '**/.vscode/settings.json',
    '**/package-lock.json',
    '**/bun.lockb',
    '**/build/**',
    outputFilename,
  ];

  const singleLineCommentRegex = /^\s*\/\/.*$/gm;
  const multiLineCommentRegex = /\/\*[\s\S]*?\*\//g;

  // Helper function to get all matching files
  function getMatchingFiles(): string[] {
    const allFiles: string[] = [];

    // If specific files/patterns are included
    if (includePatterns.length > 0) {
      includePatterns.forEach((pattern) => {
        // Handle both specific files and glob patterns
        const matches = glob.sync(pattern.includes('*') ? pattern : `**/${pattern}`, {
          cwd: projectDir,
          ignore: [...defaultExcludedPatterns, ...excludePatterns],
          nodir: true,
        });
        allFiles.push(...matches);
      });
    } else {
      // If no specific includes, get all files except excluded ones
      const matches = glob.sync('**/*', {
        cwd: projectDir,
        ignore: [...defaultExcludedPatterns, ...excludePatterns],
        nodir: true,
      });
      allFiles.push(...matches);
    }

    return [...new Set(allFiles)]; // Remove duplicates
  }

  console.log(chalk.yellow('🔍 Scanning project files...'));
  const matchingFiles = getMatchingFiles();

  // Get directories from matching files
  const directories = [
    ...new Set(matchingFiles.map((file) => path.dirname(file)).filter((dir) => dir !== '.')),
  ];

  // Log scanning results
  console.log(
    chalk.green(
      `✓ Found ${chalk.bold(matchingFiles.length)} files in ${chalk.bold(directories.length)} directories\n`
    )
  );

  // Generate markdown content
  let output = `# Project: ${projectName}\n\n`;

  output += `## 📂 Included Patterns:\n${
    includePatterns.length
      ? includePatterns.map((p) => `- ${p}`).join('\n')
      : '- (all project files)'
  }\n\n`;

  output += `## 🚫 Excluded Patterns:\n${[...defaultExcludedPatterns, ...excludePatterns]
    .map((p) => `- ${p}`)
    .join('\n')}\n\n`;

  output += `## 📁 Directory Structure:\n${directories.map((p) => `- ${p}`).join('\n')}\n\n`;

  output += '## 💻 Source Code:\n====================\n\n';

  let totalLines = 0;
  let processedFiles = 0;

  console.log(chalk.yellow('📋 Processing files...'));

  for (const file of matchingFiles) {
    process.stdout.write(
      `\r${chalk.dim(`Processing: ${processedFiles}/${matchingFiles.length} files`)}`
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
      // Just remove excessive blank lines
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
  console.log(chalk.dim(`• Total files: ${chalk.cyan(matchingFiles.length)}`));
  console.log(chalk.dim(`• Total directories: ${chalk.cyan(directories.length)}`));
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
    includePatterns: [],
    excludePatterns: [],
    removeBlankLines: true,
    removeComments: true,
  };

  try {
    for (let i = 0; i < args.length; i++) {
      const arg = args[i];

      if (arg.startsWith('--output=')) {
        options.outputFilename = arg.split('=')[1];
      } else if (arg.startsWith('--include=')) {
        options.includePatterns = arg
          .split('=')[1]
          .split(',')
          .map((p) => p.trim())
          .filter((p) => p); // Remove empty entries
      } else if (arg.startsWith('--exclude=')) {
        options.excludePatterns = arg
          .split('=')[1]
          .split(',')
          .map((p) => p.trim())
          .filter((p) => p);
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
        'generate-source --include=main.test.ts,test.interface.ts --exclude=dist/,build/ --output=docs.md\n'
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
