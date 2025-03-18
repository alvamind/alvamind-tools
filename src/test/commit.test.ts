import { describe, test, expect, beforeEach, afterEach, mock } from 'bun:test';
import fs from 'fs';
import path from 'path';
import * as childProcess from 'child_process';
import { WorkflowBuilder, createWorkflow } from 'alvamind-workflow';
import {
    isGhInstalled,
    createGitignore,
    setupRepository,
    addGitOperations,
    setupRemoteAndPush,
    setupNewRemote,
    setupExistingRemote
} from '../tools/commit';

// Test directory setup
const TEST_DIR = path.join(process.cwd(), 'test-commit-dir');

// Setup and teardown helpers
beforeEach(() => {
    // Create test directory if it doesn't exist
    if (!fs.existsSync(TEST_DIR)) {
        fs.mkdirSync(TEST_DIR, { recursive: true });
    }

    // Change working directory to test directory
    process.chdir(TEST_DIR);
});

afterEach(() => {
    // Return to the original directory
    process.chdir(process.cwd());

    // Clean up test directory
    if (fs.existsSync(TEST_DIR)) {
        fs.rmSync(TEST_DIR, { recursive: true, force: true });
    }
});

describe('isGhInstalled', () => {
    test('should return boolean indicating if GitHub CLI is installed', async () => {
        const result = await isGhInstalled();
        // This will depend on the test environment
        expect(typeof result).toBe('boolean');
    });
});

describe('createGitignore', () => {
    test('should create .gitignore file if it does not exist', () => {
        // Ensure file doesn't exist initially
        const gitignorePath = path.join(TEST_DIR, '.gitignore');
        if (fs.existsSync(gitignorePath)) {
            fs.unlinkSync(gitignorePath);
        }

        // Call the function
        createGitignore();

        // Verify file was created
        expect(fs.existsSync(gitignorePath)).toBe(true);

        // Check content
        const content = fs.readFileSync(gitignorePath, 'utf-8');
        expect(content).toContain('/node_modules');
        expect(content).toContain('.DS_Store');
    });

    test('should not modify existing .gitignore file', () => {
        // Create a gitignore with custom content
        const gitignorePath = path.join(TEST_DIR, '.gitignore');
        const customContent = 'custom gitignore content';
        fs.writeFileSync(gitignorePath, customContent);

        // Call the function
        createGitignore();

        // Verify file still has original content
        const content = fs.readFileSync(gitignorePath, 'utf-8');
        expect(content).toBe(customContent);
    });
});

describe('setupRepository', () => {
    test('should add git init to workflow for new repo', async () => {
        // Ensure no git repository exists
        const gitPath = path.join(TEST_DIR, '.git');
        if (fs.existsSync(gitPath)) {
            fs.rmSync(gitPath, { recursive: true });
        }

        // Create workflow and apply setupRepository
        const workflow = createWorkflow({ name: "Test Workflow" });
        const commands: string[] = [];

        // Override execute to capture commands
        workflow.execute = (command: string) => {
            commands.push(command);
            return workflow;
        };

        await setupRepository(workflow);

        // Check if git init was added
        expect(commands).toContain('git init');
    });

    test('should not add git init to workflow for existing repo', async () => {
        // Create .git directory to simulate existing repo
        const gitPath = path.join(TEST_DIR, '.git');
        fs.mkdirSync(gitPath, { recursive: true });

        // Create workflow and apply setupRepository
        const workflow = createWorkflow({ name: "Test Workflow" });
        const commands: string[] = [];

        // Override execute to capture commands
        workflow.execute = (command: string) => {
            commands.push(command);
            return workflow;
        };

        await setupRepository(workflow);

        // Check if git init was not added
        expect(commands).not.toContain('git init');
    });
});

describe('addGitOperations', () => {
    test('should add git add and commit commands to workflow', () => {
        const workflow = createWorkflow({ name: "Test Workflow" });
        const commands: string[] = [];

        // Override execute to capture commands
        workflow.execute = (command: string) => {
            commands.push(command);
            return workflow;
        };

        addGitOperations(workflow);

        // Check if commands were added
        expect(commands).toContain('git add .');
        expect(commands.some(cmd => cmd.startsWith('git commit -m'))).toBe(true);
    });
});

describe('setupRemoteAndPush', () => {
    test('should not modify workflow if GitHub CLI is not installed', async () => {
        // Create a test workflow
        const workflow = createWorkflow({ name: "Test Workflow" });
        const commands: string[] = [];

        // Override execute to capture commands
        workflow.execute = (command: string) => {
            commands.push(command);
            return workflow;
        };

        // Use Bun's mock functionality to replace isGhInstalled
        const originalIsGhInstalled = isGhInstalled;

        // Create a spy that will return false to simulate GH not being installed
        const isGhInstalledSpy = mock(() => Promise.resolve(false));

        // Replace the imported function with our spy
        (globalThis as any).isGhInstalled = isGhInstalledSpy;

        try {
            await setupRemoteAndPush(workflow);
            // No commands should be added if GitHub CLI is not installed
            expect(commands.length).toBe(0);
            // Verify our spy was called
            expect(isGhInstalledSpy).toHaveBeenCalled();
        } finally {
            // Restore original function
            (globalThis as any).isGhInstalled = originalIsGhInstalled;
        }
    });
});

describe('setupExistingRemote', () => {
    test('should add git push for repo with upstream branch', () => {
        // Create workflow
        const workflow = createWorkflow({ name: "Test Workflow" });
        const commands: string[] = [];

        // Override execute to capture commands
        workflow.execute = (command: string) => {
            commands.push(command);
            return workflow;
        };

        // Store original execSync and use mock implementation
        const originalExecSync = childProcess.execSync;
        const execSyncMock = mock(() => Buffer.from('origin/main'));

        // Use mock.module to properly mock the module
        mock.module('child_process', () => ({
            ...childProcess,
            execSync: execSyncMock
        }));

        try {
            // Test with branch name
            setupExistingRemote(workflow, 'main');

            // Should contain regular push
            expect(commands).toContain('git push');
            // Should not contain set-upstream
            expect(commands.some(cmd => cmd.includes('--set-upstream'))).toBe(false);
            // Verify our mock was called
            expect(execSyncMock).toHaveBeenCalled();
        } finally {
            // Reset mocks
            mock.restore();
        }
    });

    test('should add git push with set-upstream for repo without upstream branch', () => {
        // Create workflow
        const workflow = createWorkflow({ name: "Test Workflow" });
        const commands: string[] = [];

        // Override execute to capture commands
        workflow.execute = (command: string) => {
            commands.push(command);
            return workflow;
        };

        // Create a mock that throws error
        const execSyncMock = mock(() => { throw new Error('No upstream branch'); });

        // Use mock.module to properly mock the module
        mock.module('child_process', () => ({
            ...childProcess,
            execSync: execSyncMock
        }));

        try {
            // Test with branch name
            setupExistingRemote(workflow, 'feature-branch');

            // Should contain set-upstream push
            expect(commands.some(cmd => cmd.includes('git push --set-upstream'))).toBe(true);
            expect(commands.some(cmd => cmd.includes('feature-branch'))).toBe(true);
            // Verify our mock was called
            expect(execSyncMock).toHaveBeenCalled();
        } finally {
            // Reset mocks
            mock.restore();
        }
    });
});

describe('setupNewRemote', () => {
    test('should add appropriate GitHub commands for a new remote', async () => {
        // Initialize a simulated test environment
        const workflow = createWorkflow({ name: "Test Workflow" });
        const commands: string[] = [];

        // Override execute to capture commands
        workflow.execute = (command: string, description = '', shouldLog = true) => {
            commands.push(command);
            return workflow;
        };

        // Simulate a branch name
        const branchName = 'main';

        // Use Bun's better mocking approach for readline
        const askQuestionSpy = mock(async () => 'y');

        // Define askQuestion globally if it's not already defined for test environment
        if (!global.askQuestion) {
            global.askQuestion = async () => 'y';
        }

        // Replace the askQuestion function
        const originalAskQuestion = global.askQuestion;
        global.askQuestion = askQuestionSpy;

        try {
            // Directly calling the function being tested
            await setupNewRemote(workflow, branchName);

            // Check that commands contain GitHub repo creation
            expect(commands.some(cmd => cmd.includes('gh repo create'))).toBe(true);
            expect(commands.some(cmd => cmd.includes('git remote'))).toBe(true);
            expect(commands.some(cmd => cmd.includes('git push --set-upstream'))).toBe(true);
        } finally {
            // Restore original function
            global.askQuestion = originalAskQuestion;
        }
    });
});
