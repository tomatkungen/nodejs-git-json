import {git_log} from './public/git_log';
import {git_reference} from './public/git_reference';
import {git_status} from './public/git-status';
import { lg } from './util/pr_lg';

export {git_log, git_reference, git_status};

(async () => {

    const status = await git_status();
    lg('status', status);
    
    // const log = await git_log();
    // lg('log', log);

    // const refs = await git_reference();
    // lg('refs', refs);

})()