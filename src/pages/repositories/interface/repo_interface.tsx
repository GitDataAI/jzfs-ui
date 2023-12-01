
export type StorageConfigContextType = {
    warnings?: any[] | undefined;
    error: Error | null;
    loading: boolean;
    blockstore_namespace_ValidityRegex: string | null;
    blockstore_namespace_example: string | null;
    blockstore_type: string | null;
    default_namespace_prefix: string | null;
    import_support: boolean;
    import_validity_regex: string | null;
    pre_sign_support: boolean;
    pre_sign_support_ui: boolean;
  };
  export type Pair = {
    key: string,
    value: string;
  }
  export type UploadResult = {
    status: number;
    body: string;
    contentType: string | null;
    etag: string | null;
    contentMD5: string | null;
  }
  export interface ImportModalProps {
    config:StorageConfigContextType;
    path:string | undefined;
    repoId:string;
    referenceId:string;
    referenceType:any;
    onDone:() => void;
    onHide:() => void;
    show:boolean;
  }
  export type InitialState = {
    inProgress: boolean,
    error : null | Error,
    done: boolean,
  }
  export interface ObjectsBrowserProps{
    config: StorageConfigContextType;
    configError: Error | null;
  }
  export interface _File extends File {
    id:string;
    size: number;
    path: string;
    type: string;
  }
  export type Reference = {
    id: string;
    type: string;
  }
  export type Repo = {
    id: string
}
  export type State = {
    status: string; 
    percent: number;
  }
  export type OpFn = (progress: any) => void 
  export interface UploadFileProps {
    (config: StorageConfigContextType, repo: Repo , reference: Reference , path:string | undefined, file: _File, onProgress: OpFn | null | undefined): Promise<void>;
  }
  export interface UploadCandidateProps {
    repo: Repo;
    reference: Reference;
    path: string | undefined;
    file: _File;
    state: { status: string; percent: number } | null;
    onRemove?: (() => void) | null;
  }
  export interface UploadButtonProps {
    config: StorageConfigContextType;
    repo: Repo;
    reference: Reference;
    path: string | undefined;
    onDone: () => void;
    onClick: () => void;
    onHide: () => void;
    show: boolean;
  }
  
  export interface ImportButtonProps {
    variant?: string;
    onClick:React.MouseEventHandler<HTMLButtonElement>;
    config: StorageConfigContextType
  }
  export interface TreeContainerProps {
    config: StorageConfigContextType;
    repo: Repo;
    reference: Reference;
    path: string;
    after: string;
    onPaginate: (after:string) => void;
    onRefresh: () => void;
    onUpload: () => void;
    onImport: () => void;
    refreshToken:boolean;
    show?: boolean;
  }
  export interface ReadmeContainerProps {
    config:StorageConfigContextType;
    repo:Repo;
    reference:Reference;
    path?:string;
    refreshDep?:string | boolean;
  }
  export interface NoGCRulesWarningProps{
    repoId: string; 
  }
  export interface CompareListProps {
      repo: Repo; // 
      reference: Reference; // 
      compareReference: Reference; // 
      prefix: string;
      onSelectRef: (ref: any) => void; // 
      onSelectCompare: (compare: any) => void; // 
      onNavigate: (path: string) => void;
  }
  export interface IRefObject {
    id: string;
    type: string; 
  }
  export interface MergeButtonProps {
    repo: Repo;
    onDone: () => void;
    source: string | number | boolean;
    dest: string | number | boolean;
    disabled?: boolean;
    isTableMerge: boolean;
}
