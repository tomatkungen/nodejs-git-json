import { git_exec } from "../private/git_exec";
import { git_repo } from "../private/git_repo";
import { CONFIG, Config } from "../types/config.types";
import { GitFilterType, GitLogFilter, GitLogFilters } from "../types/git_types";
import { isStdOut, isStdPrgOut } from "../util/pr_config";
import { pr_log_filter } from "../util/pr_lg";
import { pr_lg_prg } from "../util/pr_lg_prg";


export const git_log_filter = async (path: string = './', filter: keyof GitFilterType, config: Config = CONFIG): Promise<GitLogFilters> => {

    // Get Repo
    const repo = await git_repo(path, config);

    // Get diff filter files
    const stdOut = await git_exec(repo.workdir(),
        'git',
        'log',
        `--diff-filter=${getFilterArg(filter)}`,
        `--pretty=format:${['%H', "%ci", "%s", "%an", "%ae", "%cn", "%ce"].join('%x00')}`,
        '--name-only'
    );

    // Empty patterns
    if (stdOut === '')
        return [];

    // Get lines
    const lines = stdOut.trim().split('\n\n');

    // No commits in repo
    if (lines.length === 0)
        return [];

    // Get git log diff files
    const GitLogFilters = lines.map<GitLogFilter>((line, index) => {
        isStdPrgOut(config) && pr_lg_prg(lines.length, index + 1, 'Filter Commit');

        return getFilter(line);
    });

    isStdOut(config) && GitLogFilters.forEach(pr_log_filter);

    // Return diff files
    return GitLogFilters;
}

const getFilterArg = (filter: keyof GitFilterType) => {
    const filterArgs: { [key in keyof GitFilterType]: string } = {
        added: 'A',
        modified: 'M',
        deleted: 'D',
        renamed: 'R',
        copied: 'C',
        typeChanged: 'T',
        unmerged: 'U',
        unknown: 'X'
    }

    return filterArgs[filter];
}

const getFilter = (line: string): GitLogFilter => {
    const lines = line.split('\n');

    const [
        sha = '', date = '', message = '',
        authorName = '', authorEmail = '', committerName = '',
        committerEmail = ''
    ] = lines[0].split('\0')

    const [, ...rest] = line.split('\n')
    return {
        sha,
        date,
        message,
        authorName,
        authorEmail,
        committerName,
        committerEmail,
        files: rest
    }
}