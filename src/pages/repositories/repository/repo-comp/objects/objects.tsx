import React, {useEffect,useState } from "react";
import { RepositoryPageLayout } from "../../../../../lib/components/repository/layout";
import RefDropdown from "../../../../../lib/components/repository/refDropdown";
import {
    ActionGroup,
    ActionsBar,
    Loading,
    PrefixSearchWidget,
    RefreshButton,
} from "../../../../../lib/components/controls";
import {useRefs} from "../../../../../lib/hooks/repo";
import {useRouter} from "../../../../../lib/hooks/router";
import { Box } from "@mui/material";
import { RepoError } from "../error/error";
import { useSearchParams } from "react-router-dom";
import { useStorageConfig } from "../../../../../lib/hooks/storageConfig";
import { UploadButton } from "./uplodaButton";
import { ImportModal } from "./importModal";
import { ImportButton, NoGCRulesWarning, ReadmeContainer, TreeContainer } from "./obj_comps";
import { ObjectsBrowserProps } from "../../../interface/repo_interface";


const ObjectsBrowser:React.FC<ObjectsBrowserProps> = ({ config, configError }) => {
  const router = useRouter();
  const { path, after, importDialog } = router.query;
  const [searchParams, setSearchParams] = useSearchParams();
  const { repo, reference, loading, error } = useRefs();
  const [showUpload, setShowUpload] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [refreshToken, setRefreshToken] = useState(false);

  const refresh = () => setRefreshToken(!refreshToken);
  const parts = (path && path.split("/")) || [];
  const searchSuffix = parts.pop();
  let searchPrefix = parts.join("/");
  searchPrefix = searchPrefix && searchPrefix + "/";

  useEffect(() => {
    if (importDialog) {
      setShowImport(true);
      searchParams.delete("importDialog");
      setSearchParams(searchParams);
    }
  }, [router.route, importDialog, searchParams, setSearchParams]);

  if (loading || !config) return <Loading />;
  if (error || configError) return <RepoError error={error || configError} />;

  return (
    <>
      <ActionsBar>
        <ActionGroup orientation="left">
          <RefDropdown
            emptyText={"Select Branch"}
            repo={repo}
            selected={reference}
            withCommits={true}
            withWorkspace={true}
            selectRef={(ref: { id: string }) => router.push({
              pathname: `/repositories/:repoId/objects`,
              params: {
                repoId: repo.id,
                path: path === undefined ? "" : path,
              },
              query: { ref: ref.id, path: path === undefined ? "" : path },
            })} onCancel={undefined}          
            />
        </ActionGroup>

        <ActionGroup orientation="right">
          <PrefixSearchWidget
            text="Search by Prefix"
            key={path}
            defaultValue={searchSuffix}
            onFilter={(prefix: string) => {
              const query = { path: "",ref:"" };
              if (searchPrefix !== undefined) query.path = searchPrefix;
              if (prefix) query.path += prefix;
              if (reference) query.ref = reference.id;
              const url = {
                pathname: `/repositories/:repoId/objects`,
                query,
                params: { repoId: repo.id },
              };
              router.push(url);
            }}
          />
          <RefreshButton onClick={refresh} />
          <UploadButton
            config={config}
            path={path}
            repo={repo}
            reference={reference}
            onDone={refresh}
            onClick={() => {
              setShowUpload(true);
            }}
            onHide={() => {
              setShowUpload(false);
            }}
            show={showUpload}
          />
          <ImportButton onClick={() => setShowImport(true)} config={config} />
          <ImportModal
            config={config}
            path={path}
            repoId={repo.id}
            referenceId={reference.id}
            referenceType={reference.type}
            onDone={refresh}
            onHide={() => {
              setShowImport(false);
            }}
            show={showImport}
          />
        </ActionGroup>
      </ActionsBar>

      <NoGCRulesWarning repoId={repo.id} />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          mb: "30px",
        }}
      >
        <TreeContainer
          config={config}
          reference={reference}
          repo={repo}
          path={path ? path : ""}
          after={after ? after : ""}
          onPaginate={(after:string) => {
            const query = { after,path:"",ref:""};
            if (path) query.path = path;
            if (reference) query.ref = reference.id;
            const url = {
              pathname: `/repositories/:repoId/objects`,
              query,
              params: { repoId: repo.id },
            };
            router.push(url);
          }}
          refreshToken={refreshToken}
          onUpload={() => {
            setShowUpload(true);
          }}
          onImport={() => {
            setShowImport(true);
          }}
          onRefresh={refresh}
        />

        <ReadmeContainer
          config={config}
          reference={reference}
          repo={repo}
          path={path}
          refreshDep={refreshToken}
        />
      </Box>
    </>
  );
};

const RepositoryObjectsPage = () => {
  const config = useStorageConfig();

  return (
    <RepositoryPageLayout activePage={"objects"}>
      {config.loading && <Loading />}
      <ObjectsBrowser config={config} configError={config.error} />
    </RepositoryPageLayout>
  );
};

export default RepositoryObjectsPage;