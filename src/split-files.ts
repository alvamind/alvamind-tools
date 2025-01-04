// split-files.ts
import * as fs from 'fs';
import * as path from 'path';

interface FileSection {
  filePath: string;
  start: number;
  end: number;
  content: string;
  created: boolean;
}

function splitFile(singleFilePath: string, markers: string[], outputDirPath?: string): void {
  if (!fs.existsSync(singleFilePath)) {
    console.error(`Error: File not found: ${singleFilePath}`);
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
    const fileDir = outputDirPath ? path.resolve(outputDirPath, path.dirname(filePath)) : path.resolve(path.dirname(filePath));
    const fileName = path.basename(filePath);
    const fullFilePath = path.join(fileDir, fileName);

    if (!fs.existsSync(fileDir)) {
      fs.mkdirSync(fileDir, { recursive: true });
    }

    const content = i === 0 ? fileContent.substring(lastIndex, start) : fileContent.substring(lastIndex, start);

    if (i !== 0) {
      const previousFile = fileSections[i - 1];
      if (previousFile && !previousFile.created) {
        previousFile.content = fileContent.substring(previousFile.start, start);
        fs.writeFileSync(fullFilePath, previousFile.content.trim());
        console.log(`Created: ${fullFilePath}`);
        previousFile.created = true;
      }
    }
    lastIndex = end;

    if (i === fileSections.length - 1) {
      const content = fileContent.substring(start, fileContent.length);
      fs.writeFileSync(fullFilePath, content.trim());
      console.log(`Created: ${fullFilePath}`);
    }
  }


  if (fileSections.length === 0 && fileContent.length > 0) {
    console.log('No marker path found in the file.');
  }

  if (fileSections.length > 0) {
    console.log('Files splitted.\n')
    const openCommand = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open'
    console.log(`You can open the files with CTRL+Click`)
  }


}

const args = process.argv.slice(2);

if (args.length < 2) {
  console.error('Usage: split [singleFilePath] [marker1,marker2,...] [outputDirPath]');
  console.error('Example: split all-in-one.ts "src/,custom/" ./output');
  process.exit(1);
}

const singleFilePath = args[0];
const markersString = args[1];
const markers = markersString.split(',');
const outputDirPath = args[2];

splitFile(singleFilePath, markers, outputDirPath);
