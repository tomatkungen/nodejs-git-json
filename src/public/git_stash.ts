import { Stash } from "nodegit";
import { GitStashes } from "../types/git_types";
import { pr_stash } from "../util/pr_lg";
import { git_repo } from "./../private/git_repo";

export const git_stash = async (path: string = './', stdOut: boolean = false): Promise<GitStashes> => {
    // Get Repo
    const repo = await git_repo(path);

    const gitStashes: GitStashes = [];

    await Stash.foreach(repo, (index: number, message: string, stashOid: string) => {

        // Add stash
        gitStashes.push({
            index,
            indexName: `stash@{${index}}`,
            sha: stashOid.toString(),
            message,
        });

    });

    stdOut && gitStashes.forEach(pr_stash);

    return gitStashes;
}