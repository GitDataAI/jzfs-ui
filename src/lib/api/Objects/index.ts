import {API_ENDPOINT, AuthenticationError, AuthorizationError, BadRequestError, DEFAULT_LISTING_AMOUNT, NotFoundError, apiRequest, extractError, qs, uploadWithProgress} from "../index"
import { Upload, apiResponse } from "../interface";

export class Objects {

    async list(repoId:string, ref:any, tree:string, after = "", presign = false, amount = DEFAULT_LISTING_AMOUNT, delimiter = "/") {
        const query = qs({prefix: tree, amount, after, delimiter, presign});
        const response:apiResponse = await apiRequest(`/repositories/${encodeURIComponent(repoId)}/refs/${encodeURIComponent(ref)}/objects/ls?` + query);

        if (response.status === 404) {
            throw new NotFoundError(response.message ?? "ref not found");
        }

        if (response.status !== 200) {
            throw new Error(await extractError(response));
        }
        return await response.json();
    }

    async uploadPreflight(repoId:string, branchId:string, path:string) {
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

     upload:Upload = async (repoId, branchId, path, fileObject, onProgressFn = null) =>{
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

    async delete(repoId:string, branchId:string, path:string) {
        const query = qs({path});
        const response = await apiRequest(`/repositories/${encodeURIComponent(repoId)}/branches/${encodeURIComponent(branchId)}/objects?` + query, {
            method: 'DELETE',
        });
        if (response.status !== 204) {
            throw new Error(await extractError(response));
        }
    }

    async get(repoId:string, ref:any, path:string, presign = false) {
        const query = qs({path, presign});
        const response = await apiRequest(`/repositories/${encodeURIComponent(repoId)}/refs/${encodeURIComponent(ref)}/objects?` + query, {
            method: 'GET',
        });
        if (response.status !== 200 && response.status !== 206) {
            throw new Error(await extractError(response));
        }

        return response.text()
    }

    async head(repoId:string, ref:any, path:string) {
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

    async getStat(repoId:string, ref:any, path:string, presign = false) {
        const query = qs({path, presign});
        const response = await apiRequest(`/repositories/${encodeURIComponent(repoId)}/refs/${encodeURIComponent(ref)}/objects/stat?` + query);
        if (response.status !== 200) {
            throw new Error(await extractError(response));
        }
        return response.json()
    }
    // 获取用户内的Object的内容，二进制字符串：（type: string, format: binary）
    async  getObject(user: string, repoId: string, branch: string, path: string) {
        const headers = new Headers();
        headers.append('Range', 'bytes=0-1023');
        const response = await apiRequest(`/${user}/${repoId}/object?branch=${branch}&path=${path}`, { method: 'GET' }, headers);
        if (!response.ok) {
            const errorBody = await extractError(response);
            switch (response.status) {
                case 401:
                    throw new AuthenticationError(errorBody, response.status);
                case 404:
                    throw new NotFoundError(errorBody);
                case 410:
                    throw new Error(`Object expired: ${await extractError(response)}`);
                case 416:
                    throw new BadRequestError(errorBody);
                case 420:
                    throw new Error(`Requests are too frequent.Please slow down the request speed: ${await extractError(response)}`);
                default:
                    throw new Error(`Unhandled error status: ${response.status}`);
            }
        }
        return response.json();
    }
// 检查对象是否存在，内容长度（Content-Length:number）、最后修改时间（Last-Modified:string）、ETag（string）
    async  headObject(user: string, repoId: string, branch: string, path: string) {
        const headers = new Headers();
        headers.append('Range', 'bytes=0-1023');
        const response = await apiRequest(`/${user}/${repoId}/object?branch=${branch}&path=${path}`, { method: 'HEAD' }, headers);
        if (!response.ok) {
            const errorBody = await extractError(response);
            switch (response.status) {
                case 401:
                    throw new AuthenticationError(errorBody, response.status);
                case 404:
                    throw new NotFoundError(errorBody);
                case 410:
                    throw new Error(`Object expired: ${await extractError(response)}`);
                case 416:
                    throw new BadRequestError(errorBody);
                case 420:
                    throw new Error(`Requests are too frequent.Please slow down the request speed: ${await extractError(response)}`);
                default:
                    throw new Error(`Unhandled error status: ${response.status}`);
            }
        }
        return response;
    }
    // 上传对象，（包含了上传的对象的元数据）
    async uploadObject(user: string, repoId: string, wipID: string, content: any) {
        const formData = new FormData();
        formData.append('content', content);
        const headers = new Headers();
        headers.append('If-None-Match', '*');
        const response = await apiRequest(`/${user}/${repoId}/objects?wipID=${wipID}`, { method: 'POST', body: formData, headers: headers });
        if (!response.ok) {
            const errorBody = await extractError(response);
            switch (response.status) {
                case 400:
                    throw new Error(`Precondition failed: ${await extractError(response)}`);
                case 401:
                    throw new AuthenticationError(errorBody, response.status);
                case 403:
                    throw new AuthorizationError(errorBody);
                case 404:
                    throw new NotFoundError(errorBody);
                case 412:
                    throw new Error(`Precondition failed: ${await extractError(response)}`);
                case 420:
                    throw new Error(`Requests are too frequent.Please slow down the request speed: ${await extractError(response)}`);
                default:
                    throw new Error(`Unhandled error status: ${response.status}`);
            }
        }
        return response.json();
    }
    // 删除对象
    async deleteObject(user: string, repoId: string, wipID: string) {
        const response = await apiRequest(`/${user}/${repoId}/objects?wipID=${wipID}`, { method: 'DELETE' });
        if (!response.ok) {
            const errorBody = await extractError(response);
            switch (response.status) {
                case 401:
                    throw new AuthenticationError(errorBody, response.status);
                case 403:
                    throw new AuthorizationError(errorBody);
                case 404:
                    throw new NotFoundError(errorBody);
                case 420:
                    throw new Error(`Requests are too frequent.Please slow down the request speed: ${await extractError(response)}`);
                default:
                    throw new Error(`Unhandled error status: ${response.status}`);
            }
        }
    }
}
