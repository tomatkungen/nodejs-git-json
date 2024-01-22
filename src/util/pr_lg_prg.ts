export const pr_lg_prg = (total: number, current: number, message: string = "") => {
    process.stdout.clearLine(-1);
    process.stdout.cursorTo(0); 
    process.stdout.write(`${message} ${current} of ${total}`);
}