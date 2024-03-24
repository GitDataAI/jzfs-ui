import React from "react";
// import { useLocalStorage } from "usehooks-ts";

import Container from "react-bootstrap/Container";
import Breadcrumb from "react-bootstrap/Breadcrumb";

import {useRefs} from "../../hooks/repo";
import Layout from "../layout";
import {RepositoryNavTabs} from "./tabs";
import {Link} from "../nav";
// import { config } from "../../api";
// import { useAPI } from "../../hooks/api";
// import RepoOnboardingChecklistSlider from "./repoOnboardingChecklistSlider";
import { RepositoryPageLayoutProps } from "../interface/comp_interface";
import { cache } from "../../api";

const RepoNav = () => {
    const { repo } = useRefs();
    const repoId = (repo) ? repo.name : '#';
    const user = cache.get('user')
    return (
        <Breadcrumb className="to-repo">
            <Link href={{pathname: '/repositories'}} component={Breadcrumb.Item}>
                Repositories
            </Link>
            <Link href={{pathname: '/repositories/:user/:repoId/objects', params: {repoId,user}}} component={Breadcrumb.Item}>
                {repoId}
            </Link>
        </Breadcrumb>

    )
};

export const RepositoryPageLayout:React.FC<RepositoryPageLayoutProps> = ({ activePage, children, fluid = "sm" }) => {
    return (
<Layout>
            <div>
                <RepoNav />
                <RepositoryNavTabs active={activePage}/>
                <Container fluid={fluid}>
                    <div className="mt-4">{children}</div>
                </Container>
            </div>
</Layout>
    );
};
