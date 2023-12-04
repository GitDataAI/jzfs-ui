import {NotFoundError, apiRequest, extractError, qs} from "../index"

export class Import {

    async get(repoId:string, branchId:string, importId:string) {
        const query = qs({id: importId});
        const response = await apiRequest(`/repositories/${encodeURIComponent(repoId)}/branches/${encodeURIComponent(branchId)}/import?` + query);
        if (response.status === 404) {
            throw new NotFoundError(`could not find import ${importId}`);
        } else if (response.status !== 200) {
            throw new Error(`could not get import status: ${await extractError(response)}`);
        }
        return response.json();
    }

    async create(repoId:string, branchId:string, source:string, prepend:string, commitMessage:string, commitMetadata = {}) {
        const body = {
            "paths": [
                {
                    "path": source,
                    "destination": prepend,
                    "type": "common_prefix",
            }],
            "commit": {
                "message": commitMessage,
                "metadata": {}
            },
        };
        if (Object.keys(commitMetadata).length > 0) {
            body.commit["metadata"] = commitMetadata
        }

        const response = await apiRequest(`/repositories/${encodeURIComponent(repoId)}/branches/${encodeURIComponent(branchId)}/import`, {
            method: 'POST',
            body: JSON.stringify(body),
        });
        if (response.status !== 202) {
            throw new Error(await extractError(response));
        }
        return response.json();
    }

    async delete(repoId:string, branchId:string, importId:string) {
        const query = qs({id: importId});
        const response = await apiRequest(`/repositories/${encodeURIComponent(repoId)}/branches/${encodeURIComponent(branchId)}/import?` + query, {
            method: 'DELETE',
        });
        if (response.status !== 204) {
            throw new Error(await extractError(response));
        }
    }
}