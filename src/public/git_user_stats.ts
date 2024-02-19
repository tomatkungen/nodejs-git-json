import { Config, CONFIG } from "../types/config.types";
import { GitUserStats } from "../types/git_types";
import { git_log } from "./git_log";

export const git_user_stats = async (path: string = './', config: Config = CONFIG): Promise<GitUserStats> => {
    const gitLog = await git_log(path, config);

    return [];
}