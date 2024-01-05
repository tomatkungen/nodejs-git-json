"use strict";
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
exports.git_status = exports.git_reference = exports.git_log = void 0;
const git_log_1 = require("./public/git_log");
Object.defineProperty(exports, "git_log", { enumerable: true, get: function () { return git_log_1.git_log; } });
const git_reference_1 = require("./public/git_reference");
Object.defineProperty(exports, "git_reference", { enumerable: true, get: function () { return git_reference_1.git_reference; } });
const git_status_1 = require("./public/git-status");
Object.defineProperty(exports, "git_status", { enumerable: true, get: function () { return git_status_1.git_status; } });
const pr_lg_1 = require("./util/pr_lg");
(() => __awaiter(void 0, void 0, void 0, function* () {
    const status = yield (0, git_status_1.git_status)();
    (0, pr_lg_1.lg)('status', status);
}))();
