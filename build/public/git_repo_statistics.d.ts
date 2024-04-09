import { Config } from "../types/config.types";
import { GitRepoStatistics } from "../types/git_types";
export declare const git_repo_statistics: (path?: string, config?: Config) => Promise<GitRepoStatistics>;
