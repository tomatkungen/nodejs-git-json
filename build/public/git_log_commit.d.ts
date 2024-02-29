import { Config } from "../types/config.types";
import { GitLog } from "../types/git_types";
export declare const git_log_commit: (path?: string, sha?: string, config?: Config) => Promise<GitLog>;
