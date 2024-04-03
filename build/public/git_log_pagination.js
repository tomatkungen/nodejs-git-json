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
exports.git_log_pagination = void 0;
const nodegit_1 = require("nodegit");
const git_commit_branch_1 = require("../private/git_commit_branch");
const git_repo_1 = require("../private/git_repo");
const config_types_1 = require("../types/config.types");
const git_commit_stats_1 = require("../private/git_commit_stats");
const git_commit_files_1 = require("../private/git_commit_files");
const pr_config_1 = require("../util/pr_config");
const pr_lg_prg_1 = require("../util/pr_lg_prg");
const pr_lg_1 = require("../util/pr_lg");
const git_log_pagination = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (path = './', gitLogPagination, config = config_types_1.CONFIG) {
    const repo = yield (0, git_repo_1.git_repo)(path, config);
    const commitBranch = yield (0, git_commit_branch_1.git_commit_branch)(repo);
    const reWalk = repo.createRevWalk();
    reWalk.push(commitBranch.id());
    const gitLogs = [];
    let index = 0, next = true;
    while (next) {
        (0, pr_config_1.isStdPrgOut)(config) && (0, pr_lg_prg_1.pr_lg_prg)((gitLogPagination.currentPage + 1) * gitLogPagination.commitsPerPage, index, 'Commit');
        try {
            const Oid = yield reWalk.next();
            const pos = paginationPosition(index, gitLogPagination);
            if (pos === 'middle') {
                gitLogs.push(yield addCommit(Oid, repo));
            }
            index++;
            if (pos === 'left')
                continue;
            if (pos === 'right')
                break;
        }
        catch (e) {
            next = false;
        }
    }
    (0, pr_config_1.isStdOut)(config) && gitLogs.forEach(pr_lg_1.pr_log);
    return gitLogs;
});
exports.git_log_pagination = git_log_pagination;
const paginationPosition = (index, gitLogPagination) => {
    if ((gitLogPagination.commitsPerPage * gitLogPagination.currentPage) <= index &&
        index < (gitLogPagination.commitsPerPage * (gitLogPagination.currentPage + 1)))
        return 'middle';
    if ((index >= (gitLogPagination.commitsPerPage * (gitLogPagination.currentPage + 1))))
        return 'right';
    return 'left';
};
const addCommit = (Oid, repo) => __awaiter(void 0, void 0, void 0, function* () {
    const commit = yield repo.getCommit(Oid);
    const parentCommit = commit.parentId(0) && (yield commit.parent(0));
    const [cT, pT] = yield Promise.all([
        commit.getTree(),
        parentCommit ? parentCommit.getTree() : undefined
    ]);
    const diff = yield nodegit_1.Diff.treeToTree(repo, pT, cT);
    const gitCommitStats = yield (0, git_commit_stats_1.git_commit_stats)(diff);
    const gitCommitFiles = yield (0, git_commit_files_1.git_commit_files)(diff);
    return create_log(commit, gitCommitStats, gitCommitFiles);
});
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
