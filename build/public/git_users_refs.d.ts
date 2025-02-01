import { Config } from "../types/config.types";
import { GitUsersRefs } from "../types/git_types";
export declare const git_users_refs: (path?: string, config?: Config) => Promise<GitUsersRefs>;
