import { Repository } from "nodegit";
import { Commit, HistoryEventEmitter } from "nodegit/commit";
import { git_repo } from "../private/git_repo";
import { CONFIG, Config } from "../types/config.types";

export const git_commits = async (path: string = './', config: Config = CONFIG): Promise<{commits: Commit[], repo: Repository}> => {
    // Get Repo
    const repo = await git_repo(path, config);

    // Get Branch reference
    const reference = await repo.getCurrentBranch();

    // Get Branch name from HEAD
    const branchName = reference.shorthand();

    // Main Branch
    const branch = await repo.getBranchCommit(branchName);

    // Branch History
    const history = branch.history();

    // Branch commits
    const commits = await get_commits(history);

    // Return commits
    return {commits, repo};
}

const get_commits = async (history: HistoryEventEmitter): Promise<Commit[]> => {
    return new Promise((resolve) => {
        history.on('end', (commits: Commit[]) => {
            resolve(commits);
        });

        history.start();
    });
}