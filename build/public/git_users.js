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
exports.git_users = void 0;
const config_types_1 = require("../types/config.types");
const pr_config_1 = require("../util/pr_config");
const pr_lg_1 = require("../util/pr_lg");
const pr_lg_prg_1 = require("../util/pr_lg_prg");
const git_repo_1 = require("./../private/git_repo");
const git_users = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (path = './', config = config_types_1.CONFIG) {
    const repo = yield (0, git_repo_1.git_repo)(path, config);
    const reference = yield repo.getCurrentBranch();
    const branchName = reference.shorthand();
    const branch = yield repo.getBranchCommit(branchName);
    const history = branch.history();
    const commits = yield get_commits(history);
    if (commits.length === 0)
        return [];
    let gitAuthor = [];
    const gitUsers = commits.reduce((prev, commit, index) => {
        (0, pr_config_1.isStdPrgOut)(config) && (0, pr_lg_prg_1.pr_lg_prg)(commits.length, index + 1, 'Commit');
        const gitAuthorIndex = gitUser(gitAuthor, commit);
        if (gitAuthorIndex === -1) {
            gitAuthor.push(commit.author().name() + commit.author().email());
        }
        gitUserAdd(gitAuthorIndex, commit, prev);
        return prev;
    }, []);
    (0, pr_config_1.isStdOut)(config) && gitUsers.forEach(pr_lg_1.pr_users);
    return gitUsers;
});
exports.git_users = git_users;
const get_commits = (history) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve) => {
        history.on('end', (commits) => {
            resolve(commits);
        });
        history.start();
    });
});
const gitUser = (gitAuthor, commit) => {
    return gitAuthor.indexOf(commit.author().name() + commit.author().email());
};
const gitUserAdd = (gitAuthorIndex, commit, prev) => {
    if (gitAuthorIndex === -1) {
        prev.push({
            authorName: commit.author().name(),
            authorEmail: commit.author().email(),
            totalCommits: 1,
            commits: [commit.sha()]
        });
    }
    else {
        prev[gitAuthorIndex].totalCommits += 1;
        prev[gitAuthorIndex].commits.push(commit.sha());
    }
};
