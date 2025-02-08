import { Repository } from "nodegit";

export const git_branch_names = async (repository: Repository, excludeBranchName: string = ''): Promise<string[]> => {
    // Get Branch reference
    const references = await repository.getReferences();

    // Get local branches names
    const localBranchNames = references
        .filter(ref => ref.isBranch() && !ref.isRemote())
        .map(ref => ref.shorthand())
        .filter(ref => ref !== excludeBranchName);

    // Return latest branch names
    return localBranchNames;
}