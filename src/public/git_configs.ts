import { exec } from "child_process";
import { promisify } from "util";
import { git_repo } from "../private/git_repo";
import { GitConfig, GitConfigs } from "../types/git_types";
import { pr_config } from "../util/pr_lg";
import { pr_lg_prg } from "../util/pr_lg_prg";

export const git_configs = async (path: string = './', stdOut: boolean = false): Promise<GitConfigs> => {
    const gitExec = promisify(exec);

    // Get Repo
    const repo = await git_repo(path);

    // Run git config in work dir
    const { stdout } = await gitExec('git config --list --show-scope --show-origin', { cwd: repo.workdir() });

    // Empty config
    if (stdout === '')
        return [];

    // Get lines
    const lines = stdout.trim().split('\n');

    // No configs in repo
    if (lines.length === 0)
        return [];

    const gitConfigs: GitConfigs = [];

    lines.forEach((line, index) => {
        !stdOut && pr_lg_prg(lines.length, index + 1, 'Configs');

        // Get config or null
        const config = getConfig(line);

        // Config not valid
        if (!config)
            return;

        // Add config
        gitConfigs.push(config);

        stdOut && pr_config(gitConfigs[gitConfigs.length - 1]);
    });

    // Return Configs
    return gitConfigs;
}

const getConfig = (line: string): GitConfig | null => {

    if (line === '')
        return null;

    const configLine = line.replace(/\s+/g, ' ').split(' ');

    if (configLine.length !== 3)
        return null

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
        // worktree, local, global, system, command, unknown
        scope,
        // file path, ref, or blob id 
        originType,
        // variables
        variable: { key, value }
    }
}

