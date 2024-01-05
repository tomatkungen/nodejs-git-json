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
exports.git_status = void 0;
const git_repo_1 = require("../private/git_repo");
const pr_lg_1 = require("../util/pr_lg");
const git_status = (path = './') => __awaiter(void 0, void 0, void 0, function* () {
    const repo = yield (0, git_repo_1.git_repo)(path);
    const statusFiles = yield repo.getStatus();
    return statusFiles.reduce((prev, statusFile) => {
        prev.push(create_status(statusFile));
        (0, pr_lg_1.pr_status)(prev[prev.length - 1]);
        return prev;
    }, []);
});
exports.git_status = git_status;
const create_status = (statusFile) => {
    const status = [];
    statusFile.isNew() && status.push('NEW');
    statusFile.isModified() && status.push('MODIFIED');
    statusFile.isTypechange() && status.push('TYPECHANGE');
    statusFile.isRenamed() && status.push('RENAMED');
    statusFile.isIgnored() && status.push('IGNORED');
    statusFile.inWorkingTree() && status.push('WORKING-TREE');
    statusFile.isConflicted() && status.push('CONFLICT');
    statusFile.isDeleted() && status.push('DELETED');
    statusFile.isIgnored() && status.push('IGNORED');
    return {
        path: statusFile.path(),
        status,
        statusFile: statusFile.status()
    };
};
