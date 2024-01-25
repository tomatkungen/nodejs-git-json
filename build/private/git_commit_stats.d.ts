import { Diff } from "nodegit";
import { GitCommitStat } from "./../types/git_types";
export declare const git_commit_stats: (diff: Diff) => Promise<GitCommitStat>;
