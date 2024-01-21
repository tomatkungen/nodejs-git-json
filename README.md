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
    git_status,
    git_log,
    git_reference 
} from 'nodejs-git-json';

(async () => {
    const status    = await git_status('/my-path/git/git-nodejs-git-json/');
    const log       = await git_log('/my-path/git/git-nodejs-git-json/');
    const reference = await git_reference('/my-path/git/git-nodejs-git-json/');

    // log json object equal to "git status"
    console.log(status);

    // log json object equal to "git log"
    console.log(log);

    // log json object equal to "git tag" "git branch -r"
    console.log(reference);
}()
```

## Commands

```typescript 
    // Alias
    git_status(path: string = './', stdOut: boolean = false): Promise<GitStatuses>
    git_log(path: string = './', stdOut: boolean = false): Promise<GitLogs>
    git_reference(path: string = './', stdOut: boolean = false): Promise<GitRefs>

    // @path string - Relative or absolute path for folder where git repository exist
    // @stdOut boolean - output print to the terminal or command prompt

```

### Types

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
#### GitRefs
```typescript
GitRefs = [
    {
        // Commit unique ID sha-1
        sha: string;
        // BRANCH, HEAD, NOTE, REMOTE, TAG, SYMBOLIC, NOTVALID
        status: string[];
        // refs/heads/main, refs/tags/v1.0.6
        name: string;
    }
    ...
]
```