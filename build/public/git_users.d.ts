import { Config } from "../types/config.types";
import { GitUsers } from "../types/git_types";
export declare const git_users: (path?: string, config?: Config) => Promise<GitUsers>;
