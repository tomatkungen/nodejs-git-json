import { git_status } from './src/public/git_status';
import { lg } from './src/util/pr_lg';
// import { git_log } from './src/public/git_log';
// import { git_reference } from './src/public/git_reference';

(async () => {

    const status = await git_status('./', false);
    lg('status', status);
    
    // const log = await git_log();
    // lg('log', log);

    // const refs = await git_reference();
    // lg('refs', refs);

})()
