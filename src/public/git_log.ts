import { Commit, HistoryEventEmitter } from "nodegit/commit";
import { GitCommitFiles, GitLog, GitLogs } from "./../git-types";
import { git_commit_files } from "./../private/git_commit_files";
import { git_repo } from "./../private/git_repo";
import { pr_log } from "./../pr_lg";

export const git_log = async (): Promise<GitLogs> => {
    // Get Repo
    const repo = await git_repo();

    // Main Branch
    const branch = await repo.getBranchCommit('main');

    // Branch History
    const history = branch.history();

    // Branch commits
    const commits = await get_commits(history);

    // No commits in repo
    if (commits.length === 0)
        return [];

    // Init empty git logs
    const gitLogs: GitLogs = [];

    // Get Commits diff files anre return git log
    for (const [index, commit] of commits.entries()) {

        // Get commit diff
        const gitCommitFiles = await git_commit_files(repo, commit, commits[index + 1]);

        // Add created log
        gitLogs.push(
            create_log(commit, gitCommitFiles)
        );

        pr_log(gitLogs[gitLogs.length - 1]);

    }

    return gitLogs;
}

const create_log = (commit: Commit, gitCommitFiles: GitCommitFiles): GitLog => {
    return {
        sha: commit.sha(),
        date: commit.date().toISOString(),
        message: commit.message(),
        authorName: commit.author().name(),
        authorEmail: commit.author().email(),
        commiterName: commit.committer().name(),
        commiterEmail: commit.committer().email(),
        files: gitCommitFiles,
    }
}

const get_commits = async (history: HistoryEventEmitter): Promise<Commit[]> => {
    return new Promise((resolve) => {
        history.on('end', (commits: Commit[]) => {
            resolve(commits);
        });

        history.start();
    });
}
