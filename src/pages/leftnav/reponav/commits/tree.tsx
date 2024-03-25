import React, { useContext } from "react";
import { useRouter } from "../../../../lib/hooks/router";
import { Commitslist } from "./objectlist";
import { useAPI } from "../../../../lib/hooks/api";
import { repos } from "../../../../lib/api/interface";
import { AlertError, Loading } from "../../../../lib/components/controls";
import { useRefs } from "../../../../lib/hooks/repo";
import { Col } from "react-bootstrap";
import { ActivepageContext } from "../../../../lib/hooks/conf";

const RepoTittle = () => {
  return     <strong className="Navtittle">Commits List</strong>  ;
};

const NavTreeContent = ({ reference,repo }) => {
  let { user } = useRouter().params;
  const {refresh} = useContext(ActivepageContext)

  let {
    response,
    loading: load,
    error: err
  } = useAPI(async ()=>await  repos.getCommitsInRef(user, repo.name,{refName:reference.name}),[refresh]);
  if (load) return <Loading />;
  if (err) return <AlertError error={err} />;
  return (
    <>
    <Col className="d-flex">
        <RepoTittle />        
    </Col>
    <Commitslist entrises={response.data} repo={repo} reference={reference} />
    </>
  );
};

export const NavTree = () => {
  const {repo, reference, loading, error } = useRefs();
  
  
  if (loading) return <Loading />;
  if (error) return <AlertError error={error} />;
  
  return <NavTreeContent reference={reference} repo={repo} />;
};