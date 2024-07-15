import { exec } from "child_process";
import { Commit, Diff } from "nodegit";
import { promisify } from "util";
import { git_commit_stats } from "../private/git_commit_stats";
import { git_repo } from "../private/git_repo";
import { CONFIG, Config } from "../types/config.types";
import { GitCommitFiles, GitCommitStat, GitLog, GitLogDates, GitLogs } from "../types/git_types";
import { isStdOut, isStdPrgOut } from "../util/pr_config";
import { pr_log } from "../util/pr_lg";
import { pr_lg_prg } from "../util/pr_lg_prg";
import { git_commit_files } from "./../private/git_commit_files";

export const git_log_dates = async (path: string = './', gitLogDates: GitLogDates, config: Config = CONFIG): Promise<GitLogs> => {
    const gitExec = promisify(exec);

    // Get Repository
    const repo = await git_repo(path, config);

    const { stdout } = await gitExec(
        `git --no-pager log --since="${gitLogDates.sinceDate} 00:00:00" --until="${gitLogDates.untilDate} 24:00:00" --format=%H`,
        { cwd: repo.workdir() }
    );

    // Empty sha
    if (stdout === '')
        return [];

    // Get lines
    const lines = stdout.trim().split('\n');

    // No configs in repo
    if (lines.length === 0)
        return [];

    // Init empty git logs
    const gitLogs: GitLogs = [];

    for (const [index, line] of lines.entries()) {
        isStdPrgOut(config) && pr_lg_prg(lines.length, index + 1, 'Commit');

        const commit = await repo.getCommit(line);
        const parentCommit = commit.parentId(0) && await commit.parent(0);

        // Get Diff
        const [cT, pT] = await Promise.all([
            commit.getTree(),
            parentCommit ? parentCommit.getTree() : undefined
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
