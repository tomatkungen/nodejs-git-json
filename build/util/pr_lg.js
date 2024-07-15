"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cF = exports.pr_repo_unpack = exports.pr_repo_file_size = exports.pr_repo_grep = exports.pr_repo_files = exports.pr_repo_users_commit_count = exports.pr_repo = exports.pr_log_commit = exports.pr_stash = exports.pr_config = exports.pr_users = exports.pr_reference = exports.pr_status = exports.pr_log_hunks = exports.pr_log_files = exports.pr_log = exports.pr_log_short = exports.lgN = exports.lg = void 0;
const lg = (...args) => {
    console.log(...args);
};
exports.lg = lg;
const lgN = () => {
    (0, exports.lg)('\n');
};
exports.lgN = lgN;
const pr_log_short = (gitLogShort) => {
    (0, exports.lg)((0, exports.cF)(`commit ${gitLogShort.sha}`, 'cfYELLOW'));
    (0, exports.lg)(`Author: ${gitLogShort.authorName} <${gitLogShort.authorEmail}>`);
    (0, exports.lg)(`Commiter: ${gitLogShort.commiterName} <${gitLogShort.commiterEmail}>`);
    (0, exports.lg)(`Date: ${gitLogShort.date}`);
    (0, exports.lg)("\n    " + gitLogShort.message);
};
exports.pr_log_short = pr_log_short;
const pr_log = (gitLog) => {
    (0, exports.lgN)();
    (0, exports.lg)((0, exports.cF)(`commit ${gitLog.sha}`, 'cfYELLOW'));
    (0, exports.lg)(`Author: ${gitLog.authorName} <${gitLog.authorEmail}>`);
    (0, exports.lg)(`Date: ${gitLog.date}`);
    (0, exports.lg)(`Files: ${gitLog.fileChanged}`);
    (0, exports.lg)(`Lines: ${(0, exports.cF)(`+L${gitLog.insertion}`, 'cfGREEN')} ${(0, exports.cF)(`-L${gitLog.deletion}`, 'cfRED')}`);
    (0, exports.lg)("\n    " + gitLog.message);
    gitLog.files.forEach(exports.pr_log_files);
    (0, exports.lg)();
};
exports.pr_log = pr_log;
const pr_log_files = (gitCommitFile) => {
    const fileSize = gitCommitFile.newFileSize;
    const filePath = gitCommitFile.newFilePath;
    const contextLines = gitCommitFile.contextLines;
    const addedLines = gitCommitFile.addedLines;
    const deletedLines = gitCommitFile.deletedLines;
    const insertTokens = gitCommitFile.hunks.reduce((a, b) => (a + b.insertTokens), 0);
    const deletionTokens = gitCommitFile.hunks.reduce((a, b) => (a + b.deletionTokens), 0);
    const lineStats = `${contextLines}c ${(0, exports.cF)(`+L${addedLines}`, 'cfGREEN')} ${(0, exports.cF)(`-L${deletedLines}`, 'cfRED')}`;
    const fileStats = `+T${(0, exports.cF)(`${insertTokens}`, 'cfGREEN')} ${(0, exports.cF)(`-T${deletionTokens}`, 'cfRED')}`;
    (0, exports.lg)(`${sR(gitCommitFile.status.join(', '), 6, 2)}${(0, exports.cF)(filePath, 'cfGREEN')} <${lineStats} ${fileStats} ${(0, exports.cF)(`${Math.round(fileSize) / 100}K`, 'cfCYAN')}> `);
};
exports.pr_log_files = pr_log_files;
const pr_log_hunks = (gitCommitHunk, gitCommitFile) => {
    (0, exports.lg)();
    (0, exports.lg)(`${sR(gitCommitFile.status.join(', '), 6, 2)}${(0, exports.cF)(gitCommitFile.newFilePath, 'cfGREEN')}`);
    (0, exports.lg)(`${gitCommitHunk.header.replace('\n', '')} ${(0, exports.cF)(`+T${gitCommitHunk.insertTokens}`, 'cfGREEN')} ${(0, exports.cF)(`-T${gitCommitHunk.deletionTokens}`, 'cfRED')}`);
    gitCommitHunk.lines.forEach((line) => {
        const diffToken = line.diffType === '' ? ' ' : line.diffType;
        const diffLine = line.content.replace('\n', '');
        const diffOldNr = line.oldLineno === -1 ? '  ' : line.oldLineno;
        const diffNewNr = line.newLineno === -1 ? '  ' : line.newLineno;
        diffToken === '+' && (0, exports.lg)((0, exports.cF)(`${diffToken} ${diffOldNr} ${diffNewNr} ${diffLine}`, 'cfGREEN'));
        diffToken === '-' && (0, exports.lg)((0, exports.cF)(`${diffToken} ${diffOldNr} ${diffNewNr} ${diffLine}`, 'cfRED'));
        diffToken === ' ' && (0, exports.lg)(`${diffToken} ${diffOldNr} ${diffNewNr} ${diffLine}`);
    });
};
exports.pr_log_hunks = pr_log_hunks;
const pr_status = (gitStatus) => {
    (0, exports.lg)(`${(0, exports.cF)(gitStatus.path, 'cfGREEN')} <${(0, exports.cF)(gitStatus.status.join(', '), 'cfCYAN')}> ${gitStatus.statusFile.join(',')}`);
};
exports.pr_status = pr_status;
const pr_reference = (gitRef) => {
    (0, exports.lg)((0, exports.cF)(`sha: ${gitRef.sha}`, 'cfYELLOW'), (0, exports.cF)(gitRef.status.join(', '), 'cfCYAN'));
    (0, exports.lg)(`${gitRef.name}`);
    (0, exports.lg)();
};
exports.pr_reference = pr_reference;
const pr_users = (gitUser) => {
    (0, exports.lg)(`${gitUser.totalCommits.toString().padStart(5)} Author: ${gitUser.authorName} <${(0, exports.cF)(gitUser.authorEmail, 'cfGREEN')}>`);
};
exports.pr_users = pr_users;
const pr_config = (gitConfig) => {
    (0, exports.lg)((0, exports.cF)(`path ${gitConfig.originType}`, "cfYELLOW"));
    (0, exports.lg)(`orginType: ${(0, exports.cF)(gitConfig.scope, 'cfMAGENTA')}`);
    (0, exports.lg)(`key: ${(0, exports.cF)(gitConfig.variable.key, 'cfCYAN')}`);
    (0, exports.lg)(`value: ${(0, exports.cF)(gitConfig.variable.value, 'cfCYAN')}`);
    (0, exports.lg)();
};
exports.pr_config = pr_config;
const pr_stash = (gitStash) => {
    (0, exports.lg)((0, exports.cF)(`sha ${gitStash.sha}`, 'cfYELLOW'));
    (0, exports.lg)(`${gitStash.indexName}`, (0, exports.cF)(`${gitStash.message}`, 'cfGREEN'));
    (0, exports.lg)();
};
exports.pr_stash = pr_stash;
const pr_log_commit = (gitLog) => {
    (0, exports.lgN)();
    (0, exports.lg)((0, exports.cF)(`commit ${gitLog.sha}`, 'cfYELLOW'));
    (0, exports.lg)(`Author: ${gitLog.authorName} <${gitLog.authorEmail}>`);
    (0, exports.lg)(`Date: ${gitLog.date}`);
    (0, exports.lg)(`Files: ${gitLog.fileChanged}`);
    (0, exports.lg)(`Lines: ${(0, exports.cF)(`+L${gitLog.insertion}`, 'cfGREEN')} ${(0, exports.cF)(`-L${gitLog.deletion}`, 'cfRED')}`);
    (0, exports.lg)("\n    " + gitLog.message);
    gitLog.files.forEach(exports.pr_log_files);
    gitLog.files.forEach((file) => file.hunks.forEach((hunks) => (0, exports.pr_log_hunks)(hunks, file)));
    (0, exports.lg)();
};
exports.pr_log_commit = pr_log_commit;
const pr_repo = (repo) => {
    (0, exports.lg)((0, exports.cF)(`Workdir: ${repo.workdir}`, 'cfMAGENTA'));
    (0, exports.lg)((0, exports.cF)(`RepoPath: ${repo.path}`, 'cfMAGENTA'));
    (0, exports.lg)();
};
exports.pr_repo = pr_repo;
const pr_repo_users_commit_count = (gitUsersCommitLength) => {
    (0, exports.lg)((0, exports.cF)(`${gitUsersCommitLength.commits}`.padStart(6, ' '), 'cfMAGENTA'), ':', (0, exports.cF)(`${gitUsersCommitLength.authorName}`, 'cfGREEN'));
};
exports.pr_repo_users_commit_count = pr_repo_users_commit_count;
const pr_repo_files = (gitRepoFilePath) => {
    (0, exports.lg)(gitRepoFilePath);
};
exports.pr_repo_files = pr_repo_files;
const pr_repo_grep = (gitRepoGrep, pattern) => {
    (0, exports.lg)((0, exports.cF)(`${gitRepoGrep.filePath}`, 'cfCYAN'), (0, exports.cF)(`${gitRepoGrep.lineno.padStart(5, ' ')}:`, 'cfGREEN'), gitRepoGrep.line.replace(pattern, (0, exports.cF)(`${pattern}`, 'cfYELLOW')));
};
exports.pr_repo_grep = pr_repo_grep;
const pr_repo_file_size = (gitRepoFileSize) => {
    (0, exports.lg)((0, exports.cF)(`${gitRepoFileSize.size.padStart(8, ' ')}`, 'cfCYAN'), (0, exports.cF)(`${gitRepoFileSize.filePath}`, 'cfGREEN'));
};
exports.pr_repo_file_size = pr_repo_file_size;
const pr_repo_unpack = (gitRepoUnpack) => {
    for (const [key, value] of Object.entries(gitRepoUnpack)) {
        (0, exports.lg)((0, exports.cF)(`${value.toString().padStart(6, ' ')}`, 'cfCYAN'), `: ${key}`);
    }
    ;
};
exports.pr_repo_unpack = pr_repo_unpack;
const sR = (str, len = 20, max = 5, prDiff = false) => {
    const diff = Math.max(max, (len - str.length));
    prDiff && (0, exports.lg)('diff', max, len, str.length, (len - str.length));
    return `${str}${new Array(diff + 1).join(' ')}`;
};
const Colors = {
    cfBLACK: '\x1b[30m',
    cfRED: '\x1b[31m',
    cfGREEN: '\x1b[32m',
    cfYELLOW: '\x1b[33m',
    cfBLUE: '\x1b[34m',
    cfMAGENTA: '\x1b[35m',
    cfCYAN: '\x1b[36m',
    cfWHITE: '\x1b[37m',
    cbRED: '\x1b[41m',
    cbGREEN: '\x1b[42m',
    cbYELLOW: '\x1b[43m',
    cbBLUE: '\x1b[44m',
    cbMAGENTA: '\x1b[45m',
    cbCYAN: '\x1b[46m',
    cbWHITE: '\x1b[47m',
};
const cF = (str, color) => {
    const cEND = '\x1b[0m';
    return `${Colors[color]}${str}${cEND}`;
};
exports.cF = cF;
