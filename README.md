# nodejs git json

It is based on [nodegit](https://github.com/nodegit/nodegit) v0.28.0-alpha.22

Nodejs-git-json is a NPM module library that can output json from git repository.

* nodejs-git-json v1.0.14 using Nodegit v0.28.0-alpha.1
* nodejs-git-json v1.1.0  using Nodegit v0.28.0-alpha.22
* nodejs-git-json v1.6.0  using Nodegit v0.28.0-alpha.24

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

## Commands

```typescript
    // Alias
    git_log_short(path: string = './', config: Config = CONFIG): Promise<GitLogsShort>  // Fast
    git_log(path: string = './', config: Config = CONFIG): Promise<GitLogs>             // Slow
    git_status(path: string = './', config: Config = CONFIG): Promise<GitStatuses>
    git_reference(path: string = './', config: Config = CONFIG): Promise<GitRefs>
    git_users(path: string = './', config: Config = CONFIG): Promise<GitUsers>          // Middle
    git_configs(path: string = './', config: Config = CONFIG): Promise<GitConfigs>
    git_stash(path: string = './', config: Config = CONFIG): Promise<GitStashes>
    
    // helpers
    git_log_commit(path: string = './', sha: string, config: Config = CONFIG): Promise<GitLog>
    git_log_pagination(path: string = './', gitLogPagination: GitLogPagination, config: Config = CONFIG): Promise<GitLogs>
    git_log_dates(path: string = './', gitLogDates: GitLogDates, config: Config = CONFIG): Promise<GitLogs>
    git_log_file(path: string = './', filePath: string, config: Config = CONFIG): Promise<GitLogs>

    // @path string - Relative or absolute path for folder where git repository exist
    
    // @sha string - commit sha

    // @config Object - Config for std out in console
        // @stdOut boolean - Output print to the terminal or command prompt the data
        // @stdPrgOut boolean - Output print to the terminal or command prompt the progress
    
    // @gitLogPagination - Pagination commits
        // @commitsPerPage number - Total Commits
        // @currentPage number - Start check point

    // @gitLogDates - Between Dates
        // @sinceDate: DateFormat - Start date
        // @untilDate: DateFormat - End date

    // @filePath - relative file path
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
    git_stash,
    git_log_commit,
    log_pagination,
    git_log_dates,
    git_log_file
} from 'nodejs-git-json';

(async () => {
    const log_short = await git_log_short('./my-path/git/git-nodejs-git-json/');
    const log       = await git_log('/my-path/git/git-nodejs-git-json/');
    const status    = await git_status('/my-path/git/git-nodejs-git-json/');
    const reference = await git_reference('/my-path/git/git-nodejs-git-json/');
    const users     = await git_users('/my-path/git/git-nodejs-git-json/');
    const configs   = await git_configs('/my-path/git/git-nodejs-git-json/');
    const gitStashes= await git_stash('/my-path/git/git-nodejs-git-json/');
    const logCommit = await git_log_commit('/my-path/git/git-nodejs-git-json/', '4d50c3453db88189b979aec14d041a023b23b360');
    const log_pagination = await git_log_pagination('/my-path/git/git-nodejs-git-json/', { currentPage: 1, commitsPerPage: 20 });
    const log_dates = await git_log_dates('/my-path/git/git-nodejs-git-json/', { startDate: '2024-02-29', endDate: '2023-02-28'});
    const log_file  = await git_log_file('/my-path/git/git-nodejs-git-json/', './index.ts');

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

    // log json object equal to "git log -p <sha>"
    console.log(logCommit);

    // log json object equal to git log ??
    console.log(log_pagination);

    // log json object equal to git --no-pager log --since="2024-01-20 00:00:00" --until="2024-01-24 24:00:00" --format=%H
    console.log(log_dates);

    // log json object equal to "git log <filename>"
    console.log(log_file);
})()
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
                // Commmit - UNMODIFIED, ADDED, DELETED, MODIFIED, IGNORED, TYPECHANGE, UNREADABLE, CONFLICT
                status: string[];
                // Commit hunks
                hunks: [
                    // Hunk header
                    header: string
                    // Hunk total insert tokens
                    insertTokens: number;
                    // Hunk totla deleted tokens 
                    deletionTokens: number;
                    lines: [
                        {
                            // Line orgin
                            origin: number;
                            // Line old line number
                            oldLineno: number;
                            // Line new line number
                            newLineno: number;
                            // Line type - CONTEXT, ADDITION, DELETION. CONTEXT_EOFNL. ADD_EOFNL, DEL_EOFNL. FILE_HDR, HUNK_HDR, BINARY
                            type: string;
                            // Line diff - '+', '-', ''
                            diffType: string;
                            // Line output
                            content: string;
                        }
                        ...
                    ]
                ]
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
GitLog = [
    {
        // Stash index, index zero is refs/stash
        index: number;
        // Stash index name
        indexName: string;
        // Stash unique ID sha-1
        sha: string;
        // Stash message
        message: string;
    }
    ...
]
```

#### GitLog

```typescript
GitLog = {
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
    files: [{
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
        // Commmit - UNMODIFIED, ADDED, DELETED, MODIFIED, IGNORED, TYPECHANGE, UNREADABLE, CONFLICT
        status: string[];
        // Commit hunks
        hunks: [
            // Hunk header
            header: string
            // Hunk total insert tokens
            insertTokens: number;
            // Hunk total deleted tokens 
            deletionTokens: number;
            lines: [{
                // Line orgin
                origin: number;
                // Line old line number
                oldLineno: number;
                // Line new line number
                newLineno: number;
                // Line type - CONTEXT, ADDITION, DELETION. CONTEXT_EOFNL. ADD_EOFNL, DEL_EOFNL. FILE_HDR, HUNK_HDR, BINARY
                type: string;
                // Line diff - '+', '-', ''
                diffType: string;
                // Line output
                content: string;
            }
            ...
            ]
        ]
    }
}
```