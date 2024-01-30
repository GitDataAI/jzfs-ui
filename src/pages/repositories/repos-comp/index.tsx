import React, {useState} from "react";
import {Button,Col,Card,Row,Modal} from "react-bootstrap";

import {RepoIcon} from "@primer/octicons-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { AlertError, Loading} from "../../../lib/components/controls";
import {cache} from '../../../lib/api';
import {RepositoryCreateForm} from "../../../lib/components/repoCreateForm";
import { useAPIWithPagination} from "../../../lib/hooks/api";
import {Link} from "../../../lib/components/nav";
import { CreateRepositoryButtonProps, CreateRepositoryModalProps, GetStartedProps, GettingStartedCreateRepoButtonProps, RepositoryListProps } from "../interface/repos_interface";
import {users } from "../../../lib/api/interface/index";
import { useRouter } from "../../../lib/hooks/router";

dayjs.extend(relativeTime);

export const CreateRepositoryButton: React.FC<CreateRepositoryButtonProps> = ({variant = "success", enabled = false, onClick,word= 'Create Repository',style={}}) => {
    return (
        <Button variant={variant} disabled={!enabled} onClick={onClick} style={style}>
            <RepoIcon/> {word}
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
export const RepositoryList = ({refresh,prefix, after,amount=5,onPaginate}) => {
    const user = cache.get('user')
    const router = useRouter()
    if(user){
        const {results, loading, error, nextPage} = useAPIWithPagination( async() => {
                // query={prefix, after,amount}
                return  await users.listRepository(user)
     
        }, [refresh, prefix, after]);
        if (loading) return <Loading/>;
        if (error) { 
            return <AlertError error={error}/>;}
            if(results){
                return (
                    <div>
                        {
                            results.map((repo)=>{
                                return(
                            <Row key={repo.id}>
                                <Col className={"mb-2 mt-2"}>
                                    <Card>
                                        <Card.Body>
                                            <h5>
                                                <Link href={{
                                                    pathname: `/repositories/:user/:repoId/objects`,
                                                    params: {repoId: repo.name,user},
                                                }}>
                                                    {repo.name}
                                                </Link>
                                            </h5>
                                            <p>
                                                <small>
                                                    created at <code>{dayjs.unix(Math.floor(repo.created_at)/1000).toISOString()}</code> ({dayjs.unix( Math.floor(repo.created_at)/1000).fromNow()})<br/>
                                                    default branch: <code>{repo.head}</code>,{' '}
                                                    storage namespace: <code>{repo.name}</code>
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
        }else{
            router.push('/auth/login')
        }
};
