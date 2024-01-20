export type GitLog = {
    sha: string;
    date: string;
    message: string;
    authorName: string;
    authorEmail: string;
    commiterName: string;
    commiterEmail: string;
    insertion: number;
    deletion: number;
    fileChanged: number;
    files: GitCommitFiles;
};
export type GitCommitFile = {
    newFilePath: string;
    newFileSize: number;
    contextLines: number;
    addedLines: number;
    deletedLines: number;
    insertion: number;
    deletion: number;
    status: string[];
};
export type Gitstatus = {
    path: string;
    status: string[];
    statusFile: string[];
};
export type GitRef = {
    sha: string;
    status: string[];
    name: string;
};
export type GitUserStat = {
    authorName: string;
    authorEmail: string;
    totalCommits: number;
    totalFiles: number;
    addedLines: number;
    removedLines: number;
    firstCommitSha: string;
    lastCommitSha: string;
    firstCommitDate: string;
    lastCommitDate: string;
};
export type GitCommitStat = {
    insertion: number;
    deletion: number;
    fileChanged: number;
};
export type GitLogs = GitLog[];
export type GitCommitFiles = GitCommitFile[];
export type GitStatuses = Gitstatus[];
export type GitRefs = GitRef[];
export type GitUserStats = GitUserStat[];
