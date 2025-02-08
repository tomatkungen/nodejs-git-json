import { exec } from "child_process";
import { Diff } from "nodegit";
import { Commit } from "nodegit/commit";
import { promisify } from "util";
import { git_repo } from "../private/git_repo";
import { CONFIG, Config } from "../types/config.types";
import { GitCommitFiles, GitCommitStat, GitLog, GitLogPagination, GitLogs } from '../types/git_types';
import { isStdOut, isStdPrgOut } from "../util/pr_config";
import { pr_log } from "../util/pr_lg";
import { pr_lg_prg } from "../util/pr_lg_prg";
import { git_commit_files } from "./../private/git_commit_files";
import { git_commit_stats } from "./../private/git_commit_stats";

export const git_log_folder = async (path: string = './', folderPath: string, gitLogPagination: GitLogPagination, config: Config = CONFIG): Promise<GitLogs> => {
    const gitExec = promisify(exec);

    // Get Repo
    const repo = await git_repo(path, config);

    const { stdout } = await gitExec(`git --no-pager log --format=%H -- ${folderPath}`, { cwd: repo.workdir() });

    // Empty commits
    if (stdout === '')
        return [];

    // Get lines
    const lines = stdout.trim().split('\n');

    // No configs in repo
    if (lines.length === 0)
        return [];

    const gitLogs: GitLogs = [];

    for (const [index, line] of lines.entries()) {
        if (outsidePagination(index, gitLogPagination)) 
            continue;

        isStdPrgOut(config) && pr_lg_prg(lines.length, index + 1, 'Commit');

        // Get Commit
        const commit = await repo.getCommit(line.trim());
        
        // Get Parent Commit
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
    };

    return gitLogs;
}

const outsidePagination = (index: number, gitLogPagination: GitLogPagination): boolean => {
    return !(
        gitLogPagination.commitsPerPage * gitLogPagination.currentPage <= index && 
        index < (gitLogPagination.commitsPerPage * (gitLogPagination.currentPage + 1))
    );
}

const create_log = (commit: Commit, gitCommitStat: GitCommitStat, gitCommitFiles: GitCommitFiles): GitLog => {
    return {
        sha: commit.sha(),
        date: commit.date().toISOString(),
        message: commit.message(),
        authorName: commit.author().name(),
        authorEmail: commit.author().email(),
        committerName: commit.committer().name(),
        committerEmail: commit.committer().email(),
        insertion: gitCommitStat.insertion,
        deletion: gitCommitStat.deletion,
        fileChanged: gitCommitStat.fileChanged,
        files: gitCommitFiles,
    }
}