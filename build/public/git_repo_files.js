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
exports.git_repo_files = void 0;
const git_commit_branch_1 = require("../private/git_commit_branch");
const git_repo_1 = require("../private/git_repo");
const git_tree_1 = require("../private/git_tree");
const config_types_1 = require("../types/config.types");
const pr_config_1 = require("../util/pr_config");
const pr_lg_1 = require("../util/pr_lg");
const pr_lg_prg_1 = require("../util/pr_lg_prg");
const git_repo_files = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (path = './', config = config_types_1.CONFIG) {
    const repo = yield (0, git_repo_1.git_repo)(path, config);
    const commit = yield (0, git_commit_branch_1.git_commit_branch)(repo);
    const trees = yield (0, git_tree_1.git_trees)(commit);
    const gitRepoFiles = [];
    for (const [index, tree] of trees.entries()) {
        (0, pr_config_1.isStdPrgOut)(config) && (0, pr_lg_prg_1.pr_lg_prg)(trees.length, index + 1, 'Repo Files');
        gitRepoFiles.push(tree.path());
        (0, pr_config_1.isStdOut)(config) && (0, pr_lg_1.pr_repo_files)(gitRepoFiles[gitRepoFiles.length - 1]);
    }
    return gitRepoFiles;
});
exports.git_repo_files = git_repo_files;
