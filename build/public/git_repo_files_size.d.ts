import { Config } from "../types/config.types";
import { GitRepoFilesSize } from "../types/git_types";
export declare const git_repo_files_size: (path?: string, config?: Config) => Promise<GitRepoFilesSize>;
