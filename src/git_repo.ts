import { Repository } from 'nodegit';

export const git_repo = async (path: string = './'): Promise<Repository> => {
    return await Repository.open(path);
}