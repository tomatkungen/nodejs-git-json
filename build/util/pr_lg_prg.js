"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pr_lg_prg = void 0;
const pr_lg_prg = (total, current, message = "") => {
    process.stdout.clearLine(-1);
    process.stdout.cursorTo(0);
    process.stdout.write(`${message} ${current} of ${total}`);
};
exports.pr_lg_prg = pr_lg_prg;
