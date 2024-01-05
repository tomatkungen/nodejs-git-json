import { Commit, ConvenientPatch, Reference, StatusFile } from "nodegit";
import { GitCommitFile, GitCommitFiles, GitLog, GitRef, Gitstatus } from "./git-types";

export const lg = (...args: any[]) => {
    console.log(...args);
}

export const lgN = () => {
    lg('\n');
}

export const pr_log = (gitLog: GitLog) => {
    lgN();
    lg(cF(`commit ${gitLog.sha}`, 'cfYELLOW'));
    lg(`Author: ${gitLog.authorName} <${gitLog.authorEmail}>`);
    lg(`Date: ${gitLog.date}`);
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

    const lineStats = `${contextLines}c ${cF(`+${addedLines}a`, 'cfGREEN')} ${cF(`-${deletedLines}d`, 'cfRED')}`;

    lg(`${sR(gitCommitFile.status.join(', '), 6, 2)}${cF(filePath, 'cfGREEN')} <${lineStats} ${cF(`${Math.round(fileSize) / 100}K`, 'cfCYAN')}> `)
}

export const pr_status = (gitStatus: Gitstatus) => {

    lg(`${cF(gitStatus.path, 'cfGREEN')} <${cF(gitStatus.status.join(', '), 'cfCYAN')}> ${gitStatus.statusFile.join(',')}`)

}

export const pr_reference = (gitRef: GitRef) => {

    lg(cF(`sha: ${gitRef.sha}`, 'cfYELLOW'), cF(gitRef.status.join(', '), 'cfCYAN'));
    lg(`${gitRef.name}`);
    lg();

}

// fill Space to the right
const sR = (str: string, len: number = 20, max: number = 5, prDiff: boolean = false) => {
    const diff = Math.max(max, (len - str.length));

    prDiff && lg('diff',max, len, str.length, (len - str.length));
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

const Colors: { [key in Colors]: string } ={
    cfBLACK : '\x1b[30m',
    cfRED   : '\x1b[31m',
    cfGREEN : '\x1b[32m',
    cfYELLOW : '\x1b[33m',
    cfBLUE  : '\x1b[34m',
    cfMAGENTA : '\x1b[35m',
    cfCYAN  : '\x1b[36m',
    cfWHITE : '\x1b[37m',
    cbRED   : '\x1b[41m',
    cbGREEN : '\x1b[42m',
    cbYELLOW : '\x1b[43m',
    cbBLUE  : '\x1b[44m',
    cbMAGENTA : '\x1b[45m',
    cbCYAN  : '\x1b[46m',
    cbWHITE : '\x1b[47m',
}

export const cF = (str: string, color: Colors) => {
    const cEND = '\x1b[0m';

    return `${Colors[color]}${str}${cEND}`
}