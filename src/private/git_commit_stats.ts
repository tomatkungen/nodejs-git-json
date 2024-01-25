// import { Commit, Diff, Repository } from "nodegit";
import { Diff} from "nodegit";
import {GitCommitStat} from "./../types/git_types";

export const git_commit_stats = async (
    diff: Diff
): Promise<GitCommitStat> => {
    const diffStats = await diff.getStats()

    return {
        insertion: diffStats.insertions().valueOf(),
        deletion: diffStats.deletions().valueOf(),
        fileChanged: diffStats.filesChanged().valueOf()
    }
}