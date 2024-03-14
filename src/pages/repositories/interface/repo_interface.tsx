import { RepositoryDeletionError } from "../../../lib/api";
import { Branch, Repository } from "../../../lib/api/interface/Api";
import { Commit } from "../../../lib/api/interface/Api";
import { Entry } from "../../../util/otfUtil";

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
    configError:  Error | null;
  }
  export interface _File extends File {
    id:string;
    size: number;
    path: string;
    type: string;
  }
  export interface RepositoryInDeletionContainerProps {
    repoId: string;
  }
  export type Reference = {
    id: string;
    type: string;
  }
 
  export type State = {
    status: string; 
    percent: number;
  }
  export type OpFn = (progress: any) => void 
  export interface UploadFileProps {
    (config: StorageConfigContextType, repo: Repository , reference: Reference , path:string | undefined, file: _File, onProgress: ((progress: any) => void) | null | undefined): Promise<void>;
  }
  export interface UploadCandidateProps {
    repo: Repository;
    reference: Reference;
    path: string | undefined;
    file: _File;
    state: { status: string; percent: number } | null;
    onRemove?: (() => void) | null;
  }
  export interface UploadButtonProps {
    config: StorageConfigContextType;
    repo: Repository;
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
    repo: Repository;
    reference: Reference;
    path: string;
    after: any;
    onPaginate: (after:any) => void;
    onRefresh: () => void;
    onUpload: () => void;
    onImport: () => void;
    refreshToken:boolean;
    show?: boolean;
  }
  export interface ReadmeContainerProps {
    config:StorageConfigContextType;
    repo:Repository;
    reference:Reference;
    path?:string;
    refreshDep?:string | boolean;
  }
  export interface NoGCRulesWarningProps{
    repoId: string; 
  }
  export interface CompareListProps {
      repo: Repository; // 
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
    repo: Repository;
    onDone: () => void;
    source: string | number | boolean;
    dest: string | number | boolean;
    disabled?: boolean;
    isTableMerge: boolean;
}
export type BranchWidgetParms = {
   repo: Repository;
   branch: Branch;
   onDelete: (id:string) => void
}
export interface CreateBranchButtonProps {
  repo: Repository;
  variant?: string;
  onCreate?: () => void;
  children?: React.ReactNode;
}
export interface BranchListProps {
  repo: Repository;
  prefix: string;
  after: any;
  onPaginate: (after:any) => void | (() => void);
}
export interface UseRefsReturn {
  repo: Repository; 
  loading: boolean;
  error: Error | null;
}
export interface MetadataField {
  key: string;
  value: string;
}
export interface CommitButtonProps {
  repo: Repository;
  onCommit: (commit: { message: string; metadata: Record<string, string>; }, callback: () => void) => void;
  enabled?: boolean;
}
export interface RevertButtonProps {
  onRevert: () => void;
  enabled?: boolean;
}
export interface ResultsState {
  prefix: string;
  results: { path: string }[]; 
  pagination: any; 
}
export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

export type GetMore = () => Promise<{ results: { path: string }[]; pagination: any; }>;
export interface ChangesBrowserProps {
  repo: Repository;
  reference: Reference;
  prefix: string;
  onSelectRef:(ref: any) => void |( () => void);
}
export type GetMoreUncommittedChanges = (
  afterUpdated: string,
  path: string,
  useDelimiter?: boolean,
  amount?: number
) => Promise<any>;
export interface ChangesTreeContainerProps {
  results:Entry[];
  delimiter: string;
  uriNavigator: React.JSX.Element;
  leftDiffRefID: string;
  rightDiffRefID: string;
  repo: Repository;
  reference: Reference;
  internalRefresh: boolean;
  prefix: string;
  getMore: GetMoreUncommittedChanges;
  loading: boolean;
  nextPage: any | null;
  setAfterUpdated: React.Dispatch<React.SetStateAction<string>> | ((afterUpdated: string) => void);
  onNavigate: (entry: Entry) => void; 
  onRevert: (entry: {    path_type: string;    path: string;}) => Promise<void> | (() => void);
  setIsTableMerge: (isTableMerge: boolean) => void;
  changesTreeMessage?: string | React.JSX.Element;
}
export interface StatEvent {
  class: string;
  name: string;
  count: number;
}
export interface Tag {
  id: string;
  commit_id: string;
}
export interface TagWidgetProps {
  repo: Repository;
  tag: Tag;
  onDelete: (id: string) => void;
}
export interface CreateTagButtonProps {
  repo: Repository;
  variant?: string;
  onCreate?: (response: any) => void;
  children?: React.ReactNode;
}
export interface TagListProps {
  repo: Repository;
  after: any; 
  prefix: string; 
  onPaginate: (page: any) => void; 
}
export interface RepoErrorProps {
  error: RepositoryDeletionError | null;
}

export interface Run {
  id:string
  run_id: string;
  event_type: string;
  status: 'completed' | 'failed' | 'running' | 'skipped';
  branch: string;
  commit_id: string;
  start_time: string | number;
  end_time: string | number;
  timestamp:string;
  operation_type:string;
  operation_content: string;
  operation:React.ReactNode
}
export interface RunSummaryProps {
  repo: Repository;
  run: Run;
}
interface Execution {
  hook_run_id: string;
  hook_id: string;
  status: 'completed' | 'failed' | 'running' | 'skipped';
  start_time: string | number;
  end_time: string | number;
}
export interface HookLogProps {
  repo: Repository;
  run: Run;
  execution: Execution;
}
export interface ExecutionsExplorerProps {
  repo: Repository; 
  run: Run; 
  executions: Execution[]; 
}
export interface ActionBrowserProps {
  repo: Repository; 
  run: Run; 
  hooks: HooksType; 
  onSelectAction: (action: ActionType | null | string) => void; 
  selectedAction: ActionType | null | string; 
}
interface HooksType {
  results: HookRunType[];
}
interface HookRunType {
  action: ActionType;
  hook_run_id: string;
  hook_id:string; 
  status: 'completed' | 'failed' | 'running' | 'skipped';
  start_time: string | number;
  end_time: string | number;
}
export interface ActionType {
  actionName : string;
}
export interface RunContainerProps {
  repo: Repository; 
  runId: string; 
  onSelectAction: (action: ActionType | null | string) => void; 
  selectedAction: ActionType | null | string; 
}
export interface RunRowProps {
  repo: Repository;
  run: Run;
  onFilterBranch: (branch: string) => void;
  onFilterCommit: (commitId: string) => void;
}
export interface RunTableProps {
  repo: Repository;
  runs: Run[];
  nextPage: string | boolean | null | undefined;
  after: any;
  onPaginate:(after: any) => void | (() => void);
  onFilterBranch: (branch: string) => void;
  onFilterCommit: (commitId: string) => void;
}
export interface ActionsListProps {
  repo: Repository;
  after: string | undefined;
  onPaginate:(after: any) => void | (() => void);
  branch: string;
  commit: string;
  onFilterBranch: (branch: string) => void;
  onFilterCommit: (commitId: string) => void;
}
export type metadata  = {
  [key: string]: string;
}

export interface CommitWidgetProps {
  repo: Repository;
  commit: Commit;
}
export interface CommitsBrowserProps {
  repo: Repository;
  reference: Reference;
  after: any;
  onPaginate:(after: any) => void | (() => void);
  onSelectRef: (ref: any) => void; 
}
export interface getKeysOrNullProps{
  metadata:metadata;
}
export interface CommitMetadataTableProps{
  commit:Commit;
}
export interface CommitInfoCardProps {
  repo: Repository;
  commit: Commit;
  bare?: boolean;
}
export interface OperationExpansionSectionProps {
  operationExpanded: boolean;
  onExpand: () => void;
}

