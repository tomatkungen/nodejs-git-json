import { GitStatuses } from "../git-types";
import { git_repo } from "../private/git_repo";
import { pr_status } from "../pr_lg";


export const git_status = async (): Promise<GitStatuses> => {
    // Get Repo
    const repo = await git_repo();
    
    // Get files with status
    const statusFiles = await repo.getStatus();

    // Return statuses
    return statusFiles.reduce<GitStatuses>((prev, statusFile) => {
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

        prev.push({
            path: statusFile.path(),
            status,
            statusFile: statusFile.status()
        });

        pr_status(prev[prev.length - 1]);

        return prev;
    }, [])
}
