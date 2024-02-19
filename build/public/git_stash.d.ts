import { Config } from "../types/config.types";
import { GitStashes } from "../types/git_types";
export declare const git_stash: (path?: string, config?: Config) => Promise<GitStashes>;
