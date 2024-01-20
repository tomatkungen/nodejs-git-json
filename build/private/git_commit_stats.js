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
exports.git_commit_stats = void 0;
const nodegit_1 = require("nodegit");
const git_commit_stats = (repo, currentCommit, prevCommit) => __awaiter(void 0, void 0, void 0, function* () {
    const cT = yield currentCommit.getTree();
    const pT = prevCommit ? yield prevCommit.getTree() : prevCommit;
    const diff = yield nodegit_1.Diff.treeToTree(repo, pT, cT);
    const diffStats = yield diff.getStats();
    return {
        insertion: diffStats.insertions().valueOf(),
        deletion: diffStats.deletions().valueOf(),
        fileChanged: diffStats.filesChanged().valueOf()
    };
});
exports.git_commit_stats = git_commit_stats;
