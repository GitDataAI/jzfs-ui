import {AuthenticationError, AuthorizationError, DEFAULT_LISTING_AMOUNT, NotFoundError, RepositoryDeletionError, apiRequest, extractError, qs} from "../index"
import { QueryParams, RepositoryParams } from "../interface";

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

    async list(prefix = "", after:QueryParams = "", amount = DEFAULT_LISTING_AMOUNT) {
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
       
    // 创建新的仓库，返回一个JSON
    async createRepository(user: string, name: string, description: string = '') {
        let headers = new Headers()
        headers.append("Content-Type", "application/json")
        const response = await apiRequest(`/users/repos`, { 
            method: 'POST', 
            body: JSON.stringify({user, name, description}) 
        }, headers);
        if (!response.ok) {
            const errorBody = await extractError(response);
            switch (response.status) {
                case 400:
                    throw new Error(`Validation Error: ${errorBody}`);
                case 401:
                    throw new AuthenticationError(errorBody, response.status);
                case 403:
                    throw new Error(`Forbidden: ${errorBody}`);
                default:
                    throw new Error(`Unhandled error status: ${response.status}`);
            }
        }
        return response.json();
    }
    // 获取仓库，返回一个JSON
    async getRepository(user: string, repoId: string) {
    const response = await apiRequest(`/${user}/${repoId}`, { method: 'GET' });
    if (!response.ok) {
        const errorBody = await extractError(response);
        switch (response.status) {
            case 400:
                throw new Error(`Validation Error: ${errorBody}`);
            case 401:
                throw new AuthenticationError(errorBody, response.status);
            case 403:
                throw new Error(`Forbidden: ${errorBody}`);
            default:
                throw new Error(`Unhandled error status: ${response.status}`);
        }
    }
    return response.json();
    }
    // 删除仓库
    async deleteRepository(user: string, repoId: string) {
    const response = await apiRequest(`/${user}/${repoId}`, { method: 'DELETE' });
    if (!response.ok) {
        const errorBody = await extractError(response);
        switch (response.status) {
            case 400:
                throw new Error(`Validation Error: ${errorBody}`);
            case 401:
                throw new AuthenticationError(errorBody, response.status);
            case 403:
                throw new Error(`Forbidden: ${errorBody}`);
            default:
                throw new Error(`Unhandled error status: ${response.status}`);
        }
    }
    return response.json();
    }

    // 更新仓库
    async updateRepository(user: string, repoId: string, repo: RepositoryParams) {
    const response = await apiRequest(`/${user}/${repoId}`, { method: 'POST', body: JSON.stringify(repo) });
    if (!response.ok) {
        const errorBody = await extractError(response);
        switch (response.status) {
            case 400:
                throw new Error(`Validation Error: ${errorBody}`);
            case 401:
                throw new AuthenticationError(errorBody, response.status);
            case 403:
                throw new Error(`Forbidden: ${errorBody}`);
            default:
                throw new Error(`Unhandled error status: ${response.status}`);
        }
    }
    return response.json();
    }
    // 获取用户的仓库列表，返回一个array
    async listRepository() {
        const response = await apiRequest(`/users/repos`, { method: 'GET' });
        if (!response.ok) {
            const errorBody = await extractError(response);
            switch (response.status) {
                case 400:
                    throw new Error(`Validation Error: ${errorBody}`);
                case 401:
                    throw new AuthenticationError(errorBody, response.status);
                case 403:
                    throw new Error(`Forbidden: ${errorBody}`);
                default:
                    throw new Error(`Unhandled error status: ${response.status}`);
            }
        }
        return response.json();
    }
}
