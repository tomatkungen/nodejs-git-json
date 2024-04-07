import { Config } from "../types/config.types";
import { GitRepoFilePaths } from "../types/git_types";
export declare const git_repo_files: (path?: string, config?: Config) => Promise<GitRepoFilePaths>;
