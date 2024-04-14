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
exports.git_repo_unpack = void 0;
const git_exec_1 = require("../private/git_exec");
const git_repo_1 = require("../private/git_repo");
const config_types_1 = require("../types/config.types");
const pr_config_1 = require("../util/pr_config");
const pr_lg_1 = require("../util/pr_lg");
const git_repo_unpack = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (path = './', config = config_types_1.CONFIG) {
    const repo = yield (0, git_repo_1.git_repo)(path, config);
    const stdout = yield (0, git_exec_1.git_exec)(repo.workdir(), 'git', 'count-objects', '--verbose');
    const gitRepoUnpack = {
        count: 0,
        size: 0,
        'in-pack': 0,
        packs: 0,
        'size-pack': 0,
        'prune-packable': 0,
        garbage: 0,
        'size-garbage': 0,
    };
    if (stdout === '')
        return gitRepoUnpack;
    const lines = stdout.trim().split('\n');
    if (lines.length === 0)
        return gitRepoUnpack;
    Object.keys(gitRepoUnpack).forEach((key) => {
        const gitRepoUnpackValue = getGitRepoUnpackValue(key, lines);
        gitRepoUnpack[key] = gitRepoUnpackValue;
    });
    (0, pr_config_1.isStdOut)(config) && (0, pr_lg_1.pr_repo_unpack)(gitRepoUnpack);
    return gitRepoUnpack;
});
exports.git_repo_unpack = git_repo_unpack;
const getGitRepoUnpackValue = (key, lines) => {
    if (lines.length === 0)
        return 0;
    for (const line of lines) {
        const unpack = line.replace(/\s+/g, ' ').split(':');
        if (key === unpack[0].trim()) {
            return parseInt(unpack[1].trim(), 10);
        }
    }
    return 0;
};
