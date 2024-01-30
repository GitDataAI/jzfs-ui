import React, {useState} from "react";

import dayjs from "dayjs";
import {BrowserIcon, LinkIcon, PackageIcon} from "@primer/octicons-react";

import {cache} from "../../../../lib/api";
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
import {useAPI} from "../../../../lib/hooks/api";
import RefDropdown from "../../../../lib/components/repository/refDropdown";
import {Link} from "../../../../lib/components/nav";
import {useRouter} from "../../../../lib/hooks/router";
import {Route, Routes} from "react-router-dom";
import RepositoryCommitPage from "./commit";
import {RepoError} from "../repo-comp/error/error";
import {  CommitWidgetProps, CommitsBrowserProps } from "../../interface/repo_interface";
import { repos } from "../../../../lib/api/interface/index";


const CommitWidget:React.FC<CommitWidgetProps> = ({ repo,reference, commit }) => {

    const buttonVariant = "outline-dark";
    const user = commit.committer.name;
    
    return (
        <ListGroup.Item>
            <div className="clearfix">
                <div className="float-start">
                    <h6>
                        <Link 
                        href={
                            {
                            pathname: '/repositories/:user/:repoId/commits/:commitId',
                            params: {repoId: repo.name, commitId: commit.hash,user},
                            query:{ref:reference.name,basedhash:commit.parent_hashes[0],message:commit.message,committer:commit.committer.name,commitDate:commit.committer.when
                            }
                        }}
                        >
                            {commit.message}
                        </Link>
                    </h6>
                    <p>
                        <small>
                            <strong>{commit.committer.name}</strong> committed at <strong>{dayjs.unix(commit.committer.when/1000).format("MM/DD/YYYY HH:mm:ss")}</strong> 
                            ({dayjs.unix(commit.committer.when/1000).fromNow()})
                        </small>
                    </p>
                </div>
                <div className="float-end">
                    <ButtonGroup className="commit-actions">
                        <LinkButton
                            buttonVariant="outline-dark"
                            href={
                                {
                                pathname: '/repositories/:user/:repoId/commits/:commitId',
                                params: {repoId: repo.name, commitId: commit.hash,user},
                                query:{ref:reference.name,basedhash:commit.parent_hashes[0],message:commit.message,committer:commit.committer.name,commitDate:commit.committer.when
                                }
                            }}
                            >
                            <code>{commit.hash.substr(0, 16)}</code>
                        </LinkButton>
                        <ClipboardButton variant={buttonVariant} text={commit.hash} tooltip="Copy ID to clipboard"/>
                        <ClipboardButton variant={buttonVariant} text={`jzfs://${repo.name}/${commit.hash}`} tooltip="Copy URI to clipboard" icon={<LinkIcon/>}/>
                        <ClipboardButton variant={buttonVariant} text={`s3://${repo.name}/${commit.hash}`} tooltip="Copy S3 URI to clipboard" icon={<PackageIcon/>}/>
                        <LinkButton
                            buttonVariant="outline-dark"
                            href={{pathname: '/repositories/:user/:repoId/objects', params: {repoId: repo.name,user}, query: {ref: reference.name,commitId: commit.hash}}}
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
    const router = useRouter()
    const [refresh, setRefresh] = useState(true)
    const user = cache.get('user')
    const { response, error, loading,  } = useAPI(async () => {
        return await repos.getCommitsInRef(user, repo.name,{refName:reference.name})
    }, [repo.name, reference.name, refresh, after])
    const results =  response;
    
    if (loading) return <Loading/>
    if (error) return <AlertError error={error}/>
    if(results)
    return (
        <div className="mb-5">

            <ActionsBar>
                <ActionGroup orientation="left">
                    <RefDropdown
                        repo={repo}
                        selected={reference}                        
                        withCommits={true}
                        withWorkspace={true}
                        selectRef={(ref) => router.push({
                            pathname: `/repositories/:user/:repoId/commits`,
                            params: {
                              repoId: repo.name,
                              user,
                            },
                            query: { ref:ref.id }
                          })} 
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
