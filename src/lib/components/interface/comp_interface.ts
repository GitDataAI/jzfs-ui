import {  Dispatch, JSXElementConstructor, MutableRefObject, ReactElement, ReactNode, SetStateAction } from "react";
import { FormControlProps } from "react-bootstrap";
import { OverlayTriggerRenderProps } from "react-bootstrap/esm/OverlayTrigger";
import { Placement } from "react-bootstrap/esm/types";
import { Commit, Run } from "../../../pages/repositories/interface/repo_interface";
import { RepositoryParams } from "../../api/interface";

export interface SimpleModalProps {
    children: React.ReactNode;
    show?: boolean;
    heading: string;
    onCancel: () => void;
    footer?: React.ReactNode;
}
export interface AlertErrorProps {
    error: Error | ReactElement | null | boolean;
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
    text: string;
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
    size?:'md' | 'sm' | 'lg' | undefined;
}
export interface LinkButtonProps {
    href: { pathname: string; query?:{ commit?:string; repoId?: string; commitId?: string; ref?:string};  params?: { repoId?: string; commitId?: string; } | string };
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
    (text: string, onSuccess: () => void, onError: (err: any) => void): Promise<void>;
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
    after?: string;
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
    // 其他属性...
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