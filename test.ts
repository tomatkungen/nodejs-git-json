// import { git_status } from './src/public/git_status';
// import { git_log_pagination } from './src/public/git_log_pagination';
// import { git_log_dates } from './src/public/git_log_dates';
// import { git_log_file } from './src/public/git_log_file';
// import { git_log_folder } from './src/public/git_log_folder';
// import { git_repo_commits_count } from './src/public/git_repo_commits_count';
// import { git_repo_files } from './src/public/git_repo_files';
// import { git_repo_files_size } from './src/public/git_repo_files_size';
// import { git_repo_unpack } from './src/public/git_repo_unpack';
// import { git_repo_grep } from './src/public/git_repo_grep';
// import { git_repo_files_count } from './src/public/git_repo_files_count';
// import { git_repo_users_commit_count } from './src/public/git_repo_users_commit_count';
// import { git_repo_statistics } from './src/public/git_repo_statistics';
// import { git_http_server } from './src/public/git_graphql_server';
// import { git_repo_ancestors } from './src/public/git_repo_ancestors';
import { lg } from './src/util/pr_lg';
// import {git_http_server} from "./src/index";
// import { git_log } from './src/public/git_log';
// import { git_log_commit } from './src/public/git_log_commit';
// import { git_configs } from './src/public/git_configs';
// import { git_log_short } from './src/public/git_log_short';
// import { git_users } from './src/public/git_users';
// import { git_reference } from './src/public/git_reference';
// import { git_stash } from './src/public/git_stash';
// import { git_repo } from './src/private/git_repo';
// import { git_users_refs } from "./src/public/git_users_refs";
import { git_log_branch_commits } from './src/public/git_log_branch_commits';

(async () => {
    // const log_branch_commits =
    const log_branch_commits = await git_log_branch_commits('./../nodegit/nodegit/', { stdOut: true });
    lg(log_branch_commits);

    // const ancestors = await git_repo_ancestors('.', { stdOut: true, stdPrgOut: false });
    // lg(ancestors);

    // const user_refs = await git_users_refs('.', { stdOut: true, stdPrgOut: false });
    // lg(user_refs);

    // curl --header "Content-Type: application/json" --request POST --data '{"username":"xyz","password":"xyz"}' http://localhost:8080/git-log-short
    // git_http_server();
    // lg('start server');

    // const users = await git_users('.', { stdOut: true, stdPrgOut: true});
    // lg('users', users);

    // const log = await git_log('./', { stdOut: true, stdPrgOut: false });
    // lg('\nlog', log.length);

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

    // const log_folder = await git_log_folder('./', './build', { currentPage: 1, commitsPerPage: 10});
    // lg('log_files', log_folder);

    // const repo_log_commits_count = await git_repo_commits_count('./');
    // lg('repo_log_commits_length', repo_log_commits_count);

    // const repo_users_commit_count = await git_repo_users_commit_count('./');
    // lg('repo_users_commit_length', repo_users_commit_count);

    // const repo_files_length = await git_repo_files_count('./');
    // lg('repo_files_length', repo_files_length);

    // const repo_files = await git_repo_files('./')
    // lg('repo_files', repo_files.length);

    // const repo_statistics = await git_repo_statistics('./')
    // lg('repo_statistics', repo_statistics);

    // const repo_grep = await git_repo_grep('./', 'true', '*.js', {stdOut: true});
    // lg('repo_grep', repo_grep.length, repo_grep);

    // const repo_files_size = await git_repo_files_size('./', {stdOut: true});
    // lg('repo_files_size', repo_files_size);

    // const repo_unpack = await git_repo_unpack('./', {stdOut: true});
    // lg('rep_unpacks', repo_unpack);

    // const repo = await git_repo('./', { stdOut: true });
    // lg('repo', repo);
})()
