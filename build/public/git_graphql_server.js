"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.git_http_server = void 0;
const http = __importStar(require("http"));
const graphql_1 = require("graphql");
const git_error_1 = require("../private/git_error");
const git_configs_1 = require("./git_configs");
const git_log_1 = require("./git_log");
const git_log_short_1 = require("./git_log_short");
const git_reference_1 = require("./git_reference");
const git_stash_1 = require("./git_stash");
const git_status_1 = require("./git_status");
const git_users_1 = require("./git_users");
const git_log_commit_1 = require("./git_log_commit");
const git_log_pagination_1 = require("./git_log_pagination");
const git_log_dates_1 = require("./git_log_dates");
const git_log_file_1 = require("./git_log_file");
const git_log_folder_1 = require("./git_log_folder");
const git_repo_commits_count_1 = require("./git_repo_commits_count");
const git_repo_users_commit_count_1 = require("./git_repo_users_commit_count");
const git_repo_files_count_1 = require("./git_repo_files_count");
const git_repo_files_1 = require("./git_repo_files");
const git_repo_statistics_1 = require("./git_repo_statistics");
const git_repo_grep_1 = require("./git_repo_grep");
const git_repo_files_size_1 = require("./git_repo_files_size");
const git_repo_unpack_1 = require("./git_repo_unpack");
const schema = (0, graphql_1.buildSchema)(`
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
    git_log_short: git_log_short_1.git_log_short,
    git_log: git_log_1.git_log,
    git_status: git_status_1.git_status,
    git_reference: git_reference_1.git_reference,
    git_users: git_users_1.git_users,
    git_configs: git_configs_1.git_configs,
    git_stash: git_stash_1.git_stash,
    git_log_commit: git_log_commit_1.git_log_commit,
    git_log_pagination: git_log_pagination_1.git_log_pagination,
    git_log_dates: git_log_dates_1.git_log_dates,
    git_log_file: git_log_file_1.git_log_file,
    git_log_folder: git_log_folder_1.git_log_folder,
    git_repo_commits_count: git_repo_commits_count_1.git_repo_commits_count,
    git_repo_users_commit_count: git_repo_users_commit_count_1.git_repo_users_commit_count,
    git_repo_files_count: git_repo_files_count_1.git_repo_files_count,
    git_repo_files: git_repo_files_1.git_repo_files,
    git_repo_statistics: git_repo_statistics_1.git_repo_statistics,
    git_repo_grep: git_repo_grep_1.git_repo_grep,
    git_repo_files_size: git_repo_files_size_1.git_repo_files_size,
    git_repo_unpack: git_repo_unpack_1.git_repo_unpack,
};
const PORT = 8080;
const HOST = 'localhost';
const git_http_server = (config = { host: HOST, port: PORT }) => {
    http.createServer((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        if (isInValidRequest(req)) {
            const url = req.url;
            const error = (0, git_error_1.git_error)(`Invalid Route ${req.method} ${url} Error`);
            error.name = "Route";
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                message: error.message
            }));
            return;
        }
        const { operationName, query, variables, message } = yield getRequestBody(req);
        if (message) {
            const error = (0, git_error_1.git_error)(message);
            error.name = "Body";
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                errors: [message]
            }));
        }
        (0, graphql_1.graphql)({
            schema,
            source: query,
            rootValue,
            operationName,
            variableValues: variables,
        });
    })).listen(config.port, config.host);
};
exports.git_http_server = git_http_server;
const getRequestBody = (req) => {
    return new Promise((resolve, reject) => {
        const body = [];
        req
            .on('data', (chunk) => {
            body.push(chunk);
        })
            .on('end', () => {
            try {
                const bodyJson = JSON.parse(Buffer.concat(body).toString());
                resolve(bodyJson);
            }
            catch (e) {
                const error = (0, git_error_1.git_error)(`Invalid Body`);
                reject({
                    message: error.message
                });
            }
        });
    });
};
const isInValidRequest = (req) => (!req.url ||
    req.method !== 'POST');
