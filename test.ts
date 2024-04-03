// import { git_status } from './src/public/git_status';
// import { git_log_pagination } from './src/public/git_log_pagination';
// import { git_log_dates } from './src/public/git_log_dates';
// import { git_log_file } from './src/public/git_log_file';
import { git_log_folder } from './src/public/git_log_folder';
import { lg } from './src/util/pr_lg';
// import { git_log } from './src/public/git_log';
// import { git_log_commit } from './src/public/git_log_commit';
// import { git_configs } from './src/public/git_configs';
// import { git_log_short } from './src/public/git_log_short';
// import { git_users } from './src/public/git_users';
// import { git_reference } from './src/public/git_reference';
// import { git_stash } from './src/public/git_stash';

(async () => {

    // const users = await git_users('./', { stdOut: true, stdPrgOut: true});
    // lg('users', users);

    // const log = await git_log('./', { stdOut: true, stdPrgOut: false });
    // lg('\nlog', log);

    // const log_short = await git_log_short('./', { stdOut: true, stdPrgOut: false });
    // lg('\nlog_short', log_short);

    // const status = await git_status('./', { stdOut: true});
    // lg('status', status);

    // const refs = await git_reference('./', {stdOut: false, stdPrgOut: true});
    // lg('refs', refs);

    // const configs = await git_configs('./');
    // lg('\nconfigs',configs);

    // const stashes = await git_stash();
    // lg('stash', stashes);

    // const log_commit = await git_log_commit('./', '1fd0bbac46552d4ebbb4f582c01a9721d796be53', { stdOut: false });
    // lg(log_commit, log_commit.files);
    
    // const log_pagination = await git_log_pagination('./', { currentPage: 1, commitsPerPage: 20 }, {stdOut: true, stdPrgOut: false});
    // lg('log_pagination', log_pagination.length);
    
    // const log_dates = await git_log_dates('./', { sinceDate: '2024-02-29', untilDate: '2024-02-29'});
    // lg('log_dates', log_dates);

    // const log_file = await git_log_file('./', './src/index.ts');
    // lg('log_files', log_file);

    const log_folder = await git_log_folder('./', './build', { currentPage: 1, commitsPerPage: 10});
    lg('log_files', log_folder);
})()
