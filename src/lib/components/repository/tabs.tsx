import React from "react";

import Nav from "react-bootstrap/Nav";
import {FileDiffIcon, GitCommitIcon, DatabaseIcon, GitBranchIcon, GitCompareIcon, PlayIcon, GearIcon, TagIcon} from "@primer/octicons-react";

import {useRefs} from "../../hooks/repo";
import {Link, NavItem} from "../nav";
import {useRouter} from "../../hooks/router";
import {RefTypeBranch} from "../../../constants";
import { ActiveTab } from "../interface/comp_interface";



export const RepositoryNavTabs = ({ active }:{active:ActiveTab}) => {
    const { reference } = useRefs();
    const router = useRouter();
    const { repoId,user } = router.params;
    
    


    const withRefContext = (url: string) => {
        const params = new URLSearchParams();
        if (reference) params.append('ref', reference.id);
        if (params.toString())
            return `${url}?${params.toString()}`;
        return url;
    };

    const withRefAndCompareContext = (url: string) => {
        const params = new URLSearchParams();
        if (reference) {
            params.append('ref', reference.name)
            params.append('compare', reference.name);
        }
        if (params.toString())
            return `${url}?${params.toString()}`;
        return url;
    };

    const withBranchContext = (url: string) => {
        const params = new URLSearchParams();
        if (!!reference && reference.type === RefTypeBranch) params.append('ref', reference.name);
        if (params.toString())
            return `${url}?${params.toString()}`;
        return url;
    };

    return (
        <Nav variant="tabs" >
            <Link active={active === 'objects'} href={withRefContext(`/repositories/${user}/${repoId}/objects`)} component={NavItem}>
                <DatabaseIcon/> Objects
            </Link>
            <Link active={active === 'changes'} href={withBranchContext(`/repositories/${user}/${repoId}/changes`)} component={NavItem}>
                <FileDiffIcon/> Uncommitted Changes
            </Link>
            <Link active={active === 'commits'} href={withRefContext(`/repositories/${user}/${repoId}/commits`)} component={NavItem}>
                <GitCommitIcon/> Commits
            </Link>
            <Link active={active === 'branches'} href={`/repositories/${user}/${repoId}/branches`}  component={NavItem}>
                <GitBranchIcon/> Branches
            </Link>
            {/* <Link active={active === 'tags'} href={`/repositories/${user}/${repoId}/tags`} component={NavItem}>
                <TagIcon/> Tags
            </Link>
            <Link active={active === 'compare'} href={withRefAndCompareContext(`/repositories/${user}/${repoId}/compare`)} component={NavItem}>
                <GitCompareIcon/> Compare
            </Link> */}
            {/* <Link active={active === 'actions'} href={`/repositories/${repoId}/actions`} component={NavItem}>
                <PlayIcon/> Actions
            </Link> */}
            <Link active={active === 'settings'} href={`/repositories/${user}/${repoId}/settings`} component={NavItem}>
                <GearIcon/> Settings
            </Link>
        </Nav>
    );
};