import { Commit, ConvenientPatch, Reference, StatusFile } from "nodegit";
import { GitRef, Gitstatus } from "./git-types";

export const lg = (...args: any[]) => {
    console.log(...args);
}

export const lgN = () => {
    lg('\n');
}

export const pr_commit = (commit: Commit) => {
    lgN();
    lg(cF(`commit ${commit.sha()}$`, 'cfYELLOW'));
    lg(`Author: ${commit.author().name()} <${commit.author().email()}>`);
    lg(`Date: ${commit.date().toISOString()}`);
    lg("\n    " + commit.message());
}

export const pr_status = (gitStatus: Gitstatus) => {

    lg(`${cF(gitStatus.path, 'cfGREEN')} <${cF(gitStatus.status.join(', '), 'cfCYAN')}> ${gitStatus.statusFile.join(',')}`)

}

export const pr_reference = (gitRef: GitRef) => {

    lg(cF(`sha: ${gitRef.sha}`, 'cfYELLOW'), cF(gitRef.status.join(', '), 'cfCYAN'));
    lg(`${gitRef.name}`);
    lg();
}
export const pr_patches = (patches: ConvenientPatch) => {
    const status: string[] = [];

    patches.isUnmodified()  && status.push('UNMODIFIED');
    patches.isAdded()       && status.push('ADDED');
    patches.isDeleted()     && status.push('DELETED');
    patches.isModified()    && status.push('MODIFIED');
    patches.isIgnored()     && status.push('IGNORED');
    patches.isTypeChange()  && status.push('TYPECHANGE');
    patches.isUnreadable()  && status.push('UNREADABLE');
    patches.isConflicted()  && status.push('CONFLICT');

    const fileSize = patches.newFile().size();
    const filePath = patches.newFile().path();
    const contextLines = patches.lineStats().total_context;
    const addedLines = patches.lineStats().total_additions;
    const deletedLines = patches.lineStats().total_deletions;

    const lineStats = `${contextLines}c ${cF(`+${addedLines}a`, 'cfGREEN')} ${cF(`-${deletedLines}d`, 'cfRED')}`;

    lg(`${sR(status.join(', '), 6, 2)}${cF(filePath, 'cfGREEN')} <${lineStats} ${cF(`${Math.round(fileSize) / 100}K`, 'cfCYAN')}> `)
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

const cF = (str: string, color: Colors) => {
    const cEND = '\x1b[0m';

    return `${Colors[color]}${str}${cEND}`
}