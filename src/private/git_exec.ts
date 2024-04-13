import { spawn } from "child_process";

export const git_exec = (workdir: string, ...command: string[]): Promise<string> => {
    let p = spawn(command[0], command.slice(1), { cwd: workdir, stdio: ['inherit', 'pipe', 'pipe'] });
    return new Promise((resolve, reject) => {
        const stdOut: string[] = [];

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
}