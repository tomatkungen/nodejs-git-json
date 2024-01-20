import { Commit, Diff, Repository } from "nodegit";
import {GitCommitStat} from "./../types/git_types";

export const git_commit_stats = async (
    repo: Repository,
    currentCommit: Commit,
    prevCommit /* parentCommit */?: Commit
): Promise<GitCommitStat> => {
    const cT = await currentCommit.getTree();
    const pT = prevCommit ? await prevCommit.getTree() : prevCommit;

    const diff = await Diff.treeToTree(repo, pT, cT);

    const diffStats = await diff.getStats()

    return {
        insertion: diffStats.insertions().valueOf(),
        deletion: diffStats.deletions().valueOf(),
        fileChanged: diffStats.filesChanged().valueOf()
    }
}