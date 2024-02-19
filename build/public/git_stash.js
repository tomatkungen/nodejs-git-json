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
exports.git_stash = void 0;
const nodegit_1 = require("nodegit");
const config_types_1 = require("../types/config.types");
const pr_config_1 = require("../util/pr_config");
const pr_lg_1 = require("../util/pr_lg");
const git_repo_1 = require("./../private/git_repo");
const git_stash = (path = './', config = config_types_1.CONFIG) => __awaiter(void 0, void 0, void 0, function* () {
    const repo = yield (0, git_repo_1.git_repo)(path, config);
    const gitStashes = [];
    yield nodegit_1.Stash.foreach(repo, (index, message, stashOid) => {
        gitStashes.push({
            index,
            indexName: `stash@{${index}}`,
            sha: stashOid.toString(),
            message,
        });
    });
    (0, pr_config_1.isStdOut)(config) && gitStashes.forEach(pr_lg_1.pr_stash);
    return gitStashes;
});
exports.git_stash = git_stash;
