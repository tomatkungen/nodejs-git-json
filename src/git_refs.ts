import { git_repo } from "./git_repo";
import { pr_reference } from "./pr_lg";
import { GitRefs } from "./git-types";

export const git_refs = async (): Promise<GitRefs> => {
    // Get Repo
    const repo = await git_repo();

    // Get Reference list
    const references = await repo.getReferences();

    return references.reduce<GitRefs>((prev, reference) => {
        const statusRef: string[] = [];

        reference.isBranch() === 1 && statusRef.push('BRANCH');
        reference.isHead() && statusRef.push('HEAD');
        reference.isNote() === 1 && statusRef.push('NOTE');
        reference.isRemote() === 1 && statusRef.push('REMOTE');
        reference.isTag() === 1 && statusRef.push('TAG');
        reference.isSymbolic() === true && statusRef.push('SYMBOLIC');
        reference.isValid() === false && statusRef.push('NOTVALID');

        pr_reference(reference);
        prev.push({
            sha: reference.target().tostrS(),
            status: statusRef,
            name: reference.name(),
        });

        return prev;
    }, []);
}