import { Commit, Diff, Oid, Repository } from "nodegit";
import { git_commit_branch } from "../private/git_commit_branch";
import { git_repo } from "../private/git_repo";
import { GitCommitFiles, GitCommitStat, GitLog, GitLogPagination, GitLogs } from "../types/git_types";
import { CONFIG, Config } from "../types/config.types";
import { git_commit_stats } from "../private/git_commit_stats";
import { git_commit_files } from "../private/git_commit_files";
import { isStdOut, isStdPrgOut } from "../util/pr_config";
import { pr_lg_prg } from "../util/pr_lg_prg";
import { pr_log } from "../util/pr_lg";

export const git_log_pagination = async (path: string = './', gitLogPagination: GitLogPagination, config: Config = CONFIG): Promise<GitLogs> => {

    // Get Repo
    const repo = await git_repo(path, config);

    // Get commit branch latest
    const commitBranch = await git_commit_branch(repo);

    // Rewalk history
    const reWalk = repo.createRevWalk();

    // Rewalk start point
    reWalk.push(commitBranch.id());

    // Init empty git logs
    const gitLogs: GitLogs = [];

    let index: number = 0, next: boolean = true;
    while (next) {
        isStdPrgOut(config) && pr_lg_prg(
            (gitLogPagination.currentPage + 1) * gitLogPagination.commitsPerPage,
            index,
            'Commit'
        );

        try {
            const Oid = await reWalk.next();
            const pos = paginationPosition(index, gitLogPagination);

            if (pos === 'middle') {
                gitLogs.push(
                    await addCommit(Oid, repo)
                ); 
            }

            index++;

            if (pos === 'left')
                continue;

            if (pos === 'right')
                break;
        } catch (e) {
            next = false;
        }
    }

    isStdOut(config) && gitLogs.forEach(pr_log);    
    return gitLogs;
}

const paginationPosition = (index: number, gitLogPagination: GitLogPagination): 'left' | 'middle' | 'right' => {
    if (
        (gitLogPagination.commitsPerPage * gitLogPagination.currentPage) <= index &&
        index < (gitLogPagination.commitsPerPage * (gitLogPagination.currentPage + 1))
    )
        return 'middle';
    
    if ((index >=  (gitLogPagination.commitsPerPage * (gitLogPagination.currentPage + 1)))) 
        return 'right';

    return 'left'
}

const addCommit = async (Oid: Oid, repo: Repository): Promise<GitLog> => {
    // Get Commit
    const commit = await repo.getCommit(Oid);

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
    
    return create_log(commit, gitCommitStats, gitCommitFiles)
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

