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
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const projectDir = process.cwd();
function cleanProject() {
    return __awaiter(this, void 0, void 0, function* () {
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
        ];
        try {
            for (const folder of foldersToDelete) {
                const fullPath = path.join(projectDir, folder);
                if (fs.existsSync(fullPath)) {
                    fs.rmSync(fullPath, { recursive: true, force: true });
                    console.log(`Deleted: ${folder}`);
                }
                else {
                    console.log(`Not found : ${folder}`);
                }
            }
            for (const file of filesToDelete) {
                const fullPath = path.join(projectDir, file);
                if (fs.existsSync(fullPath)) {
                    fs.rmSync(fullPath, { force: true });
                    console.log(`Deleted : ${file}`);
                }
                else {
                    console.log(`Not found: ${file}`);
                }
            }
            const generatedDirs = yield findGeneratedDirs('.');
            for (const dir of generatedDirs) {
                const fullPath = path.join(projectDir, dir);
                if (fs.existsSync(fullPath)) {
                    fs.rmSync(fullPath, { recursive: true, force: true });
                    console.log(`Deleted generated dir: ${dir}`);
                }
            }
            console.log('Done.');
        }
        catch (error) {
            console.error('Error during cleaning:', error);
            process.exit(1);
        }
    });
}
function findGeneratedDirs(dir) {
    return __awaiter(this, void 0, void 0, function* () {
        const entries = fs.readdirSync(path.join(projectDir, dir), { withFileTypes: true });
        let generatedDirs = [];
        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);
            if (entry.isDirectory()) {
                if (entry.name === 'generated') {
                    generatedDirs.push(fullPath);
                }
                generatedDirs = [...generatedDirs, ...(yield findGeneratedDirs(fullPath))];
            }
        }
        return generatedDirs;
    });
}
cleanProject().catch((err) => console.error('Error:', err));
