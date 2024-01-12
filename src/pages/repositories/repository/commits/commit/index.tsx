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
import ChangeList from "./changesrow";

const CommitView = ({ repo, commitId,commitDate, committer,basedhash,message,refname}) => {
    // pull commit itself
    const [actionError, setActionError] = useState(null);
    const user = cache.get('user')
    const {response, loading, error} = useAPI(async () => {
        return await repos.getCommitChanges(user,repo.name,commitId);
    }, [repo.name, commitId]);
    const commit = {commitId,basedhash,message,commitDate, committer}
    if (loading) return <Loading/>;
    if (error) return <AlertError error={error}/>;
    const actionErrorDisplay = (actionError) ?
        <AlertError error={actionError} onDismiss={() => setActionError(null)}/> : <></> 
    const commitSha = commitId.substring(0, 12);
    
    const changesTreeMessage = <p>Showing changes for commit <strong>{commitSha}</strong></p>
    const results = response.data;
    if (results.length === 0) {
        return <div className="tree-container">
            <Alert variant="info">No changes</Alert>
        </div>
    }else{
    return (
            <div className="mb-5 mt-3">
            <CommitInfoCard repo={repo} commit={commit} refname={refname}/>
            <div className="mt-4">
            {actionErrorDisplay}
            {changesTreeMessage}
            <ChangeList 
            changes={results}
             />
            </div>
        </div>
        )
       
    }
};

const CommitContainer = () => {
    const router = useRouter();
    const { repo, loading, error } = useRefs();
    const { ref:refname,basedhash,message,committer,commitDate} = router.query;
    const { commitId ,user} = router.params;
    console.log('router:',router);
    
    if (loading) return <Loading/>;
    if (error) return <AlertError error={error}/>;
    console.log('ref:',refname);

    return (
        <CommitView
            repo={repo}
            refname={refname}
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
                        ref:refname
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
