import { GitUserStats } from "../types/git_types";
import { git_log } from "./git_log";

export const git_user_stats = async (path: string = './', stdOut: boolean = false): Promise<GitUserStats> => {
    const gitLog = await git_log(path, stdOut);

    return [];
}