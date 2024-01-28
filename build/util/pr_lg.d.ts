import { GitCommitFile, GitConfig, GitLog, GitLogShort, GitRef, Gitstatus, GitUser } from "../types/git_types";
export declare const lg: (...args: any[]) => void;
export declare const lgN: () => void;
export declare const pr_log_short: (gitLogShort: GitLogShort) => void;
export declare const pr_log: (gitLog: GitLog) => void;
export declare const pr_log_files: (gitCommitFile: GitCommitFile) => void;
export declare const pr_status: (gitStatus: Gitstatus) => void;
export declare const pr_reference: (gitRef: GitRef) => void;
export declare const pr_users: (gitUser: GitUser) => void;
export declare const pr_config: (gitConfig: GitConfig) => void;
type Colors = 'cfBLACK' | 'cfRED' | 'cfGREEN' | 'cfYELLOW' | 'cfBLUE' | 'cfMAGENTA' | 'cfCYAN' | 'cfWHITE' | 'cbRED' | 'cbGREEN' | 'cbYELLOW' | 'cbBLUE' | 'cbMAGENTA' | 'cbCYAN' | 'cbWHITE';
declare const Colors: {
    [key in Colors]: string;
};
export declare const cF: (str: string, color: Colors) => string;
export {};
