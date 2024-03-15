import { Config } from "../types/config.types";
import { GitLogs } from '../types/git_types';
export declare const git_log_file: (path: string | undefined, filePath: string, config?: Config) => Promise<GitLogs>;
