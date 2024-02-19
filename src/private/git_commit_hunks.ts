import { ConvenientPatch, DiffLine, Diff } from "nodegit";
import { GitCommitHunk, GitCommitHunks, GitCommitLine } from "../types/git_types";

export const git_commit_hunks = async (patch: ConvenientPatch): Promise<GitCommitHunks> => {
    const gitCommitHunks: GitCommitHunks = [];

    // Get hunks
    const hunks = await patch.hunks();

    for (const hunk of hunks) {

        const gitCommitHunk: GitCommitHunk = {
            header: hunk.header(),
            insertTokens: 0,
            deletionTokens: 0,
            lines: [],
        };

        const lines = await hunk.lines();

        lines.forEach((diffLine) => {
            // Get commit line
            const commitLine = gitCommitLine(diffLine);

            commitLine.diffType === '+' && (gitCommitHunk.insertTokens += commitLine.content.length);
            commitLine.diffType === '-' && (gitCommitHunk.deletionTokens += commitLine.content.length);

            // Add Commit line
            gitCommitHunk.lines.push(commitLine);
        });

        gitCommitHunks.push(gitCommitHunk);
    }

    return gitCommitHunks;
}

const gitCommitLine = (diffLine: DiffLine): GitCommitLine => {
    const diffType = getDiffType(diffLine);

    const type = getType(diffLine);

    diffLine.content()

    return {
        oldLineno: diffLine.oldLineno(),
        newLineno: diffLine.newLineno(),
        origin: diffLine.origin(),
        type,
        diffType,
        content: diffLine.content()
    };
}

const getDiffType = (diffLine: DiffLine) => (
    diffLine.origin() === Diff.LINE.ADDITION && '+' ||
    diffLine.origin() === Diff.LINE.DELETION && '-' ||
    ''
);

const getType = (diffLine: DiffLine): GitCommitLine['type'] => {
    const types: {[index: number]: GitCommitLine['type']} = {
        [Diff.LINE.CONTEXT]: 'CONTEXT',
        [Diff.LINE.ADDITION]: 'ADDITION',
        [Diff.LINE.DELETION]: 'DELETION',
        [Diff.LINE.CONTEXT_EOFNL]: 'CONTEXT_EOFNL',
        [Diff.LINE.ADD_EOFNL]: 'ADD_EOFNL',
        [Diff.LINE.DEL_EOFNL]: 'DEL_EOFNL',
        [Diff.LINE.FILE_HDR]: 'FILE_HDR',
        [Diff.LINE.HUNK_HDR]: 'HUNK_HDR',
        [Diff.LINE.BINARY]: 'BINARY',
    } || 'CONTEXT';

    return types[diffLine.origin()] || 'CONTEXT';
};
