import { git_branch_merge_base } from '../private/git_branch_merge_base';
import { git_branch_name } from "../private/git_branch_name";
import { git_branch_names } from '../private/git_branch_names';
import { git_commit_branch } from '../private/git_commit_branch';
import { git_repo } from "../private/git_repo";
import { Config, CONFIG } from "../types/config.types";
import { GitRepoAncestors } from "../types/git_types";
import { isStdOut } from "../util/pr_config";
import { pr_repo_parent_branches } from "../util/pr_lg";

// cd ./my-feature-branch
// git branch --contains $(git merge-base --all HEAD main)
// git merge-base HEAD main
export const git_repo_ancestors = async (path: string = './', config: Config = CONFIG): Promise<GitRepoAncestors> => {

    // Get Repository
    const repo = await git_repo(path, config);

    // Get Branch name from HEAD
    const branchName = await git_branch_name(repo);
    
    // Get Branch commit
    const branchCommit = await git_commit_branch(repo);

    // Local branches
    const localBranchNames = await git_branch_names(repo, branchName);

    // Parent branches
    let ancestorBranches: GitRepoAncestors = {
        ref: branchName,
        sha: branchCommit.id().tostrS(),
        ancestors: []
    };

    // No local branches
    if (localBranchNames.length === 0)
        return ancestorBranches;

    for (const localbranch of localBranchNames) {

        // Get local branch commit
        const localbranchRef = await repo.getReference(localbranch);
        const localCommit = await repo.getBranchCommit(localbranchRef);

        // Get merge base between feature and local branch
        const mergeBase = await git_branch_merge_base(repo, branchCommit.id(), localCommit.id());

        if (mergeBase)
            ancestorBranches.ancestors.push({
                ref: localbranch,
                sha: mergeBase.tostrS()
            })

    }

    isStdOut(config) && pr_repo_parent_branches(ancestorBranches);

    return ancestorBranches;
}
