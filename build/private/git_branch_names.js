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
exports.git_branch_names = void 0;
const git_branch_names = (repository_1, ...args_1) => __awaiter(void 0, [repository_1, ...args_1], void 0, function* (repository, excludeBranchName = '') {
    const references = yield repository.getReferences();
    const localBranchNames = references
        .filter(ref => ref.isBranch() && !ref.isRemote())
        .map(ref => ref.shorthand())
        .filter(ref => ref !== excludeBranchName);
    return localBranchNames;
});
exports.git_branch_names = git_branch_names;
