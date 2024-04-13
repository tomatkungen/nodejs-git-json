import { git_exec } from "../private/git_exec";
import { git_repo } from "../private/git_repo";
import { Config, CONFIG } from "../types/config.types";
import { GitRepoGrep, GitRepoGreps } from "../types/git_types";
import { isStdOut, isStdPrgOut } from "../util/pr_config";
import { pr_repo_grep } from "../util/pr_lg";
import { pr_lg_prg } from "../util/pr_lg_prg";

export const git_repo_grep = async (path: string = './', pattern: string, pathspec?: string, config: Config = CONFIG): Promise<GitRepoGreps> => {
    // Get Repo
    const repo = await git_repo(path, config);

    const stdout = await git_exec(
        repo.workdir(),
        'git',
        ...['grep', '--line-number', '-I', `${pattern}`, ...(pathspec ? ['--', pathspec] : [])]
    );

    // Empty patterns
    if (stdout === '')
        return [];

    // Get lines
    const lines = stdout.trim().split('\n');

    // No configs in repo
    if (lines.length === 0)
        return [];

    const gitRepoGreps: GitRepoGreps = [];

    for (const [index, line] of lines.entries()) {
        isStdPrgOut(config) && pr_lg_prg(lines.length, index + 1, 'Commit');

        // Get git repo grep or null
        const gitRepoGrep = getGitRepoGreps(line);

        // git repo grep not valid
        if (!gitRepoGrep)
            continue;

        // Add git repo Grep
        gitRepoGreps.push(gitRepoGrep);

        isStdOut(config) && pr_repo_grep(gitRepoGreps[gitRepoGreps.length - 1], pattern);
    }

    return gitRepoGreps;
}

const getGitRepoGreps = (grepLine: string): GitRepoGrep | null => {
    if (grepLine === '')
        return null;

    try {

        const filePath = grepLine.replace(/\s+/g, ' ',).split(':')[0].trim();

        if (filePath === '')
            return null;

        const lineno = grepLine.replace(/\s+/g, ' ',).split(':')[1].trim();

        if (lineno === '')
            return null;

        const line = grepLine.replace(`${filePath}:`, '').replace(`${lineno}:`, '');

        if (line === '')
            return null;

        return {
            filePath,
            lineno,
            line
        }

    } catch (e) {
        return null;
    }
}