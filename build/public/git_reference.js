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
exports.git_reference = void 0;
const git_repo_1 = require("../private/git_repo");
const pr_lg_1 = require("../util/pr_lg");
const git_reference = (path = './', stdOut = false) => __awaiter(void 0, void 0, void 0, function* () {
    const repo = yield (0, git_repo_1.git_repo)(path);
    const references = yield repo.getReferences();
    return references.reduce((prev, reference) => {
        prev.push(create_reference(reference));
        stdOut && (0, pr_lg_1.pr_reference)(prev[prev.length - 1]);
        return prev;
    }, []);
});
exports.git_reference = git_reference;
const create_reference = (reference) => {
    const statusRef = [];
    reference.isBranch() === 1 && statusRef.push('BRANCH');
    reference.isHead() && statusRef.push('HEAD');
    reference.isNote() === 1 && statusRef.push('NOTE');
    reference.isRemote() === 1 && statusRef.push('REMOTE');
    reference.isTag() === 1 && statusRef.push('TAG');
    reference.isSymbolic() === true && statusRef.push('SYMBOLIC');
    reference.isValid() === false && statusRef.push('NOTVALID');
    return {
        sha: reference.target().tostrS(),
        status: statusRef,
        name: reference.name(),
    };
};
