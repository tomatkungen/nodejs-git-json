import { Commit, Diff } from "nodegit";
import { git_commit_files } from "../private/git_commit_files";
import { git_commit_stats } from "../private/git_commit_stats";
import { git_repo } from "../private/git_repo";
import { Config, CONFIG } from "../types/config.types";
import { GitCommitFiles, GitCommitStat, GitLog } from "../types/git_types";
import { pr_log_commit } from "../util/pr_lg";
import { isStdOut } from "./../util/pr_config";

export const git_log_commit = async (
    path: string = './',
    sha: string = "",
    config: Config = CONFIG
): Promise<GitLog> => {
    // Get Repo
    const repo = await git_repo(path, config);

    // Get commit
    const commit = await repo.getCommit(sha);

    const parentCommit = commit.parentId(0) && await commit.parent(0);

    // Get Diff
    const [cT, pT] = await Promise.all([
        commit.getTree(),
        parentCommit ? parentCommit.getTree() : undefined
    ])

    const diff = await Diff.treeToTree(repo, pT, cT);
    
    // Get commit stats
    const gitCommitStats = await git_commit_stats(diff);

    // Get commit diff
    const gitCommitFiles = await git_commit_files(diff);

    // Add created log
    const gitLog = create_log(commit, gitCommitStats, gitCommitFiles);

    isStdOut(config) && pr_log_commit(gitLog);

    return gitLog;
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