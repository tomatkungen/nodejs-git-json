import { Config } from "../types/config.types";
import { GitRepoUsersCommitCount } from "../types/git_types";
export declare const git_repo_users_commit_count: (path?: string, config?: Config) => Promise<GitRepoUsersCommitCount>;
