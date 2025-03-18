#!/usr/bin/env node

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';
import chalk from 'chalk';
import { createWorkflow, WorkflowBuilder } from 'alvamind-workflow';

// Add default gitignore content
const defaultGitignore = `# Dependencies
/node_modules
/.pnp
.pnp.js

# Testing
/coverage
/cypress/videos/
/cypress/screenshots/
/playwright-report/
/test-results/

# Production
/build
/dist
/.next/
/out/
.output
.nuxt
.nitro
.cache
dist-ssr
*.local

# Misc
.DS_Store
.env
.env.*
!.env.example
.env.local
.env.development.local
.env.test.local
.env.production.local
*.pem

# Debug logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
.pnpm-debug.log*
lerna-debug.log*

# IDE
.idea/
.vscode/*
!.vscode/extensions.json
!.vscode/settings.json
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
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

# Framework specific
# Next.js
.next
next-env.d.ts
.vercel

# Vite
.vite/

# VitePress
.vitepress/dist
.vitepress/cache

# Docusaurus
.docusaurus/
.cache-loader/

# Astro
.astro/

# Remix
.cache/
/build/
/public/build/
/api/index.js
/api/index.js.map

# Package managers
# npm
.npm
# Optional eslint cache
.eslintcache
# Optional REPL history
.node_repl_history
# Output of 'npm pack'
*.tgz
# Yarn
.yarn/*
!.yarn/cache
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/sdks
!.yarn/versions
.yarn-integrity
# pnpm
.pnpm-store/

# TypeScript
*.tsbuildinfo

# Logs
logs
*.log

# Coverage directory
coverage
*.lcov

# Turbo
.turbo

# Storybook
storybook-static/

# PWA
**/public/sw.js
**/public/workbox-*.js
**/public/worker-*.js
**/public/sw.js.map
**/public/workbox-*.js.map
**/public/worker-*.js.map`;

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

// Export functions for testing
export async function isGhInstalled(): Promise<boolean> {
  try {
    execSync('gh --version', { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
}

// Add function to create gitignore
export function createGitignore() {
  // Use process.cwd() instead of hardcoded projectDir to respect current directory
  const gitignorePath = path.join(process.cwd(), '.gitignore');
  if (!fs.existsSync(gitignorePath)) {
    console.log(chalk.yellow('ℹ️  Creating default .gitignore file...'));
    fs.writeFileSync(gitignorePath, defaultGitignore);
    console.log(chalk.green('✅ Created .gitignore file'));
  }
}

export async function commitAndPush() {
  if (!commitMessage) {
    console.error(chalk.red('❌ Commit message is required.'));
    process.exit(1);
  }

  try {
    console.log(chalk.cyan('🚀 Starting commit process...'));
    process.chdir(projectDir);
    console.log(chalk.gray(`📂 Working in: ${projectDir}`));

    // Create .gitignore if needed
    createGitignore();

    // Check if there are changes to commit
    const status = execSync('git status --porcelain').toString();
    if (!status) {
      console.log(chalk.yellow('ℹ️  No changes to commit.'));
      rl.close();
      process.exit(0);
    }

    // Create the initial workflow
    const workflow = createWorkflow({ name: 'Git Commit Workflow' });

    // Setup repository if needed
    await setupRepository(workflow);

    // Add core git operations
    addGitOperations(workflow);

    // Handle remote setup and push if GitHub CLI is available
    await setupRemoteAndPush(workflow);

    // Run the workflow
    await workflow.run({ interactive: true });

    console.log(chalk.green('✅ Changes committed and pushed successfully!'));
  } catch (error) {
    console.error(chalk.red('❌ Error during commit and push:'), error);
    process.exit(1);
  } finally {
    rl.close();
  }
}

// Setup git repository if needed
export async function setupRepository(workflow: WorkflowBuilder): Promise<WorkflowBuilder> {
  const isNewRepo = !fs.existsSync(path.join(process.cwd(), '.git'));
  if (isNewRepo) {
    return workflow.execute('git init', 'Initialize Git Repository', false);
  }
  return workflow;
}

// Add core git operations to workflow
export function addGitOperations(workflow: WorkflowBuilder): WorkflowBuilder {
  return workflow
    .execute('git add .', 'Stage all changes', false)
    .execute(`git commit -m "${commitMessage}"`, 'Commit changes', false);
}

// Setup remote repository and push changes
export async function setupRemoteAndPush(workflow: WorkflowBuilder): Promise<WorkflowBuilder> {
  const hasGitHubCLI = await isGhInstalled();
  if (!hasGitHubCLI) {
    // Return workflow without modifications when GitHub CLI is not installed
    return workflow;
  }

  let remoteExists = false;
  try {
    execSync('git remote -v', { stdio: 'ignore' });
    const remoteOutput = execSync('git remote -v').toString();
    remoteExists = remoteOutput.includes('origin');
  } catch (error) {
    remoteExists = false;
  }

  const branchName = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();

  if (!remoteExists) {
    return await setupNewRemote(workflow, branchName);
  } else {
    return setupExistingRemote(workflow, branchName);
  }
}

// Setup a new remote repository
export async function setupNewRemote(
  workflow: WorkflowBuilder,
  branchName: string
): Promise<WorkflowBuilder> {
  // Use a try/catch to prevent hanging if askQuestion isn't available during tests
  let repoType = 'public';
  try {
    const makePrivate = await askQuestion(chalk.cyan('Make repository private? (y/n): '));
    repoType = makePrivate.toLowerCase() === 'y' ? 'private' : 'public';
  } catch (error) {
    // Default to public in case of error or in test environment
  }

  return workflow
    .execute(
      `gh repo create ${projectName} --${repoType} --source=.`,
      `Create ${repoType} repository on GitHub`,
      false
    )
    .execute(
      `git remote -v || git remote add origin https://github.com/$(gh api user | grep login | cut -d: -f2 | tr -d '", ')/${projectName}.git`,
      'Ensure remote is set correctly',
      false
    )
    .execute(
      `git push --set-upstream origin ${branchName}`,
      `Push and set upstream to origin/${branchName}`,
      false
    );
}

// Setup push for existing remote
export function setupExistingRemote(
  workflow: WorkflowBuilder,
  branchName: string
): WorkflowBuilder {
  let hasUpstream = false;
  try {
    execSync('git rev-parse --abbrev-ref --symbolic-full-name @{u}', { stdio: 'ignore' });
    hasUpstream = true;
  } catch (error) {
    // No upstream branch is set
  }

  if (hasUpstream) {
    return workflow.execute('git push', 'Push changes to remote', false);
  } else {
    return workflow.execute(
      `git push --set-upstream origin ${branchName}`,
      `Push and set upstream to origin/${branchName}`,
      false
    );
  }
}

// Only run if this script is executed directly
commitAndPush();
