import { GitLogs } from "../types/git_types";
import { Config } from "./../types/config.types";
export declare const git_log: (path?: string, config?: Config) => Promise<GitLogs>;
