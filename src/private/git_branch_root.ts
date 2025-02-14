import { Repository } from "nodegit";
import { git_branch_names } from "./git_branch_names";
import { git_exec } from "./git_exec";

export const git_branch_root = async (repo: Repository, featureBranch: string): Promise<string> => {

    // Local branches
    const localBranchNames = await git_branch_names(repo, featureBranch);

    // Only one local branch
    if (localBranchNames.length === 1)
        return localBranchNames[0];

    // Remote branch
    const remoteBranch = await git_exec(
        repo.workdir(),
        'git',
        'symbolic-ref',
        '-q',
        'refs/remotes/origin/HEAD'
    );

    for(const localBranch of localBranchNames) {
        if (
            remoteBranch.trim().split('/').at(-1)?.toLowerCase() === localBranch.toLocaleLowerCase()
        ) 
            return localBranch;
    }

    return remoteBranch.trim().split('/').at(-1) ?? '';
}