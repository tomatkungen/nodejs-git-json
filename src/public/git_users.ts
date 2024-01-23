import { Commit, HistoryEventEmitter } from "nodegit/commit";
import { GitUsers } from "../types/git_types";
import { pr_users } from "../util/pr_lg";
import { pr_lg_prg } from "../util/pr_lg_prg";
import { git_repo } from "./../private/git_repo";

export const git_users = async (path: string = './', stdOut: boolean = false): Promise<GitUsers> => {
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

    const gitUsers = commits.reduce<GitUsers>((prev, commit, index) => {
        !stdOut && pr_lg_prg(commits.length, index + 1, 'Commit');

        const userIndex = gitUser(prev, commit);

        if (userIndex === -1) {
            prev.push({
                authorName: commit.author().name(),
                authorEmail: commit.author().email(),
                totalCommits: 1,
                commits: [commit.sha()]
            })
        } else {
            prev[userIndex].totalCommits += 1;
            prev[userIndex].commits.push(commit.sha())
        }

        return prev;
    }, []);

    stdOut && gitUsers.forEach(pr_users);

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

const gitUser = (gitUsers: GitUsers, commit: Commit): number => {
    return gitUsers.findIndex((gitUser) => (
        gitUser.authorEmail === commit.author().email() &&
        gitUser.authorName === commit.author().name()
    ));
}

