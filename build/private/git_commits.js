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
exports.git_commits = void 0;
const git_commits = (branchCommit) => __awaiter(void 0, void 0, void 0, function* () {
    const history = branchCommit.history();
    const commits = yield get_commits(history);
    return commits;
});
exports.git_commits = git_commits;
const get_commits = (history) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve) => {
        history.on('end', (commits) => {
            resolve(commits);
        });
        history.start();
    });
});
