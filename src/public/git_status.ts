import { StatusFile } from "nodegit";
import { Gitstatus, GitStatuses } from "../types/git_types";
import { git_repo } from "../private/git_repo";
import { pr_status } from "../util/pr_lg";
import { Config, CONFIG } from "../types/config.types";
import { isStdOut } from "../util/pr_config";

export const git_status = async (path: string = './', config: Config = CONFIG): Promise<GitStatuses> => {
    // Get Repo
    const repo = await git_repo(path, config);

    // Get files with status
    const statusFiles = await repo.getStatus();

    // Return statuses
    return statusFiles.reduce<GitStatuses>((prev, statusFile) => {
        
        // Add created status
        prev.push(create_status(statusFile));

        isStdOut(config) && pr_status(prev[prev.length - 1]);

        return prev;
    }, [])
}

const create_status = (statusFile: StatusFile): Gitstatus => {
    const status: string[] = [];

    // statusFile.inIndex()        && status.push('IN-INDEX');
    statusFile.isNew()          && status.push('NEW');
    statusFile.isModified()     && status.push('MODIFIED');
    statusFile.isTypechange()   && status.push('TYPECHANGE');
    statusFile.isRenamed()      && status.push('RENAMED');
    statusFile.isIgnored()      && status.push('IGNORED');
    statusFile.inWorkingTree()  && status.push('WORKING-TREE');
    statusFile.isConflicted()   && status.push('CONFLICT');
    statusFile.isDeleted()      && status.push('DELETED');
    statusFile.isIgnored()      && status.push('IGNORED');

    return {
        path: statusFile.path(),
        status,
        statusFile: statusFile.status()
    }
}
