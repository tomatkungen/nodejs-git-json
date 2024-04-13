import { Config } from "../types/config.types";
import { GitRepoGreps } from "../types/git_types";
export declare const git_repo_grep: (path: string | undefined, pattern: string, pathspec?: string, config?: Config) => Promise<GitRepoGreps>;
