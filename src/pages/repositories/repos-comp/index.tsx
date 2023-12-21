import React, {useEffect, useState} from "react";
import {Button,Col,Card,Row,Alert,Modal,Spinner} from "react-bootstrap";

import {RepoIcon} from "@primer/octicons-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { AlertError, Loading} from "../../../lib/components/controls";
import {config, repositories, setup} from '../../../lib/api';
import {RepositoryCreateForm} from "../../../lib/components/repoCreateForm";
import {useAPI, useAPIWithPagination} from "../../../lib/hooks/api";
import {Link} from "../../../lib/components/nav";
import { CreateRepositoryButtonProps, CreateRepositoryModalProps, GetStartedProps, GettingStartedCreateRepoButtonProps, RepositoryListProps } from "../interface/repos_interface";

dayjs.extend(relativeTime);

export const CreateRepositoryButton: React.FC<CreateRepositoryButtonProps> = ({variant = "success", enabled = false, onClick}) => {
    return (
        <Button variant={variant} disabled={!enabled} onClick={onClick}>
            <RepoIcon/> Create Repository
        </Button>
    );
}

export const CreateRepositoryModal: React.FC<CreateRepositoryModalProps> = ({show,onSubmit, onCancel, inProgress,setShow,setRefresh,refresh}) => {

  const [formValid, setFormValid] = useState(false);

    return (
        <Modal show={show} onHide={onCancel} size="lg">
            <Modal.Body>
                <RepositoryCreateForm
                  id="repository-create-form"
                  onSubmit={onSubmit}
                  setFormValid = {setFormValid}
                />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="success" type="submit" form="repository-create-form" className="me-2" disabled={!formValid || inProgress} onClick={()=>{setShow(false),setRefresh(refresh)}}>
                { inProgress ? 'Creating...' : 'Create Repository' }
              </Button>
              <Button variant="secondary" onClick={(e) => {
                e.preventDefault();
                onCancel();
              }}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    );
};

// export const RepositoryList: React.FC<RepositoryListProps> = ({ onPaginate, prefix, after, refresh, onCreateEmptyRepo, toggleShowActionsBar, creatingRepo, createRepoError }) => {
export const RepositoryList = ({refresh}) => {

    // const {results:Repo, loading, error, nextPage} = useAPIWithPagination(() => {
    //     // return repositories.list(prefix, after，amount);
    //     return repositories.listRepository();
    // }, [refresh, prefix, after]);
    // const results = Repo as RepositoryParams[];
    // if (loading) return <Loading/>;
    // if (error) { console.log('err') 
    //    return <AlertError error={error}/>;}
    // if (!after && !prefix && results && results.length === 0 ) {
        
    //     toggleShowActionsBar();
    //     return <GetStarted onCreateEmptyRepo={onCreateEmptyRepo} creatingRepo={creatingRepo} createRepoError={createRepoError}/>;
    // }
    // toggleShowActionsBar();
    const {response,loading,error} = useAPI(() => repositories.listRepository(),[refresh]);

    if (loading) return <Loading/>;
    if (error) { console.log('err') 
       return <AlertError error={error}/>;}
    if(response){
        console.log('list:' , response);
    return (
        <div>
            {
                response.map((repo)=>{
                    console.log(Date.parse(repo.CreatedAt));
                    return(
                <Row key={repo.ID}>
                    <Col className={"mb-2 mt-2"}>
                        <Card>
                            <Card.Body>
                                <h5>
                                    <Link href={{
                                        pathname: `/repositories/:repoId/objects`,
                                        params: {repoId: repo.Name}
                                    }}>
                                        {repo.Name}
                                    </Link>
                                </h5>
                                <p>
                                    <small>
                                        created at <code>{dayjs.unix( Math.floor(Date.parse(repo.CreatedAt)/1000)).toISOString()}</code> ({dayjs.unix( Math.floor(Date.parse(repo.CreatedAt)/1000)).fromNow()})<br/>
                                        default branch: <code>{repo.HEAD}</code>,{' '}
                                        storage namespace: <code>{repo.Name}</code>
                                    </small>
                                </p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                    )
                })
            }

            {/* <Paginator after={after} nextPage={nextPage} onPaginate={onPaginate}/> */}
        </div>
    );}
};
