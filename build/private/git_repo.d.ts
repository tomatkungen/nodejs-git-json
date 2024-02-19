import { Repository } from 'nodegit';
import { Config } from '../types/config.types';
export declare const git_repo: (path?: string, config?: Config) => Promise<Repository>;
