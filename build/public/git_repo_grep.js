"use strict";
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
exports.git_repo_grep = void 0;
const git_exec_1 = require("../private/git_exec");
const git_repo_1 = require("../private/git_repo");
const config_types_1 = require("../types/config.types");
const pr_config_1 = require("../util/pr_config");
const pr_lg_1 = require("../util/pr_lg");
const pr_lg_prg_1 = require("../util/pr_lg_prg");
const git_repo_grep = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (path = './', pattern, pathspec, config = config_types_1.CONFIG) {
    const repo = yield (0, git_repo_1.git_repo)(path, config);
    const stdout = yield (0, git_exec_1.git_exec)(repo.workdir(), 'git', ...['grep', '--line-number', '-I', `${pattern}`, ...(pathspec ? ['--', pathspec] : [])]);
    if (stdout === '')
        return [];
    const lines = stdout.trim().split('\n');
    if (lines.length === 0)
        return [];
    const gitRepoGreps = [];
    for (const [index, line] of lines.entries()) {
        (0, pr_config_1.isStdPrgOut)(config) && (0, pr_lg_prg_1.pr_lg_prg)(lines.length, index + 1, 'Commit');
        const gitRepoGrep = getGitRepoGreps(line);
        if (!gitRepoGrep)
            continue;
        gitRepoGreps.push(gitRepoGrep);
        (0, pr_config_1.isStdOut)(config) && (0, pr_lg_1.pr_repo_grep)(gitRepoGreps[gitRepoGreps.length - 1], pattern);
    }
    return gitRepoGreps;
});
exports.git_repo_grep = git_repo_grep;
const getGitRepoGreps = (grepLine) => {
    if (grepLine === '')
        return null;
    try {
        const filePath = grepLine.replace(/\s+/g, ' ').split(':')[0].trim();
        if (filePath === '')
            return null;
        const lineno = grepLine.replace(/\s+/g, ' ').split(':')[1].trim();
        if (lineno === '')
            return null;
        const line = grepLine.replace(`${filePath}:`, '').replace(`${lineno}:`, '');
        if (line === '')
            return null;
        return {
            filePath,
            lineno,
            line
        };
    }
    catch (e) {
        return null;
    }
};
