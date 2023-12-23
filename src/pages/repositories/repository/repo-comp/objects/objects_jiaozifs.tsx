import React from "react";
import { RepositoryPageLayout } from "../../../../../lib/components/repository/layout";
import { ActiveTab } from "../../../../../lib/components/interface/comp_interface";
import { ActionGroup, ActionsBar } from "../../../../../lib/components/controls";
import RefDropdown from "../../../../../lib/components/repository/refDropdown";

const ObjectsBrowser = () => {
return(
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
          <ImportButton onClick={() => setShowImport(true)}  />
          <ImportModal
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
          reference={reference}
          repo={repo}
          path={path}
          refreshDep={refreshToken}
        />
      </Box>
    </>
)
}
const RepositoryObjectsPage = () => {

    return (
      <RepositoryPageLayout activePage={ActiveTab.Objects}>
        <ObjectsBrowser />
      </RepositoryPageLayout>
    );
  };
  
  export default RepositoryObjectsPage;
  