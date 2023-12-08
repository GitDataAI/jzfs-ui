import {  ComponentType, Dispatch, JSXElementConstructor, MutableRefObject, ReactElement, ReactNode, Ref, SetStateAction } from "react";
import { FormControlProps } from "react-bootstrap";
import { OverlayTriggerRenderProps } from "react-bootstrap/esm/OverlayTrigger";
import { Placement } from "react-bootstrap/esm/types";
import { Commit, Reference, Run } from "../../../pages/repositories/interface/repo_interface";
import { QueryParams, RepositoryParams } from "../../api/interface";
import { Link as RouterLink } from 'react-router-dom';
import { Entry } from "../../../util/otfUtil";

export interface SimpleModalProps {
    children: React.ReactNode;
    show?: boolean;
    heading: string;
    onCancel: () => void;
    footer?: React.ReactNode;
}
export interface AlertErrorType{
    error: Error | null |AlertErrorType | string;
}
export interface AlertErrorProps {
    error: Error | null | AlertErrorType | string;
    onDismiss?: () => void;
    className?: string | undefined;
  }
export type Func = (...args: any[]) => any;
export interface DebounceOptions {
    func: Func;
    wait: number;
    immediate?: boolean;
  }
export interface UseDebounce {
    (func: Func, wait?: number): MutableRefObject<Func>;
  }
export interface UseDebouncedState {
    (dependsOn: any, debounceFn: Func, wait?: number): [any, Dispatch<SetStateAction<any>>];
  }
export interface DebouncedFormControlProps extends FormControlProps {
    debounce?: number;
  }
export interface GrayOutProps {
    children: React.ReactNode;
}
export interface WrapIfProps {
    enabled: boolean;
    Component: React.ComponentType<{children: React.ReactNode}>;
    children: React.ReactNode;
}
export interface ExperimentalOverlayTooltipProps {
    children: ReactElement<any, string | JSXElementConstructor<any>> | ((props: OverlayTriggerRenderProps) => ReactNode);
    show?: boolean;
    placement?: Placement;
}
export interface ExitConfirmationDialogProps {
    dialogAlert: React.ReactNode;
    dialogDescription: React.ReactNode;
    onExit: () => void;
    onContinue: () => void;
    isOpen?: boolean;
}
export interface ProgressSpinnerProps {
    text: string;
    changingElement?: string;
}
export interface Warning {

}
export interface WarningProps {
    children?: React.ReactNode;
    warnings: Warning[]
}
export interface ToggleSwitchProps {
    label: string;
    id: string;
    defaultChecked: boolean;
    onChange: (checked: boolean) => void;
}
export interface CheckboxProps {
    name: string;
    onAdd: (name: string) => void;
    onRemove: (name: string) => void;
    disabled?: boolean;
    defaultChecked?: boolean;
}
export interface DataTableProps {
    headers: string[];
    results: any[];
    rowFn: (row: any) => React.ReactNode[];
    keyFn?: (row: any) => string;
    actions?: { key: string, buttonFn: (row: any) => React.ReactNode }[];
    emptyState?: React.ReactNode;
}
export interface RefreshButtonProps {
    onClick: () => void;
    size?:'md' | 'sm' | 'lg' | undefined;
    variant?: string;
    tooltip?: string;
    icon?: React.ReactNode;
}
export interface PrefixSearchWidgetProps {
    onFilter: (value: string) => void;
    text?: string;
    defaultValue?: string;
}
export interface ClipboardButtonProps {
    text: string[] | string;
    variant: string;
    onSuccess?: () => void;
    icon?: React.ReactNode;
    onError?: () => void;
    tooltip?: string;
    [key: string]: any;
}
export interface TooltipButtonProps {
    onClick: () => void;
    variant: string;
    children: React.ReactNode;
    tooltip: string;
    className?: string;
    size?:'md'| 'sm' | 'lg' | undefined;
}
export interface LinkButtonProps {
    href: { pathname: string; query?:{ commit?:string; repoId?: string; commitId?: string; ref?:React.ForwardedRef<HTMLInputElement> | string};  params?: { repoId?: string; commitId?: string; } | string };
    children: React.ReactNode;
    buttonVariant: string;
    tooltip?: string;
}
export interface FormattedDateProps {
    dateValue: string | number;
    format?: string;
}
export interface ActionGroupProps {
    children: React.ReactNode;
    orientation?: string;
}
export interface ActionsBarProps {
    children: ReactNode;
}
export interface CopyTextToClipboard {
    (text: string[] | string, onSuccess: () => void, onError?: (err: any) => void): Promise<void>;
}
export interface DebouncedFormControlProps extends FormControlProps {
    debounce?: number;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export interface APIState {
    loading: boolean;
    error: Error | null;
    response: any | null; 
    responseHeaders: any | null; 
}

export interface PromiseFunction {
    (): Promise<any>;
}
export interface PaginatorProps {
    onPaginate: (page: string | boolean | null) => void;
    nextPage: string | boolean | null | undefined;
    after?: QueryParams;
}
export interface InitialPaginationState{
    loading: boolean,
    error: Error | null,
    nextPage?: string | null  | boolean,
    results?: Run[] | Commit[] |RepositoryParams[]
}
export interface ActionStatusIconProps {
    status: 'completed' | 'failed' | 'running' | 'skipped';
    className:string | undefined | null;
}
export interface Config {
    default_namespace_prefix: string;
    blockstore_type: string;
    blockstore_namespace_ValidityRegex: string;
    blockstore_namespace_example: string;
}

export interface RepositoryCreateFormProps {
    id: string;
    config: Config;
    onSubmit: ((values: RepositoryParams) => void )| (() => void) |((values: RepositoryParams) => Promise<boolean>);
    formValid: boolean;
    setFormValid: (valid: boolean) => void;
    error: Error | null;
    samlpleRepoChecked: boolean;
}

export interface APIHook {
    response: Response | null;
    error: Error | null;
    loading: boolean;
}
export interface LoginConfigProviderProps {
    children: ReactNode;
}
export interface CredentialsTableProps {
    userId: string;
    currentAccessKey: string;
    refresh: boolean;
    after: QueryParams; 
    onPaginate: (page: string | boolean | null) => void; 
}
interface Credentials {
    access_key_id: string;
    secret_access_key: string;
}
export interface CredentialsShowModalProps {
    credentials: Credentials | null;
    show: boolean;
    onHide: () => void;
}
export interface AttachModalProps {
    show: boolean;
    searchFn: (searchPrefix:string) => Promise<any>; // 请根据实际情况替换为正确的类型
    onAttach: any; // 请根据实际情况替换为正确的类型
    onHide: () => void;
    addText?: string;
    emptyState?: string;
    modalTitle?: string;
    filterPlaceholder?: string;
}

interface ValidationResult {
    isValid: boolean;
    errorMessage?: Error;
}

export interface EntityActionModalProps {
    show: boolean;
    onHide: () => void;
    onAction: (value: string) => Promise<void>;
    title: string;
    placeholder: string;
    actionName: string;
    validationFunction?: (value: string) => ValidationResult;
}
export interface AuthLayoutProps {
    children: ReactNode;
    activeTab: string;
}
export interface UserNavProps {
    userId: string;
    page?: string;
}
export interface GroupNavProps {
    groupId: string;
    page?: string;
}
export interface UserHeaderProps {
    userEmail: string;
    userId: string;
    page: string;
}
export interface GroupHeaderProps {
    groupId: string;
    page: string;
}
export interface PolicyHeaderProps {
    policyId: string;
}
export interface CodeTabPanelProps {
    children: string[] | string;
    isSelected: boolean;
    language?: string;
    index: number;
    [key: string]: any;
}
export interface LayoutProps {
    logged?: boolean;
    children: React.ReactNode;
}
export interface WrapLinkProps {
    navigate?: any;
    onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
    to: string;
    target?: string;
    replace?: boolean;
    state?: any;
    [key: string]: any;
}

export type WrappedComponentProps = WrapLinkProps & {
    ref: Ref<any>;
};

export type WrappedComponent = ComponentType<WrappedComponentProps>;

export interface CompLinkProps extends Omit<React.ComponentProps<typeof RouterLink>, 'to'> {
    href?: { pathname: string; params?: { repoId: string; commitId?:string}; } | string;
    to?: string;
    children?: ReactNode;
    components?: any;
    component?: ComponentType<any>;
    [key: string]: any;
}
export interface NavItemProps {
    href: string;
    active?: boolean;
    children: ReactNode;
}
export interface TopNavLinkProps {
    href: string;
    children: ReactNode;
}
export interface TabsWrapperProps {
    isCentered?: boolean;
    children: ReactNode;
    defaultTabIndex?: number;
    handleTabChange: (event: React.ChangeEvent<{}>, value: any) => void;
    ariaLabel?: string;
    textColor?: 'inherit' | 'primary' | 'secondary' | 'default';
    indicatorColor?: 'secondary' | 'primary';
}
export interface PolicyEditorProps {
    show: boolean;
    onHide: () => void;
    onSubmit: (id?: string, statement?: string) => Promise<any>;
    policy?: any;
    noID?: boolean;
    isCreate?: boolean;
    validationFunction?: (id: string) => { isValid: boolean; errorMessage?: string };
    externalError?: any;
}
export interface Statement {
    action: string[];
    resource: string;
    effect: string;
}

export interface Policy {
    statement: Statement[];
    creation_date: string | number;
}

export interface PolicyDisplayProps {
    policy: Policy;
    asJSON?: boolean;
}

interface GetMoreResult {
    results: any[];
    pagination: ChangeSummaryPagination
}
export interface ChangeSummaryPagination {
    next_offset?: string, 
    has_more?:boolean;

}
export interface ChangeSummaryProps {
    prefix: string;
    getMore: (next_offset: string, prefix: string, arg1: boolean, pageSize: number) => Promise<GetMoreResult>;
}
export interface CommitActionsProps {
    repo: RepositoryParams;
    commit: Commit;
}
export  interface TreeItemRowProps {
    entry: Entry;
    repo: RepositoryParams;
    reference: Reference;
    leftDiffRefID: string;
    rightDiffRefID: string;
    internalRefresh: any;
    onRevert: any;
    onNavigate: any;
    delimiter: string;
    relativeTo: any;
    getMore: any;
    depth?: number;
    setTableDiffExpanded: any;
    setTableDiffState: any;
    setIsTableMerge: any;
    deltaDiffEnabled: any;
}
export interface TreeEntryPaginatorProps {
    path: string;
    setAfterUpdated: (page: any) => void;
    nextPage: string | boolean | null | undefined;
    depth?: number;
    loading?: boolean;
}
export interface UseTreeItemTypeProps {
    entry: Entry; 
    repo: RepositoryParams; 
    leftDiffRefID: string; 
    rightDiffRefID: string; 
    isDeltaEnabled: boolean;
}
export interface GetMoreChanges {
    (repo: RepositoryParams, leftRefId: string, rightRefId: string, delimiter: string): (afterUpdated: QueryParams, path: string, useDelimiter?: boolean, amount?: number) => any;
}

export interface TableDiffState {
    isShown: boolean;
    expandedTablePath: string;
    expandedTableName: string;
}

export type SetTableDiffState = Dispatch<SetStateAction<TableDiffState>>;

export type SetIsTableMerge = Dispatch<SetStateAction<boolean>>;
interface MetadataField {
    key: string;
    value: string;
}
type SetMetadataFields = Dispatch<SetStateAction<MetadataField[]>>;

export interface MetadataFieldsProps {
    metadataFields: MetadataField[];
    setMetadataFields: SetMetadataFields;
}
export enum ActiveTab {
    Objects = 'objects',
    Changes = 'changes',
    Commits = 'commits',
    Branches = 'branches',
    Tags = 'tags',
    Compare = 'compare',
    Actions = 'actions',
    Settings = 'settings'
}
export interface RepositoryPageLayoutProps {
    activePage: ActiveTab; 
    children: React.ReactNode;
    fluid?: string;
}
export enum DiffType {
    Changed = 'changed',
    Conflict = 'conflict',
    Added = 'added',
    Removed = 'removed'
}

export interface ObjectsDiffProps {
    diffType: DiffType;
    repoId: string;
    leftRef: string;
    rightRef: string;
    path: string;
}
export  interface Stat{
    loading: boolean;
    error: Error | null;
    response: any;
    responseHeaders: any;   
    size_bytes:number
}
export interface NoContentDiffProps {
    left: Stat;
    right: Stat;
    diffType: DiffType;
}
export interface ContentDiffProps {
    repoId: string;
    path: string;
    leftRef: string;
    rightRef: string;
    leftSize: number;
    rightSize: number;
    diffType: DiffType;
}
export interface StatDiffProps {
    left: Stat;
    right: Stat;
    diffType: DiffType;
}
export interface DiffSizeReportProps {
    leftSize: number;
    rightSize: number;
    diffType: DiffType;
}

export enum RefType {
    Branch = 'branch',
    Tag = 'tag',
    Commit = 'commit'
}

export interface RefSelectorProps {
    repo: RepositoryParams;
    selected: ref;
    selectRef: (ref: ref) => void;
    withCommits: boolean;
    withWorkspace: boolean;
    withTags: boolean;
    amount?: number;
}
export interface ref {
    id: string;
    type: RefType; 
}

export interface CommitListProps {
    commits: Commit[];
    selectRef: (ref: ref) => void;
    reset: () => void;
    branch: string;
    withWorkspace: boolean;
}
export interface RefEntryProps {
    repo: RepositoryParams;
    namedRef: string;
    refType: RefType;
    selectRef: (ref: ref) => void;
    selected: ref;
    logCommits: () => void;
    withCommits: boolean;
}
interface Pagination {
    has_more: boolean;
}

interface Result {
    id: string;
}
export interface RepoPaginatorProps {
    pagination: Pagination;
    onPaginate: (next: string) => void;
    results: Result[];
    from: string;
}
export interface RefDropdownProps {
    repo: RepositoryParams;
    selected: ref;
    selectRef: (ref: ref) => void;
    onCancel?: () => void;
    variant?: string;
    prefix?: string;
    emptyText?: string;
    withCommits?: boolean;
    withWorkspace?: boolean;
    withTags?: boolean;
}
export interface DeltaLakeDiffProps {
    repo: RepositoryParams;
    leftRef: string;
    rightRef: string;
    tablePath: string;
}