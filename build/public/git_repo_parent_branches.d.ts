import { Config } from "../types/config.types";
import { GitRepoParentBranches } from "../types/git_types";
export declare const git_repo_parent_branches: (path?: string, config?: Config) => Promise<GitRepoParentBranches>;
