import { Commit, Repository } from "nodegit";
import { GitCommitStat } from "./../types/git_types";
export declare const git_commit_stats: (repo: Repository, currentCommit: Commit, prevCommit?: Commit) => Promise<GitCommitStat>;
