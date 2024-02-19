import { Config } from "../types/config.types";
import { GitConfigs } from "../types/git_types";
export declare const git_configs: (path?: string, config?: Config) => Promise<GitConfigs>;
