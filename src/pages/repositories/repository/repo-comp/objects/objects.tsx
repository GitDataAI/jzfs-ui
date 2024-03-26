import React, {useContext, useEffect,useState } from "react";
import { RepositoryPageLayout } from "../../../../../lib/components/repository/layout";
import RefDropdown from "../../../../../lib/components/repository/refDropdown";
import {
    ActionGroup,
    ActionsBar,
    Loading,
    RefreshButton,
} from "../../../../../lib/components/controls";
import {useRefs} from "../../../../../lib/hooks/repo";
import {useRouter} from "../../../../../lib/hooks/router";
import { Box } from "@mui/material";
import { RepoError } from "../error/error";
import { NoGCRulesWarning, ReadmeContainer, TreeContainer } from "./obj_comps";
import { Button, Dropdown, Form, Row } from "react-bootstrap";
import { UploadIcon } from "@primer/octicons-react";
import { Link } from "../../../../../lib/components/nav";
import { cache } from "../../../../../lib/api";
import { ActivepageContext } from "../../../../../lib/hooks/conf";
import { repos } from "../../../../../lib/api/interface";


const ObjectsBrowser = () => {
  const router = useRouter();
  const { path, after, importDialog,commitId} = router.query ;
  const { repo, reference, loading, error } = useRefs();  
  
  const [showUpload, setShowUpload] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [filepath,setFilepath] = useState(path);
  const [refreshToken, setRefreshToken] = useState(false);
  const [TagName, setTagName] = useState('')
  const [TagType, setTagType] = useState('')
  const [TagMessage, setTagMessage] = useState('')
  const [hiddenTagForm, setHiddenTagForm] = useState(true)
  const refresh = () => setRefreshToken(!refreshToken);
  const [ZipSrc, setZipSrc] = useState<string>('');
  const [CarSrc, setCarSrc] = useState<string>('');

  const parts = (path && path.split("/")) || [];
  let searchPrefix = parts.join("/");
  const user = cache.get('user')
  searchPrefix = searchPrefix && searchPrefix + "/";
  const ShowTagForm=()=>{
    setHiddenTagForm(!hiddenTagForm)
  }
  const handleSubmit=()=>{
    repos.createTag(user,repo.name,{
      name:TagName,
      target:TagType,
      message:TagMessage
    })
  }
  useEffect(() => {
    const fetchImage = async () => {
      const response = await repos.getArchive(user,repo.name,{archive_type:'zip',refType:reference.type,refName:reference.name})
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    setZipSrc(url);
    };
 repo && fetchImage();
  }, [reference, repo]);

  useEffect(() => {
    const fetchImage = async () => {
    const response = await repos.getArchive(user,repo.name,{archive_type:'car',refType:reference.type,refName:reference.name})
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    setCarSrc(url);
    };
    repo && fetchImage();
  }, [reference, repo]);

  useEffect(() => {
    setFilepath(path)
    refresh()
  }, [path]); 

  useEffect(() => {
    reference && setTagType(reference.name)   
  }, [reference]); 

  if (loading) return <Loading />;
  if (error) return <RepoError error={error} />;
  if (commitId){
  
  return(
  <>
   <ActionsBar>
        <ActionGroup orientation="left">
          <RefDropdown
            emptyText={"Select Branch"}
            repo={repo}
            commitId={commitId}
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
      ></Box>

      <TreeContainer
            commitId={commitId}
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
  </>)}
  else
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
                user
              },
              query: { ref:ref.id},
            })} onCancel={undefined}          
            />
        </ActionGroup>

        <ActionGroup orientation="right">
        <Dropdown >
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                DownLoad
                </Dropdown.Toggle>
                <Dropdown.Menu>

                <Dropdown.Item  href={ZipSrc} download={reference.name+'.zip'}>
                  DownLoad {reference.name}.Zip
                </Dropdown.Item>

                <Dropdown.Item href={CarSrc} download={reference.name+'.car'}>
                  DownLoad {reference.name}.Car
                </Dropdown.Item>

                </Dropdown.Menu>
          </Dropdown>
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
        <Button
        variant={"light"}
        onClick={ShowTagForm}
        >
        <UploadIcon />Create Tag
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

        <ReadmeContainer
          reference={reference}
          repo={repo}
          path={path}
          refreshDep={refreshToken}
        />
      </Box>
      <Form className="TagForm" onSubmit={handleSubmit} hidden={hiddenTagForm}>
        <h4>Create Tag</h4>
      <Form.Group controlId="tagName">
        <Form.Label>Tag Name:</Form.Label>
        <Form.Control
          type="text"
          value={TagName}
          onChange={(e)=>{
            setTagName(e.target.value)
          }}        />
      </Form.Group>
      <Form.Group controlId="tagType">
        <Form.Label>Tag Target:</Form.Label>
        <Form.Control
          type="text"
          defaultValue={reference.name}
          disabled={true}
        />
      </Form.Group>
      <Form.Group controlId="tagMessage">
        <Form.Label>Tag Message:</Form.Label>
        <Form.Control
          as="textarea"
          value={TagMessage}
          onChange={(e)=>{
            setTagMessage(e.target.value)
          }}
        />
      </Form.Group>
      <Row>
      <Button variant="primary" type="submit">
        Submit
      </Button>
      </Row>
    </Form>
    </>
  );
};

const RepositoryObjectsPage = () => {
  const activepage = useContext(ActivepageContext)

    useEffect(()=>{
        activepage.setPage('objects')
    },[])
  return (
    <RepositoryPageLayout activePage={"objects"}>
      <ObjectsBrowser />
    </RepositoryPageLayout>
  );
};

export default RepositoryObjectsPage;
