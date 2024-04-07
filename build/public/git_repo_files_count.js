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
exports.git_repo_files_count = void 0;
const git_repo_1 = require("../private/git_repo");
const git_tree_1 = require("../private/git_tree");
const config_types_1 = require("../types/config.types");
const git_commit_branch_1 = require("../private/git_commit_branch");
const git_repo_files_count = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (path = './', config = config_types_1.CONFIG) {
    const repo = yield (0, git_repo_1.git_repo)(path, config);
    const commit = yield (0, git_commit_branch_1.git_commit_branch)(repo);
    const trees = yield (0, git_tree_1.git_trees)(commit);
    return trees.length;
});
exports.git_repo_files_count = git_repo_files_count;
