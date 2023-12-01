import {API_ENDPOINT, DEFAULT_LISTING_AMOUNT, NotFoundError, apiRequest, extractError, qs, uploadWithProgress} from "../index"

export class Objects {

    async list(repoId, ref, tree, after = "", presign = false, amount = DEFAULT_LISTING_AMOUNT, delimiter = "/") {
        const query = qs({prefix: tree, amount, after, delimiter, presign});
        const response = await apiRequest(`/repositories/${encodeURIComponent(repoId)}/refs/${encodeURIComponent(ref)}/objects/ls?` + query);

        if (response.status === 404) {
            throw new NotFoundError(response.message ?? "ref not found");
        }

        if (response.status !== 200) {
            throw new Error(await extractError(response));
        }
        return await response.json();
    }

    async uploadPreflight(repoId, branchId, path) {
        const query = qs({path});
        const response = await apiRequest(`/repositories/${encodeURIComponent(repoId)}/branches/${encodeURIComponent(branchId)}/objects/stage_allowed?` + query);

        if (response.status === 204) {
            return true;
        }
        if (response.status === 401) {
            return false;
        }
        
        // This is not one of the expected responses
        throw new Error(await extractError(response));
    }

    async upload(repoId, branchId, path, fileObject, onProgressFn = null) {
        const query = qs({path});
        const uploadUrl = `${API_ENDPOINT}/repositories/${encodeURIComponent(repoId)}/branches/${encodeURIComponent(branchId)}/objects?` + query;
        const {status, body, contentType} = await uploadWithProgress(uploadUrl, fileObject, 'POST', onProgressFn)
        if (status !== 201) {
            if (contentType === "application/json" && body) {
                const responseData = JSON.parse(body)
                throw new Error(responseData.message)
            }
            throw new Error(body);
        }
    }

    async delete(repoId, branchId, path) {
        const query = qs({path});
        const response = await apiRequest(`/repositories/${encodeURIComponent(repoId)}/branches/${encodeURIComponent(branchId)}/objects?` + query, {
            method: 'DELETE',
        });
        if (response.status !== 204) {
            throw new Error(await extractError(response));
        }
    }

    async get(repoId, ref, path, presign = false) {
        const query = qs({path, presign});
        const response = await apiRequest(`/repositories/${encodeURIComponent(repoId)}/refs/${encodeURIComponent(ref)}/objects?` + query, {
            method: 'GET',
        });
        if (response.status !== 200 && response.status !== 206) {
            throw new Error(await extractError(response));
        }

        return response.text()
    }

    async head(repoId, ref, path) {
        const query = qs({path});
        const response = await apiRequest(`/repositories/${encodeURIComponent(repoId)}/refs/${encodeURIComponent(ref)}/objects?` + query, {
            method: 'HEAD',
        });

        if (response.status !== 200 && response.status !== 206) {
            throw new Error(await extractError(response));
        }

        return {
            headers: response.headers,
        }
    }

    async getStat(repoId, ref, path, presign = false) {
        const query = qs({path, presign});
        const response = await apiRequest(`/repositories/${encodeURIComponent(repoId)}/refs/${encodeURIComponent(ref)}/objects/stat?` + query);
        if (response.status !== 200) {
            throw new Error(await extractError(response));
        }
        return response.json()
    }
}
