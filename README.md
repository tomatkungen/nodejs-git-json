# nodejs git json

It is based on [nodegit](https://github.com/nodegit/nodegit) v0.28.0-alpha.1

Nodejs-git-json is a NPM module library that can output json from git repository.

# Prerequisites

[NodeJS](https://nodejs.org/en/about/previous-releases) >= v18.6.0

## Installation

```shell
# It takes a while to download and build nodegit when installing!

# npm
npm i nodejs-git-json

#Yarn
yarn add nodejs-git-json

```

## Usage

```typescript
// main.ts

import {
    git_log_short,  // Fast
    git_log,        // Slow
    git_status,
    git_reference,
    git_users,      // Fast
    git_configs,
    git_stash
} from 'nodejs-git-json';

(async () => {
    const log_short = await git_log_short('./my-path/git/git-nodejs-git-json/');
    const log       = await git_log('/my-path/git/git-nodejs-git-json/');
    const status    = await git_status('/my-path/git/git-nodejs-git-json/');
    const reference = await git_reference('/my-path/git/git-nodejs-git-json/');
    const users     = await git_users('/my-path/git/git-nodejs-git-json/');
    const configs   = await git_configs('/my-path/git/git-nodejs-git-json/');
    const gitStashes= await git_stash('/my-path/git/git-nodejs-git-json/');

    // log json object equal to "git log"
    console.log(log_short);

    // log json object equal to "git log --shortstat"
    console.log(log);

    // log json object equal to "git status"
    console.log(status);

    // log json object equal to "git tag" "git branch -r"
    console.log(reference);

    // log json object equal to "git shortlog --summary --numbered --email"
    console.log(users);

    // log json object equal to "git config --list --show-scope --show-origin"
    console.log(configs);

    // log json object equal to "git stash list"
    console.log(gitStashes);
}()
```

## Commands

```typescript
    // Alias
    git_log_short(path: string = './', stdOut: boolean = false): Promise<GitLogsShort>  // Fast
    git_log(path: string = './', stdOut: boolean = false): Promise<GitLogs>             // Slow
    git_status(path: string = './', stdOut: boolean = false): Promise<GitStatuses>
    git_reference(path: string = './', stdOut: boolean = false): Promise<GitRefs>
    git_users(path: string = './', stdOut: boolean = false): Promise<GitUsers>          // Middle
    git_configs(path: string = './', stdOut: boolean = false): Promise<GitConfigs>
    git_stash(path: string = './', stdOut: boolean = false): Promise<GitStashes>

    // @path string - Relative or absolute path for folder where git repository exist
    // @stdOut boolean - output print to the terminal or command prompt

```

### Types

#### GitLogsShort

```typescript
GitLogsShort = [
    {
        // Commit unique ID sha-1
        sha: string;
        // Commit date as ISO
        date: string;
        // Commit message
        message: string;
        // Commit signature author name
        authorName: string;
        // Commit signature author email
        authorEmail: string;
        // Commit committer name
        commiterName: string;
        // Commit commiter email
        commiterEmail: string;
        // Commit total number of insertions
    }
    ...
]
```

#### GitLogs

```typescript
GitLogs = [
    {
        // Commit unique ID sha-1
        sha: string;
        // Commit date as ISO
        date: string;
        // Commit message
        message: string;
        // Commit signature author name
        authorName: string;
        // Commit signature author email
        authorEmail: string;
        // Commit committer name
        commiterName: string;
        // Commit commiter email
        commiterEmail: string;
        // Commit total number of insertions
        insertion: number;
        // Commit total number of deletions
        deletion: number;
        // Commit total number of files changed
        fileChanged: number;
        // Committed files
        files: [
            {
                // Commit file relativ path from git repo
                newFilePath: string;
                // Commit file size
                newFileSize: number;
                // Commit file context
                contextLines: number;
                // Commit file added lines
                addedLines: number;
                // Commit deleted lines
                deletedLines: number;
                // Commit total insertion characters for every line
                insertion: number;
                // Commit total deletion characters for every line
                deletion: number;
                // Commmit - UNMODIFIED, ADDED, DELETED, MODIFIED, IGNORED, TYPECHANGE, UNREADABLE, CONFLICT
                status: string[];
            }
            ...
        ]
    }
    ...
]
```

#### GitStatuses

```typescript
 GitStatuses = [
    {
        // <relativ path from git repo>/filename ex: README.md, 'src/types/git_types.ts
        path: string;
        // NEW, MODIFIED, TYPECHANGE, RENAMED, IGNORED, WORKING-TREE, CONFLICT, DELETED, IGNORED
        status: string[];
        // WT_NEW, WT_MODIFIED, WT_DELETED, WT_TYPECHANGE, WT_RENAMED
        statusFile: string[];
    }
    ...
 ]
```

#### GitRefs

```typescript
GitRefs = [
    {
        // Commit unique ID sha-1
        sha: string;
        // BRANCH, HEAD, NOTE, REMOTE, TAG, SYMBOLIC, NOTVALID, STASH
        status: string[];
        // refs/heads/main, refs/tags/v1.0.6
        name: string;
    }
    ...
]
```

#### GitUsers

```typescript
GitUsers = [
    {
        // Commit signature author name
        authorName: string;
        // Commit signature author email
        authorEmail: string;
        // Commit total number of files changed
        totalCommits: number;
        // Commits unique ID sha-1
        commits: string[];
    }
    ...
]
```

#### GitConfigs

```typescript
GitConfigs = [
    {
        // worktree, local, global, system, command, unknown
        scope: string;
        // Config key and value
        variable: { key: string, value: string };
        // file path, ref, or blob id 
        originType: string;
    }
    ...
]
```

#### GitStash

```typescript
GitStash = [
    {
        // Stash index, index zero is refs/stash
        index: number;
        // Stash index name
        indexName: string;
        // Stash unique ID sha-1
        sha: string;
        // file path, ref, or blob id 
        message: string;
    }
    ...
]
```