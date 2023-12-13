import { AuthenticationError, AuthorizationError, BadRequestError, apiRequest, extractError } from "..";

export class Auth {
    // 获取正在进行中的工作，返回一个JSON
    async  getWip(user: string, repoId: string, refID: string) {
        const response = await apiRequest(`/${user}/${repoId}/wip/${refID}`, { method: 'GET' });
        if (!response.ok) {
            const errorBody = await extractError(response);
            switch (response.status) {
                case 401:
                    throw new AuthenticationError(errorBody, response.status);
                case 403:
                    throw new AuthorizationError(errorBody);
                case 400:
                    throw new BadRequestError(errorBody);
                default:
                    throw new Error(`Unhandled error status: ${response.status}`);
            }
        }
        return response.json();
    }
    // 删除正在进行中的工作
    async  deleteWip(user: string, repoId: string, refID: string) {
        const response = await apiRequest(`/${user}/${repoId}/wip/${refID}`, { method: 'DELETE' });
        if (!response.ok) {
            const errorBody = await extractError(response);
            switch (response.status) {
                case 401:
                    throw new AuthenticationError(errorBody, response.status);
                case 403:
                    throw new AuthorizationError(errorBody);
                case 400:
                    throw new BadRequestError(errorBody);
                default:
                    throw new Error(`Unhandled error status: ${response.status}`);
            }
        }
        return response;
    }
    // 创建正在进行中的工作，返回一个JSON
    async  createWip(user: string, repoId: string, refID: string, name: string, baseCommitID: string) {
        const response = await apiRequest(`/${user}/${repoId}/wip/${refID}?name=${name}&baseCommitID=${baseCommitID}`, { method: 'POST' });
        if (!response.ok) {
            const errorBody = await extractError(response);
            switch (response.status) {
                case 401:
                    throw new AuthenticationError(errorBody, response.status);
                case 403:
                    throw new AuthorizationError(errorBody);
                case 400:
                    throw new BadRequestError(errorBody);
                default:
                    throw new Error(`Unhandled error status: ${response.status}`);
                case 502:
                    throw new BadRequestError(errorBody);
            }
        }
        return response.json();
    }
    // 提交正在进行中的工作，返回一个JSON
    async commitWip(user: string, repoId: string, refID: string, msg: string) {
        const response = await apiRequest(`/${user}/${repoId}/wip/commit/${refID}?msg=${msg}`, { method: 'POST' });
        if (!response.ok) {
            const errorBody = await extractError(response);
            switch (response.status) {
                case 400:
                    throw new Error(`Validation Error: ${errorBody}`);
                case 401:
                    throw new AuthenticationError(errorBody, response.status);
                case 403:
                    throw new Error(`Forbidden: ${errorBody}`);
                case 502:
                    throw new Error(`Internal Server Error: ${errorBody}`);
                default:
                    throw new Error(`Unhandled error status: ${response.status}`);
            }
        }
        return response.json();
    }
    // 列出特定项目和用户的正在进行中的工作，返回一个JSON
    async listWip(user: string, repoId: string) {
        const response = await apiRequest(`/${user}/${repoId}/wip/list`, { method: 'GET' });
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