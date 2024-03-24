import React, { useContext } from "react";
import { useRouter } from "../../../../lib/hooks/router";
import { Objectlist } from "./changeslist";
import { useAPI } from "../../../../lib/hooks/api";
import { repos } from "../../../../lib/api/interface";
import { AlertError, Loading } from "../../../../lib/components/controls";
import { useRefs } from "../../../../lib/hooks/repo";
import { Col } from "react-bootstrap";
import { ActivepageContext } from "../../../../lib/hooks/conf";

const RepoTittle = () => {
  return     <strong className="Navtittle">Branchs List</strong>  ;
};

const NavTreeContent = ({repo }) => {
  let { user} = useRouter().params;
  const {refresh} = useContext(ActivepageContext)

  let {
    response,
    loading: load,
    error: err
  } = useAPI(async ()=>await repos.listBranches(user, repo.name),[refresh]);
  if (load) return <Loading />;
  if (err) return <AlertError error={err} />;
  return (
    <>
    <Col className="d-flex">
        <RepoTittle />     
    </Col>
    <Objectlist entrises={response.data} repo={repo}/>
    </>
  );
};

export const NavTree = () => {
  const {repo, loading, error } = useRefs();
  
  
  if (loading) return <Loading />;
  if (error) return <AlertError error={error} />;
  
  return <NavTreeContent repo={repo} />;
};