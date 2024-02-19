import { Repository } from 'nodegit';
import { Config, CONFIG } from '../types/config.types';
import { isStdOut } from '../util/pr_config';
import { pr_repo } from '../util/pr_lg';

export const git_repo = async (path: string = './', config: Config = CONFIG): Promise<Repository> => {
    const repo = await Repository.open(path);

    isStdOut(config) && pr_repo(repo);

    return repo;
}