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
exports.git_configs = void 0;
const child_process_1 = require("child_process");
const util_1 = require("util");
const git_repo_1 = require("../private/git_repo");
const config_types_1 = require("../types/config.types");
const pr_config_1 = require("../util/pr_config");
const pr_lg_1 = require("../util/pr_lg");
const pr_lg_prg_1 = require("../util/pr_lg_prg");
const git_configs = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (path = './', config = config_types_1.CONFIG) {
    const gitExec = (0, util_1.promisify)(child_process_1.exec);
    const repo = yield (0, git_repo_1.git_repo)(path, config);
    const { stdout } = yield gitExec('git config --list --show-scope --show-origin', { cwd: repo.workdir() });
    if (stdout === '')
        return [];
    const lines = stdout.trim().split('\n');
    if (lines.length === 0)
        return [];
    const gitConfigs = [];
    lines.forEach((line, index) => {
        (0, pr_config_1.isStdPrgOut)(config) && (0, pr_lg_prg_1.pr_lg_prg)(lines.length, index + 1, 'Configs');
        const gitConfig = getGitConfig(line);
        if (!gitConfig)
            return;
        gitConfigs.push(gitConfig);
        (0, pr_config_1.isStdOut)(config) && (0, pr_lg_1.pr_config)(gitConfigs[gitConfigs.length - 1]);
    });
    return gitConfigs;
});
exports.git_configs = git_configs;
const getGitConfig = (line) => {
    if (line === '')
        return null;
    const configLine = line.replace(/\s+/g, ' ').split(' ');
    if (configLine.length !== 3)
        return null;
    const scope = configLine[0];
    if (scope === '')
        return null;
    const originType = configLine[1].replace('file:', '').trim();
    if (originType === '')
        return null;
    const [key, value] = configLine[2].trim().split('=');
    if (key === '' || value === '')
        return null;
    return {
        scope,
        originType,
        variable: { key, value }
    };
};
