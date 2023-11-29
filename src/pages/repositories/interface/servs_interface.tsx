import { Dispatch, RefObject, SetStateAction } from "react";

export interface IStartImport {
    (setImportID: (id: string) => void, prependPath: string, commitMsg: string, sourceRef: string, repoId: string, refId: string, metadata?: object): Promise<void>;
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
    InProgress
}
export interface ExecuteImportButtonProps {
    isEnabled: boolean;
    importPhase: ImportPhase;
    importFunc: () => void;
    doneFunc: () => void;
}

interface Config {
    import_validity_regex: string;
    blockstore_namespace_example: string;
    blockstore_type: string;
}


export interface ImportFormProps {
    config: Config;
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