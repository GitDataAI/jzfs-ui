import React, {useState} from "react";
import {Button,Card,Modal} from "react-bootstrap";

import {RepoIcon} from "@primer/octicons-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { AlertError, Loading} from "../../../lib/components/controls";
import {cache} from '../../../lib/api';
import {RepositoryCreateForm} from "../../../lib/components/repoCreateForm";
import { useAPIWithPagination} from "../../../lib/hooks/api";
import {Link} from "../../../lib/components/nav";
import { CreateRepositoryButtonProps, CreateRepositoryModalProps} from "../interface/repos_interface";
import {users } from "../../../lib/api/interface/index";
import { useRouter } from "../../../lib/hooks/router";
import { Repository } from "../../../lib/api/interface/Api";

dayjs.extend(relativeTime);

export const CreateRepositoryButton: React.FC<CreateRepositoryButtonProps> = ({variant = "success", enabled = false, onClick,word= 'New Repository',style={}}) => {
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

export const RepositoryList = ({refresh,setRepoAmount,search,filter=''}:{refresh:boolean,setRepoAmount:React.Dispatch<React.SetStateAction<number>>,search:string,filter:string}) => {
    const user = cache.get('user')
    const router = useRouter()
    
    const Storage = ({storage})=>{
        return(
        <span className="storage">{storage?'public':'private'}</span>
        )
    }
    if(user){
        const {results, loading, error} = useAPIWithPagination( async() => {
                return  await users.listRepository(user).then((results)=>{
                    if(search && !filter ){
                        results.data.results = results.data.results.filter((item)=>{
                            return item.name.toLowerCase().includes(search.toLowerCase());
                        })
                    }else if(filter && !search){
                        results.data.results = results.data.results.filter((item)=>{
                            return item.use_public_storage == (filter == 'Public')
                        })
                    }
                    setRepoAmount(results.data.results.length)
                    return results
                })
        }, [refresh,search,filter]);
        if (loading) return <Loading/>;
        if (error) { 
            return <AlertError error={error}/>;}
            if(results){                
                return (
                    <div>
                        {results.map((repo:Repository)=>{   
                                return(  
                                    <Card key={repo.id}>
                                        <Card.Body>
                                            <h5>
                                                <Link href={{
                                                    pathname: `/repositories/:user/:repoId/objects`,
                                                    params: {repoId: repo.name,user},
                                                }}>
                                                    {repo.name} <Storage storage={repo.use_public_storage}/>
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
                                )
                            })
                        }
                    </div>
                );}
        }else{
            router.push('/login')
        }
};
