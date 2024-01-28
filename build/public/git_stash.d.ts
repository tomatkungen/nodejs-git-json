import { GitStashes } from "../types/git_types";
export declare const git_stash: (path?: string, stdOut?: boolean) => Promise<GitStashes>;
