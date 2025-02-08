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
exports.git_branch_merge_base = void 0;
const nodegit_1 = require("nodegit");
const git_branch_merge_base = (repo, branchCommitOid, localCommitOid) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield nodegit_1.Merge.base(repo, branchCommitOid, localCommitOid);
    }
    catch (error) {
        return null;
    }
});
exports.git_branch_merge_base = git_branch_merge_base;
