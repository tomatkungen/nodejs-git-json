"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.git_exec = void 0;
const child_process_1 = require("child_process");
const git_exec = (workdir, ...command) => {
    let p = (0, child_process_1.spawn)(command[0], command.slice(1), { cwd: workdir, stdio: ['inherit', 'pipe', 'pipe'] });
    return new Promise((resolve, reject) => {
        const stdOut = [];
        p.stdout.on("data", (res) => {
            stdOut.push(res.toString());
        });
        p.stderr.on("data", () => {
            reject('');
        });
        p.on('close', () => {
            if (stdOut.length > 0)
                resolve(stdOut.join(''));
            resolve('');
        });
    });
};
exports.git_exec = git_exec;
