import React, {useState} from "react";

import dayjs from "dayjs";
import {BrowserIcon, LinkIcon, PackageIcon, PlayIcon} from "@primer/octicons-react";

import {cache, commits} from "../../../../lib/api";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

import {
    ActionGroup,
    ActionsBar,
    ClipboardButton,
    AlertError,
    LinkButton,
    Loading, RefreshButton
} from "../../../../lib/components/controls";
import {RepositoryPageLayout} from "../../../../lib/components/repository/layout";
import {useRefs} from "../../../../lib/hooks/repo";
import {useAPI, useAPIWithPagination} from "../../../../lib/hooks/api";
import {Paginator} from "../../../../lib/components/pagination";
import RefDropdown from "../../../../lib/components/repository/refDropdown";
import {Link} from "../../../../lib/components/nav";
import {useRouter} from "../../../../lib/hooks/router";
import {Route, Routes} from "react-router-dom";
import RepositoryCommitPage from "./commit";
import {RepoError} from "../repo-comp/error/error";
import {  CommitWidgetProps, CommitsBrowserProps } from "../../interface/repo_interface";
import { repos } from "../../../../lib/api/interface/Api";


const CommitWidget:React.FC<CommitWidgetProps> = ({ repo,reference, commit }) => {

    const buttonVariant = "outline-dark";
    const user = commit.committer.name;
    return (
        <ListGroup.Item>
            <div className="clearfix">
                <div className="float-start">
                    <h6>
                        <Link href={{
                            pathname: '/repositories/:user/:repoId/commits/:commitId',
                            params: {repoId: repo.name, commitId: commit.hash,user}
                        }}>
                            {commit.message}
                        </Link>
                    </h6>
                    <p>
                        <small>
                            <strong>{commit.committer.name}</strong> committed at <strong>{commit.committer.when}</strong> ({dayjs.unix(Date.parse(commit.committer.when)/1000).fromNow()})
                        </small>
                    </p>
                </div>
                <div className="float-end">
                    <ButtonGroup className="commit-actions">
                        <LinkButton
                            buttonVariant="outline-dark"
                            href={{
                                pathname: '/repositories/:user/:repoId/commits/:commitId',
                                params: {repoId: repo.name, commitId: commit.hash,user},
                                query:{ref:reference.name}
                            }}>
                            <code>{commit.hash.substr(0, 16)}</code>
                        </LinkButton>
                        {/* <LinkButton
                            buttonVariant={buttonVariant}
                            href={{pathname: '/repositories/:user/:repoId/actions', query: {commit:{}}, params: {repoId: repo.name,user}}}
                            tooltip="View Commit Action runs">
                            <PlayIcon/>
                        </LinkButton> */}
                        <ClipboardButton variant={buttonVariant} text={commit.hash} tooltip="Copy ID to clipboard"/>
                        <ClipboardButton variant={buttonVariant} text={`jzfs://${repo.name}/${commit.hash}`} tooltip="Copy URI to clipboard" icon={<LinkIcon/>}/>
                        <ClipboardButton variant={buttonVariant} text={`s3://${repo.name}/${commit.hash}`} tooltip="Copy S3 URI to clipboard" icon={<PackageIcon/>}/>
                        <LinkButton
                            buttonVariant="outline-dark"
                            href={{pathname: '/repositories/:user/:repoId/objects', params: {repoId: repo.name,user}, query: {ref: reference.name}}}
                            tooltip="Browse objects at this commit">
                            <BrowserIcon/>
                        </LinkButton>

                    </ButtonGroup>
                </div>
            </div>
        </ListGroup.Item>
    );
}


const CommitsBrowser:React.FC<CommitsBrowserProps> = ({ repo, reference, after, onPaginate, onSelectRef }) => {

    const [refresh, setRefresh] = useState(true)
    const user = cache.get('user')
    const { response, error, loading,  } = useAPI(async () => {
        return await repos.getCommitsInRepository(user, repo.name)
    }, [repo.name, reference.id, refresh, after])
    const results =  response;
    console.log('commit:', results);
    
    if (loading) return <Loading/>
    if (error) return <AlertError error={error}/>
    if(results)
    return (
        <div className="mb-5">

            <ActionsBar>
                <ActionGroup orientation="left">
                    <RefDropdown
                        repo={repo}
                        selected={(reference) ? reference : null}
                        withCommits={true}
                        withWorkspace={false}
                        selectRef={onSelectRef} 
                        onCancel={undefined}                    />
                </ActionGroup>

                <ActionGroup orientation="right">
                    <RefreshButton onClick={() => { setRefresh(!refresh); }}/>
                </ActionGroup>
            </ActionsBar>

            <Card>
                <ListGroup variant="flush">
                {results.data.map(commit => (
                    <CommitWidget key={commit.hash} reference={reference} repo={repo} commit={commit}/>
                ))}
                </ListGroup>
            </Card>
            {/* <Paginator onPaginate={onPaginate} nextPage={nextPage} after={after}/> */}
        </div>
    )


}


const CommitsContainer = () => {
    const router = useRouter();
    const { after } = router.query;
    const { repo, reference, loading ,error } = useRefs();
    console.log('repo:',repo,'reference:',reference);
    const user = cache.get('user')
    if (loading) return <Loading/>;
    if (error) return <RepoError error={error}/>;

    const params = {repoId: repo.name,user};

    return (
        <CommitsBrowser
            repo={repo}
            reference={reference}
            onSelectRef={ref => router.push({
                pathname: `/repositories/:user/:repoId/commits`,
                query: {ref:  ref.name},
                params
            })}
            after={(after) ? after : ""}
            onPaginate={after => router.push({
                    pathname: `/repositories/:user/:repoId/commits`,
                    query: {ref: reference.name, after},
                    params
                })}
        />
    );
};


const RepositoryCommitsPage = () => {
    return (
        <RepositoryPageLayout activePage={'commits'}>
            <CommitsContainer/>
        </RepositoryPageLayout>
    );
};

const RepositoryCommitsIndexPage = () => {
    return (
        <Routes>
            <Route path="" element={<RepositoryCommitsPage/>} />
            <Route path=":commitId" element={<RepositoryCommitPage/>} />
        </Routes>
    )
}

export default RepositoryCommitsIndexPage;
