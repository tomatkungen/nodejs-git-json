import { Repository } from "nodegit";

export const git_branch_name = async (repository: Repository): Promise<string> => {
    // Get Branch reference
    const reference = await repository.getCurrentBranch();

    // Get Branch name from HEAD
    const branchName = reference.shorthand();

    // Return latest branch commit
    return branchName;
}