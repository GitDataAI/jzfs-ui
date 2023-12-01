import { Dispatch, RefObject, SetStateAction } from "react";
import { StorageConfigContextType } from "./repo_interface";

export interface IStartImport {
    (setImportID: (id: string) => void, prependPath: string | undefined, commitMsg: string | undefined, sourceRef: string | undefined, repoId: string, refId: string, metadata?: object): Promise<void>;
}
export interface ImportProgressPros{
    numObjects: number;
}
export interface ImportDoneProps {
    numObjects: number;
    branch?: string;
}
enum ImportPhase {
    Completed,
    Failed,
    NotStarted,
    InProgress,
    Merging
}
export interface ExecuteImportButtonProps {
    isEnabled: boolean;
    importPhase: ImportPhase;
    importFunc: () => void;
    doneFunc: () => void;
}
export interface ImportFormProps {
    config: StorageConfigContextType;
    pathStyle: object;
    sourceRef: RefObject<HTMLInputElement>;
    destRef: RefObject<HTMLInputElement>;
    path: string;
    commitMsgRef: RefObject<HTMLInputElement>;
    updateSrcValidity: (isValid: boolean) => void;
    metadataFields: Array<any>;
    setMetadataFields: Dispatch<SetStateAction<Array<any>>>;
    shouldAddPath?: boolean;
    err: Error | null;
}