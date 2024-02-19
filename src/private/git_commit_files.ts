import { Diff } from "nodegit";
import { GitCommitFiles } from "../types/git_types";
import { git_commit_hunks } from "./git_commit_hunks";

export const git_commit_files = async (
    diff: Diff
): Promise<GitCommitFiles> => {

    const patches = await diff.patches();

    const gitCommitFiles: GitCommitFiles = [];

    for (const patch of patches) {
        const status: string[] = [];

        // Line length insertion or deletion
        const gitCommitHunks = await git_commit_hunks(patch)

        patch.isUnmodified() && status.push('UNMODIFIED');
        patch.isAdded() && status.push('ADDED');
        patch.isDeleted() && status.push('DELETED');
        patch.isModified() && status.push('MODIFIED');
        patch.isIgnored() && status.push('IGNORED');
        patch.isTypeChange() && status.push('TYPECHANGE');
        patch.isUnreadable() && status.push('UNREADABLE');
        patch.isConflicted() && status.push('CONFLICT');

        gitCommitFiles.push({
            newFilePath: patch.newFile().path(),
            newFileSize: patch.newFile().size(),
            contextLines: patch.lineStats().total_context,
            addedLines: patch.lineStats().total_additions,
            deletedLines: patch.lineStats().total_deletions,
            status,
            hunks: gitCommitHunks,
        });
    }

    return gitCommitFiles;
}