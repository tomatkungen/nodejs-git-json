import { ConfigServer } from '../types/config.types';
export interface RequestParams {
    operationName?: string | null | undefined;
    query: string;
    variables?: Record<string, unknown> | null | undefined;
    extensions?: Record<string, unknown> | null | undefined;
}
export declare const git_http_server: (config?: ConfigServer) => void;
