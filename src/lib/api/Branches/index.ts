import {BadRequestError, DEFAULT_LISTING_AMOUNT, NotFoundError, apiRequest, cache, extractError, qs} from "../index"
export class Branches {

    async get(repoId:string, branchId:string) {
        const response = await apiRequest(`/repositories/${encodeURIComponent(repoId)}/branches/${encodeURIComponent(branchId)}`);
        if (response.status === 400) {
            throw new BadRequestError('invalid get branch request');
        } else if (response.status === 404) {
            throw new NotFoundError(`could not find branch ${branchId}`);
        } else if (response.status !== 200) {
            throw new Error(`could not get branch: ${await extractError(response)}`);
        }
        return response.json();
    }

    async create(repoId:string, name:string, source:string) {
        const response = await apiRequest(`/repositories/${encodeURIComponent(repoId)}/branches`, {
            method: 'POST',
            body: JSON.stringify({name, source}),
        });
        if (response.status !== 201) {
            throw new Error(await extractError(response));
        }
        return response;
    }

    async delete(repoId:string, name:string) {
        const response = await apiRequest(`/repositories/${encodeURIComponent(repoId)}/branches/${encodeURIComponent(name)}`, {
            method: 'DELETE',
        });
        if (response.status !== 204) {
            throw new Error(await extractError(response));
        }
    }

    async reset(repoId:string, branch:string, options:any) {
        const response = await apiRequest(`/repositories/${encodeURIComponent(repoId)}/branches/${encodeURIComponent(branch)}`, {
            method: 'PUT',
            body: JSON.stringify(options),
        });
        if (response.status !== 204) {
            throw new Error(await extractError(response));
        }
    }

    async list(repoId:string, prefix = "", after = "", amount = DEFAULT_LISTING_AMOUNT) {
        const query = qs({prefix, after, amount});
        const response = await apiRequest(`/repositories/${encodeURIComponent(repoId)}/branches?` + query);
        if (response.status !== 200) {
            throw new Error(`could not list branches: ${await extractError(response)}`);
        }
        return response.json();
    }
    // 获取分支
    async  getBranch(repository: string, refName: string) {
        const user = cache.get('user')
        const response = await apiRequest(`/repos/${user}/${repository}/branch?refName=${refName}`);
        if (response.status !== 200) {
            throw new Error(`Could not get branch: ${await extractError(response)}`);
        }
        return response.json();
    }
    // 删除分支
    async  deleteBranch( repository: string, refName: string) {
        const user = cache.get('user')
        const response = await apiRequest(`/repos/${user}/${repository}/branch?refName=${refName}`, { method: 'DELETE' });
        if (response.status !== 204) {
            throw new Error(`Could not delete branch: ${await extractError(response)}`);
        }
        return response.status;
    }
    // 创建分支
    async  createBranch(repository: string, branchCreation: any) {
        const user = cache.get('user')
        const response = await apiRequest(`/repos/${user}/${repository}/branch`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(branchCreation)
        });
        if (response.status !== 201) {
            throw new Error(`Could not create branch: ${await extractError(response)}`);
        }
        return response.json();
    }
    // 获取所有分支
    async  listBranches(repository: string) {
        const user = cache.get('user')
        const response = await apiRequest(`/repos/${user}/${repository}/branches`);
        if (response.status !== 200) {
            throw new Error(`Could not list branches: ${await extractError(response)}`);
        }
        return response.json();
    }
    
}
