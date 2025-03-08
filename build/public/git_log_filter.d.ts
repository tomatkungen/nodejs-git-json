import { Config } from "../types/config.types";
import { GitFilterType, GitLogFilters } from "../types/git_types";
export declare const git_log_filter: (path: string | undefined, filter: keyof GitFilterType, config?: Config) => Promise<GitLogFilters>;
