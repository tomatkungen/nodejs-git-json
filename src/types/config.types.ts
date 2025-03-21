export const CONFIG: Config = {
    stdOut: false,
    stdPrgOut: false
}

export type Config = {
    stdOut: boolean;
} | {
    stdPrgOut: boolean;
} | {
    stdOut: boolean;
    stdPrgOut: boolean;
}

export type ConfigServer = {
    host: string;
    port: number;
}
