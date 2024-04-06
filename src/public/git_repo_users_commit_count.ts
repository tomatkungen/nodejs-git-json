import { spawn } from "child_process";
import { git_repo } from "../private/git_repo";
import { CONFIG, Config } from "../types/config.types";
import { GitUserCommitLength, GitUsersCommitLength } from "../types/git_types";
import { pr_lg_prg } from "../util/pr_lg_prg";
import { isStdOut, isStdPrgOut } from "../util/pr_config";
import { pr_users_commit_length } from "../util/pr_lg";

export const git_repo_users_commit_count = async (path: string = './', config: Config = CONFIG): Promise<GitUsersCommitLength> => {

    // Get Repository
    const repo = await git_repo(path, config);

    // Run git shortlog in work dir
    const stdout = await exec(repo.workdir(), 'git', '--no-pager', 'shortlog', '-n', '-s');

    // Empty shortlog
    if (stdout === '')
        return [];

    // Get lines
    const lines = stdout.trim().split('\n');

    // No shortlog in repo
    if (lines.length === 0)
        return [];

    const gitUsersCommitLength: GitUsersCommitLength = [];

    lines.forEach((line, index) => {
        isStdPrgOut(config) && pr_lg_prg(lines.length, index + 1, 'Users Commit Length');

        const gitUserCommitLength = getGitUsersCommitLength(line)

        if (!gitUserCommitLength)
            return;

        gitUsersCommitLength.push(gitUserCommitLength)
        isStdOut(config) && pr_users_commit_length(gitUsersCommitLength[gitUsersCommitLength.length - 1]);
    });

    return gitUsersCommitLength;
}

const getGitUsersCommitLength = (line: string): GitUserCommitLength | null => {
    if (line === '')
        return null;

    const gitUserCommitLength = line.replace(/\s+/g, ' ').trim().split(' ');

     if (gitUserCommitLength.length < 2)
        return null

    const commits = gitUserCommitLength[0];

    if (commits === '')
        return null;

    const authorName = gitUserCommitLength.slice(1).join(' ');

    if (authorName === '')
        return null;

    return {
        authorName,
        commits: parseInt(commits, 10)
    }
}

const exec = (workdir: string, ...command: string[]): Promise<string> => {
    let p = spawn(command[0], command.slice(1), { cwd: workdir, stdio: ['inherit', 'pipe', 'pipe'] });
    return new Promise((resolve, reject) => {
        const stdOut: string[] = [];
        
        p.stdout.on("data", (res) => {
            stdOut.push(res.toString());
        });
        p.stderr.on("data", () => {
            reject('');
        });
        p.on('close', () => {
            if (stdOut.length > 0)
                resolve(stdOut.join(''));
            
            resolve('');
        });
        
    });
}
