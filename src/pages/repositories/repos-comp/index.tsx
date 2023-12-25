import React, {useEffect, useState} from "react";
import {Button,Col,Card,Row,Alert,Modal,Spinner} from "react-bootstrap";

import {RepoIcon} from "@primer/octicons-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { AlertError, Loading} from "../../../lib/components/controls";
import {cache, config, repositories, setup} from '../../../lib/api';
import {RepositoryCreateForm} from "../../../lib/components/repoCreateForm";
import {useAPI, useAPIWithPagination} from "../../../lib/hooks/api";
import {Link} from "../../../lib/components/nav";
import { CreateRepositoryButtonProps, CreateRepositoryModalProps, GetStartedProps, GettingStartedCreateRepoButtonProps, RepositoryListProps } from "../interface/repos_interface";
import { Repository, users } from "../../../lib/api/interface/Api";

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
export const RepositoryList = ({refresh,prefix, after,amount}) => {

    const user = cache.get('user')

    const {results, loading, error, nextPage} = useAPIWithPagination( async() => {
        if(prefix&&after&&amount)
        {
            return  await users.listRepository(user,{prefix, after,amount})
        }else{
            return  await users.listRepository(user)
        }
    }, [refresh, prefix, after]);
    
    if (loading) return <Loading/>;
    if (error) { 
        console.log('err') 
       return <AlertError error={error}/>;}
    if(results){
        console.log('list:' , results);
    return (
        <div>
            {
                results.map((repo)=>{
                    console.log(Date.parse(repo.CreatedAt));
                    return(
                <Row key={repo.ID}>
                    <Col className={"mb-2 mt-2"}>
                        <Card>
                            <Card.Body>
                                <h5>
                                    <Link href={{
                                        pathname: `/repositories/:user/:repoId/objects`,
                                        params: {repoId: repo.Name,user},
                                    }}>
                                        {repo.Name}
                                    </Link>
                                </h5>
                                <p>
                                    <small>
                                        created at <code>{dayjs.unix( Math.floor(Date.parse(repo.CreatedAt)/1000)).toISOString()}</code> ({dayjs.unix( Math.floor(Date.parse(repo.CreatedAt)/1000)).fromNow()})<br/>
                                        default branch: <code>{repo.Head}</code>,{' '}
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
