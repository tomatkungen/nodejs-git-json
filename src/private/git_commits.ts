import { Commit, HistoryEventEmitter } from "nodegit/commit";

export const git_commits = async (branchCommit: Commit): Promise<Commit[]> => {
    // Branch History
    const history = branchCommit.history();

    // Branch commits
    const commits = await get_commits(history);

    // Return commits
    return commits;
}

const get_commits = async (history: HistoryEventEmitter): Promise<Commit[]> => {
    return new Promise((resolve) => {
        history.on('end', (commits: Commit[]) => {
            resolve(commits);
        });

        history.start();
    });
}