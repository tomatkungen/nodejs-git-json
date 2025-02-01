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
exports.git_users_refs = void 0;
const git_exec_1 = require("../private/git_exec");
const git_repo_1 = require("../private/git_repo");
const config_types_1 = require("../types/config.types");
const pr_config_1 = require("../util/pr_config");
const pr_lg_1 = require("../util/pr_lg");
const pr_lg_prg_1 = require("../util/pr_lg_prg");
const git_users_refs = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (path = './', config = config_types_1.CONFIG) {
    const repo = yield (0, git_repo_1.git_repo)(path, config);
    const formatArg = "--format='%(authorname),%(authoremail),%(committername),%(committeremail),%(refname:short),%(objecttype),%(objectname:short),%(subject),%(taggername),%(taggeremail)'";
    const stdout = yield (0, git_exec_1.git_exec)(repo.workdir(), 'git', 'for-each-ref', formatArg);
    if (stdout === '')
        return [];
    const lines = stdout.trim().split('\n');
    if (lines.length === 0)
        return [];
    const gitUserRefs = lines.reduce((prev, line, index) => {
        (0, pr_config_1.isStdPrgOut)(config) && (0, pr_lg_prg_1.pr_lg_prg)(lines.length, index + 1, 'User refs');
        const [authorName, authorEmail, committerName, committerEmail, refName, objectType, objectName, subject, taggerName, taggerEmail] = line.split(',');
        const gitUserRef = {
            authorName: authorName.replace(/'/g, ''),
            authorEmail: authorEmail.replace(/</g, '').replace(/>/g, ''),
            committerName,
            committerEmail: committerEmail.replace(/</g, '').replace(/>/g, ''),
            taggerName: taggerName.replace(/</g, '').replace(/>/g, ''),
            taggerEmail: taggerEmail.replace(/'/g, '').replace(/</g, '').replace(/>/g, ''),
            totalCommits: 0,
            totalTags: 0,
            totalTrees: 0,
            totalBlobs: 0,
            refs: [{
                    refName,
                    objectType,
                    objectName,
                    subject,
                }]
        };
        const gitAuthorIndex = gitUser(prev, gitUserRef);
        gitUserRefsAdd(gitAuthorIndex, gitUserRef, prev);
        return prev;
    }, []);
    (0, pr_config_1.isStdOut)(config) && gitUserRefs.forEach(pr_lg_1.pr_users_refs);
    return gitUserRefs;
});
exports.git_users_refs = git_users_refs;
const gitUser = (gitAuthorsStore, gitUserRef) => {
    const compare = (a, b) => {
        return a !== "" && b.toLowerCase().includes(a.toLowerCase());
    };
    const res = gitAuthorsStore.findIndex((gitAuthorStore) => {
        const authorExist = compare(gitUserRef.authorName, gitUserRef.authorName) &&
            compare(gitUserRef.authorEmail, gitAuthorStore.authorEmail);
        const committerExist = compare(gitUserRef.committerName, gitAuthorStore.committerName) &&
            compare(gitUserRef.committerEmail, gitAuthorStore.committerEmail);
        const taggerExist = compare(gitUserRef.taggerName, gitAuthorStore.taggerName) &&
            compare(gitUserRef.taggerEmail, gitAuthorStore.taggerEmail);
        const taggerAuthorExist = compare(gitUserRef.taggerName, gitAuthorStore.authorName) &&
            compare(gitUserRef.taggerEmail, gitAuthorStore.authorEmail);
        const authorTaggerExist = compare(gitUserRef.authorName, gitAuthorStore.taggerName) &&
            compare(gitUserRef.authorEmail, gitAuthorStore.taggerEmail);
        const committerTaggerExist = compare(gitUserRef.committerName, gitAuthorStore.taggerName) &&
            compare(gitUserRef.committerEmail, gitAuthorStore.taggerEmail);
        return authorExist || committerExist || taggerExist || taggerAuthorExist || authorTaggerExist || committerTaggerExist;
    });
    return res;
};
const gitUserRefsAdd = (gitAuthorIndex, gitUserRef, prev) => {
    const objectType = gitUserRef.refs[0].objectType.toLowerCase();
    const taggerName = gitUserRef.taggerName;
    const taggerEmail = gitUserRef.taggerEmail;
    const authorName = gitUserRef.authorName;
    const authorEmail = gitUserRef.authorEmail;
    const committerName = gitUserRef.committerName;
    const committerEmail = gitUserRef.committerEmail;
    if (gitAuthorIndex === -1) {
        prev.push(gitUserRef);
        objectType === 'commit' && prev[prev.length - 1].totalCommits++;
        objectType === 'tag' && prev[prev.length - 1].totalTags++;
        objectType === 'tree' && prev[prev.length - 1].totalTrees++;
        objectType === 'blob' && prev[prev.length - 1].totalBlobs++;
        return;
    }
    const mergeRefs = (newValue, oldValue) => {
        if (oldValue === '')
            return newValue;
        return oldValue.includes(newValue) ? oldValue : oldValue += `, ${newValue}`;
    };
    committerName !== '' && (prev[gitAuthorIndex].committerName = mergeRefs(committerName, prev[gitAuthorIndex].committerName));
    committerEmail !== '' && (prev[gitAuthorIndex].committerEmail = mergeRefs(committerEmail, prev[gitAuthorIndex].committerEmail));
    authorName !== '' && (prev[gitAuthorIndex].authorName = mergeRefs(authorName, prev[gitAuthorIndex].authorName));
    authorEmail !== '' && (prev[gitAuthorIndex].authorEmail = mergeRefs(authorEmail, prev[gitAuthorIndex].authorEmail));
    taggerEmail !== '' && (prev[gitAuthorIndex].taggerEmail = mergeRefs(taggerEmail, prev[gitAuthorIndex].taggerEmail));
    taggerName !== '' && (prev[gitAuthorIndex].taggerName = mergeRefs(taggerName, prev[gitAuthorIndex].taggerName));
    objectType === 'commit' && prev[gitAuthorIndex].totalCommits++;
    objectType === 'tag' && prev[gitAuthorIndex].totalTags++;
    objectType === 'tree' && prev[gitAuthorIndex].totalTrees++;
    objectType === 'blob' && prev[gitAuthorIndex].totalBlobs++;
    prev[gitAuthorIndex].refs.push(gitUserRef.refs[0]);
};
