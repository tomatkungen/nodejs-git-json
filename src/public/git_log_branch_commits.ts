import { git_branch_name } from "../private/git_branch_name";
import { git_branch_names } from '../private/git_branch_names';
import { git_exec } from "../private/git_exec";
import { git_repo } from "../private/git_repo";
import { Config, CONFIG } from "../types/config.types";
import { GitLogShort, GitLogsShort } from "../types/git_types";
import { isStdOut, isStdPrgOut } from "../util/pr_config";
import { pr_log_short } from "../util/pr_lg";
import { pr_lg_prg } from "../util/pr_lg_prg";

// git log main..feature/git-coomit
// git log --pretty="format:%H,%an" --no-merges $(git merge-base  feature/git-coomit HEAD)..feature/git-coomit
export const git_log_branch_commits = async (path: string = './', config: Config = CONFIG): Promise<GitLogsShort> => {

    // Get Repository
    const repo = await git_repo(path, config);

    // Get Branch name from HEAD
    const branchName = await git_branch_name(repo);

    // Local branches
    const localBranchNames = await git_branch_names(repo, branchName);

    // Get merge base sha
    // git merge-base --all feature/git-coomit HEAD
    const sha = await git_exec(
        repo.workdir(),
        'git',
        'merge-base',
        '--all',
        'HEAD', ...localBranchNames);

    // Empty sha
    if (sha === '')
        return [];

    // Get merge commits from merge base commit and HEAD
    // git log --pretty="format:%H,%an" --no-merges $(git merge-base --all HEAD feature/git-coomit)..HEAD
    // git log --pretty="format:%H,%an" --no-merges sha..feature/git-coomit
    const stdOut = await git_exec(
        repo.workdir(),
        'git',
        'log',
        `--pretty=format:${['%H', "%ci", "%s", "%an", "%ae", "%cn", "%ce"].join('%x00')}`,
        '--no-merges',
        `${sha.replace(/\n/g, '')}..${branchName}`
    );

    // Empty patterns
    if (stdOut === '')
        return [];

    // Get lines
    const lines = stdOut.trim().split('\n');

    // No configs in repo
    if (lines.length === 0)
        return [];

    return lines.map<GitLogShort>((line, index) => {
        isStdPrgOut(config) && pr_lg_prg(lines.length, index + 1, 'Repo commit');

        const [
            sha,
            date,
            message,
            authorName,
            authorEmail,
            committerName,
            committerEmail
        ] = line.split('\0');

        const gitLogShort: GitLogShort = {
            sha,
            date,
            message,
            authorName,
            authorEmail,
            committerName,
            committerEmail
        }

        isStdOut(config) && pr_log_short(gitLogShort);

        return gitLogShort;
    })
}