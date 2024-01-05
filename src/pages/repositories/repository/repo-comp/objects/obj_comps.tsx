import React, { useCallback,useState } from "react";
import dayjs from "dayjs";
import {
    AlertError,
    Loading,
} from "../../../../../lib/components/controls";
import {Alert, Button, OverlayTrigger, Tooltip} from "react-bootstrap";

import {Tree} from "../../../../../lib/components/repository/tree";
import {objects, retention, repositories, NotFoundError, cache} from "../../../../../lib/api";
import {useAPI, useAPIWithPagination} from "../../../../../lib/hooks/api";
import { getContentType, getFileExtension, FileContents } from "./objectViewer";
import { BsCloudArrowUp } from "react-icons/bs";
import { ImportButtonProps, NoGCRulesWarningProps, ReadmeContainerProps, TreeContainerProps } from "../../../interface/repo_interface";
import { object, repos } from "../../../../../lib/api/interface/Api";

const README_FILE_NAME = "README.md";
const REPOSITORY_AGE_BEFORE_GC = 14;


export const TreeContainer= ({
  repo,
  reference,
  path,
  after,
  onPaginate,
  onRefresh,
  onUpload,
  onImport,
  refreshToken
}) => {
  
  const user = cache.get('user')
  const { response, error, loading } = useAPI(async() =>
  {return await repos.getEntriesInRef(user,repo.name,{ref:reference.name,type:reference.type,path})
}
  , [repo.name , refreshToken])
  
  const initialState = {
    inProgress: false,
    error: null,
    done: false,
  };
  const [deleteState, setDeleteState] = useState(initialState);

    if (loading) return <Loading/>;
    if (error) return <AlertError error={error}/>;

    return (
        <>
            {deleteState.error && <AlertError error={deleteState.error} onDismiss={() => setDeleteState(initialState)}/>}
            <Tree
                repo={repo}
                reference={reference}
                path={(path) ? path : ""}
                showActions={true}
                results={response.data}
                after={after}
                onPaginate={onPaginate}
                onUpload={onUpload}
                onImport={onImport}
                onDelete={(entry,dirname) => {
                  object
                      .deleteObject(user, repo.name, {refName:reference.name,path:dirname?dirname+'/'+entry.name:entry.name})
                      .catch(error => {
                          setDeleteState({...initialState, error: error})
                          throw error
                      })
                      .then(refresh)
              }}
            /></>
    );
}

// export const ReadmeContainer = ({
//   repo,
//   reference,
//   path = "",
//   refreshDep = "",
// }) => {
//   let readmePath = "";

//   if (path) {
//     readmePath = path.endsWith("/")
//       ? `${path}${README_FILE_NAME}`
//       : `${path}/${README_FILE_NAME}`;
//   } else {
//     readmePath = README_FILE_NAME;
//   }
//   const { response, error, loading } = useAPI(
//     () => object.headObject(repo.id, reference.id, readmePath),
//     [path, refreshDep]
//   );

//   if (loading || error) {
//     return <></>; // no file found.
//   }

//   const fileExtension = getFileExtension(readmePath);
//   const contentType = getContentType(response?.headers);

//     return (
//         <FileContents 
//             repoId={repo.id} 
//             reference={reference}
//             path={readmePath}
//             fileExtension={fileExtension}
//             contentType={contentType}
//             error={error}
//             loading={loading}
//             showFullNavigator={false}
//             presign={true}
//         />
//     );
// }

export const NoGCRulesWarning: React.FC<NoGCRulesWarningProps> = ({ repoId }) => {
  const user = cache.get('user')
  const storageKey = `show_gc_warning_${repoId}`;
  const [show, setShow] = useState(
    window.localStorage.getItem(storageKey) !== "false"
  );
  const closeAndRemember = useCallback(() => {
    window.localStorage.setItem(storageKey, "false");
    setShow(false);
  }, [repoId]);

  const { response } = useAPI(async () => {
    const repo = await repos.getRepository(user,repoId);
    
    if (
      !repo.data.storage_namespace.startsWith("s3:") &&
      !repo.data.storage_namespace.startsWith("http")
    ) {
      return false;
    }
    const createdAgo = dayjs().diff(dayjs.unix(repo.creation_date), "days");
    if (createdAgo > REPOSITORY_AGE_BEFORE_GC) {
      try {
        await retention.getGCPolicy(repoId);
      } catch (e) {
        if (e instanceof NotFoundError) {
          return true;
        }
      }
    }
    return false;
  }, [repoId]);

  if (show && response) {
    return (
      <Alert variant="warning" onClose={closeAndRemember} dismissible>
        <strong>Warning</strong>: No garbage collection rules configured for
        this repository.{" "}
        <a
          href="https://docs.pando.network"
          target="_blank"
          rel="noreferrer"
        >
          Learn More
        </a>
        .
      </Alert>
    );
  }
  return <></>;
};

