#!/usr/bin/env node

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';

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
    console.error('Commit message is required.');
    process.exit(1);
  }

  try {
    process.chdir(projectDir);

    // Check if .git exists
    if (!fs.existsSync(path.join(projectDir, '.git'))) {
      console.log('No git repository found. Initializing...');
      execSync('git init', { stdio: 'inherit' });
    }

    // Check if gh is installed
    if (await !isGhInstalled()) {
      console.log('GitHub CLI (gh) is not installed. Skipping remote repository creation.');
    } else {
      // Check if a remote repo exists on github
      try {
        execSync('gh repo view', { stdio: 'ignore' });
      } catch (error) {
        console.log('No remote repository found. Creating...');
        const repoType = await askQuestion(
          'Create a public or private repository? (public/private): '
        );
        execSync(`gh repo create ${projectName} --${repoType} --source=. --remote=upstream`, {
          stdio: 'inherit',
        });
      }
    }

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

    const setUpstream = await askQuestion('Do you want to set the upstream? (yes/no): ');
    if (setUpstream.toLowerCase() === 'yes') {
      execSync('git push --set-upstream upstream master', { stdio: 'inherit' });
      console.log('Upstream set successfully.');
    }

    console.log('Changes committed and pushed successfully.');
  } catch (error) {
    console.error('Error during commit and push:', error);
    process.exit(1);
  } finally {
    rl.close();
  }
}

commitAndPush();
