import {DEFAULT_LISTING_AMOUNT, apiRequest, extractError, qs} from "../index"
import { GetRunHookOutputParams, GetRunParams, ListRunHooksParams, ListRunsParams } from "../interface";
export class Actions {

    async listRuns({repoId, branch = "", commit = "", after = "", amount = DEFAULT_LISTING_AMOUNT}:ListRunsParams) {
        const query = qs({branch, commit, after, amount});
        const response = await apiRequest(`/repositories/${encodeURIComponent(repoId)}/actions/runs?` + query);
        if (response.status !== 200) {
            throw new Error(`could not list actions runs: ${await extractError(response)}`);
        }
        return response.json();
    }

    async getRun({repoId, runId}:GetRunParams) {
        const response = await apiRequest(`/repositories/${encodeURIComponent(repoId)}/actions/runs/${encodeURIComponent(runId)}`);
        if (response.status !== 200) {
            throw new Error(`could not get actions run: ${await extractError(response)}`);
        }
        return response.json();
    }

    async listRunHooks({repoId, runId, after = "", amount = DEFAULT_LISTING_AMOUNT}:ListRunHooksParams) {
        const query = qs({after, amount});
        const response = await apiRequest(`/repositories/${encodeURIComponent(repoId)}/actions/runs/${encodeURIComponent(runId)}/hooks?` + query);
        if (response.status !== 200) {
            throw new Error(`could not list actions run hooks: ${await extractError(response)}`)
        }
        return response.json();
    }

    async getRunHookOutput({repoId, runId, hookRunId}:GetRunHookOutputParams) {
        const response = await apiRequest(`/repositories/${encodeURIComponent(repoId)}/actions/runs/${encodeURIComponent(runId)}/hooks/${encodeURIComponent(hookRunId)}/output`, {
            headers: {"Content-Type": "application/octet-stream"},
        });
        if (response.status !== 200) {
            throw new Error(`could not get actions run hook output: ${await extractError(response)}`);
        }
        return response.text();
    }

}