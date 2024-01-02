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
import { NoGCRulesWarning, TreeContainer } from "./obj_comps";
import { Button } from "react-bootstrap";
import { UploadIcon } from "@primer/octicons-react";
import { Link } from "../../../../../lib/components/nav";
import { cache } from "../../../../../lib/api";


const ObjectsBrowser = () => {
  const router = useRouter();
  const { path, after, importDialog } = router.query ;
  const [searchParams, setSearchParams] = useSearchParams();
  console.log('objrouter:',router);
  
  const { repo, reference, loading, error } = useRefs();  
  const [showUpload, setShowUpload] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [filepath,setFilepath] = useState(path);
  const [refreshToken, setRefreshToken] = useState(false);
  const refresh = () => setRefreshToken(!refreshToken);
  const parts = (path && path.split("/")) || [];
  const searchSuffix = parts.pop();
  let searchPrefix = parts.join("/");
  const user = cache.get('user')
  searchPrefix = searchPrefix && searchPrefix + "/";
 console.log('path:',path);
 
  useEffect(() => {
    if (importDialog) {
      setShowImport(true);
      searchParams.delete("importDialog");
      setSearchParams(searchParams);
    }
    setFilepath(path)
  }, [router.route, importDialog, searchParams, setSearchParams,path]);

  if (loading) return <Loading />;
  if (error) return <RepoError error={error} />;

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
            selectRef={(ref) => router.push({
              pathname: `/repositories/:user/:repoId/objects`,
              params: {
                repoId: repo.name,
                user,
                path: path === undefined ? "" : path,
              },
              query: { ref:ref.id, path: path === undefined ? "" : path },
            })} onCancel={undefined}          
            />
        </ActionGroup>

        <ActionGroup orientation="right">
          <PrefixSearchWidget
            text="Search by Prefix"
            key={filepath}
            defaultValue={searchSuffix}
            onFilter={(prefix: string) => {
              const query = { path: "",ref:"" };
              if (searchPrefix !== undefined) query.path = searchPrefix;
              if (prefix) query.path += prefix;
              if (reference) query.ref = reference.id;
              const url = {
                pathname: `/repositories/:user/:repoId/objects`,
                query,
                params: { repoId: repo.name,user },
              };
              router.push(url);
            }}
          />
          <RefreshButton onClick={refresh} />
        <Button
        variant={"light"}
        >
           <Link href={{
            pathname: `/repositories/:user/:repoId/changes`,
            params: {repoId: repo.name,user},
            }}>
        <UploadIcon />Edit
          </Link>
        </Button>
          
        </ActionGroup>
      </ActionsBar>

      <NoGCRulesWarning repoId={repo.name} />

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
          path={filepath ? filepath : "/"}
          after={after ? after : ""}
          onPaginate={(after:string) => {
            const query = { after,path:"",ref:""};
            if (path) query.path = path;
            if (reference) query.ref = reference.id;
            const url = {
              pathname: `/repositories/:user/:repoId/objects`,
              query,
              params: { repoId: repo.name,user },
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
{/* 
        <ReadmeContainer
          reference={reference}
          repo={repo}
          path={path}
          refreshDep={refreshToken}
        /> */}
      </Box>
    </>
  );
};

const RepositoryObjectsPage = () => {

  return (
    <RepositoryPageLayout activePage={"objects"}>
      <ObjectsBrowser />
    </RepositoryPageLayout>
  );
};

export default RepositoryObjectsPage;
