import { git_repo } from "../private/git_repo";
import { git_trees } from "../private/git_tree";
import { Config, CONFIG } from "../types/config.types";
import { git_commit_branch } from "../private/git_commit_branch";

export const git_repo_files_count = async (path: string = './', config: Config = CONFIG): Promise<number> => {

    // Get Repo
    const repo = await git_repo(path, config);

    // Branch latest commit
    const commit = await git_commit_branch(repo);

    // Get Trees
    const trees = await git_trees(commit);

    // Return trees length
    return trees.length;
}