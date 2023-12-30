import { Commit, Diff, Repository } from "nodegit";
import { GitCommitFile, GitCommitFiles } from "./git-types";
import { lg, pr_patches } from "./pr_lg";

export const git_commit_files = async (
    repo: Repository,
    currentCommit: Commit,
    prevCommit /* parentCommit */?: Commit
): Promise<GitCommitFiles> => {
    const cT = await currentCommit.getTree();
    const pT = prevCommit ? await prevCommit.getTree() : prevCommit;

    // const parentcount = currentCommit.parentcount();
    // lg(`CommitParents ${parentcount}`);

    const diff = await Diff.treeToTree(repo, pT, cT);

    const patches = await diff.patches();

    return patches.map<GitCommitFile>((patches) => {
        pr_patches(patches);

        const status: string[] = [];

        patches.isUnmodified()  && status.push('UNMODIFIED');
        patches.isAdded()       && status.push('ADDED');
        patches.isDeleted()     && status.push('DELETED');
        patches.isModified()    && status.push('MODIFIED');
        patches.isIgnored()     && status.push('IGNORED');
        patches.isTypeChange()  && status.push('TYPECHANGE');
        patches.isUnreadable()  && status.push('UNREADABLE');
        patches.isConflicted()  && status.push('CONFLICT');

        return {
            newFilePath: patches.newFile().path(),
            newFileSize: patches.newFile().size(),
            contextLines: patches.lineStats().total_context,
            addedLines: patches.lineStats().total_additions,
            deletedLines: patches.lineStats().total_deletions,
            status: status
        }
    });
}