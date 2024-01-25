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
exports.git_commit_files = void 0;
const git_commit_files = (diff) => __awaiter(void 0, void 0, void 0, function* () {
    const patches = yield diff.patches();
    const gitCommitFile = [];
    for (const patch of patches) {
        const status = [];
        const { insertion, deletion } = yield get_line_length(patch);
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
            status
        });
    }
    return gitCommitFile;
});
exports.git_commit_files = git_commit_files;
const get_line_length = (patch) => __awaiter(void 0, void 0, void 0, function* () {
    let insertion = 0, deletion = 0;
    const hunks = yield patch.hunks();
    for (const hunk of hunks) {
        const lines = yield hunk.lines();
        lines.forEach((line) => {
            if (line.origin() === 43) {
                insertion += line.content().length;
            }
            if (line.origin() === 45) {
                deletion += line.content().length;
            }
        });
    }
    return { insertion, deletion };
});
