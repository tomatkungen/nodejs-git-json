import { Config } from "../types/config.types";
import { GitLogDates, GitLogs } from "../types/git_types";
export declare const git_log_dates: (path: string | undefined, gitLogDates: GitLogDates, config?: Config) => Promise<GitLogs>;
