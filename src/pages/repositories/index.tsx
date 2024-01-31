
// 编辑个人仓库页面，为仓库页面与项目详情页面提供路由
import React, {useCallback, useEffect, useRef, useState} from "react";
import {Col,Form,InputGroup,ButtonToolbar,Container} from "react-bootstrap";

import {SearchIcon} from "@primer/octicons-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import Layout from "../../lib/components/layout";
import {ActionsBar,useDebouncedState} from "../../lib/components/controls";
import {cache} from '../../lib/api';
import {useRouter} from "../../lib/hooks/router";

import {Route, Routes} from "react-router-dom";
import RepositoryPage from './repository';
import { CreateRepositoryButton, CreateRepositoryModal, RepositoryList } from "./repos-comp";
import { RepositoryParams } from "../../lib/api/interface";
import { useAPI } from "../../lib/hooks/api";
import {users } from "../../lib/api/interface/index";


dayjs.extend(relativeTime);

const RepositoriesPage = () => {
    const router = useRouter();
    const [showCreateRepositoryModal, setShowCreateRepositoryModal] = useState(false);
    const [sampleRepoChecked, setSampleRepoChecked] = useState(false);
    const [createRepoError, setCreateRepoError] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const [creatingRepo, setCreatingRepo] = useState(false);
    const routerPfx = (router.query.prefix) ? router.query.prefix : "";
    const amount = useRef(10)
    const [prefix, setPrefix] = useDebouncedState(
        routerPfx,
        (prefix: string) => router.push({pathname: `/repositories`, query: {prefix}})
    );    
    
useEffect(()=>{
    if(!cache.get('token')){router.push('/login')}
})
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

    return (
        <Layout>
            <Container fluid="xl" className="mt-3">
                {<ActionsBar>
                    <Form style={{minWidth: 300}} onSubmit={e => { e.preventDefault(); }}>
                        <Form.Group>
                            <Col>
                                <InputGroup>
                                    <InputGroup.Text>
                                        <SearchIcon/>
                                    </InputGroup.Text>
                                    <Form.Control
                                        placeholder="Find a repository..."
                                        autoFocus
                                        value={prefix}
                                        onChange={event =>setPrefix(event.target.value)}
                                    />
                                </InputGroup>
                            </Col>
                        </Form.Group>
                    </Form>
                    <ButtonToolbar className="ms-auto mb-2">
                        <CreateRepositoryButton variant={"success"} enabled={true} onClick={createRepositoryButtonCallback} />
                    </ButtonToolbar>
                </ActionsBar> }

                <RepositoryList
                    prefix={prefix}
                    refresh={refresh}
                    amount={amount}
                    after={(router.query.after) ? router.query.after : ""}
                    />

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

            </Container>
        </Layout>
    );
}

const RepositoriesIndex = () => {
    return (
        <Routes>
            <Route path="/" element={<RepositoriesPage/>} />
            <Route path=":user/:repoId/*" element={<RepositoryPage/>} />
        </Routes>
    );
};

export default RepositoriesIndex;

