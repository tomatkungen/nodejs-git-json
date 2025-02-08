import { Repository } from "nodegit";
import {
    GitCommitFile,
    GitCommitHunk,
    GitConfig,
    GitLog,
    GitLogShort,
    GitRef,
    GitRepoAncestors,
    GitRepoFilePath,
    GitRepoFileSize,
    GitRepoGrep,
    GitRepoUnpack,
    GitRepoUserCommitCount,
    GitStash,
    Gitstatus,
    GitUser,
    GitUserRef
} from "../types/git_types";

export const lg = (...args: any[]) => {
    console.log(...args);
}

export const lgN = () => {
    lg('\n');
}

export const pr_log_short = (gitLogShort: GitLogShort) => {
    lg(cF(`commit ${gitLogShort.sha}`, 'cfYELLOW'));
    lg(`Author: ${gitLogShort.authorName} <${gitLogShort.authorEmail}>`);
    lg(`Commiter: ${gitLogShort.committerName} <${gitLogShort.committerEmail}>`);
    lg(`Date: ${gitLogShort.date}`);
    lg("\n    " + gitLogShort.message);
    lg();
}

export const pr_log = (gitLog: GitLog) => {
    lgN();
    lg(cF(`commit ${gitLog.sha}`, 'cfYELLOW'));
    lg(`Author: ${gitLog.authorName} <${gitLog.authorEmail}>`);
    lg(`Date: ${gitLog.date}`);
    lg(`Files: ${gitLog.fileChanged}`)
    lg(`Lines: ${cF(`+L${gitLog.insertion}`, 'cfGREEN')} ${cF(`-L${gitLog.deletion}`, 'cfRED')}`)
    lg("\n    " + gitLog.message);

    gitLog.files.forEach(pr_log_files);
    lg();
}

export const pr_log_files = (gitCommitFile: GitCommitFile) => {
    const fileSize = gitCommitFile.newFileSize;
    const filePath = gitCommitFile.newFilePath;
    const contextLines = gitCommitFile.contextLines;
    const addedLines = gitCommitFile.addedLines;
    const deletedLines = gitCommitFile.deletedLines;
    const insertTokens = gitCommitFile.hunks.reduce((a, b) => (a + b.insertTokens), 0);
    const deletionTokens = gitCommitFile.hunks.reduce((a, b) => (a + b.deletionTokens), 0);

    const lineStats = `${contextLines}c ${cF(`+L${addedLines}`, 'cfGREEN')} ${cF(`-L${deletedLines}`, 'cfRED')}`;
    const fileStats = `+T${cF(`${insertTokens}`, 'cfGREEN')} ${cF(`-T${deletionTokens}`, 'cfRED')}`;

    lg(`${sR(gitCommitFile.status.join(', '), 6, 2)}${cF(filePath, 'cfGREEN')} <${lineStats} ${fileStats} ${cF(`${Math.round(fileSize) / 100}K`, 'cfCYAN')}> `)
}

export const pr_log_hunks = (gitCommitHunk: GitCommitHunk, gitCommitFile: GitCommitFile) => {
    lg();
    lg(`${sR(gitCommitFile.status.join(', '), 6, 2)}${cF(gitCommitFile.newFilePath, 'cfGREEN')}`);
    lg(`${gitCommitHunk.header.replace('\n', '')} ${cF(`+T${gitCommitHunk.insertTokens}`, 'cfGREEN')} ${cF(`-T${gitCommitHunk.deletionTokens}`, 'cfRED')}`);


    gitCommitHunk.lines.forEach((line) => {
        const diffToken = line.diffType === '' ? ' ' : line.diffType;
        const diffLine = line.content.replace('\n', '');
        const diffOldNr = line.oldLineno === -1 ? '  ' : line.oldLineno
        const diffNewNr = line.newLineno === -1 ? '  ' : line.newLineno


        diffToken === '+' && lg(cF(`${diffToken} ${diffOldNr} ${diffNewNr} ${diffLine}`, 'cfGREEN'));
        diffToken === '-' && lg(cF(`${diffToken} ${diffOldNr} ${diffNewNr} ${diffLine}`, 'cfRED'));
        diffToken === ' ' && lg(`${diffToken} ${diffOldNr} ${diffNewNr} ${diffLine}`);
    })

}

export const pr_status = (gitStatus: Gitstatus) => {

    lg(`${cF(gitStatus.path, 'cfGREEN')} <${cF(gitStatus.status.join(', '), 'cfCYAN')}> ${gitStatus.statusFile.join(',')}`)

}

export const pr_reference = (gitRef: GitRef) => {

    lg(cF(`sha: ${gitRef.sha}`, 'cfYELLOW'), cF(gitRef.status.join(', '), 'cfCYAN'));
    lg(`${gitRef.name}`);
    lg();

}

export const pr_users = (gitUser: GitUser) => {
    lg(`Author:  ${gitUser.authorName} <${cF(gitUser.authorEmail, 'cfGREEN')}>`);
    lg(`Commits: ${cF(`${gitUser.totalCommits}`, 'cfGREEN')}`);
    lg();
}

export const pr_users_refs = (gitUsersRefs: GitUserRef) => {
    lg(`${cF(`Author:`, 'cfYELLOW')} ${gitUsersRefs.authorName} ${gitUsersRefs.authorEmail}`);
    lg(`${cF(`Committer:`, 'cfYELLOW')} ${gitUsersRefs.committerName} ${gitUsersRefs.committerEmail}`);
    lg(`${cF(`Tagger:`, 'cfYELLOW')} ${gitUsersRefs.taggerName} ${gitUsersRefs.taggerEmail}`);
    lg();
    lg(`Commits: ${cF(`${gitUsersRefs.totalCommits}`, 'cfGREEN')} Tags: ${cF(`${gitUsersRefs.totalTags}`, 'cfGREEN')} Trees: ${cF(`${gitUsersRefs.totalTrees}`, 'cfGREEN')} Blobs: ${cF(`${gitUsersRefs.totalBlobs}`, 'cfGREEN')}`);
    lg();
    gitUsersRefs.refs.forEach((ref) => {
        lg(`  ${cF(ref.objectType, 'cfYELLOW')} ${cF(ref.objectName, 'cfYELLOW')} ${cF(`(${ref.refName})`, 'cfGREEN')} `)
        lg(`  ${ref.subject}`);
        lg();
    })
    lg();
}

export const pr_config = (gitConfig: GitConfig) => {
    lg(cF(`path ${gitConfig.originType}`, "cfYELLOW"));
    lg(`orginType: ${cF(gitConfig.scope, 'cfMAGENTA')}`);
    lg(`key: ${cF(gitConfig.variable.key, 'cfCYAN')}`);
    lg(`value: ${cF(gitConfig.variable.value, 'cfCYAN')}`);
    lg();
}

export const pr_stash = (gitStash: GitStash) => {
    lg(cF(`sha ${gitStash.sha}`, 'cfYELLOW'));
    lg(`${gitStash.indexName}`, cF(`${gitStash.message}`, 'cfGREEN'));
    lg();
}

export const pr_log_commit = (gitLog: GitLog) => {
    lgN();
    lg(cF(`commit ${gitLog.sha}`, 'cfYELLOW'));
    lg(`Author: ${gitLog.authorName} <${gitLog.authorEmail}>`);
    lg(`Date: ${gitLog.date}`);
    lg(`Files: ${gitLog.fileChanged}`)
    lg(`Lines: ${cF(`+L${gitLog.insertion}`, 'cfGREEN')} ${cF(`-L${gitLog.deletion}`, 'cfRED')}`)
    lg("\n    " + gitLog.message);

    gitLog.files.forEach(pr_log_files);

    gitLog.files.forEach((file) =>
        file.hunks.forEach((hunks) =>
            pr_log_hunks(hunks, file)
        )
    );
    lg();
}

export const pr_repo = (repo: Repository) => {
    lg(cF(`Workdir: ${repo.workdir()}`, 'cfMAGENTA'));
    lg(cF(`RepoPath: ${repo.path()}`, 'cfMAGENTA'));
    // lg(`Common ${repo.commondir()}`);
    lg();
}

export const pr_repo_users_commit_count = (gitUsersCommitLength: GitRepoUserCommitCount) => {
    lg(cF(`${gitUsersCommitLength.commits}`.padStart(6, ' '), 'cfMAGENTA'), ':', cF(`${gitUsersCommitLength.authorName}`, 'cfGREEN'));
}

export const pr_repo_files = (gitRepoFilePath: GitRepoFilePath) => {
    lg(gitRepoFilePath);
}

export const pr_repo_grep = (gitRepoGrep: GitRepoGrep, pattern: string) => {
    lg(
        cF(`${gitRepoGrep.filePath}`, 'cfCYAN'),
        cF(`${gitRepoGrep.lineno.padStart(5, ' ')}:`, 'cfGREEN'),
        gitRepoGrep.line.replace(pattern, cF(`${pattern}`, 'cfYELLOW')),
    );
}

export const pr_repo_file_size = (gitRepoFileSize: GitRepoFileSize) => {
    lg(
        cF(`${gitRepoFileSize.size.padStart(8, ' ')}`, 'cfCYAN'),
        cF(`${gitRepoFileSize.filePath}`, 'cfGREEN'),
    );
}

export const pr_repo_unpack = (gitRepoUnpack: GitRepoUnpack) => {
    for (const [key, value] of Object.entries(gitRepoUnpack)) {
        lg(cF(`${value.toString().padStart(6, ' ')}`, 'cfCYAN'), `: ${key}`);
    };
}

export const pr_repo_parent_branches = (gitRepoAncestorBranches: GitRepoAncestors) => {
    lg(cF(`${gitRepoAncestorBranches.ref} ${gitRepoAncestorBranches.sha}`, 'cfYELLOW'));
    gitRepoAncestorBranches.ancestors.forEach((ancestor) => {
        lg(`  ${ancestor.ref} ${ancestor.sha}`)
    })
    lg(); 
}


// fill Space to the right
const sR = (str: string, len: number = 20, max: number = 5, prDiff: boolean = false) => {
    const diff = Math.max(max, (len - str.length));

    prDiff && lg('diff', max, len, str.length, (len - str.length));
    return `${str}${new Array(diff + 1).join(' ')}`;
}

type Colors =
    | 'cfBLACK'
    | 'cfRED'
    | 'cfGREEN'
    | 'cfYELLOW'
    | 'cfBLUE'
    | 'cfMAGENTA'
    | 'cfCYAN'
    | 'cfWHITE'
    | 'cbRED'
    | 'cbGREEN'
    | 'cbYELLOW'
    | 'cbBLUE'
    | 'cbMAGENTA'
    | 'cbCYAN'
    | 'cbWHITE'

const Colors: { [key in Colors]: string } = {
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
}

export const cF = (str: string, color: Colors) => {
    const cEND = '\x1b[0m';

    return `${Colors[color]}${str}${cEND}`
}