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
exports.git_log_branch_commits = void 0;
const git_branch_name_1 = require("../private/git_branch_name");
const git_branch_names_1 = require("../private/git_branch_names");
const git_exec_1 = require("../private/git_exec");
const git_repo_1 = require("../private/git_repo");
const config_types_1 = require("../types/config.types");
const pr_config_1 = require("../util/pr_config");
const pr_lg_1 = require("../util/pr_lg");
const pr_lg_prg_1 = require("../util/pr_lg_prg");
const git_log_branch_commits = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (path = './', config = config_types_1.CONFIG) {
    const repo = yield (0, git_repo_1.git_repo)(path, config);
    const branchName = yield (0, git_branch_name_1.git_branch_name)(repo);
    const localBranchNames = yield (0, git_branch_names_1.git_branch_names)(repo, branchName);
    const sha = yield (0, git_exec_1.git_exec)(repo.workdir(), 'git', 'merge-base', '--all', 'HEAD', ...localBranchNames);
    if (sha === '')
        return [];
    const stdOut = yield (0, git_exec_1.git_exec)(repo.workdir(), 'git', 'log', `--pretty=format:${['%H', "%ci", "%s", "%an", "%ae", "%cn", "%ce"].join('%x00')}`, '--no-merges', `${sha.replace(/\n/g, '')}..${branchName}`);
    if (stdOut === '')
        return [];
    const lines = stdOut.trim().split('\n');
    if (lines.length === 0)
        return [];
    return lines.map((line, index) => {
        (0, pr_config_1.isStdPrgOut)(config) && (0, pr_lg_prg_1.pr_lg_prg)(lines.length, index + 1, 'Repo commit');
        const [sha, date, message, authorName, authorEmail, committerName, committerEmail] = line.split('\0');
        const gitLogShort = {
            sha,
            date,
            message,
            authorName,
            authorEmail,
            committerName,
            committerEmail
        };
        (0, pr_config_1.isStdOut)(config) && (0, pr_lg_1.pr_log_short)(gitLogShort);
        return gitLogShort;
    });
});
exports.git_log_branch_commits = git_log_branch_commits;
