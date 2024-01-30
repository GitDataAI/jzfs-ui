import { FeedPersonIcon } from "@primer/octicons-react";
import {   ButtonToolbar, Col, Form, NavDropdown, Navbar, Row } from "react-bootstrap"
import {auth as Auth, cache} from "../api";
import React, { useCallback, useState } from "react";
import { useRouter } from "../hooks/router";
import { useAPIWithPagination } from "../hooks/api";
import { users,auth } from "../api/interface/index";
import { AlertError, Loading } from "./controls";
import {Link} from "../../lib/components/nav";
import {CreateRepositoryModal } from "../../pages/repositories/repos-comp";
const RepositoryList = (refresh,prefix, after) => {
    const router = useRouter()
    const user = cache.get('user')
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
                        <Row key={repo.id} style={{margin:10}}>
                            <Col className={"mb-2 mt-2"}>
                                            <Link href={{
                                                pathname: `/repositories/:user/:repoId/objects`,
                                                params: {repoId: repo.name,user},
                                            }}>
                                                <strong>{user+'/'}{repo.name}</strong>
                                            </Link>
                            </Col>
                        </Row>
                            )
                        })
                    }
                </div>
            );}
    }else{
        router.push('/auth/login')
    }

};

const Leftnav = () =>{
    const router = useRouter()
    const [refresh, setRefresh] = useState(false);
    const [creatingRepo, setCreatingRepo] = useState(false);
    const [createRepoError, setCreateRepoError] = useState(null);
    const [sampleRepoChecked, setSampleRepoChecked] = useState(false);
    const [showCreateRepositoryModal, setShowCreateRepositoryModal] = useState(false);

    const createRepo = async (repo: RepositoryParams, presentRepo = true) => {
        try {
            setCreatingRepo(true);
            setCreateRepoError(null);
            await users.createRepository(repo);
            setRefresh(!refresh);
            if (presentRepo) {
                router.push({pathname: `/repositories/:user/:repoId/objects`, params: {repoId: repo.Name,user:owner},query:{}});
            }
            return true;
        } catch (error: any) {
            setCreatingRepo(false);
            setCreateRepoError(error);
            return false;
        }
    };

    const createRepositoryButtonCallback = useCallback(() => {
        setSampleRepoChecked(false);
        setShowCreateRepositoryModal(true);
        setCreateRepoError(null);
    }, [showCreateRepositoryModal, setShowCreateRepositoryModal]);

    const NavUserInfo = () => {
        const user = cache.get("user")
        const logoutUrl = "/auth/login"
    
    
        const NavBarTitle = () => {
            return (
            <>
                {/* {<div className="user-menu-notification-indicator"></div>} */}
                <FeedPersonIcon size={28} verticalAlign={"middle"}/> <span style={{marginLeft:6, fontSize:18}}>{user} </span>
            </>
            )
        }
        return (
            <NavDropdown title={<NavBarTitle />} className="navbar-username" align="end">
                <NavDropdown.Item
                    onClick={async()=> {
                        Auth.clearCurrentUser();
                        window.location = logoutUrl;
                        await auth.logout();
                    }}>
                    Logout
                </NavDropdown.Item>
            </NavDropdown>
        );
    };
    
    return(
        <Row className="sidebar">
        <Navbar className="leftNav">
        <NavUserInfo />      
        </Navbar>
        <Form className='flex'>
            <Col className="d-flex">
            {/* <strong>Top Repositories</strong> */}
            <ButtonToolbar className="ms-auto mb-2">
                {/* <CreateReposi   toryButton variant={"success"} enabled={true} onClick={createRepositoryButtonCallback} word={'New'} style={{fontSize: '10px'}}/> */}
            </ButtonToolbar>            
            </Col>
          <RepositoryList
                    prefix={''}
                    refresh={refresh}
                    after={(router.query.after) ? router.query.after : ""}
                    />
        </Form>
        <CreateRepositoryModal
                    onCancel={() => {
                        setShowCreateRepositoryModal(false);
                        setCreateRepoError(null);
                    }}
                    show={showCreateRepositoryModal}
                    setShow = {setShowCreateRepositoryModal}
                    error={createRepoError}
                    setRefresh = {setRefresh}
                    onSubmit={(repo) => createRepo(repo, true)}
                    samlpleRepoChecked={sampleRepoChecked}
                    inProgress={creatingRepo}
                    refresh = {refresh}
                    />
        </Row>
    );
  }

export default Leftnav