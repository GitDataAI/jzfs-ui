import {NotFoundError, apiRequest, extractError} from "../index"
export class BranchProtectionRules {
    async getRules(repoID:string) {
        const response = await apiRequest(`/repositories/${encodeURIComponent(repoID)}/settings/branch_protection`);
        if (response.status === 404) {
            throw new NotFoundError('branch protection rules not found')
        }
        if (response.status !== 200) {
            throw new Error(`could not get branch protection rules: ${await extractError(response)}`);
        }
        return {
            'checksum': response.headers.get('ETag'),
            'rules': await response.json()
        }
    }

    async createRulePreflight(repoID:string) {
        const response = await apiRequest(`/repositories/${encodeURIComponent(repoID)}/branch_protection/set_allowed`);
        return response.status === 204;

    }

    async setRules(repoID:string, rules:any, lastKnownChecksum:string) {
        const additionalHeaders:Record<string,string> = {}
        if (lastKnownChecksum) {
            additionalHeaders['If-Match'] = lastKnownChecksum
        }
        const response = await apiRequest(`/repositories/${encodeURIComponent(repoID)}/settings/branch_protection`, {
            method: 'PUT',
            body: JSON.stringify(rules),
        }, additionalHeaders);
        if (response.status !== 204) {
            throw new Error(`could not create protection rule: ${await extractError(response)}`);
        }
    }
}