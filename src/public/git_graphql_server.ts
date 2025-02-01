/*import * as http from 'http';
import { graphql, buildSchema } from "graphql";
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
import { ConfigServer } from '../types/config.types';

export interface RequestParams {
    operationName?: string | null | undefined;
    query: string;
    variables?: Record<string, unknown> | null | undefined;
    extensions?: Record<string, unknown> | null | undefined;
}

const schema = buildSchema(`
    type Config {
        stdOut: Boolean!
        stdPrgOut: Boolean!
    }

    type GitLogPagination {
        commitsPerPage: Int!
        currentPage: Int!
    }

    type GitLogDates {
        sinceDate: String!
        untilDate: String!
    }

    type GitLogsShort {
        test: String!
    }

    type GitLogs {
        test: String!
    }

    type GitStatuses {
        test: String!
    }

    type GitRefs {
        test: String!
    }

    type GitUsers{
        test: String!
    }

    type GitConfigs{
        test: String!
    }

    type GitStashes{
        test: String!
    }

    type GitLog{
        test: String!
    }

    type GitRepoUsersCommitCount{
        test: String!
    }

    type GitRepoFilePaths{
        test: String!
    }

    type GitRepoStatistics{
        test: String!
    }

    type GitRepoGreps{
        test: String!
    }

    type GitRepoFilesSize{
        test: String!
    }

    type GitRepoUnpack{
        test: String!
    }

    type Query {
        git_log_short(path: String, config: Config): GitLogsShort!
        git_log(path: String, config: Config): GitLogs!
        git_status(path: String, config: Config): GitStatuses!
        git_reference(path: String, config: Config): GitRefs!
        git_users(path: String, config: Config): GitUsers!
        git_configs(path: String, config: Config): GitConfigs!
        git_stash(path: String, config: Config): GitStashes!
        git_log_commit(path: String, sha: String!, config: Config): GitLog!
        git_log_pagination(path: String, gitLogPagination: GitLogPagination!, config: Config): GitLogs!
        git_log_dates(path: String, gitLogDates: GitLogDates, config: Config): GitLogs!
        git_log_file(path: String, filePath: String!, config: Config): GitLogs!
        git_log_folder(path: String, folderPath: String!, config: Config): GitLogs!
        git_repo_commits_count(path: String, config: Config): Int!
        git_repo_users_commit_count(path: String, config: Config): GitRepoUsersCommitCount!
        git_repo_files_count(path: String, config: Config): Int!
        git_repo_files(path: String, config: Config): GitRepoFilePaths!
        git_repo_statistics(path: String, config: Config): GitRepoStatistics!
        git_repo_grep(path: String, pattern: String!, pathspec: String, config: Config): GitRepoGreps!
        git_repo_files_size(path: String, config: Config): GitRepoFilesSize!
        git_repo_unpack(path: String, config: Config): GitRepoUnpack!
    }
`);

const rootValue = {
    // Alias
    git_log_short,
    git_log,
    git_status,
    git_reference,
    git_users,
    git_configs,
    git_stash,

    // Helpers
    git_log_commit,
    git_log_pagination,
    git_log_dates,
    git_log_file,
    git_log_folder,

    // Repo
    git_repo_commits_count,
    git_repo_users_commit_count,
    git_repo_files_count,
    git_repo_files,
    git_repo_statistics,
    git_repo_grep,
    git_repo_files_size,
    git_repo_unpack,
};

const PORT = 8080;
const HOST = 'localhost';

export const git_http_server = (
    config: ConfigServer = { host: HOST, port: PORT }
) => {
    http.createServer(async (req, res) => {

        if (isInValidRequest(req)) {
            const url = req.url;
            const error = git_error(`Invalid Route ${req.method} ${url} Error`);

            error.name = "Route";

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                message: error.message
            }));

            return;
        }

        const {
            operationName,
            query,
            variables,
            message
        } = await getRequestBody(req);

        if (message) { // error
            const error = git_error(message);

            error.name = "Body";

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                errors: [message]
            }));
        }

        graphql({
            schema,
            source: query,
            rootValue,
            operationName,
            variableValues: variables,
        })


    }).listen(config.port, config.host);
}

const getRequestBody = (req: http.IncomingMessage): Promise<RequestParams & { message?: string }> => {
    return new Promise((resolve, reject) => {
        const body: any[] = [];

        req
            .on('data', (chunk) => {
                body.push(chunk);
            })
            .on('end', () => {
                try {
                    const bodyJson = JSON.parse(
                        Buffer.concat(body).toString()
                    );

                    resolve(bodyJson);
                } catch (e) {
                    const error = git_error(`Invalid Body`);

                    reject({
                        message: error.message
                    });
                }
            });


    })
}

const isInValidRequest = (req: http.IncomingMessage): boolean => (
    !req.url ||
    req.method !== 'POST'
)
*/