import queryString from "query-string"
import {AuthenticationError, DEFAULT_LISTING_AMOUNT, NotFoundError, apiRequest, cache, extractError, qs} from "../index"
import { params } from "../interface";

export class Commits {
    async log(repoId:string, refId:string, after = "", amount = DEFAULT_LISTING_AMOUNT) {
        const query = qs({after, amount});
        const response = await apiRequest(`/repositories/${encodeURIComponent(repoId)}/refs/${encodeURIComponent(refId)}/commits?` + query);
        if (response.status !== 200) {
            throw new Error(await extractError(response));
        }
        return response.json();
    }

    async blame(repoId:string, refId:string, path:string, type:string) {
        const params:params = {amount: 1,objects:'',prefixes:''};
        if (type === 'object') {
            params.objects = path
        } else {
            params.prefixes = path
        }
        const response = await apiRequest(`/repositories/${encodeURIComponent(repoId)}/refs/${encodeURIComponent(refId)}/commits?${qs(params)}`);
        if (response.status !== 200) {
            throw new Error(await extractError(response));
        }
        const data = await response.json();
        if (data.results.length >= 1) {
            return data.results[0] // found a commit object
        }
        return null // no commit modified this
    }

    async get(repoId:string, commitId:string) {
        const response = await apiRequest(`/repositories/${encodeURIComponent(repoId)}/commits/${encodeURIComponent(commitId)}`);
        if (response.status === 404) {
            throw new NotFoundError(`could not find commit ${commitId}`);
        } else if (response.status !== 200) {
            throw new Error(`could not get commit: ${await extractError(response)}`);
        }
        return response.json();
    }

    async commit(repoId:string, branchId:string, message:string, metadata = {}, source_metarange = "") {
        const requestURL = queryString.stringifyUrl({
            url: `/repositories/${repoId}/branches/${branchId}/commits`,
            query: {source_metarange: source_metarange}
        });
        const parsedURL = queryString.exclude(requestURL, (_name, value) => value === "", {parseNumbers: true});
        const response = await apiRequest(parsedURL, {

            method: 'POST',
            body: JSON.stringify({message, metadata}),
        });

        if (response.status !== 201) {
            throw new Error(await extractError(response));
        }
        return response.json();
    }
     // 列出特定提交中的条目，返回一个JSON
     async getEntriesInCommit(repoId: string, commitHash: string, path: string = '') {
        const user = cache.get('user')
        const response = await apiRequest(`/${user}/${repoId}/commit/ls/${commitHash}?path=${path}`, { method: 'GET' });
        if (!response.ok) {
            const errorBody = await extractError(response);
            switch (response.status) {
                case 400:
                    throw new Error(`Validation Error: ${errorBody}`);
                case 401:
                    throw new AuthenticationError(errorBody, response.status);
                case 403:
                    throw new Error(`Forbidden: ${errorBody}`);
                case 404:
                    throw new Error(`URL Not Found: ${errorBody}`);
                default:
                    throw new Error(`Unhandled error status: ${response.status}`);
            }
        }
        return response.json();
    }
    // 获取两个提交之间的差异，返回一个JSON
    async getCommitDiff(repoId: string, baseCommit: string, toCommit: string, path: string = '') {
        const user = cache.get('user')
        const response = await apiRequest(`/${user}/${repoId}/commit/diff/${baseCommit}/${toCommit}?path=${path}`, { method: 'GET' });
        if (!response.ok) {
            const errorBody = await extractError(response);
            switch (response.status) {
                case 400:
                    throw new Error(`Validation Error: ${errorBody}`);
                case 401:
                    throw new AuthenticationError(errorBody, response.status);
                case 503:
                    throw new Error(`Server Internal Error: ${errorBody}`);
                default:
                    throw new Error(`Unhandled error status: ${response.status}`);
            }
        }
        return response.json();
    }
    // 获取仓库的提交信息
    async  getCommitsInRepository(repository: string, refName?: string) {
        const user = cache.get('user')
        let url = `/repos/${user}/${repository}/commits`;
        if (refName) {
            url += `?refName=${refName}`;
        }
        const response = await apiRequest(url);
        if (response.status !== 200) {
            throw new Error(`Could not get commits: ${await extractError(response)}`);
        }
        return response.json();
    }
    
}