export declare const CONFIG: Config;
export type Config = {
    stdOut: boolean;
} | {
    stdPrgOut: boolean;
} | {
    stdOut: boolean;
    stdPrgOut: boolean;
};
export type ConfigServer = {
    host: string;
    port: number;
};
