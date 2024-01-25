import { Diff } from "nodegit";
import { GitCommitFiles } from "../types/git_types";
export declare const git_commit_files: (diff: Diff) => Promise<GitCommitFiles>;
