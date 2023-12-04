import queryString from "query-string"
import {DEFAULT_LISTING_AMOUNT, NotFoundError, apiRequest, extractError, qs} from "../index"
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
        const parsedURL = queryString.exclude(requestURL, (name, value) => value === "", {parseNumbers: true});
        const response = await apiRequest(parsedURL, {

            method: 'POST',
            body: JSON.stringify({message, metadata}),
        });

        if (response.status !== 201) {
            throw new Error(await extractError(response));
        }
        return response.json();
    }
}