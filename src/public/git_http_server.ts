/*import * as http from 'http';
import { git_error } from '../private/git_error';
import { git_configs } from './git_configs';
import { git_log } from './git_log';
import { git_log_short } from './git_log_short';
import { git_reference } from './git_reference';
import { git_stash } from './git_stash';
import { git_status } from './git_status';
import { git_users } from './git_users';
import { git_log_commit } from './git_log_commit';
import { git_log_pagination } from './git_log_pagination';
import { git_log_dates } from './git_log_dates';
import { git_log_file } from './git_log_file';
import { git_log_folder } from './git_log_folder';
import { git_repo_commits_count } from './git_repo_commits_count';
import { git_repo_users_commit_count } from './git_repo_users_commit_count';
import { git_repo_files_count } from './git_repo_files_count';
import { git_repo_files } from './git_repo_files';
import { git_repo_statistics } from './git_repo_statistics';
import { git_repo_grep } from './git_repo_grep';
import { git_repo_files_size } from './git_repo_files_size';
import { git_repo_unpack } from './git_repo_unpack';
import { CONFIG, Config, ConfigServer } from '../types/config.types';
import { lg } from './../util/pr_lg';
import { GitLogDates, GitLogPagination } from '../types/git_types';

const PORT = 8080;
const HOST = 'localhost';

type ROUTES =
    | 'git-log-short'
    | 'git-log'
    | 'git-status'
    | 'git-reference'
    | 'git-users'
    | 'git-configs'
    | 'git-stash'
    | 'git-log-commit'
    | 'git-log-pagination'
    | 'git-log-dates'
    | 'git-log-file'
    | 'git-log-folder'
    | 'git-repo-commits-count'
    | 'git-repo-users-commit-count'
    | 'git-repo-files-count'
    | 'git-repo-files'
    | 'git-repo-statistics'
    | 'git-repo-grep'
    | 'git-repo-files-size'
    | 'git-repo-unpack'

export const git_http_server = (
    path: string = './',
    config: ConfigServer = { host: HOST, port: PORT }
) => {
    http.createServer(async (req, res) => {

        const url = req.url;
        lg(`> ${req.method} ${req.url}`)

        // Check Request
        if (isInValidRequest(req)) {
            const error = git_error(`Invalid Route ${req.method} ${url} Error`);
            error.name = "Route";

            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                name: error.name,
                message: error.message
            }));

            return;
        }

        // Check headers
        if (hasInValidHeaders(req.headers)) {
            console.log(path);
        }

        assertString(url);

        const gitMethodRoute = url.replace(/\//g, '').trim().replace(/_/g, '-') as ROUTES;

        console.log(await invokeGitMethod(gitMethodRoute));

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(
            { done: 'done' }
        ));

    }).listen(config.port, config.host)
}

const invokeGitMethod = async (
    method: ROUTES,
    args: {
        path: string,
        gitLogPagination: GitLogPagination,
        sha: string;
        gitLogDates: GitLogDates,
        filePath: string,
        config?: Config,
        folderPath: string,
        pattern: string,
        pathspec?: string
    } = {
            path: './',
            gitLogPagination: {
                commitsPerPage: 20,
                currentPage: 0
            },
            sha: '',
            gitLogDates: {
                sinceDate: '2024-01-01',
                untilDate: '2024-01-01'
            },
            filePath: '',
            folderPath: './',
            pattern: '',
            config: CONFIG
        },
) => {
    switch (method) {
        case 'git-log-short': return git_log_short(args.path, args.config);
        case 'git-log': return git_log(args.path, args.config);
        case 'git-status': return git_status(args.path, args.config);
        case 'git-reference': return git_reference(args.path, args.config);
        case 'git-users': return git_users(args.path, args.config);
        case 'git-configs': return git_configs(args.path, args.config);
        case 'git-stash': return git_stash(args.path, args.config);

        // Helpers
        case 'git-log-commit': return git_log_commit(args.path, args.sha, args.config);
        case 'git-log-pagination': return git_log_pagination(args.path, args.gitLogPagination, args.config);
        case 'git-log-dates': return git_log_dates(args.path, args.gitLogDates, args.config);
        case 'git-log-file': return git_log_file(args.path, args.filePath, args.config);
        case 'git-log-folder': return git_log_folder(args.path, args.folderPath, args.gitLogPagination, args.config);

        // Repo
        case 'git-repo-commits-count': return git_repo_commits_count(args.path, args.config);
        case 'git-repo-users-commit-count': return git_repo_users_commit_count(args.path, args.config);
        case 'git-repo-files-count': return git_repo_files_count(args.path, args.config);
        case 'git-repo-files': return git_repo_files(args.path, args.config);
        case 'git-repo-statistics': return git_repo_statistics(args.path, args.config);
        case 'git-repo-grep': return git_repo_grep(args.path, args.pattern, args.pathspec, args.config);
        case 'git-repo-files-size': return git_repo_files_size(args.path, args.config);
        case 'git-repo-unpack': return git_repo_unpack(args.path, args.config);

    }
}

const hasInValidHeaders = (headers: http.IncomingHttpHeaders): boolean => {
    console.log(headers);

    return true;
}

const isInValidRequest = (req: http.IncomingMessage): boolean => {
    return (
        !req.url ||
        req.method !== 'POST' ||
        (typeof req.url === 'string' && req.url.split('/').length !== 2) ||
        (!includesInRoutes(req))
    )
}

const includesInRoutes = (req: http.IncomingMessage): boolean => (
    !!(
        req.url &&
        Object.keys(ROUTES).includes(req.url.replace('/', ''))
    )
)

function assertString(value: unknown): asserts value is string {
    if (typeof value !== "string") throw new Error("Not a string")
}

*/