import { Repository } from "nodegit";
import { GitCommitFile, GitConfig, GitLog, GitLogShort, GitRef, GitStash, Gitstatus, GitUser, GitCommitHunk, GitRepoUserCommitCount, GitRepoFilePath } from "../types/git_types";
export declare const lg: (...args: any[]) => void;
export declare const lgN: () => void;
export declare const pr_log_short: (gitLogShort: GitLogShort) => void;
export declare const pr_log: (gitLog: GitLog) => void;
export declare const pr_log_files: (gitCommitFile: GitCommitFile) => void;
export declare const pr_log_hunks: (gitCommitHunk: GitCommitHunk, gitCommitFile: GitCommitFile) => void;
export declare const pr_status: (gitStatus: Gitstatus) => void;
export declare const pr_reference: (gitRef: GitRef) => void;
export declare const pr_users: (gitUser: GitUser) => void;
export declare const pr_config: (gitConfig: GitConfig) => void;
export declare const pr_stash: (gitStash: GitStash) => void;
export declare const pr_log_commit: (gitLog: GitLog) => void;
export declare const pr_repo: (repo: Repository) => void;
export declare const pr_repo_users_commit_count: (gitUsersCommitLength: GitRepoUserCommitCount) => void;
export declare const pr_repo_files: (gitRepoFilePath: GitRepoFilePath) => void;
type Colors = 'cfBLACK' | 'cfRED' | 'cfGREEN' | 'cfYELLOW' | 'cfBLUE' | 'cfMAGENTA' | 'cfCYAN' | 'cfWHITE' | 'cbRED' | 'cbGREEN' | 'cbYELLOW' | 'cbBLUE' | 'cbMAGENTA' | 'cbCYAN' | 'cbWHITE';
declare const Colors: {
    [key in Colors]: string;
};
export declare const cF: (str: string, color: Colors) => string;
export {};
