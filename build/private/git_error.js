"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.git_error = void 0;
const git_error = (message) => {
    const error = new Error(message);
    error.stack = "";
    return error;
};
exports.git_error = git_error;
