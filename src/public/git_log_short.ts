import { Commit, HistoryEventEmitter } from "nodegit/commit";
import { git_repo } from "../private/git_repo";
import { CONFIG, Config } from "../types/config.types";
import { GitLogShort, GitLogsShort } from "../types/git_types";
import { isStdOut, isStdPrgOut } from "../util/pr_config";
import { pr_log_short } from "../util/pr_lg";
import { pr_lg_prg } from "../util/pr_lg_prg";

export const git_log_short = async (path: string = './', config: Config = CONFIG): Promise<GitLogsShort> => {
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

    // return commit short log
    return commits.map<GitLogShort>((commit, index) => {
        isStdPrgOut(config) && pr_lg_prg(commits.length, index + 1, 'Commit');

        const gitLogShort = create_log(commit);

        
        isStdOut(config) && pr_log_short(gitLogShort);

        return gitLogShort;
    });    
}

const create_log = (commit: Commit): GitLogShort => {
    return {
        sha: commit.sha(),
        date: commit.date().toISOString(),
        message: commit.message(),
        authorName: commit.author().name(),
        authorEmail: commit.author().email(),
        commiterName: commit.committer().name(),
        commiterEmail: commit.committer().email(),
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