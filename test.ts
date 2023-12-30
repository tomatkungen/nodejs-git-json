import { Reference } from 'nodegit';
import { git_status } from './src/git-status';
import { git_log } from './src/git_log';
import { git_refs } from './src/git_refs';
import { git_repo } from './src/git_repo';
import { lg } from './src/pr_lg';

(async () => {

    const status = await git_status();
    // lg('status', status);
    
    //const log = await git_log();
    // lg('log', log);

    // const refs = await git_refs();
    // lg('refs', refs);

})()
