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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const child_process_1 = require("child_process");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const readline = __importStar(require("readline"));
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
const projectDir = process.cwd();
const projectName = path.basename(projectDir);
const args = process.argv.slice(2);
const commitMessage = args.join(' ');
function askQuestion(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            rl.question(query, resolve);
        });
    });
}
function isGhInstalled() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            (0, child_process_1.execSync)('gh --version', { stdio: 'ignore' });
            return true;
        }
        catch (error) {
            return false;
        }
    });
}
function commitAndPush() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!commitMessage) {
            console.error('Commit message is required.');
            process.exit(1);
        }
        try {
            console.log('Starting commit process...');
            process.chdir(projectDir);
            console.log(`Changed directory to: ${projectDir}`);
            // Check if .git exists
            if (!fs.existsSync(path.join(projectDir, '.git'))) {
                console.log('No git repository found. Initializing...');
                (0, child_process_1.execSync)('git init', { stdio: 'inherit' });
                console.log('Git repository initialized.');
            }
            // Check if gh is installed
            if (yield !isGhInstalled()) {
                console.log('GitHub CLI (gh) is not installed. Skipping remote repository creation.');
            }
            else {
                // Check if a remote repo exists on github
                console.log('Checking for remote repository...');
                try {
                    (0, child_process_1.execSync)('gh repo view', { stdio: 'ignore' });
                    console.log('Remote repository found.');
                }
                catch (error) {
                    console.log('No remote repository found. Creating...');
                    const repoType = yield askQuestion('Create a public or private repository? (public/private): ');
                    (0, child_process_1.execSync)(`gh repo create ${projectName} --${repoType} --source=. --remote=upstream`, {
                        stdio: 'inherit',
                    });
                    console.log(`Created ${repoType} repository: ${projectName} on github.`);
                }
            }
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
            console.log('Staging all changes...');
            (0, child_process_1.execSync)('git add .', { stdio: 'inherit' });
            console.log('Committing changes...');
            (0, child_process_1.execSync)(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
            console.log('Pushing changes...');
            (0, child_process_1.execSync)('git push', { stdio: 'inherit' });
            const setUpstream = yield askQuestion('Do you want to set the upstream? (yes/no): ');
            if (setUpstream.toLowerCase() === 'yes') {
                console.log('Setting upstream...');
                (0, child_process_1.execSync)('git push --set-upstream upstream master', { stdio: 'inherit' });
                console.log('Upstream set successfully.');
            }
            console.log('Changes committed and pushed successfully.');
        }
        catch (error) {
            console.error('Error during commit and push:', error);
            process.exit(1);
        }
        finally {
            rl.close();
        }
    });
}
commitAndPush();
