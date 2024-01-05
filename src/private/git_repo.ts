import { Repository } from 'nodegit';
import { cF, lg } from '../util/pr_lg';

export const git_repo = async (path: string = './'): Promise<Repository> => {
    const repo = await Repository.open(path);

    lg(cF(`Workdir: ${repo.workdir()}`, 'cfMAGENTA'));
    lg(cF(`RepoPath: ${repo.path()}`, 'cfMAGENTA'));
    lg();
    // lg(`Common ${repo.commondir()}`);

    return repo;
}