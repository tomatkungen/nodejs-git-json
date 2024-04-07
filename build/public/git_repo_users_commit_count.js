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
exports.git_repo_users_commit_count = void 0;
const child_process_1 = require("child_process");
const git_repo_1 = require("../private/git_repo");
const config_types_1 = require("../types/config.types");
const pr_lg_prg_1 = require("../util/pr_lg_prg");
const pr_config_1 = require("../util/pr_config");
const pr_lg_1 = require("../util/pr_lg");
const git_repo_users_commit_count = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (path = './', config = config_types_1.CONFIG) {
    const repo = yield (0, git_repo_1.git_repo)(path, config);
    const stdout = yield exec(repo.workdir(), 'git', '--no-pager', 'shortlog', '-n', '-s');
    if (stdout === '')
        return [];
    const lines = stdout.trim().split('\n');
    if (lines.length === 0)
        return [];
    const gitRepoUsersCommitCount = [];
    lines.forEach((line, index) => {
        (0, pr_config_1.isStdPrgOut)(config) && (0, pr_lg_prg_1.pr_lg_prg)(lines.length, index + 1, 'Users Commit Length');
        const gitUserCommitCount = getGitUsersCommitLength(line);
        if (!gitUserCommitCount)
            return;
        gitRepoUsersCommitCount.push(gitUserCommitCount);
        (0, pr_config_1.isStdOut)(config) && (0, pr_lg_1.pr_repo_users_commit_count)(gitRepoUsersCommitCount[gitRepoUsersCommitCount.length - 1]);
    });
    return gitRepoUsersCommitCount;
});
exports.git_repo_users_commit_count = git_repo_users_commit_count;
const getGitUsersCommitLength = (line) => {
    if (line === '')
        return null;
    const gitUserCommitLength = line.replace(/\s+/g, ' ').trim().split(' ');
    if (gitUserCommitLength.length < 2)
        return null;
    const commits = gitUserCommitLength[0];
    if (commits === '')
        return null;
    const authorName = gitUserCommitLength.slice(1).join(' ');
    if (authorName === '')
        return null;
    return {
        authorName,
        commits: parseInt(commits, 10)
    };
};
const exec = (workdir, ...command) => {
    let p = (0, child_process_1.spawn)(command[0], command.slice(1), { cwd: workdir, stdio: ['inherit', 'pipe', 'pipe'] });
    return new Promise((resolve, reject) => {
        const stdOut = [];
        p.stdout.on("data", (res) => {
            stdOut.push(res.toString());
        });
        p.stderr.on("data", () => {
            reject('');
        });
        p.on('close', () => {
            if (stdOut.length > 0)
                resolve(stdOut.join(''));
            resolve('');
        });
    });
};
