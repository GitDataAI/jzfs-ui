import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";

import { useAPI } from "../../../../../lib/hooks/api";
import { useQuery, useRouter } from "../../../../../lib/hooks/router";
import { cache, objects } from "../../../../../lib/api";
import { ObjectRenderer } from "../../fileRenderers";
import { AlertError } from "../../../../../lib/components/controls";
import { EntryRow, Tree, URINavigator } from "../../../../../lib/components/repository/tree";
import { RefTypeBranch } from "../../../../../constants";
import { RepositoryPageLayout } from "../../../../../lib/components/repository/layout";
import { RefContextProvider, useRefs } from "../../../../../lib/hooks/repo";
import { useStorageConfig } from "../../../../../lib/hooks/storageConfig";
import { linkToPath } from "../../../../../lib/api";
import { object, repos } from "../../../../../lib/api/interface/index";
import { Table } from "react-bootstrap";

// import "../../../styles/ipynb.css";
// import "../../../styles/quickstart.css";

type ObjectViewerPathParams = {
  objectName: string;
  repoId: string;
};

interface ObjectViewerQueryString {
  ref: string;
  path: string;
}

interface FileContentsProps {
  repoId: string;
  reference:  { id: string; type: string };
  path: string;
  loading: boolean;
  error: Error | null;
  contentType?: string | null;
  fileExtension: string;
  sizeBytes?: number;
  showFullNavigator?: boolean;
  presign?: boolean;
}

export const Loading: FC = () => {
  return <Alert variant={"info"}>Loading...</Alert>;
};

export const getFileExtension = (objectName: string): string => {
  const objectNameParts = objectName.split(".");
  return objectNameParts[objectNameParts.length - 1];
};

export const getContentType = (headers: Headers): string | null => {
  if (!headers) return null;

  return headers.get("Content-Type") ?? null;
};

const FileObjectsViewerPage =  () => {
  const router = useRouter() 
  const {repoId,user} = router.params;  
  const {path,ref,type,filepath} = router.query
  const {repo,reference,loading,error} = useRefs()
  const { response,loading:load,error:err} = useAPI( () => {
    return  object.headObject(user,repoId,{ refName: ref,path,type});
  }, [repoId, ref, path]);
      let content;
  if (loading || load) {
    content = <Loading />;
  } else if (error||err) {
    content = <AlertError error={error} />;
  } else {
    const fileExtension = getFileExtension(path);
    // We'll need to convert the API service to get rid of this any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    
    const contentType = getContentType(response.Headers);
    const sizeBytes = parseInt(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (response as any)?.headers.get("Content-Length")
    );
    
    content = (
      <FileContents
        repo={repo}
        // ref type is unknown since we lost that context while reaching here (and it's not worth a url param).
        // Effectively it means that if the ref is commit, we won't truncate it in the URI navigator,
        // which is a better behaviour than truncating it when it's a branch/tag.
        reference={reference}
        path={path}
        type={type}
        fileExtension={fileExtension}
        contentType={contentType}
        sizeBytes={sizeBytes}
        error={error}
        loading={loading}
        presign={true}
        filepath
      />
    );
  }
  
  return (
    <RefContextProvider>
      <RepositoryPageLayout activePage={"objects"}>
        {content}
      </RepositoryPageLayout>
    </RefContextProvider>
  );
};

export const FileContents: FC<FileContentsProps> = ({
  repo,
  reference,
  path,
  type,
  loading,
  error,
  contentType = null,
  fileExtension = "",
  sizeBytes = -1,
  showFullNavigator = true,
  presign = false,
  filepath = ''
}) => {
  const user = cache.get('user')
  const urllinkToPath = ({ repoId,reference, path}) => {
    return `/api/v1/object/${user}/${repoId}?refName=${reference}&path=${path}&type=${type}`;
  };
  const objectUrl = urllinkToPath({ repoId:repo.name, reference:reference.name , path});
  if (loading || error) {
    return <></>;
  }

  
  const titleComponent = showFullNavigator ? (
    <URINavigator
      path={path}
      repo={repo}
      reference={reference}
      isPathToFile={true}
      downloadUrl={objectUrl}
      hasCopyButton={true}
      filepath
    />
  ) : (
    <span>{path}</span>
  );

  return (
    <Card className={"file-content-card"}>
      <Card.Header className={"file-content-heading"}>
        {titleComponent}
      </Card.Header>
      <Card.Body className={"file-content-body"}>
        <Box sx={{ mx: 1 }}>
          <ObjectRenderer
            repoId={repo.name}
            path={path}
            branch={reference.name}
            type={type}
            fileExtension={fileExtension}
            contentType={contentType}
            sizeBytes={sizeBytes}
            presign={presign}
          />
        </Box>
      </Card.Body>
    </Card>
  );
};

export default FileObjectsViewerPage;
