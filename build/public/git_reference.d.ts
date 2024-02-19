import { GitRefs } from "../types/git_types";
import { Config } from "../types/config.types";
export declare const git_reference: (path?: string, config?: Config) => Promise<GitRefs>;
