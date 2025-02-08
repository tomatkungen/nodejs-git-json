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
exports.git_log_commit = void 0;
const nodegit_1 = require("nodegit");
const git_commit_files_1 = require("../private/git_commit_files");
const git_commit_stats_1 = require("../private/git_commit_stats");
const git_repo_1 = require("../private/git_repo");
const config_types_1 = require("../types/config.types");
const pr_lg_1 = require("../util/pr_lg");
const pr_config_1 = require("./../util/pr_config");
const git_log_commit = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (path = './', sha = "", config = config_types_1.CONFIG) {
    const repo = yield (0, git_repo_1.git_repo)(path, config);
    const commit = yield repo.getCommit(sha);
    const parentCommit = commit.parentId(0) && (yield commit.parent(0));
    const [cT, pT] = yield Promise.all([
        commit.getTree(),
        parentCommit ? parentCommit.getTree() : undefined
    ]);
    const diff = yield nodegit_1.Diff.treeToTree(repo, pT, cT);
    const gitCommitStats = yield (0, git_commit_stats_1.git_commit_stats)(diff);
    const gitCommitFiles = yield (0, git_commit_files_1.git_commit_files)(diff);
    const gitLog = create_log(commit, gitCommitStats, gitCommitFiles);
    (0, pr_config_1.isStdOut)(config) && (0, pr_lg_1.pr_log_commit)(gitLog);
    return gitLog;
});
exports.git_log_commit = git_log_commit;
const create_log = (commit, gitCommitStat, gitCommitFiles) => {
    return {
        sha: commit.sha(),
        date: commit.date().toISOString(),
        message: commit.message(),
        authorName: commit.author().name(),
        authorEmail: commit.author().email(),
        committerName: commit.committer().name(),
        committerEmail: commit.committer().email(),
        insertion: gitCommitStat.insertion,
        deletion: gitCommitStat.deletion,
        fileChanged: gitCommitStat.fileChanged,
        files: gitCommitFiles,
    };
};
