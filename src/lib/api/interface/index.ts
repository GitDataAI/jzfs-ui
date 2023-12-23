import { Branches } from "../Branches";

export interface LinkToPathParams {
    repoId: string;
    branchId: string;
    path: string;
    presign?: boolean;
}
export interface QueryParts {
    [key: string]: QueryParams;
}
export type QueryParams = string | number | boolean;
export interface _Response extends Response{
    text: () => Promise<string>;
}

export interface RequestData {
    [key: string]: any;
}
export interface Branch extends Branches {
    commit_id: string;
    id:string
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
export interface RepositoryParams {
    default_branch: string;
    id?:string;
    repoId?: string;
    name: string;
    StorageNamespace?: string;
    Description?: string;
    Head?: string;
    CreateID?: string;
    creation_date?: number;
    storage_namespace : string;
    timestamp?:string;
    operation_type?:string;
    operation_content?: string;
    operation?:React.ReactNode
    sample_data: boolean;
}
export type params = {
    amount: number;
    objects: string;
    prefixes: string
}
export interface apiResponse extends Response{
    message?:string;
}
export interface Upload {
    (
      repoId: string,
      branchId: string,
      path: string,
      fileObject: File,
      onProgressFn?: ((percentage: number) => void) | null
    ): Promise<void>;
  }
  
export interface UploadWithProgress {
    (url: string, file: File, method?: string, onProgress?: ((percentage: number) => void )| null, additionalHeaders?: AdditionalHeaders): Promise<{
      status: number;
      body: string;
      contentType: string | null;
      etag: string | null;
      contentMD5: string | null;
    }>;
  }
export interface  UserRegisterInfo{
    username:string;
    email:string;
    password:string;
    }
export interface Wip {
        /** @format uuid */
        ID?: string;
        Name?: string;
        CurrentTree?: string;
        BaseCommit?: string;
        /** @format uuid */
        RepositoryID?: string;
        /** @format int */
        State?: number;
        /** @format uuid */
        CreatorID?: string;
        /** @format date-time */
        CreatedAt?: string;
        /** @format date-time */
        UpdatedAt?: string;
      }
