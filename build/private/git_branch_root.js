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
exports.git_branch_root = void 0;
const git_branch_names_1 = require("./git_branch_names");
const git_exec_1 = require("./git_exec");
const git_branch_root = (repo, featureBranch) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const localBranchNames = yield (0, git_branch_names_1.git_branch_names)(repo, featureBranch);
    if (localBranchNames.length === 1)
        return localBranchNames[0];
    const remoteBranch = yield (0, git_exec_1.git_exec)(repo.workdir(), 'git', 'symbolic-ref', '-q', 'refs/remotes/origin/HEAD');
    for (const localBranch of localBranchNames) {
        if (((_a = remoteBranch.trim().split('/').at(-1)) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === localBranch.toLocaleLowerCase())
            return localBranch;
    }
    return (_b = remoteBranch.trim().split('/').at(-1)) !== null && _b !== void 0 ? _b : '';
});
exports.git_branch_root = git_branch_root;
