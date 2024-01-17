# nodejs git json

It is based on [nodegit](https://github.com/nodegit/nodegit) v0.28.0-alpha.1

Nodejs-git-json is a NPM module library that can output json from git repository.

## Installation

```shell
# npm
npm i nodejs-git-json

#Yarn
yarn add nodejs-git-json
```

## Commands

```typescript 
    // Alias
    git_status(path: string = './', stdOut: boolean = false): Promise<GitStatuses>
    git_log(path: string = './', stdOut: boolean = false): Promise<GitLogs>
    git_reference(path?: string, stdOut?: boolean = false): Promise<GitRefs>

```

## Usage

```typescript
main.ts

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