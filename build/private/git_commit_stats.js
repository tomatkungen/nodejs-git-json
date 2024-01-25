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
const git_commit_stats = (diff) => __awaiter(void 0, void 0, void 0, function* () {
    const diffStats = yield diff.getStats();
    return {
        insertion: diffStats.insertions().valueOf(),
        deletion: diffStats.deletions().valueOf(),
        fileChanged: diffStats.filesChanged().valueOf()
    };
});
exports.git_commit_stats = git_commit_stats;
