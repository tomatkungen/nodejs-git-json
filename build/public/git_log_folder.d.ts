import { Config } from "../types/config.types";
import { GitLogPagination, GitLogs } from '../types/git_types';
export declare const git_log_folder: (path: string | undefined, folderPath: string, gitLogPagination: GitLogPagination, config?: Config) => Promise<GitLogs>;
