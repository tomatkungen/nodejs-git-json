import { Commit, Diff, Repository, ConvenientPatch } from "nodegit";
import { GitCommitFiles } from "../types/git_types";

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

    const gitCommitFile: GitCommitFiles = [];

    for (const patch of patches) {
        const status: string[] = [];

        // Line length insertion or deletion
        const { insertion, deletion } = await get_line_length(patch)

        patch.isUnmodified() && status.push('UNMODIFIED');
        patch.isAdded() && status.push('ADDED');
        patch.isDeleted() && status.push('DELETED');
        patch.isModified() && status.push('MODIFIED');
        patch.isIgnored() && status.push('IGNORED');
        patch.isTypeChange() && status.push('TYPECHANGE');
        patch.isUnreadable() && status.push('UNREADABLE');
        patch.isConflicted() && status.push('CONFLICT');

        gitCommitFile.push({
            newFilePath: patch.newFile().path(),
            newFileSize: patch.newFile().size(),
            contextLines: patch.lineStats().total_context,
            addedLines: patch.lineStats().total_additions,
            deletedLines: patch.lineStats().total_deletions,
            insertion,
            deletion,
            status: status
        })
    }

    return gitCommitFile;
}

const get_line_length = async (
    patch: ConvenientPatch
): Promise<{ insertion: number, deletion: number }> => {

    let insertion = 0, deletion = 0;
    const hunks = await patch.hunks();
    for (const hunk of hunks) {
        const lines = await hunk.lines();

        lines.forEach((line) => {
            if (line.origin() === Diff.LINE.ADDITION) {
                insertion += line.content().length;
            }
            if (line.origin() === Diff.LINE.DELETION) {
                deletion += line.content().length;
            }
        });
    }

    return { insertion, deletion };
}