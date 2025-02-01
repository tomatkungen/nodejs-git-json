import { git_exec } from "../private/git_exec";
import { git_repo } from "../private/git_repo";
import { CONFIG, Config } from "../types/config.types";
import { GitUserRef, GitUsersRefs } from "../types/git_types";
import { isStdOut, isStdPrgOut } from "../util/pr_config";
import { pr_users_refs } from "../util/pr_lg";
import { pr_lg_prg } from "../util/pr_lg_prg";

// https://github.com/git/git/blob/v2.17.0/ref-filter.c#L328

export const git_users_refs = async (path: string = './', config: Config = CONFIG): Promise<GitUsersRefs> => {

    // Get Repository
    const repo = await git_repo(path, config);

    // git for-each-ref --format='%(authorname),%(authoremail),%(committername),%(committeremail),%(refname:short),%(objecttype),%(objectname:short),%(subject),%(taggername),%(taggeremail)'
    const formatArg = "--format='%(authorname),%(authoremail),%(committername),%(committeremail),%(refname:short),%(objecttype),%(objectname:short),%(subject),%(taggername),%(taggeremail)'";
    const stdout = await git_exec(repo.workdir(), 'git', 'for-each-ref', formatArg);

    // Empty shortlog
    if (stdout === '')
        return [];

    // Get lines
    const lines = stdout.trim().split('\n');

    // No for-each-ref in repo
    if (lines.length === 0)
        return [];

    const gitUserRefs = lines.reduce<GitUsersRefs>((prev, line, index) => {
        isStdPrgOut(config) && pr_lg_prg(lines.length, index + 1, 'User refs');

        const [
            authorName, authorEmail,
            committerName, committerEmail,
            refName, objectType, // commit, tag, tree, blob
            objectName, subject,
            taggerName, taggerEmail
        ] = line.split(',');

        const gitUserRef: GitUserRef = {
            authorName: authorName.replace(/'/g, ''),
            authorEmail: authorEmail.replace(/</g, '').replace(/>/g, ''),
            committerName,
            committerEmail: committerEmail.replace(/</g, '').replace(/>/g, ''),
            taggerName: taggerName.replace(/</g, '').replace(/>/g, ''),
            taggerEmail: taggerEmail.replace(/'/g, '').replace(/</g, '').replace(/>/g, ''),
            totalCommits: 0,
            totalTags: 0,
            totalTrees: 0,
            totalBlobs: 0,
            refs: [{
                refName,
                objectType, // commit, tag, tree, blob
                objectName,
                subject,
            }]
        }

        // Check if already exist
        const gitAuthorIndex = gitUser(prev, gitUserRef);

        // Add git user refs
        gitUserRefsAdd(gitAuthorIndex, gitUserRef, prev);

        return prev;
    }, [])

    isStdOut(config) && gitUserRefs.forEach(pr_users_refs);

    return gitUserRefs;
};

const gitUser = (
    gitAuthorsStore: GitUsersRefs,
    gitUserRef: GitUserRef,
): number => {
    const compare = (a: string, b: string) => {
        return a !== "" && b.toLowerCase().includes(a.toLowerCase());
    }

    const res = gitAuthorsStore.findIndex((gitAuthorStore) => {

        const authorExist =
            compare(gitUserRef.authorName, gitUserRef.authorName) &&
            compare(gitUserRef.authorEmail, gitAuthorStore.authorEmail);

        const committerExist =
            compare(gitUserRef.committerName, gitAuthorStore.committerName) &&
            compare(gitUserRef.committerEmail, gitAuthorStore.committerEmail);

        const taggerExist =
            compare(gitUserRef.taggerName, gitAuthorStore.taggerName) &&
            compare(gitUserRef.taggerEmail, gitAuthorStore.taggerEmail);

        const taggerAuthorExist =
            compare(gitUserRef.taggerName, gitAuthorStore.authorName) &&
            compare(gitUserRef.taggerEmail, gitAuthorStore.authorEmail);

        const authorTaggerExist =
            compare(gitUserRef.authorName, gitAuthorStore.taggerName) &&
            compare(gitUserRef.authorEmail, gitAuthorStore.taggerEmail);

        const committerTaggerExist = 
            compare(gitUserRef.committerName, gitAuthorStore.taggerName) &&
            compare(gitUserRef.committerEmail, gitAuthorStore.taggerEmail);

        return authorExist || committerExist || taggerExist || taggerAuthorExist || authorTaggerExist || committerTaggerExist;
    })

    return res;
}

const gitUserRefsAdd = (
    gitAuthorIndex: number,
    gitUserRef: GitUserRef,
    prev: GitUsersRefs,
) => {
    const objectType = gitUserRef.refs[0].objectType.toLowerCase();
    const taggerName = gitUserRef.taggerName;
    const taggerEmail = gitUserRef.taggerEmail;
    const authorName = gitUserRef.authorName;
    const authorEmail = gitUserRef.authorEmail;
    const committerName = gitUserRef.committerName;
    const committerEmail = gitUserRef.committerEmail;

    // Add new git user ref
    if (gitAuthorIndex === -1) {
        prev.push(gitUserRef)

        objectType === 'commit' && prev[prev.length - 1].totalCommits++;
        objectType === 'tag' && prev[prev.length - 1].totalTags++;
        objectType === 'tree' && prev[prev.length - 1].totalTrees++;
        objectType === 'blob' && prev[prev.length - 1].totalBlobs++;

        return;
    }

    const mergeRefs = (newValue: string, oldValue: string) => {

        if (oldValue === '') return newValue;

        return oldValue.includes(newValue) ? oldValue : oldValue += `, ${newValue}`;
    }

    // Append git user refs
    committerName !== '' && (
        prev[gitAuthorIndex].committerName = mergeRefs(committerName, prev[gitAuthorIndex].committerName)
    );

    committerEmail !== '' && (
        prev[gitAuthorIndex].committerEmail = mergeRefs(committerEmail, prev[gitAuthorIndex].committerEmail)
    );

    authorName !== '' && (
        prev[gitAuthorIndex].authorName = mergeRefs(authorName, prev[gitAuthorIndex].authorName)
    );

    authorEmail !== '' && (
        prev[gitAuthorIndex].authorEmail = mergeRefs(authorEmail, prev[gitAuthorIndex].authorEmail)
    );

    taggerEmail !== '' && (
        prev[gitAuthorIndex].taggerEmail = mergeRefs(taggerEmail, prev[gitAuthorIndex].taggerEmail)
    );

    taggerName !== '' && (
        prev[gitAuthorIndex].taggerName = mergeRefs(taggerName, prev[gitAuthorIndex].taggerName)
    );

    objectType === 'commit' && prev[gitAuthorIndex].totalCommits++;
    objectType === 'tag' && prev[gitAuthorIndex].totalTags++;
    objectType === 'tree' && prev[gitAuthorIndex].totalTrees++;
    objectType === 'blob' && prev[gitAuthorIndex].totalBlobs++;

    prev[gitAuthorIndex].refs.push(gitUserRef.refs[0]);
}