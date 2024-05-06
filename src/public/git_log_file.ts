import { Diff, Revwalk } from "nodegit";
import { Commit } from "nodegit/commit";
import { relative } from "path";
import { git_commit_branch } from "../private/git_commit_branch";
import { git_repo } from "../private/git_repo";
import { CONFIG, Config } from "../types/config.types";
import { GitCommitFiles, GitCommitStat, GitLog, GitLogs } from '../types/git_types';
import { isStdOut, isStdPrgOut } from "../util/pr_config";
import { pr_log } from "../util/pr_lg";
import { pr_lg_prg } from "../util/pr_lg_prg";
import { git_commit_files } from "./../private/git_commit_files";
import { git_commit_stats } from "./../private/git_commit_stats";


export const git_log_file = async (path: string = './', filePath: string, config: Config = CONFIG): Promise<GitLogs> => {
    // Get Repository
    const repo = await git_repo(path, config);

    // Get commit branch latest
    const commitBranch = await git_commit_branch(repo);

    // Rewalk history
    const reWalk = repo.createRevWalk();
    reWalk.sorting(Revwalk.SORT.TIME);

    // Rewalk start point
    reWalk.push(commitBranch.id());

    const historyEntrys = await reWalk.fileHistoryWalk(
        relative(repo.workdir, filePath),
        1000
    );

    if (historyEntrys.length === 0)
        return [];

    const Oids = historyEntrys.map((historyEntry) => (historyEntry.commit.sha()))

    // Init empty git logs
    const gitLogs: GitLogs = [];

    for (const [index, Oid] of Oids.entries()) {
        isStdPrgOut(config) && pr_lg_prg(Oids.length, index + 1, 'Commit');

        // Get Commit
        const commit = await repo.getCommit(Oid);
        
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
