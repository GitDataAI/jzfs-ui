import {API_ENDPOINT, DEFAULT_LISTING_AMOUNT, NotFoundError, apiRequest, extractError, qs} from "../index"

export class Tags {
    async get(repoId, tagId) {
        const response = await apiRequest(`/repositories/${encodeURIComponent(repoId)}/tags/${encodeURIComponent(tagId)}`);
        if (response.status === 404) {
            throw new NotFoundError(`could not find tag ${tagId}`);
        } else if (response.status !== 200) {
            throw new Error(`could not get tagId: ${await extractError(response)}`);
        }
        return response.json();
    }

    async list(repoId, prefix = "", after = "", amount = DEFAULT_LISTING_AMOUNT) {
        const query = qs({prefix, after, amount});
        const response = await apiRequest(`/repositories/${encodeURIComponent(repoId)}/tags?` + query);
        if (response.status !== 200) {
            throw new Error(`could not list tags: ${await extractError(response)}`);
        }
        return response.json();
    }

    async create(repoId, id, ref) {
        const response = await apiRequest(`/repositories/${encodeURIComponent(repoId)}/tags`, {
            method: 'POST',
            body: JSON.stringify({id, ref}),
        });
        if (response.status !== 201) {
            throw new Error(await extractError(response));
        }
        return response.json();
    }

    async delete(repoId, name) {
        const response = await apiRequest(`/repositories/${encodeURIComponent(repoId)}/tags/${encodeURIComponent(name)}`, {
            method: 'DELETE',
        });
        if (response.status !== 204) {
            throw new Error(await extractError(response));
        }
    }

}

// uploadWithProgress uses good ol' XMLHttpRequest because progress indication in fetch() is
//  still not well supported across browsers (see https://stackoverflow.com/questions/35711724/upload-progress-indicators-for-fetch).
export const uploadWithProgress = (url, file, method = 'POST', onProgres, additionalHeaders = null) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.upload.addEventListener('progress', event => {
            if (onProgress) {
                onProgress((event.loaded / event.total) * 100);
            }
        });
        xhr.addEventListener('load', () => {
          resolve({
              status: xhr.status,
              body: xhr.responseText,
              contentType: xhr.getResponseHeader('Content-Type'),
              etag: xhr.getResponseHeader('ETag'),
              contentMD5: xhr.getResponseHeader('Content-MD5'),
          })
        });
        xhr.addEventListener('error', () => reject(new Error('Upload Failed')));
        xhr.addEventListener('abort', () => reject(new Error('Upload Aborted')));
        xhr.open(method, url, true);
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.setRequestHeader('X-Lakefs-Client', 'lakefs-webui/__buildVersion');
        if (additionalHeaders) {
            Object.keys(additionalHeaders).map(key => xhr.setRequestHeader(key, additionalHeaders[key]))
        }
        if (url.startsWith(API_ENDPOINT)) {
            // swagger API requires a form with a "content" field
            const data = new FormData();
            data.append('content', file);
            xhr.send(data);
        } else {
            xhr.send(file);
        }
    });
};
