
// 编辑个人仓库页面，为仓库页面与项目详情页面提供路由
import React, {useCallback, useContext, useEffect, useState} from "react";
import {ButtonToolbar,Container} from "react-bootstrap";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import Layout from "../../lib/components/layout";
import {ActionsBar} from "../../lib/components/controls";
import {cache} from '../../lib/api';
import {useRouter} from "../../lib/hooks/router";

import {Route, Routes} from "react-router-dom";
import RepositoryPage from './repository';
import { CreateRepositoryButton, CreateRepositoryModal, RepositoryList } from "./repos-comp";
import {users } from "../../lib/api/interface/index";
import { ActivepageContext } from "../../lib/hooks/conf";
import { activepage } from "../../lib/hooks/interface";


dayjs.extend(relativeTime);

const RepositoriesPage = () => {
    const router = useRouter();
    const [showCreateRepositoryModal, setShowCreateRepositoryModal] = useState(false);
    const [sampleRepoChecked, setSampleRepoChecked] = useState(false);
    const [createRepoError, setCreateRepoError] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const [creatingRepo, setCreatingRepo] = useState(false);

useEffect(()=>{
    if(!cache.get('token')){router.push('/login')}
})
const activepageL:activepage = useContext(ActivepageContext)

useEffect(()=>{
    activepageL.setPage('repositories')
})
    const createRepo = async (repo:{name:string,description:string}, presentRepo = true) => {
        const owner = cache.get('user')
        try {
            setCreatingRepo(true);
            setCreateRepoError(null);
            await users.createRepository(repo);
            setRefresh(!refresh);
            if (presentRepo) {
                router.push({pathname: `/repositories/:user/:repoId/objects`, params: {repoId: repo.name,user:owner},query:{}});
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
                    <h2><strong>Repository List</strong></h2>
                    <ButtonToolbar className="ms-auto mb-2">
                        <CreateRepositoryButton variant={"success"} enabled={true} onClick={createRepositoryButtonCallback} />
                    </ButtonToolbar>
                </ActionsBar> }

                <RepositoryList
                    refresh={refresh}
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

