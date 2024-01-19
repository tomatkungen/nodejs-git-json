import { GitLogs } from "../types/git_types";
export declare const git_log: (path?: string, stdOut?: boolean) => Promise<GitLogs>;
