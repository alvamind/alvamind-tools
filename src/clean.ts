#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

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
    '.DS_Store'
  ]

  try {
    for (const folder of foldersToDelete) {
      const fullPath = path.join(projectDir, folder);
      if (fs.existsSync(fullPath)) {
        fs.rmSync(fullPath, { recursive: true, force: true });
        console.log(`Deleted: ${folder}`);
      } else {
        console.log(`Not found : ${folder}`)
      }
    }
    for (const file of filesToDelete) {
      const fullPath = path.join(projectDir, file)
      if (fs.existsSync(fullPath)) {
        fs.rmSync(fullPath, { force: true });
        console.log(`Deleted : ${file}`)
      } else {
        console.log(`Not found: ${file}`)
      }
    }


    const generatedDirs = await findGeneratedDirs('.');
    for (const dir of generatedDirs) {
      const fullPath = path.join(projectDir, dir)
      if (fs.existsSync(fullPath)) {
        fs.rmSync(fullPath, { recursive: true, force: true });
        console.log(`Deleted generated dir: ${dir}`);
      }
    }

    console.log('Done.');
  } catch (error) {
    console.error('Error during cleaning:', error);
    process.exit(1);
  }


}

async function findGeneratedDirs(dir: string): Promise<string[]> {
  const entries = fs.readdirSync(path.join(projectDir, dir), { withFileTypes: true });
  let generatedDirs: string[] = []
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


cleanProject().catch((err) => console.error('Error:', err));
