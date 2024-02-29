import { Commit, Repository } from "nodegit";

export const git_commit_branch = async (repository: Repository): Promise<Commit> => {
    // Get Branch reference
    const reference = await repository.getCurrentBranch();

    // Get Branch name from HEAD
    const branchName = reference.shorthand();

    // Main Branch Commit
    const branchCommit = await repository.getBranchCommit(branchName);

    // Return latest branch commit
    return branchCommit;
}