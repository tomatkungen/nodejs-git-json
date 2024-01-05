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
exports.git_repo = void 0;
const nodegit_1 = require("nodegit");
const pr_lg_1 = require("../util/pr_lg");
const git_repo = (path = './') => __awaiter(void 0, void 0, void 0, function* () {
    const repo = yield nodegit_1.Repository.open(path);
    (0, pr_lg_1.lg)((0, pr_lg_1.cF)(`Workdir: ${repo.workdir()}`, 'cfMAGENTA'));
    (0, pr_lg_1.lg)((0, pr_lg_1.cF)(`RepoPath: ${repo.path()}`, 'cfMAGENTA'));
    (0, pr_lg_1.lg)();
    return repo;
});
exports.git_repo = git_repo;
