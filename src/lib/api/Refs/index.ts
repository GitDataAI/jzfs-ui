import {DEFAULT_LISTING_AMOUNT, MergeError, apiRequest, extractError, qs} from "../index"

export class Refs {

    async changes(repoId, branchId, after, prefix, delimiter, amount = DEFAULT_LISTING_AMOUNT) {
        const query = qs({after, prefix, delimiter, amount});
        const response = await apiRequest(`/repositories/${encodeURIComponent(repoId)}/branches/${encodeURIComponent(branchId)}/diff?` + query);
        if (response.status !== 200) {
            throw new Error(await extractError(response));
        }
        return response.json();
    }

    async diff(repoId, leftRef, rightRef, after, prefix = "", delimiter = "", amount = DEFAULT_LISTING_AMOUNT) {
        const query = qs({after, amount, delimiter, prefix});
        const response = await apiRequest(`/repositories/${encodeURIComponent(repoId)}/refs/${encodeURIComponent(leftRef)}/diff/${encodeURIComponent(rightRef)}?` + query);
        if (response.status !== 200) {
            throw new Error(await extractError(response));
        }
        return response.json();
    }

    async merge(repoId, sourceBranch, destinationBranch, strategy = "") {
        const response = await apiRequest(`/repositories/${encodeURIComponent(repoId)}/refs/${encodeURIComponent(sourceBranch)}/merge/${encodeURIComponent(destinationBranch)}`, {
            method: 'POST',
            body: JSON.stringify({strategy})
        });

        let resp;
        switch (response.status) {
            case 200:
                return response.json();
            case 409:
                resp = await response.json();
                throw new MergeError(response.statusText, resp.body);
            case 412:
            default:
                throw new Error(await extractError(response));
        }
    }
}
