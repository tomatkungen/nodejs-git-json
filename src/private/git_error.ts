export const git_error = (message: string): Error => {
    const error = new Error(message);
    error.stack = "";
    return error;
}