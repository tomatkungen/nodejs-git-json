import { Commit, Repository } from "nodegit";
import { GitCommitFiles } from "../types/git-types";
export declare const git_commit_files: (repo: Repository, currentCommit: Commit, prevCommit?: Commit) => Promise<GitCommitFiles>;
