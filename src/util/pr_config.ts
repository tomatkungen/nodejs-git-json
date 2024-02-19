import { Config } from "../types/config.types";

export const isStdOut = (config: Config): boolean => (
    (
        ('stdPrgOut' in config && !config.stdPrgOut) ||
        !('stdPrgOut' in config)
    ) &&
    'stdOut' in config && config.stdOut
);

export const isStdPrgOut = (config: Config): boolean => (
    (
        ('stdOut' in config && !config.stdOut) ||
        !('stdOut' in config)
    ) &&
    'stdPrgOut' in config && config.stdPrgOut
);
