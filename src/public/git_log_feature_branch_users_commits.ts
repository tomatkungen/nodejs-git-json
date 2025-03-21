import { git_branch_name } from "../private/git_branch_name";
import { git_branch_root } from "../private/git_branch_root";
import { git_error } from "../private/git_error";
import { git_exec } from "../private/git_exec";
import { git_repo } from "../private/git_repo";
import { Config, CONFIG } from "../types/config.types";
import { GitUsers } from "../types/git_types";
import { isStdOut, isStdPrgOut } from "../util/pr_config";
import { pr_users } from "../util/pr_lg";
import { pr_lg_prg } from "../util/pr_lg_prg";

export const git_log_feature_branch_users_commits = async (path: string = './', config: Config = CONFIG): Promise<GitUsers> => {

    // Get Repository
    const repo = await git_repo(path, config);

    // Get Branch name from HEAD
    const featureBranch = await git_branch_name(repo);

    // Get root branch
    const rootBranch = await git_branch_root(repo, featureBranch);

    // git log myFeaturebranch ---not masater --pretty="format:%H,%an" --no-merges
    const stdOut = await git_exec(
        repo.workdir(),
        'git',
        'log',
        featureBranch,
        '--not',
        rootBranch,
        `--pretty=format:${['%H', '%an', '%ae'].join('%x00')}`,
        '--no-merges',
    );

    // Error in git exec
    if (stdOut.includes('fatal:'))
        throw git_error(`GIT_REPO: ${stdOut}`);

    // Empty patterns
    if (stdOut === '')
        return [];

    // Get lines
    const lines = stdOut.trim().split('\n');

    // No commits in repo
    if (lines.length === 0)
        return [];

    // Store git author for faster search
    let gitAuthor: string[] = []

    // Get git users
    const gitUsers = lines.reduce<GitUsers>((prev, line, index) => {
        isStdPrgOut(config) && pr_lg_prg(lines.length, index + 1, 'User Commit');

        const [sha, gitAuthorName, gitAuthorEmail] = line.split('\0');

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