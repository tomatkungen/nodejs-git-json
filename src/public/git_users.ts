import { Commit, HistoryEventEmitter } from "nodegit/commit";
import { Config, CONFIG } from "../types/config.types";
import { GitUsers } from "../types/git_types";
import { isStdOut, isStdPrgOut } from "../util/pr_config";
import { pr_users } from "../util/pr_lg";
import { pr_lg_prg } from "../util/pr_lg_prg";
import { git_repo } from "./../private/git_repo";

export const git_users = async (path: string = './', config: Config = CONFIG): Promise<GitUsers> => {
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

    // No commits in repo
    if (commits.length === 0)
        return [];

    // Store git author for faster search
    let gitAuthor: string[] = []

    const gitUsers = commits.reduce<GitUsers>((prev, commit, index) => {
        isStdPrgOut(config) && pr_lg_prg(commits.length, index + 1, 'Commit');

        // Already exist
        const gitAuthorIndex = gitUser(gitAuthor, commit);
        
        // Store git author for faster search
        if (gitAuthorIndex === -1) {
            gitAuthor.push(commit.author().name() + commit.author().email());
        }

        // Add git user
        gitUserAdd(gitAuthorIndex, commit, prev);

        return prev;
    }, []);
    
    isStdOut(config) && gitUsers.forEach(pr_users);

    return gitUsers;
}

const get_commits = async (history: HistoryEventEmitter): Promise<Commit[]> => {
    return new Promise((resolve) => {
        history.on('end', (commits: Commit[]) => {
            resolve(commits);
        });

        history.start();
    });
}

const gitUser = (gitAuthor: string[], commit: Commit): number => {
    return gitAuthor.indexOf(commit.author().name() + commit.author().email());
}

const gitUserAdd = (gitAuthorIndex: number, commit: Commit, prev: GitUsers) => {
    if (gitAuthorIndex === -1) {
        prev.push({
            authorName: commit.author().name(),
            authorEmail: commit.author().email(),
            totalCommits: 1,
            commits: [commit.sha()]
        })
    } else {
        prev[gitAuthorIndex].totalCommits += 1;
        prev[gitAuthorIndex].commits.push(commit.sha())
    }
}

