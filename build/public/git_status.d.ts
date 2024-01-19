import { GitStatuses } from "../types/git_types";
export declare const git_status: (path?: string, stdOut?: boolean) => Promise<GitStatuses>;
