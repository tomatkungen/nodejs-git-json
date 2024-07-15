import { git_error } from "../private/git_error";
import { git_exec } from "../private/git_exec";
import { Config, CONFIG } from "../types/config.types";
import { GitUsers } from "../types/git_types";
import { isStdOut, isStdPrgOut } from "../util/pr_config";
import { pr_users } from "../util/pr_lg";
import { pr_lg_prg } from "../util/pr_lg_prg";
import { git_repo } from "./../private/git_repo";

export const git_users = async (path: string = './', config: Config = CONFIG): Promise<GitUsers> => {
    // Get Repo
    const repo = await git_repo(path, config);

    //  git log --pretty="%an,%ae,%H"
    const stdout = await git_exec(repo.workdir(), ...['git', 'log', '--pretty=%an,%ae,%H']);

    if (stdout.includes('fatal:'))
        throw git_error(`GIT_REPO: ${stdout}`);

    const lines = stdout.trim().split('\n');

    // No commits in repo
    if (lines.length === 0)
        return [];

    // Store git author for faster search
    let gitAuthor: string[] = []

    const gitUsers = lines.reduce<GitUsers>((prev, line, index) => {
        isStdPrgOut(config) && pr_lg_prg(lines.length, index + 1, 'User Commit');

        const [gitAuthorName, gitAuthorEmail, sha] = line.split(',');

        // Already exist
        const gitAuthorIndex = gitUser(gitAuthor, gitAuthorName, gitAuthorEmail);

        // Store git author for faster search
        if (gitAuthorIndex === -1)
            gitAuthor.push(gitAuthorName + gitAuthorEmail);

        // Add git user
        gitUserAdd(gitAuthorIndex, gitAuthorName, gitAuthorEmail, sha, prev);

        return prev;
    }, []);

    isStdOut(config) && gitUsers.forEach(pr_users);

    return gitUsers;
}

const gitUser = (gitAuthor: string[], authorName: string, authorEmail: string): number => {
    return gitAuthor.indexOf(authorName + authorEmail);
}

const gitUserAdd = (gitAuthorIndex: number, authorName: string, authorEmail: string, sha: string, prev: GitUsers) => {
    if (gitAuthorIndex === -1) {
        prev.push({
            authorName,
            authorEmail,
            totalCommits: 1,
            commits: [sha]
        })
    } else {
        prev[gitAuthorIndex].totalCommits += 1;
        prev[gitAuthorIndex].commits.push(sha);
    }
}

