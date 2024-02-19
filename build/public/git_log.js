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
exports.git_log = void 0;
const nodegit_1 = require("nodegit");
const pr_lg_1 = require("../util/pr_lg");
const pr_lg_prg_1 = require("../util/pr_lg_prg");
const git_commit_files_1 = require("./../private/git_commit_files");
const git_commit_stats_1 = require("./../private/git_commit_stats");
const git_repo_1 = require("./../private/git_repo");
const config_types_1 = require("./../types/config.types");
const pr_config_1 = require("./../util/pr_config");
const git_log = (path = './', config = config_types_1.CONFIG) => __awaiter(void 0, void 0, void 0, function* () {
    const repo = yield (0, git_repo_1.git_repo)(path, config);
    const reference = yield repo.getCurrentBranch();
    const branchName = reference.shorthand();
    const branch = yield repo.getBranchCommit(branchName);
    const history = branch.history();
    const commits = yield get_commits(history);
    if (commits.length === 0)
        return [];
    const gitLogs = [];
    for (const [index, commit] of commits.entries()) {
        (0, pr_config_1.isStdPrgOut)(config) && (0, pr_lg_prg_1.pr_lg_prg)(commits.length, index + 1, 'Commit');
        const [cT, pT] = yield Promise.all([
            commit.getTree(),
            commits[index + 1] ? commits[index + 1].getTree() : undefined
        ]);
        const diff = yield nodegit_1.Diff.treeToTree(repo, pT, cT);
        const gitCommitStats = yield (0, git_commit_stats_1.git_commit_stats)(diff);
        const gitCommitFiles = yield (0, git_commit_files_1.git_commit_files)(diff);
        gitLogs.push(create_log(commit, gitCommitStats, gitCommitFiles));
        (0, pr_config_1.isStdOut)(config) && (0, pr_lg_1.pr_log)(gitLogs[gitLogs.length - 1]);
    }
    return gitLogs;
});
exports.git_log = git_log;
const create_log = (commit, gitCommitStat, gitCommitFiles) => {
    return {
        sha: commit.sha(),
        date: commit.date().toISOString(),
        message: commit.message(),
        authorName: commit.author().name(),
        authorEmail: commit.author().email(),
        commiterName: commit.committer().name(),
        commiterEmail: commit.committer().email(),
        insertion: gitCommitStat.insertion,
        deletion: gitCommitStat.deletion,
        fileChanged: gitCommitStat.fileChanged,
        files: gitCommitFiles,
    };
};
const get_commits = (history) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve) => {
        history.on('end', (commits) => {
            resolve(commits);
        });
        history.start();
    });
});
