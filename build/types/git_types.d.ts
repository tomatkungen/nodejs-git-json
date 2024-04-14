export type oneToNine = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type zeroToNine = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type YYYY = `19${zeroToNine}${zeroToNine}` | `20${zeroToNine}${zeroToNine}`;
type MM = `0${oneToNine}` | `1${0 | 1 | 2}`;
type DD = `${0}${oneToNine}` | `${1 | 2}${zeroToNine}` | `3${0 | 1}`;
export type DateFormat = `${YYYY}-${MM}-${DD}`;
export type GitLogDates = {
    sinceDate: DateFormat;
    untilDate: DateFormat;
};
export type GitLogPagination = {
    commitsPerPage: number;
    currentPage: number;
};
export type GitLogShort = {
    sha: string;
    date: string;
    message: string;
    authorName: string;
    authorEmail: string;
    commiterName: string;
    commiterEmail: string;
};
export type GitLog = {
    sha: string;
    date: string;
    message: string;
    authorName: string;
    authorEmail: string;
    commiterName: string;
    commiterEmail: string;
    files: GitCommitFiles;
} & GitCommitStat;
export type GitCommitFile = {
    newFilePath: string;
    newFileSize: number;
    contextLines: number;
    addedLines: number;
    deletedLines: number;
    status: string[];
    hunks: GitCommitHunks;
};
export type Gitstatus = {
    path: string;
    status: string[];
    statusFile: string[];
};
export type GitCommitHunks = GitCommitHunk[];
export type GitCommitHunk = {
    header: string;
    insertTokens: number;
    deletionTokens: number;
    lines: GitCommitLine[];
};
export type GitCommitLine = {
    origin: number;
    oldLineno: number;
    newLineno: number;
    type: 'CONTEXT' | 'ADDITION' | 'DELETION' | 'CONTEXT_EOFNL' | 'ADD_EOFNL' | 'DEL_EOFNL' | 'FILE_HDR' | 'HUNK_HDR' | 'BINARY';
    diffType: '+' | '-' | '';
    content: string;
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
export type GitUser = {
    authorName: string;
    authorEmail: string;
    totalCommits: number;
    commits: string[];
};
export type GitConfig = {
    scope: string;
    variable: {
        key: string;
        value: string;
    };
    originType: string;
};
export type GitStash = {
    index: number;
    indexName: string;
    sha: string;
    message: string;
};
export type GitRepoUserCommitCount = {
    authorName: string;
    commits: number;
};
export type GitRepoFilePath = string;
export type GitRepoStatistic = {
    repositorySize: {
        commits: {
            count: number;
            size: number;
        };
        trees: {
            count: number;
            size: number;
            entries: number;
        };
        blobs: {
            count: number;
            size: number;
        };
        annotatedTags: {
            count: number;
        };
        references: {
            count: number;
        };
    };
    biggestObjects: {
        commits: {
            maxSize: number;
            maxParents: number;
        };
        trees: {
            maxEntries: number;
        };
        blobs: {
            maxSize: number;
        };
    };
    historyStructure: {
        maxDepth: number;
        maxTagDepth: number;
    };
    biggestCheckouts: {
        numDirectories: number;
        maxPathDepth: number;
        maxPathLength: number;
        numFiles: number;
        totalFileSize: number;
        numSymlinks: number;
        numSubmodules: number;
    };
};
export type GitRepoGrep = {
    filePath: string;
    lineno: string;
    line: string;
};
export type GitRepoFileSize = {
    filePath: string;
    size: string;
};
export type GitLogsShort = GitLogShort[];
export type GitLogs = GitLog[];
export type GitCommitFiles = GitCommitFile[];
export type GitStatuses = Gitstatus[];
export type GitRefs = GitRef[];
export type GitUserStats = GitUserStat[];
export type GitUsers = GitUser[];
export type GitConfigs = GitConfig[];
export type GitStashes = GitStash[];
export type GitRepoUsersCommitCount = GitRepoUserCommitCount[];
export type GitRepoFilePaths = GitRepoFilePath[];
export type GitRepoStatistics = GitRepoStatistic;
export type GitRepoGreps = GitRepoGrep[];
export type GitRepoFilesSize = GitRepoFileSize[];
export {};
