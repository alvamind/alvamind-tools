import { describe, test, expect, beforeAll, afterAll, beforeEach, afterEach } from 'bun:test';
import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

const testDir = path.join(__dirname, 'test-temp');
const sourceFile = path.join(testDir, 'source-code.md');

// Helper function to run the generate-source script
function runGenerateSource(args: string = ''): string {
  try {
    const projectRoot = path.join(__dirname, '..', '..'); // Adjust based on your actual project structure
    const scriptPath = path.join(projectRoot, 'src', 'tools', 'generate-source.ts');
    const command = `bun ${scriptPath} ${args}`; // Use absolute path
    return execSync(command, { encoding: 'utf-8', cwd: projectRoot }); // Set cwd
  } catch (error: any) {
    console.error('Error executing command:', error.stdout || error);
    throw new Error(`Failed to execute generate-source: ${error.message || error.stdout || error}`);
  }
}
// Helper function to create a temp file
function createTempFile(filePath: string, content: string): void {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  fs.writeFileSync(filePath, content)
}

beforeAll(() => {
  fs.mkdirSync(testDir, { recursive: true })
  createTempFile(path.join(testDir, 'test.ts'), '// Test file\n const a = 1;');
  createTempFile(path.join(testDir, 'test2.ts'), '/* Test 2 */ \n const b = 2;');
  createTempFile(path.join(testDir, 'src', 'nested.ts'), 'const c = 3;\n\n// This is nested');
  createTempFile(path.join(testDir, 'src', 'nested2.ts'), 'const d = 4; \n // Second nested')
});

afterAll(() => {
  if (fs.existsSync(testDir)) {
    fs.rmSync(testDir, { recursive: true, force: true });
  }
});

beforeEach(() => {
  if (fs.existsSync(sourceFile)) {
    fs.rmSync(sourceFile);
  }
});

afterEach(() => {
  if (fs.existsSync(sourceFile)) {
    fs.rmSync(sourceFile);
  }
});

describe('generate-source.ts Parameter Testing', () => {
  test('should generate source code documentation with default options', () => {
    runGenerateSource();
    expect(fs.existsSync(sourceFile)).toBe(true);
    const content = fs.readFileSync(sourceFile, 'utf-8');
    expect(content).toContain('// test.ts');
    expect(content).toContain('// test2.ts');
    expect(content).toContain('// src/nested.ts');
    expect(content).toContain('// src/nested2.ts');
  });


  describe('--include parameter', () => {
    test('should include a single file', () => {
      runGenerateSource('--include=test.ts');
      expect(fs.existsSync(sourceFile)).toBe(true);
      const content = fs.readFileSync(sourceFile, 'utf-8');
      expect(content).toContain('// test.ts');
      expect(content).not.toContain('// test2.ts');
      expect(content).not.toContain('// src/nested.ts');
      expect(content).not.toContain('// src/nested2.ts');
    });

    test('should include multiple files', () => {
      runGenerateSource('--include=test.ts,test2.ts');
      expect(fs.existsSync(sourceFile)).toBe(true);
      const content = fs.readFileSync(sourceFile, 'utf-8');
      expect(content).toContain('// test.ts');
      expect(content).toContain('// test2.ts');
      expect(content).not.toContain('// src/nested.ts');
      expect(content).not.toContain('// src/nested2.ts');
    });

    test('should include a nested file', () => {
      runGenerateSource('--include=src/nested.ts');
      expect(fs.existsSync(sourceFile)).toBe(true);
      const content = fs.readFileSync(sourceFile, 'utf-8');
      expect(content).toContain('// src/nested.ts');
      expect(content).not.toContain('// test.ts');
      expect(content).not.toContain('// test2.ts');
      expect(content).not.toContain('// src/nested2.ts');
    });


    test('should include multiple nested files', () => {
      runGenerateSource('--include=src/nested.ts,src/nested2.ts');
      expect(fs.existsSync(sourceFile)).toBe(true);
      const content = fs.readFileSync(sourceFile, 'utf-8');
      expect(content).toContain('// src/nested.ts');
      expect(content).toContain('// src/nested2.ts');
      expect(content).not.toContain('// test.ts');
      expect(content).not.toContain('// test2.ts');
    });
    test('should handle glob patterns', () => {
      runGenerateSource('--include=src/*.ts');
      expect(fs.existsSync(sourceFile)).toBe(true);
      const content = fs.readFileSync(sourceFile, 'utf-8');
      expect(content).toContain('// src/nested.ts');
      expect(content).toContain('// src/nested2.ts');
      expect(content).not.toContain('// test.ts');
      expect(content).not.toContain('// test2.ts');
    });
  });


  describe('--exclude parameter', () => {
    test('should exclude a single file', () => {
      runGenerateSource('--exclude=test.ts');
      expect(fs.existsSync(sourceFile)).toBe(true);
      const content = fs.readFileSync(sourceFile, 'utf-8');
      expect(content).not.toContain('// test.ts');
      expect(content).toContain('// test2.ts');
      expect(content).toContain('// src/nested.ts');
      expect(content).toContain('// src/nested2.ts');
    });

    test('should exclude multiple files', () => {
      runGenerateSource('--exclude=test.ts,test2.ts');
      expect(fs.existsSync(sourceFile)).toBe(true);
      const content = fs.readFileSync(sourceFile, 'utf-8');
      expect(content).not.toContain('// test.ts');
      expect(content).not.toContain('// test2.ts');
      expect(content).toContain('// src/nested.ts');
      expect(content).toContain('// src/nested2.ts');
    });

    test('should exclude a nested file', () => {
      runGenerateSource('--exclude=src/nested.ts');
      expect(fs.existsSync(sourceFile)).toBe(true);
      const content = fs.readFileSync(sourceFile, 'utf-8');
      expect(content).not.toContain('// src/nested.ts');
      expect(content).toContain('// test.ts');
      expect(content).toContain('// test2.ts');
      expect(content).toContain('// src/nested2.ts');
    });
    test('should exclude nested files with pattern', () => {
      runGenerateSource('--exclude=src/*.ts');
      expect(fs.existsSync(sourceFile)).toBe(true);
      const content = fs.readFileSync(sourceFile, 'utf-8');
      expect(content).not.toContain('// src/nested.ts');
      expect(content).not.toContain('// src/nested2.ts');
      expect(content).toContain('// test.ts');
      expect(content).toContain('// test2.ts');

    });

    test('should exclude multiple nested files', () => {
      runGenerateSource('--exclude=src/nested.ts,src/nested2.ts');
      expect(fs.existsSync(sourceFile)).toBe(true);
      const content = fs.readFileSync(sourceFile, 'utf-8');
      expect(content).not.toContain('// src/nested.ts');
      expect(content).not.toContain('// src/nested2.ts');
      expect(content).toContain('// test.ts');
      expect(content).toContain('// test2.ts');
    });
  });


  describe('--output parameter', () => {
    test('should handle custom output filename', () => {
      const customOutput = path.join(testDir, 'custom-docs.md');
      runGenerateSource(`--output=custom-docs.md`);
      expect(fs.existsSync(customOutput)).toBe(true);
      const content = fs.readFileSync(customOutput, 'utf-8');
      expect(content).toContain('// test.ts');
      fs.rmSync(customOutput)
    });
  })
  describe('--preserve-blank-lines parameter', () => {
    test('should preserve blank lines with --preserve-blank-lines', () => {
      runGenerateSource(`--preserve-blank-lines`);
      expect(fs.existsSync(sourceFile)).toBe(true);
      const content = fs.readFileSync(sourceFile, 'utf-8');
      expect(content).toContain('const c = 3;\n\n// This is nested');
    });
  })

  describe('--preserve-comments parameter', () => {
    test('should preserve comments with --preserve-comments', () => {
      runGenerateSource(`--preserve-comments`);
      expect(fs.existsSync(sourceFile)).toBe(true);
      const content = fs.readFileSync(sourceFile, 'utf-8');
      expect(content).toContain('/* Test 2 */');
      expect(content).toContain('// Test file');
      expect(content).toContain('// This is nested');
      expect(content).toContain('// Second nested');

    });
  });


  test('should handle missing files gracefully', () => {
    const result = runGenerateSource('--include=nonexistent.ts');
    expect(result).toContain("Found 0 files");
  });

  test('should handle no files gracefully', () => {
    runGenerateSource('--exclude=**/*');
    expect(fs.existsSync(sourceFile)).toBe(true);
    const content = fs.readFileSync(sourceFile, 'utf-8');
    expect(content).not.toContain('// test.ts');
    expect(content).not.toContain('// src/nested.ts');
    expect(content).not.toContain('// test2.ts');
    expect(content).not.toContain('// src/nested2.ts');
  });

  test('should show help with no args', () => {
    const result = runGenerateSource();
    expect(result).toContain("Usage:");
  });
  test('should show help with --help arg', () => {
    const result = runGenerateSource('--help');
    expect(result).toContain("Usage:");
  });
  test('should return error with invalid arg', () => {
    try {
      runGenerateSource('--invalid=arg');
    } catch (e: any) {
      expect(e.message).toContain("Args error:");
    }
  });
});
