# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.3] - 2025-01-04
### Added
-   **`commit` CLI Tool:**
    -   Now initializes a git repository if none exists.
    -   If `gh` is installed, creates a GitHub repository for you if none exists.
    -   Asks for public or private when creating a new repo.
    -   Asks if you want to set the upstream branch.

### Changed
-   **`generate-source` CLI Tool:**
    -   Now includes the project name at the top of the generated Markdown file, enhancing its readability.
    -   Improved include/exclude functionality with regex support for more flexible filtering.
    -   Add try catch error for exclude parsing.
-   **`commit` CLI Tool:**
    -   Now checks for existing changes before attempting to commit and push.

### Fixed
    -   Fix: prevent error when deleting a file or folder not existing.

## [1.0.2] - 2025-01-04

### Added

-   **`clean` CLI Tool:**
    -   Introduced a new CLI tool, `clean`, which removes common build artifacts, lockfiles, and cache directories.
    -   Deletes the following directories: `.bun`, `.turbo`, `.eslintcache`, `.parcel-cache`, `node_modules`, `.next`, `.cache`, `dist`, `build`, `coverage`, and `.vite`.
    -   Deletes the following files: `.bun.lockb`, `yarn.lock`, `package-lock.json`, `pnpm-lock.yaml` and `.DS_Store`.
    -   Recursively removes all directories named `generated` throughout the project.
    -   Includes basic error handling with console logs for missing directories and files.
-  **Exported `clean` on `index.ts`**
### Changed
-   **`generate-source` CLI Tool:**
    -   Now includes the project name at the top of the generated Markdown file, enhancing its readability.
    -   Improved include/exclude functionality with regex support for more flexible filtering.
    -   Add try catch error for exclude parsing.
-   **`commit` CLI Tool:**
    -   Now checks for existing changes before attempting to commit and push.

### Fixed
    -   Fix: prevent error when deleting a file or folder not existing.

## [1.0.6] - 2025-01-05
### Added
-   **`add-json-script` CLI Tool:**
    -   Adds example scripts to your `package.json` file for all available tools.
    -   Asks for user confirmation before adding the scripts.

## [1.0.1] - 2025-01-02

### Added

-   **Initial Release:**
    -   `generate-source` CLI tool: Generates a Markdown file containing the project's source code, excluding specified files and directories.
    -   `commit` CLI tool: Automates the `git add .`, `git commit -m "message"`, and `git push` workflow.
