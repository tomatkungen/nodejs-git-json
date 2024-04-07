import { git_commit_branch } from "../private/git_commit_branch";
import { git_repo } from "../private/git_repo";
import { git_trees } from "../private/git_tree";
import { Config, CONFIG } from "../types/config.types";
import { GitRepoFilePaths } from "../types/git_types";
import { isStdOut, isStdPrgOut } from "../util/pr_config";
import { pr_repo_files } from "../util/pr_lg";
import { pr_lg_prg } from "../util/pr_lg_prg";

export const git_repo_files = async (path: string = './', config: Config = CONFIG): Promise<GitRepoFilePaths> => {

    // Get Repo
    const repo = await git_repo(path, config);

    // Branch latest commit
    const commit = await git_commit_branch(repo);

    // Get Trees
    const trees = await git_trees(commit);

    const gitRepoFiles: GitRepoFilePaths = [];
    for(const [index, tree] of trees.entries()) {
        isStdPrgOut(config) && pr_lg_prg(trees.length, index + 1, 'Repo Files');

        gitRepoFiles.push(tree.path());

        isStdOut(config) && pr_repo_files(gitRepoFiles[gitRepoFiles.length -1]);
    }

    // Return Repo files length
    return gitRepoFiles;
}