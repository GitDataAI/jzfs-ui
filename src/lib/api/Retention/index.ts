import {NotFoundError, apiRequest, extractError} from "../index"

export class Retention {
    async getGCPolicy(repoID:string) {
        const response = await apiRequest(`/repositories/${encodeURIComponent(repoID)}/settings/gc_rules`);
        if (response.status === 404) {
            throw new NotFoundError('policy not found')
        }
        if (response.status !== 200) {
            throw new Error(`could not get gc policy: ${await extractError(response)}`);
        }
        return response.json();
    }

    async setGCPolicyPreflight(repoID:string) {
        const response = await apiRequest(`/repositories/${encodeURIComponent(repoID)}/gc/rules/set_allowed`);
        if (response.status !== 204) {
            throw new Error(await extractError(response));
        }
        return response;
    }

    async setGCPolicy(repoID:string, policy:any) {
        const response = await apiRequest(`/repositories/${encodeURIComponent(repoID)}/settings/gc_rules`, {
            method: 'PUT',
            body: policy
        });
        if (response.status !== 204) {
            throw new Error(`could not set gc policy: ${await extractError(response)}`);
        }
        return response;
    }

    async deleteGCPolicy(repoID:string) {
        const response = await apiRequest(`/repositories/${encodeURIComponent(repoID)}/settings/gc_rules`, {
            method: 'DELETE',
        });
        if (response.status !== 204) {
            throw new Error(`could not delete gc policy: ${await extractError(response)}`);
        }
        return response;
    }
}
