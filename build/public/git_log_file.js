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
exports.git_log_file = void 0;
const nodegit_1 = require("nodegit");
const path_1 = require("path");
const git_commit_branch_1 = require("../private/git_commit_branch");
const git_repo_1 = require("../private/git_repo");
const config_types_1 = require("../types/config.types");
const pr_config_1 = require("../util/pr_config");
const pr_lg_1 = require("../util/pr_lg");
const pr_lg_prg_1 = require("../util/pr_lg_prg");
const git_commit_files_1 = require("./../private/git_commit_files");
const git_commit_stats_1 = require("./../private/git_commit_stats");
const git_log_file = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (path = './', filePath, config = config_types_1.CONFIG) {
    const repo = yield (0, git_repo_1.git_repo)(path, config);
    const commitBranch = yield (0, git_commit_branch_1.git_commit_branch)(repo);
    const reWalk = repo.createRevWalk();
    reWalk.sorting(2);
    reWalk.push(commitBranch.id());
    const historyEntrys = yield reWalk.fileHistoryWalk((0, path_1.relative)(repo.workdir(), filePath), 1000);
    if (historyEntrys.length === 0)
        return [];
    const Oids = historyEntrys.map((historyEntry) => (historyEntry.commit.sha()));
    const gitLogs = [];
    for (const [index, Oid] of Oids.entries()) {
        (0, pr_config_1.isStdPrgOut)(config) && (0, pr_lg_prg_1.pr_lg_prg)(Oids.length, index + 1, 'Commit');
        const commit = yield repo.getCommit(Oid);
        const parentCommit = commit.parentId(0) && (yield commit.parent(0));
        const [cT, pT] = yield Promise.all([
            commit.getTree(),
            parentCommit ? parentCommit.getTree() : undefined
        ]);
        const diff = yield nodegit_1.Diff.treeToTree(repo, pT, cT);
        const gitCommitStats = yield (0, git_commit_stats_1.git_commit_stats)(diff);
        const gitCommitFiles = yield (0, git_commit_files_1.git_commit_files)(diff);
        gitLogs.push(create_log(commit, gitCommitStats, gitCommitFiles));
        (0, pr_config_1.isStdOut)(config) && (0, pr_lg_1.pr_log)(gitLogs[gitLogs.length - 1]);
    }
    return gitLogs;
});
exports.git_log_file = git_log_file;
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
