import { GitLogPagination, GitLogs } from "../types/git_types";
import { Config } from "../types/config.types";
export declare const git_log_pagination: (path: string | undefined, gitLogPagination: GitLogPagination, config?: Config) => Promise<GitLogs>;
