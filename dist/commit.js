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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const readline = __importStar(require("readline"));
const chalk_1 = __importDefault(require("chalk"));
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
            console.error(chalk_1.default.red('❌ Commit message is required.'));
            process.exit(1);
        }
        try {
            console.log(chalk_1.default.cyan('🚀 Starting commit process...'));
            process.chdir(projectDir);
            console.log(chalk_1.default.gray(`📂 Working in: ${projectDir}`));
            // Check if .git exists
            const isNewRepo = !fs.existsSync(path.join(projectDir, '.git'));
            if (isNewRepo) {
                console.log(chalk_1.default.yellow('⚠️  No git repository found. Initializing...'));
                (0, child_process_1.execSync)('git init', { stdio: 'inherit' });
                console.log(chalk_1.default.green('✅ Git repository initialized.'));
            }
            // Check if gh is installed
            if (yield !isGhInstalled()) {
                console.log(chalk_1.default.yellow('⚠️  GitHub CLI (gh) is not installed. Skipping remote repository creation.'));
            }
            else {
                // Check if a remote repo exists on github
                console.log(chalk_1.default.cyan('🔍 Checking for remote repository...'));
                try {
                    (0, child_process_1.execSync)('gh repo view', { stdio: 'ignore' });
                    console.log(chalk_1.default.green('✅ Remote repository found.'));
                }
                catch (error) {
                    console.log(chalk_1.default.yellow('⚠️  No remote repository found. Creating...'));
                    const makePrivate = yield askQuestion(chalk_1.default.cyan('Make repository private? (y/n): '));
                    const repoType = makePrivate.toLowerCase() === 'y' ? 'private' : 'public';
                    (0, child_process_1.execSync)(`gh repo create ${projectName} --${repoType} --source=. --push`, {
                        stdio: 'inherit',
                    });
                    console.log(chalk_1.default.green(`✅ Created ${repoType} repository: ${projectName} on GitHub`));
                }
            }
            const status = (0, child_process_1.execSync)('git status --porcelain').toString();
            if (!status) {
                console.log(chalk_1.default.yellow('ℹ️  No changes to commit.'));
                process.exit(0);
            }
            console.log(chalk_1.default.cyan('📝 Staging all changes...'));
            (0, child_process_1.execSync)('git add .', { stdio: 'inherit' });
            console.log(chalk_1.default.cyan('💾 Committing changes...'));
            (0, child_process_1.execSync)(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
            // Check if the branch has an upstream
            try {
                (0, child_process_1.execSync)('git rev-parse --abbrev-ref --symbolic-full-name @{u}', { stdio: 'ignore' });
                console.log(chalk_1.default.cyan('⬆️  Pushing changes...'));
                (0, child_process_1.execSync)('git push', { stdio: 'inherit' });
            }
            catch (error) {
                // No upstream set
                const remoteName = 'origin';
                const branchName = (0, child_process_1.execSync)('git rev-parse --abbrev-ref HEAD').toString().trim();
                console.log(chalk_1.default.cyan(`⬆️  Setting upstream and pushing to ${remoteName}/${branchName}...`));
                (0, child_process_1.execSync)(`git push --set-upstream ${remoteName} ${branchName}`, { stdio: 'inherit' });
            }
            console.log(chalk_1.default.green('✅ Changes committed and pushed successfully!'));
        }
        catch (error) {
            console.error(chalk_1.default.red('❌ Error during commit and push:'), error);
            process.exit(1);
        }
        finally {
            rl.close();
        }
    });
}
commitAndPush();
