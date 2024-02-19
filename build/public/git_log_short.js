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
exports.git_log_short = void 0;
const git_repo_1 = require("../private/git_repo");
const config_types_1 = require("../types/config.types");
const pr_config_1 = require("../util/pr_config");
const pr_lg_1 = require("../util/pr_lg");
const pr_lg_prg_1 = require("../util/pr_lg_prg");
const git_log_short = (path = './', config = config_types_1.CONFIG) => __awaiter(void 0, void 0, void 0, function* () {
    const repo = yield (0, git_repo_1.git_repo)(path, config);
    const reference = yield repo.getCurrentBranch();
    const branchName = reference.shorthand();
    const branch = yield repo.getBranchCommit(branchName);
    const history = branch.history();
    const commits = yield get_commits(history);
    return commits.map((commit, index) => {
        (0, pr_config_1.isStdPrgOut)(config) && (0, pr_lg_prg_1.pr_lg_prg)(commits.length, index + 1, 'Commit');
        const gitLogShort = create_log(commit);
        (0, pr_config_1.isStdOut)(config) && (0, pr_lg_1.pr_log_short)(gitLogShort);
        return gitLogShort;
    });
});
exports.git_log_short = git_log_short;
const create_log = (commit) => {
    return {
        sha: commit.sha(),
        date: commit.date().toISOString(),
        message: commit.message(),
        authorName: commit.author().name(),
        authorEmail: commit.author().email(),
        commiterName: commit.committer().name(),
        commiterEmail: commit.committer().email(),
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
