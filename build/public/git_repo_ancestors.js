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
exports.git_repo_ancestors = void 0;
const git_branch_merge_base_1 = require("../private/git_branch_merge_base");
const git_branch_name_1 = require("../private/git_branch_name");
const git_branch_names_1 = require("../private/git_branch_names");
const git_commit_branch_1 = require("../private/git_commit_branch");
const git_repo_1 = require("../private/git_repo");
const config_types_1 = require("../types/config.types");
const pr_config_1 = require("../util/pr_config");
const pr_lg_1 = require("../util/pr_lg");
const git_repo_ancestors = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (path = './', config = config_types_1.CONFIG) {
    const repo = yield (0, git_repo_1.git_repo)(path, config);
    const branchName = yield (0, git_branch_name_1.git_branch_name)(repo);
    const branchCommit = yield (0, git_commit_branch_1.git_commit_branch)(repo);
    const localBranchNames = yield (0, git_branch_names_1.git_branch_names)(repo, branchName);
    let ancestorBranches = {
        ref: branchName,
        sha: branchCommit.id().tostrS(),
        ancestors: []
    };
    if (localBranchNames.length === 0)
        return ancestorBranches;
    for (const localbranch of localBranchNames) {
        const localbranchRef = yield repo.getReference(localbranch);
        const localCommit = yield repo.getBranchCommit(localbranchRef);
        const mergeBase = yield (0, git_branch_merge_base_1.git_branch_merge_base)(repo, branchCommit.id(), localCommit.id());
        if (mergeBase)
            ancestorBranches.ancestors.push({
                ref: localbranch,
                sha: mergeBase.tostrS()
            });
    }
    (0, pr_config_1.isStdOut)(config) && (0, pr_lg_1.pr_repo_parent_branches)(ancestorBranches);
    return ancestorBranches;
});
exports.git_repo_ancestors = git_repo_ancestors;
