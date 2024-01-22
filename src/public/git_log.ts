import { Commit, HistoryEventEmitter } from "nodegit/commit";
import { GitCommitFiles, GitCommitStat, GitLog, GitLogs } from "../types/git_types";
import { pr_log } from "../util/pr_lg";
import { pr_lg_prg } from "../util/pr_lg_prg";
import { git_commit_files } from "./../private/git_commit_files";
import { git_commit_stats } from "./../private/git_commit_stats";
import { git_repo } from "./../private/git_repo";

export const git_log = async (path: string = './', stdOut: boolean = false): Promise<GitLogs> => {
    // Get Repo
    const repo = await git_repo(path);

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

    // No commits in repo
    if (commits.length === 0)
        return [];

    // Init empty git logs
    const gitLogs: GitLogs = [];

    // Get Commits diff files anre return git log
    for (const [index, commit] of commits.entries()) {
        !stdOut && pr_lg_prg(commits.length, index + 1, 'Commit');

        // Get commit stats
        const gitCommitStats = await git_commit_stats(repo, commit, commits[index + 1]);

        // Get commit diff
        const gitCommitFiles = await git_commit_files(repo, commit, commits[index + 1]);

        // Add created log
        gitLogs.push(
            create_log(commit, gitCommitStats, gitCommitFiles)
        );

        stdOut && pr_log(gitLogs[gitLogs.length - 1]);

    }

    return gitLogs;
}

const create_log = (commit: Commit, gitCommitStat: GitCommitStat, gitCommitFiles: GitCommitFiles): GitLog => {
    return {
        sha: commit.sha(),
        date: commit.date().toISOString(),
        message: commit.message(),
        authorName: commit.author().name(),
        authorEmail: commit.author().email(),
        commiterName: commit.committer().name(),
        commiterEmail: commit.committer().email(),
        insertion: gitCommitStat.insertion,
        deletion: gitCommitStat.deletion,
        fileChanged: gitCommitStat.fileChanged,
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