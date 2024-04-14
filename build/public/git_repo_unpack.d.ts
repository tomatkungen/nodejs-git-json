import { Config } from "../types/config.types";
import { GitRepoUnpack } from "../types/git_types";
export declare const git_repo_unpack: (path?: string, config?: Config) => Promise<GitRepoUnpack>;
