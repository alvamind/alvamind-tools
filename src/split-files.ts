#!/usr/bin/env node

// split-files.ts
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

// Parse named arguments
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
