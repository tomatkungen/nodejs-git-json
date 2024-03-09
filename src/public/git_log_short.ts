import { Commit } from "nodegit/commit";
import { git_commits } from "../private/git_commits";
import { git_commit_branch } from "../private/git_commit_branch";
import { git_repo } from "../private/git_repo";
import { CONFIG, Config } from "../types/config.types";
import { GitLogShort, GitLogsShort } from "../types/git_types";
import { isStdOut, isStdPrgOut } from "../util/pr_config";
import { pr_log_short } from "../util/pr_lg";
import { pr_lg_prg } from "../util/pr_lg_prg";
 
export const git_log_short = async (path: string = './', config: Config = CONFIG): Promise<GitLogsShort> => {
    
    // Get Repository
    const repo = await git_repo(path, config);

    // Get latest branch commit
    const branchCommit = await git_commit_branch(repo)

    // Branch commits
    const commits = await git_commits(branchCommit);

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