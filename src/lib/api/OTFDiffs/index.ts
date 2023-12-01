import {apiRequest, extractError} from "../index"

export class OTFDiffs {
    async get() {
        const response = await apiRequest('/otf/diffs', {
            method: 'GET'
        });
        if (response.status !== 200) {
            throw new Error(await extractError(response));
        }
        return response.json();
    }
}