import { Config } from "../types/config.types";
import { GitRepoAncestors } from "../types/git_types";
export declare const git_repo_ancestors: (path?: string, config?: Config) => Promise<GitRepoAncestors>;
