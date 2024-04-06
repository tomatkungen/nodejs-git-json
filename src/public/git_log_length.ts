import { git_repo } from "../private/git_repo";
import { CONFIG, Config } from "../types/config.types";

export const git_log_length = async (path: string = './', config: Config = CONFIG): Promise<number> => {
 
    // Get Repository
    const repo = await git_repo(path, config);

    // Rewalk
    const revwalk = repo.createRevWalk();

    // Rewalk start point
    revwalk.pushHead();

    let  count = 0, next = true;
    while (next) {
        try {
            await revwalk.next();
            count++;
        } catch (e) {
            next = false;
        }
    }

    return count;
}
