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
exports.git_repo_commits_count = void 0;
const git_repo_1 = require("../private/git_repo");
const config_types_1 = require("../types/config.types");
const git_repo_commits_count = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (path = './', config = config_types_1.CONFIG) {
    const repo = yield (0, git_repo_1.git_repo)(path, config);
    const revwalk = repo.createRevWalk();
    revwalk.pushHead();
    let count = 0, next = true;
    while (next) {
        try {
            yield revwalk.next();
            count++;
        }
        catch (e) {
            next = false;
        }
    }
    return count;
});
exports.git_repo_commits_count = git_repo_commits_count;
