// 为repositories中的index.tsx提供接口
import { CSSProperties, MouseEventHandler, ReactElement } from "react";
import { QueryParams, RepositoryParams } from "../../../lib/api/interface";

export interface CreateRepositoryButtonProps {
    variant?: string;
    enabled?: boolean;
    onClick:  MouseEventHandler<HTMLButtonElement>;
} 

export interface GettingStartedCreateRepoButtonProps {
    text: string | ReactElement;
    variant?: string;
    enabled?: boolean;
    onClick:  MouseEventHandler<HTMLButtonElement>;
    creatingRepo:  boolean;
    style?: CSSProperties;
}


export interface CreateRepositoryModalProps {
    show: boolean;
    error: null | undefined;
    onSubmit:(repo: RepositoryParams) => Promise<boolean>;
    onCancel:()=>void;
    inProgress: boolean;
    samlpleRepoChecked?: boolean;
}

export interface GetStartedProps{
    // onCreateSampleRepo:;
    onCreateEmptyRepo:()=>void;
    creatingRepo:boolean;
    createRepoError:Error | null;
}

export interface RepositoryListProps{
    onPaginate: (page: string | boolean | null) => void;
    prefix: string;
    after:QueryParams;
    refresh: boolean;
    // onCreateSampleRepo:() => Promise<void>;
    onCreateEmptyRepo: ()=>void;
    toggleShowActionsBar: (show?: boolean) => void; 
    creatingRepo: boolean; 
    createRepoError: null|Error;
}

export interface SQLEditorProps {
    initialValue: string;
    onChange: (code: string) => void;
    onRun: () => void;
}
//   repositories中未使用的代码，暂时存放
  // const { response, error: err, loading } = useAPI(() => config.getStorageConfig());
    // const LOCAL_BLOCKSTORE_TYPE:string = "local";
    // const LOCAL_BLOCKSTORE_SAMPLE_REPO_NAME:string = "quickstart";
    // const LOCAL_BLOCKSTORE_SAMPLE_REPO_DEFAULT_BRANCH:string = "main";    
    // // const createSampleRepoButtonCallback = useCallback(async () => {
    //     if (loading) return;
    //     if (!err && response?.blockstore_type === LOCAL_BLOCKSTORE_TYPE) {
    //         const sampleRepo = {
    //             name: LOCAL_BLOCKSTORE_SAMPLE_REPO_NAME,
    //             storage_namespace: `local://${LOCAL_BLOCKSTORE_SAMPLE_REPO_NAME}`,
    //             default_branch: LOCAL_BLOCKSTORE_SAMPLE_REPO_DEFAULT_BRANCH,
    //             sample_data: true,
    //         }
    
    //         await createRepo(sampleRepo);
    //         return;
    //     }
    //     setSampleRepoChecked(true);
    //     setShowCreateRepositoryModal(true);
    //     setCreateRepoError(null);
    // }, [showCreateRepositoryModal, setShowCreateRepositoryModal, loading, err, response, createRepo]);
