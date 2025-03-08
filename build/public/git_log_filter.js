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
exports.git_log_filter = void 0;
const git_exec_1 = require("../private/git_exec");
const git_repo_1 = require("../private/git_repo");
const config_types_1 = require("../types/config.types");
const pr_config_1 = require("../util/pr_config");
const pr_lg_1 = require("../util/pr_lg");
const pr_lg_prg_1 = require("../util/pr_lg_prg");
const git_log_filter = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (path = './', filter, config = config_types_1.CONFIG) {
    const repo = yield (0, git_repo_1.git_repo)(path, config);
    const stdOut = yield (0, git_exec_1.git_exec)(repo.workdir(), 'git', 'log', `--diff-filter=${getFilterArg(filter)}`, `--pretty=format:${['%H', "%ci", "%s", "%an", "%ae", "%cn", "%ce"].join('%x00')}`, '--name-only');
    if (stdOut === '')
        return [];
    const lines = stdOut.trim().split('\n\n');
    if (lines.length === 0)
        return [];
    const GitLogFilters = lines.map((line, index) => {
        (0, pr_config_1.isStdPrgOut)(config) && (0, pr_lg_prg_1.pr_lg_prg)(lines.length, index + 1, 'Filter Commit');
        return getFilter(line);
    });
    (0, pr_config_1.isStdOut)(config) && GitLogFilters.forEach(pr_lg_1.pr_log_filter);
    return GitLogFilters;
});
exports.git_log_filter = git_log_filter;
const getFilterArg = (filter) => {
    const filterArgs = {
        added: 'A',
        modified: 'M',
        deleted: 'D',
        renamed: 'R',
        copied: 'C',
        typeChanged: 'T',
        unmerged: 'U',
        unknown: 'X'
    };
    return filterArgs[filter];
};
const getFilter = (line) => {
    const lines = line.split('\n');
    const [sha = '', date = '', message = '', authorName = '', authorEmail = '', committerName = '', committerEmail = ''] = lines[0].split('\0');
    const [, ...rest] = line.split('\n');
    return {
        sha,
        date,
        message,
        authorName,
        authorEmail,
        committerName,
        committerEmail,
        files: rest
    };
};
