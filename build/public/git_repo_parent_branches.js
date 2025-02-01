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
exports.git_repo_parent_branches = void 0;
const config_types_1 = require("../types/config.types");
const pr_config_1 = require("../util/pr_config");
const pr_lg_1 = require("../util/pr_lg");
const git_repo_1 = require("./../private/git_repo");
const nodegit_1 = require("nodegit");
const git_repo_parent_branches = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (path = './', config = config_types_1.CONFIG) {
    const repo = yield (0, git_repo_1.git_repo)(path, config);
    const featureBranch = yield repo.getCurrentBranch();
    const featureCommit = yield repo.getBranchCommit(featureBranch);
    const references = yield repo.getReferences();
    const localBranches = references
        .filter(ref => ref.isBranch() && !ref.isRemote())
        .map(ref => ref.shorthand())
        .filter(ref => ref !== featureBranch.shorthand());
    if (localBranches.length === 0)
        return [];
    let parentBranches = [];
    for (const localbranch of localBranches) {
        const localbranchRef = yield repo.getReference(localbranch);
        const branchCommit = yield repo.getBranchCommit(localbranchRef);
        const mergeBase = yield getMergeBase(repo, featureCommit.id(), branchCommit.id());
        if (mergeBase)
            parentBranches.push(localbranch);
    }
    (0, pr_config_1.isStdOut)(config) && (0, pr_lg_1.pr_repo_parent_branches)(featureBranch.shorthand(), parentBranches);
    return parentBranches;
});
exports.git_repo_parent_branches = git_repo_parent_branches;
const getMergeBase = (repo, featureCommitOid, localCommitOid) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield nodegit_1.Merge.base(repo, featureCommitOid, localCommitOid);
    }
    catch (error) {
        return null;
    }
});
