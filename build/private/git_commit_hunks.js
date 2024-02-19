"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.git_commit_hunks = void 0;
const git_commit_hunks = (patch) => __awaiter(void 0, void 0, void 0, function* () {
    const gitCommitHunks = [];
    const hunks = yield patch.hunks();
    for (const hunk of hunks) {
        const gitCommitHunk = {
            header: hunk.header(),
            insertTokens: 0,
            deletionTokens: 0,
            lines: [],
        };
        const lines = yield hunk.lines();
        lines.forEach((diffLine) => {
            const commitLine = gitCommitLine(diffLine);
            commitLine.diffType === '+' && (gitCommitHunk.insertTokens += commitLine.content.length);
            commitLine.diffType === '-' && (gitCommitHunk.deletionTokens += commitLine.content.length);
            gitCommitHunk.lines.push(commitLine);
        });
        gitCommitHunks.push(gitCommitHunk);
    }
    return gitCommitHunks;
});
exports.git_commit_hunks = git_commit_hunks;
const gitCommitLine = (diffLine) => {
    const diffType = getDiffType(diffLine);
    const type = getType(diffLine);
    diffLine.content();
    return {
        oldLineno: diffLine.oldLineno(),
        newLineno: diffLine.newLineno(),
        origin: diffLine.origin(),
        type,
        diffType,
        content: diffLine.content()
    };
};
const getDiffType = (diffLine) => (diffLine.origin() === 43 && '+' ||
    diffLine.origin() === 45 && '-' ||
    '');
const getType = (diffLine) => {
    const types = {
        [32]: 'CONTEXT',
        [43]: 'ADDITION',
        [45]: 'DELETION',
        [61]: 'CONTEXT_EOFNL',
        [62]: 'ADD_EOFNL',
        [60]: 'DEL_EOFNL',
        [70]: 'FILE_HDR',
        [72]: 'HUNK_HDR',
        [66]: 'BINARY',
    } || 'CONTEXT';
    return types[diffLine.origin()] || 'CONTEXT';
};
