"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.git_status = exports.git_reference = exports.git_log = exports.git_log_short = void 0;
const git_log_short_1 = require("./public/git_log_short");
Object.defineProperty(exports, "git_log_short", { enumerable: true, get: function () { return git_log_short_1.git_log_short; } });
const git_log_1 = require("./public/git_log");
Object.defineProperty(exports, "git_log", { enumerable: true, get: function () { return git_log_1.git_log; } });
const git_reference_1 = require("./public/git_reference");
Object.defineProperty(exports, "git_reference", { enumerable: true, get: function () { return git_reference_1.git_reference; } });
const git_status_1 = require("./public/git_status");
Object.defineProperty(exports, "git_status", { enumerable: true, get: function () { return git_status_1.git_status; } });
const pr_lg_1 = require("./util/pr_lg");
(() => {
    (0, pr_lg_1.lg)('nodejs-git-json');
})();
