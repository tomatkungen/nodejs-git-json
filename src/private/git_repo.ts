import { resolve } from "path";
import { existsSync } from "fs";
import { Config, CONFIG } from '../types/config.types';
import { GitRepo } from '../types/git_types';
import { isStdOut } from '../util/pr_config';
import { pr_repo } from '../util/pr_lg';
import { git_exec } from "./git_exec";
import { git_error } from "./git_error";

export const git_repo = async (path: string = './', config: Config = CONFIG): Promise<GitRepo> => {

    const absolutePath = resolve(path);

    if (!existsSync(absolutePath))
        throw git_error(`GIT_REPO: Not a folder path ${absolutePath}`);

    // git rev-parse --show-toplevel
    const stdout = await git_exec(path, ...['git', 'rev-parse', '--show-toplevel'])

    if (stdout.includes('fatal:'))
        throw git_error(`GIT_REPO: ${stdout}`);

    const gitRepo: GitRepo = {
        workdir: stdout.replace('\n', ''),
        path: resolve(stdout.replace('\n', ''), '.git')
    }

    isStdOut(config) && pr_repo(gitRepo);

    return gitRepo;
}