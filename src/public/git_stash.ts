import { Stash } from "nodegit";
import { CONFIG, Config } from "../types/config.types";
import { GitStashes } from "../types/git_types";
import { isStdOut } from "../util/pr_config";
import { pr_stash } from "../util/pr_lg";
import { git_repo } from "./../private/git_repo";

export const git_stash = async (path: string = './', config: Config = CONFIG): Promise<GitStashes> => {
    // Get Repo
    const repo = await git_repo(path, config);

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

    isStdOut(config) && gitStashes.forEach(pr_stash);

    return gitStashes;
}