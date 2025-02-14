import { Config } from "../types/config.types";
import { GitLogsShort } from "../types/git_types";
export declare const git_log_feature_branch_commits: (path?: string, config?: Config) => Promise<GitLogsShort>;
