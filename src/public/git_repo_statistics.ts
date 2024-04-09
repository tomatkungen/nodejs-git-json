import { git_repo } from "../private/git_repo";
import { Config, CONFIG } from "../types/config.types";
import { GitRepoStatistics } from "../types/git_types";

export const git_repo_statistics = async (path: string = './', config: Config = CONFIG): Promise<GitRepoStatistics> => {
    
    // Get Repo
    const repo = await git_repo(path, config);

    // Missing type definition ressign it
    const repoStatistics: any = repo;

    // Get repo statistics
    const stats = await repoStatistics.statistics();

    // Return statistics
    return stats;
}