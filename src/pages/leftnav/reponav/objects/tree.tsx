import React from "react";
import { useRouter } from "../../../../lib/hooks/router";
import { Objectlist } from "./objectlist";
import { useAPI } from "../../../../lib/hooks/api";
import { repos } from "../../../../lib/api/interface";
import { AlertError, Loading } from "../../../../lib/components/controls";
import { useRefs } from "../../../../lib/hooks/repo";
import { Col } from "react-bootstrap";

const RepoTittle = () => {
  return     <strong className="Navtittle">Objects List</strong>  ;
};

const NavTreeContent = ({ reference,repo }) => {
  let { user, repoId } = useRouter().params;

  let {
    response,
    loading: load,
    error: err
  } = useAPI(async ()=>await repos.getEntriesInRef(user, repoId, { ref: reference.name, type: reference.type }));
  if (load) return <Loading />;
  if (err) return <AlertError error={err} />;
  return (
    <>
    <Col className="d-flex">
        <RepoTittle />        
    </Col>
    <Objectlist entrises={response.data} repo={repo} reference={reference} />
    </>
  );
};

export const NavTree = () => {
  const {repo, reference, loading, error } = useRefs();
  
  
  if (loading) return <Loading />;
  if (error) return <AlertError error={error} />;
  
  return <NavTreeContent reference={reference} repo={repo} />;
};