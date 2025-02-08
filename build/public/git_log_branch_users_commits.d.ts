import { Config } from "../types/config.types";
import { GitUsers } from "../types/git_types";
export declare const git_log_branch_users_commits: (path?: string, config?: Config) => Promise<GitUsers>;
