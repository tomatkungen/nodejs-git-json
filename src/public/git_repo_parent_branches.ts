import { Config, CONFIG } from "../types/config.types";
import { GitRepoParentBranches } from "../types/git_types";
import { isStdOut } from "../util/pr_config";
import { pr_repo_parent_branches } from "../util/pr_lg";
import { git_repo } from "./../private/git_repo";
import { Merge, Oid, Repository } from 'nodegit';

// cd ./my-feature-branch
// git branch --contains $(git merge-base --all HEAD main)
export const git_repo_parent_branches = async (path: string = './', config: Config = CONFIG): Promise<GitRepoParentBranches> => {

    // Get Repository
    const repo = await git_repo(path, config);

    const featureBranch = await repo.getCurrentBranch();
    const featureCommit = await repo.getBranchCommit(featureBranch);

    const references = await repo.getReferences();

    // Local branches
    const localBranches = references
        .filter(ref => ref.isBranch() && !ref.isRemote())
        .map(ref => ref.shorthand())
        .filter(ref => ref !== featureBranch.shorthand());

    // No local branches
    if (localBranches.length === 0)
        return [];

    // Parent branches
    let parentBranches: GitRepoParentBranches = [];

    for (const localbranch of localBranches) {

        // Get local branch commit
        const localbranchRef = await repo.getReference(localbranch);
        const branchCommit = await repo.getBranchCommit(localbranchRef);

        // Get merge base between feature and local branch
        const mergeBase = await getMergeBase(repo, featureCommit.id(), branchCommit.id());

        if (mergeBase)
            parentBranches.push(localbranch);

    }

    isStdOut(config) && pr_repo_parent_branches(
        featureBranch.shorthand(),
        parentBranches
    );
    
    return parentBranches;
}

const getMergeBase = async (repo: Repository, featureCommitOid: Oid, localCommitOid: Oid): Promise<Oid | null> => {
    try {
        return await Merge.base(repo, featureCommitOid, localCommitOid);
    } catch (error) {
        return null;
    }
}