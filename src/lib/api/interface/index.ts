export interface LinkToPathParams {
    repoId: string;
    branchId: string;
    path: string;
    presign?: boolean;
}
export interface QueryParts {
    [key: string]: string | number | boolean;
}
export interface _Response extends Response{
    text: () => Promise<string>;
}
export interface RequestData {
    [key: string]: any;
}

export interface _Headers {
    [key: string]: string;
}
export interface ProgressEvent {
    loaded: number;
    total: number;
}

export interface AdditionalHeaders {
    [key: string]: string;
}
export interface ListRunsParams {
    repoId: string;
    branch?: string;
    commit?: string;
    after?: string;
    amount?: number;
}
export interface GetRunParams {
    repoId: string;
    runId: string;
}
export interface ListRunHooksParams {
    repoId: string;
    runId: string;
    after?: string;
    amount?: number;
}
export interface GetRunHookOutputParams {
    repoId: string;
    runId: string;
    hookRunId: string;
}
export interface StatsEvent {
    class: string;
    name: string;
    count: number;
}
export interface PostStatsEventsParams {
    statsEvents: StatsEvent[];
}