import { GitStatuses } from "../types/git_types";
import { Config } from "../types/config.types";
export declare const git_status: (path?: string, config?: Config) => Promise<GitStatuses>;
