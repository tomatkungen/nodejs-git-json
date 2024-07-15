import { git_exec } from "../private/git_exec";
import { git_repo } from "../private/git_repo";
import { Config, CONFIG } from "../types/config.types";
import { GitRepoUnpack } from "../types/git_types";
import { isStdOut } from "../util/pr_config";
import { pr_repo_unpack } from "../util/pr_lg";

export const git_repo_unpack = async (path: string = './', config: Config = CONFIG): Promise<GitRepoUnpack> => {

    // Get Repo
    const repo = await git_repo(path, config);

    // Exec count - objects
    const stdout = await git_exec(repo.workdir(), 'git', 'count-objects', '--verbose');

    const gitRepoUnpack: GitRepoUnpack = {
        count: 0,
        size: 0,
        'in-pack': 0,
        packs: 0,
        'size-pack': 0,
        'prune-packable': 0,
        garbage: 0,
        'size-garbage': 0,
    };

    // Empty patterns
    if (stdout === '')
        return gitRepoUnpack;

    // Get lines
    const lines = stdout.trim().split('\n');

    // No lines rows
    if (lines.length === 0)
        return gitRepoUnpack;

    Object.keys(gitRepoUnpack).forEach((key) => {
        // Get git repo unpack value
        const gitRepoUnpackValue = getGitRepoUnpackValue(key, lines);

        // Add git repo file size
        gitRepoUnpack[key as keyof GitRepoUnpack] = gitRepoUnpackValue;
    })

    isStdOut(config) && pr_repo_unpack(gitRepoUnpack);

    return gitRepoUnpack;
}

const getGitRepoUnpackValue = (key: string, lines: string[]): number => {

    if (lines.length === 0)
        return 0;

    for (const line of lines) {

        const unpack = line.replace(/\s+/g, ' ',).split(':');

        if (key === unpack[0].trim()) {
            return parseInt(unpack[1].trim(), 10);
        }
    }

    return 0
}