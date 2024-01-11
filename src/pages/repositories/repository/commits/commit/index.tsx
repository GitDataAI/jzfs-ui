import React, {useState} from "react";
import {RepositoryPageLayout} from "../../../../../lib/components/repository/layout";
import {AlertError, Loading} from "../../../../../lib/components/controls";
import {useRefs} from "../../../../../lib/hooks/repo";
import {useAPI, useAPIWithPagination} from "../../../../../lib/hooks/api";
import {cache, commits, refs} from "../../../../../lib/api";
import {ChangesTreeContainer, defaultGetMoreChanges} from "../../../../../lib/components/repository/changes";
import {useRouter} from "../../../../../lib/hooks/router";
import {URINavigator} from "../../../../../lib/components/repository/tree";
import {appendMoreResults} from "../../repo-comp/changes/changes";
import {CommitInfoCard} from "../../../../../lib/components/repository/commits";
import { repos } from "../../../../../lib/api/interface/Api";
import { Alert, Card, Table } from "react-bootstrap";

const ChangesContainer = ({changes,commit})=>{
    return(
        <>
         <Card>
                        <Card.Header>
                                <span className="float-start">
                                    {commit.commitId}
                                </span>
                        </Card.Header>
                        <Card.Body>
                            <Table borderless size="sm">
                                <tbody>
                                {changes.map(change => {
                                    let action
                                    switch (change.action) {
                                        case 1:
                                            action = 'upload'
                                            break;
                                        case 2:
                                            action = 'delete'
                                            break;
                                        case 3:
                                            action = 'updata'
                                            break;
                                        default:
                                            return <AlertError error={"Unsupported diff type " + change.action}/>;
                                    } 
                                    return (
                                        <div className="changeList">
                                        Change file:<code>{change.path}</code> 
                                        <span>Change ID: <code>{change.base_hash}</code></span>
                                        <span>Change action:<code>{action}</code></span>
                                        </div>                                        
                                        );
                                })}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
        </>
    )
}

const ChangeList = ({ repo, change,commit}) => {
    const [actionError, setActionError] = useState(null);
    const actionErrorDisplay = (actionError) ?
        <AlertError error={actionError} onDismiss={() => setActionError(null)}/> : <></> 
    const commitSha = commit.commitId.substring(0, 12);
    
    const changesTreeMessage = <p>Showing changes for commit <strong>{commitSha}</strong></p>
    return (    
        <>
            {actionErrorDisplay}
            {changesTreeMessage}
            <ChangesContainer  changes={change} commit={commit}/>
        </>
    )
};

const CommitView = ({ repo, commitId,commitDate, committer,basedhash,message}) => {
    // pull commit itself
    const user = cache.get('user')
    const {response, loading, error} = useAPI(async () => {
        return await repos.getCommitChanges(user,repo.name,commitId);
    }, [repo.name, commitId]);
    const commit = {commitId,basedhash,message,commitDate, committer}
    if (loading) return <Loading/>;
    if (error) return <AlertError error={error}/>;

    const results = response.data;
    if (results.length === 0) {
        return <div className="tree-container">
            <Alert variant="info">No changes</Alert>
        </div>
    }else{
    return (
            <div className="mb-5 mt-3">
            <CommitInfoCard repo={repo} commit={commit}/>
            <div className="mt-4">
                <ChangeList
                    repo={repo}
                    commit={commit}
                    change={results}
                />
            </div>
        </div>
        )
       
    }
};

const CommitContainer = () => {
    const router = useRouter();
    const { repo, loading, error } = useRefs();
    const { prefix,ref,basedhash,message,committer,commitDate} = router.query;
    const { commitId ,user} = router.params;
    console.log('router:',router);
    
    if (loading) return <Loading/>;
    if (error) return <AlertError error={error}/>;

    return (
        <CommitView
            repo={repo}
            prefix={(prefix) ? prefix : ""}
            commitId={commitId}
            basedhash={basedhash}
            message={message}
            committer={committer}
            commitDate={commitDate}
            onNavigate={(entry) => {
                return {
                    pathname: '/repositories/:user/:repoId/commits/:commitId',
                    params: {repoId: repo.name, commitId: commitId,user},
                    query: {
                        prefix: entry.path,
                        ref:ref
                    }
                }
            }}
        />
    )
}

const RepositoryCommitPage = () => {
    return (
        <RepositoryPageLayout activePage={'commits'}>
            <CommitContainer/>
        </RepositoryPageLayout>
    )
}

export default RepositoryCommitPage;
