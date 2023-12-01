import {AuthorizationError, DEFAULT_LISTING_AMOUNT, NotFoundError, RepositoryDeletionError, apiRequest, extractError, qs} from "../index"

export class Repositories {

    async get(repoId:string) {
        const response = await apiRequest(`/repositories/${encodeURIComponent(repoId)}`);
        if (response.status === 404) {
            throw new NotFoundError(`could not find repository ${repoId}`);
        } else if (response.status === 410) {
            throw new RepositoryDeletionError(`Repository in deletion`, repoId);
        } else if (response.status !== 200) {
            throw new Error(`could not get repository: ${await extractError(response)}`);
        }
        return response.json();
    }

    async list(prefix = "", after = "", amount = DEFAULT_LISTING_AMOUNT) {
        const query = qs({prefix, after, amount});
        const response = await apiRequest(`/repositories?${query}`);
        if (response.status !== 200) {
            throw new Error(`could not list repositories: ${await extractError(response)}`);
        }
        return await response.json();
    }

    async create(repo:any) {
        const response = await apiRequest('/repositories', {
            method: 'POST',
            body: JSON.stringify(repo),
        });
        if (response.status !== 201) {
            throw new Error(await extractError(response));
        }
        return response.json();
    }

    async delete(repoId:string) {
        const response = await apiRequest(`/repositories/${encodeURIComponent(repoId)}`, {method: 'DELETE'});
        if (response.status !== 204) {
            throw new Error(await extractError(response));
        }
    }

    async otfDiff(repoId:string, leftRef:string, rightRef:string, tablePath = "", type:string | number | boolean) {
        const query = qs({table_path: tablePath, type});
        const response = await apiRequest(`/repositories/${encodeURIComponent(repoId)}/otf/refs/${encodeURIComponent(leftRef)}/diff/${encodeURIComponent(rightRef)}?` + query);
        if (response.status !== 200) {
            switch (response.status) {
                case 401:
                    throw new AuthorizationError('user unauthorized');
                case 404:
                    throw new NotFoundError(`table ${tablePath} not found`);
                default:
                    throw new Error(await extractError(response));
            }
        }
        return response.json();
    }
}
