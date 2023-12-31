import { Reference } from "nodegit";
import { GitRef, GitRefs } from "../git-types";
import { git_repo } from "../private/git_repo";
import { pr_reference } from "../pr_lg";

export const git_reference = async (): Promise<GitRefs> => {
    // Get Repo
    const repo = await git_repo();

    // Get Reference list
    const references = await repo.getReferences();

    // Loop reference list
    return references.reduce<GitRefs>((prev, reference) => {

        // Add created reference
        prev.push(create_reference(reference));

        pr_reference(prev[prev.length -1]);

        return prev;
    }, []);
}

const create_reference = (reference: Reference): GitRef => {
    const statusRef: string[] = [];

    reference.isBranch() === 1      && statusRef.push('BRANCH');
    reference.isHead()              && statusRef.push('HEAD');
    reference.isNote() === 1        && statusRef.push('NOTE');
    reference.isRemote() === 1      && statusRef.push('REMOTE');
    reference.isTag() === 1         && statusRef.push('TAG');
    reference.isSymbolic() === true && statusRef.push('SYMBOLIC');
    reference.isValid() === false   && statusRef.push('NOTVALID');

    return {
        sha: reference.target().tostrS(),
        status: statusRef,
        name: reference.name(),
    }
}