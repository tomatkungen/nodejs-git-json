// import { git_status } from './src/public/git_status';
import { lg } from './src/util/pr_lg';
// import { git_log } from './src/public/git_log';
// import { git_log_short } from './src/public/git_log_short';
import { git_users } from './src/public/git_users';
// import { git_reference } from './src/public/git_reference';

(async () => {

    // const users = await git_users('/Users/kimkarlsson/source/material-ui');
    const users = await git_users('./', true);
    lg('users', users);

    // const log_short = await git_log_short();
    // lg('\nlog_short', log_short);

    // const status = await git_status('./', false);
    // lg('status', status);

    // const log = await git_log();
    // lg('log', log);

    // const refs = await git_reference();
    // lg('refs', refs);

})()
