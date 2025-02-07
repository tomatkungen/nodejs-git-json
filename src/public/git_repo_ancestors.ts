import { Merge, Oid, Repository } from 'nodegit';
import { Config, CONFIG } from "../types/config.types";
import { GitRepoAncestors } from "../types/git_types";
import { isStdOut } from "../util/pr_config";
import { pr_repo_parent_branches } from "../util/pr_lg";
import { git_repo } from "../private/git_repo";

// cd ./my-feature-branch
// git branch --contains $(git merge-base --all HEAD main)
// git merge-base HEAD main
export const git_repo_ancestors = async (path: string = './', config: Config = CONFIG): Promise<GitRepoAncestors> => {

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

    // Parent branches
    let ancestorBranches: GitRepoAncestors = {
        ref: featureBranch.shorthand(),
        sha: featureCommit.id().tostrS(),
        ancestors: []
    };

    // No local branches
    if (localBranches.length === 0)
        return ancestorBranches;

    for (const localbranch of localBranches) {

        // Get local branch commit
        const localbranchRef = await repo.getReference(localbranch);
        const branchCommit = await repo.getBranchCommit(localbranchRef);

        // Get merge base between feature and local branch
        const mergeBase = await getMergeBase(repo, featureCommit.id(), branchCommit.id());

        if (mergeBase)
            ancestorBranches.ancestors.push({
                ref: localbranch,
                sha: mergeBase.tostrS()
            })

    }

    isStdOut(config) && pr_repo_parent_branches(ancestorBranches);

    return ancestorBranches;
}

const getMergeBase = async (repo: Repository, featureCommitOid: Oid, localCommitOid: Oid): Promise<Oid | null> => {
    try {
        return await Merge.base(repo, featureCommitOid, localCommitOid);
    } catch (error) {
        return null;
    }
}