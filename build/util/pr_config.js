"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isStdPrgOut = exports.isStdOut = void 0;
const isStdOut = (config) => ((('stdPrgOut' in config && !config.stdPrgOut) ||
    !('stdPrgOut' in config)) &&
    'stdOut' in config && config.stdOut);
exports.isStdOut = isStdOut;
const isStdPrgOut = (config) => ((('stdOut' in config && !config.stdOut) ||
    !('stdOut' in config)) &&
    'stdPrgOut' in config && config.stdPrgOut);
exports.isStdPrgOut = isStdPrgOut;
