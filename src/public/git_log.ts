import { Diff } from "nodegit";
import { Commit } from "nodegit/commit";
import { GitCommitFiles, GitCommitStat, GitLog, GitLogs } from "../types/git_types";
import { pr_log } from "../util/pr_lg";
import { pr_lg_prg } from "../util/pr_lg_prg";
import { git_commits } from "./../private/git_commits";
import { git_commit_files } from "./../private/git_commit_files";
import { git_commit_stats } from "./../private/git_commit_stats";
import { CONFIG, Config } from "./../types/config.types";
import { isStdOut, isStdPrgOut } from "./../util/pr_config";

export const git_log = async (path: string = './', config: Config = CONFIG): Promise<GitLogs> => {

    // Branch commits
    const { commits, repo } = await git_commits(path, config);

    // Init empty git logs
    const gitLogs: GitLogs = [];

    // Get Commits diff files anre return git log
    for (const [index, commit] of commits.entries()) {
        isStdPrgOut(config) && pr_lg_prg(commits.length, index + 1, 'Commit');

        // Get current commit tree and Previous commit tree
        const [cT, pT] = await Promise.all([
            commit.getTree(),
            commits[index + 1] ? commits[index + 1].getTree() : undefined
        ]);

        const diff = await Diff.treeToTree(repo, pT, cT);

        // Get commit stats
        const gitCommitStats = await git_commit_stats(diff);

        // Get commit diff
        const gitCommitFiles = await git_commit_files(diff);

        // Add created log
        gitLogs.push(
            create_log(commit, gitCommitStats, gitCommitFiles)
        );

        isStdOut(config) && pr_log(gitLogs[gitLogs.length - 1]);
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