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
exports.git_log_feature_branch_users_commits = void 0;
const git_branch_name_1 = require("../private/git_branch_name");
const git_branch_root_1 = require("../private/git_branch_root");
const git_error_1 = require("../private/git_error");
const git_exec_1 = require("../private/git_exec");
const git_repo_1 = require("../private/git_repo");
const config_types_1 = require("../types/config.types");
const pr_config_1 = require("../util/pr_config");
const pr_lg_1 = require("../util/pr_lg");
const pr_lg_prg_1 = require("../util/pr_lg_prg");
const git_log_feature_branch_users_commits = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (path = './', config = config_types_1.CONFIG) {
    const repo = yield (0, git_repo_1.git_repo)(path, config);
    const featureBranch = yield (0, git_branch_name_1.git_branch_name)(repo);
    const rootBranch = yield (0, git_branch_root_1.git_branch_root)(repo, featureBranch);
    const stdOut = yield (0, git_exec_1.git_exec)(repo.workdir(), 'git', 'log', featureBranch, '--not', rootBranch, `--pretty=format:${['%H', '%an', '%ae'].join('%x00')}`, '--no-merges');
    if (stdOut.includes('fatal:'))
        throw (0, git_error_1.git_error)(`GIT_REPO: ${stdOut}`);
    if (stdOut === '')
        return [];
    const lines = stdOut.trim().split('\n');
    if (lines.length === 0)
        return [];
    let gitAuthor = [];
    const gitUsers = lines.reduce((prev, line, index) => {
        (0, pr_config_1.isStdPrgOut)(config) && (0, pr_lg_prg_1.pr_lg_prg)(lines.length, index + 1, 'User Commit');
        const [sha, gitAuthorName, gitAuthorEmail] = line.split('\0');
        const gitAuthorIndex = gitUser(gitAuthor, gitAuthorName, gitAuthorEmail);
        if (gitAuthorIndex === -1)
            gitAuthor.push(gitAuthorName + gitAuthorEmail);
        gitUserAdd(gitAuthorIndex, gitAuthorName, gitAuthorEmail, sha, prev);
        return prev;
    }, []);
    (0, pr_config_1.isStdOut)(config) && gitUsers.forEach(pr_lg_1.pr_users);
    return gitUsers;
});
exports.git_log_feature_branch_users_commits = git_log_feature_branch_users_commits;
const gitUser = (gitAuthor, authorName, authorEmail) => {
    return gitAuthor.indexOf(authorName + authorEmail);
};
const gitUserAdd = (gitAuthorIndex, authorName, authorEmail, sha, prev) => {
    if (gitAuthorIndex === -1) {
        prev.push({
            authorName,
            authorEmail,
            totalCommits: 1,
            commits: [sha]
        });
    }
    else {
        prev[gitAuthorIndex].totalCommits += 1;
        prev[gitAuthorIndex].commits.push(sha);
    }
};
