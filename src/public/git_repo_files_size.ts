import { git_exec } from "../private/git_exec";
import { git_repo } from "../private/git_repo";
import { Config, CONFIG } from "../types/config.types";
import { GitRepoFileSize, GitRepoFilesSize } from "../types/git_types";
import { isStdOut, isStdPrgOut } from "../util/pr_config";
import { pr_repo_file_size } from "../util/pr_lg";
import { pr_lg_prg } from "../util/pr_lg_prg";

export const git_repo_files_size = async (path: string = './', config: Config = CONFIG): Promise<GitRepoFilesSize> => {

    // Get Repo
    const repo = await git_repo(path, config);

    const stdout = await git_exec(repo.workdir, 'git', 'ls-tree', '-r', '--long', 'HEAD');

    // Empty patterns
    if (stdout === '')
        return [];

    // Get lines
    const lines = stdout.trim().split('\n');

    // No configs in repo
    if (lines.length === 0)
        return [];

    const gitRepoFilesSize: GitRepoFilesSize = [];

    for (const [index, line] of lines.entries()) {
        isStdPrgOut(config) && pr_lg_prg(lines.length, index + 1, 'Repo grep');

        // Get git repo file size or null
        const gitRepoFileSize = getGitRepoFileSize(line);

        // Git repo file size not valid
        if (!gitRepoFileSize)
            continue;

        // Add git repo file size
        gitRepoFilesSize.push(gitRepoFileSize);

        isStdOut(config) && pr_repo_file_size(gitRepoFilesSize[gitRepoFilesSize.length - 1]);
    }

    return gitRepoFilesSize;
}

const getGitRepoFileSize = (line: string):GitRepoFileSize | null => {

    if (line === '')
        return null;

    const gitRepoFileSize = line.replace(/\s+/g, ' ',).split(' ');

    const size = gitRepoFileSize[3].trim();
    
    if (size === '')
        return null;

    const filePath = gitRepoFileSize[4].trim();

    if (filePath === '')
        return null;

    return {
        filePath,
        size
    }
}