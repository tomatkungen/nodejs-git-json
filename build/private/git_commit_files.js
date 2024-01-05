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
const nodegit_1 = require("nodegit");
const git_commit_files = (repo, currentCommit, prevCommit) => __awaiter(void 0, void 0, void 0, function* () {
    const cT = yield currentCommit.getTree();
    const pT = prevCommit ? yield prevCommit.getTree() : prevCommit;
    const diff = yield nodegit_1.Diff.treeToTree(repo, pT, cT);
    const patches = yield diff.patches();
    return patches.map((patches) => {
        const status = [];
        patches.isUnmodified() && status.push('UNMODIFIED');
        patches.isAdded() && status.push('ADDED');
        patches.isDeleted() && status.push('DELETED');
        patches.isModified() && status.push('MODIFIED');
        patches.isIgnored() && status.push('IGNORED');
        patches.isTypeChange() && status.push('TYPECHANGE');
        patches.isUnreadable() && status.push('UNREADABLE');
        patches.isConflicted() && status.push('CONFLICT');
        return {
            newFilePath: patches.newFile().path(),
            newFileSize: patches.newFile().size(),
            contextLines: patches.lineStats().total_context,
            addedLines: patches.lineStats().total_additions,
            deletedLines: patches.lineStats().total_deletions,
            status: status
        };
    });
});
exports.git_commit_files = git_commit_files;
