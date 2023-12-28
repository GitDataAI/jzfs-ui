import { AuthenticationError, DEFAULT_LISTING_AMOUNT, apiRequest, cache, extractError, qs} from "../index"
import { QueryParams, UserRegisterInfo } from "../interface";
import { UserInfo } from "../interface/Api";
export class Auth {
    async getAuthCapabilities() {
        const response = await apiRequest('/auth/capabilities', {
            method: 'GET',
        });
        switch (response.status) {
            case 200:
                return await response.json();
            default:
                throw new Error('Unknown');
        }
    }

    // async login(accessKeyId:string, secretAccessKey:string) {
    //     const response = await fetch(`${API_ENDPOINT}/auth/login`, {
    //         headers: new Headers(defaultAPIHeaders),
    //         method: 'POST',
    //         body: JSON.stringify({access_key_id: accessKeyId, secret_access_key: secretAccessKey})
    //     });

    //     if (response.status === 401) {
    //         throw new AuthenticationError('invalid credentials', response.status);
    //     }
    //     if (response.status !== 200) {
    //         throw new AuthenticationError('Unknown authentication error', response.status);
    //     }

    
    // }

    clearCurrentUser() {
        cache.delete('user');
    }

    async getCurrentUserWithCache() {
        let user = cache.get('user')
        if (!user) {
            user = await this.getCurrentUser();
            cache.set('user', user);
        }
        return user
    }

    async getCurrentUser() {
        const userResponse = await apiRequest('/users/user')
        const body = await userResponse.json();
        return body.user;
    }

    async listUsers(prefix = "", after = "", amount = DEFAULT_LISTING_AMOUNT) {
        const query = qs({prefix, after, amount});
        const response = await apiRequest(`/auth/users?${query}`);
        if (response.status !== 200) {
            throw new Error(`could not list users: ${await extractError(response)}`);
        }
        return response.json();
    }

    async createUser(userId:string, inviteUser = false) {
        const response = await apiRequest(`/auth/users`,
            {method: 'POST', body: JSON.stringify({id: userId, invite_user: inviteUser})});
        if (response.status !== 201) {
            throw new Error(await extractError(response));
        }
        return response.json();
    }

    async listGroups(prefix = "", after = "", amount = DEFAULT_LISTING_AMOUNT) {
        const query = qs({prefix, after, amount});
        const response = await apiRequest(`/auth/groups?${query}`);
        if (response.status !== 200) {
            throw new Error(`could not list groups: ${await extractError(response)}`);
        }
        return response.json();
    }

    async listGroupMembers(groupId:string, after:string, amount = DEFAULT_LISTING_AMOUNT) {
        const query = qs({after, amount});
        const response = await apiRequest(`/auth/groups/${encodeURIComponent(groupId)}/members?` + query);
        if (response.status !== 200) {
            throw new Error(`could not list group members: ${await extractError(response)}`);
        }
        return response.json();
    }

    async getACL(groupId:string) {
        const response = await apiRequest(`/auth/groups/${groupId}/acl`);
        if (response.status !== 200) {
            throw new Error(`could not get ACL for group ${groupId}: ${await extractError(response)}`);
        }
        const ret = await response.json();
        if (ret.repositories === null || ret.repositories === undefined) {
            ret.repositories = [];
        }
        return ret;
    }

    async putACL(groupId:string, acl: any) {
        const response = await apiRequest(`/auth/groups/${groupId}/acl`, {
            method: 'POST',
            body: JSON.stringify(acl),
        });
        if (response.status !== 201) {
            throw new Error(`could not set ACL for group ${groupId}: ${await extractError(response)}`);
        }
    }

    async addUserToGroup(userId:string, groupId:string) {
        const response = await apiRequest(`/auth/groups/${encodeURIComponent(groupId)}/members/${encodeURIComponent(userId)}`, {method: 'PUT'});
        if (response.status !== 201) {
            throw new Error(await extractError(response));
        }
    }

    async removeUserFromGroup(userId:string, groupId:string) {
        const response = await apiRequest(`/auth/groups/${encodeURIComponent(groupId)}/members/${encodeURIComponent(userId)}`, {method: 'DELETE'});
        if (response.status !== 204) {
            throw new Error(await extractError(response));
        }
    }

    async attachPolicyToUser(userId:string, policyId:string) {
        const response = await apiRequest(`/auth/users/${encodeURIComponent(userId)}/policies/${encodeURIComponent(policyId)}`, {method: 'PUT'});
        if (response.status !== 201) {
            throw new Error(await extractError(response));
        }
    }

    async detachPolicyFromUser(userId:string, policyId:string) {
        const response = await apiRequest(`/auth/users/${encodeURIComponent(userId)}/policies/${encodeURIComponent(policyId)}`, {method: 'DELETE'});
        if (response.status !== 204) {
            throw new Error(await extractError(response));
        }
    }

    async attachPolicyToGroup(groupId:string, policyId:string) {
        const response = await apiRequest(`/auth/groups/${encodeURIComponent(groupId)}/policies/${encodeURIComponent(policyId)}`, {method: 'PUT'});
        if (response.status !== 201) {
            throw new Error(await extractError(response));
        }
    }

    async detachPolicyFromGroup(groupId:string, policyId:string) {
        const response = await apiRequest(`/auth/groups/${encodeURIComponent(groupId)}/policies/${encodeURIComponent(policyId)}`, {method: 'DELETE'});
        if (response.status !== 204) {
            throw new Error(await extractError(response));
        }
    }

    async deleteCredentials(userId:string, accessKeyId:string) {
        const response = await apiRequest(`/auth/users/${encodeURIComponent(userId)}/credentials/${encodeURIComponent(accessKeyId)}`, {method: 'DELETE'});
        if (response.status !== 204) {
            throw new Error(await extractError(response));
        }
    }

    async createGroup(groupId:string) {
        const response = await apiRequest(`/auth/groups`, {method: 'POST', body: JSON.stringify({id: groupId})});
        if (response.status !== 201) {
            throw new Error(await extractError(response));
        }
        return response.json();
    }

    async listPolicies(prefix = "", after = "", amount = DEFAULT_LISTING_AMOUNT) {
        const query = qs({prefix, after, amount});
        const response = await apiRequest(`/auth/policies?${query}`);
        if (response.status !== 200) {
            throw new Error(`could not list policies: ${await extractError(response)}`);
        }
        return response.json();
    }

    async createPolicy(policyId:string, policyDocument:string) {
        // keep id after policy document to override the id the user entered
        const policy = {...JSON.parse(policyDocument), id: policyId};
        const response = await apiRequest(`/auth/policies`, {
            method: 'POST',
            body: JSON.stringify(policy)
        });
        if (response.status !== 201) {
            throw new Error(await extractError(response));
        }
        return response.json();
    }

    async editPolicy(policyId:string, policyDocument:string) {
        const policy = {...JSON.parse(policyDocument), id: policyId};
        const response = await apiRequest(`/auth/policies/${encodeURIComponent(policyId)}`, {
            method: 'PUT',
            body: JSON.stringify(policy)
        });
        if (response.status !== 200) {
            throw new Error(await extractError(response));
        }
        return response.json();
    }

    async listCredentials(userId:string, after:QueryParams, amount = DEFAULT_LISTING_AMOUNT) {
        const query = qs({after, amount});
        const response = await apiRequest(`/auth/users/${encodeURIComponent(userId)}/credentials?` + query);
        if (response.status !== 200) {
            throw new Error(`could not list credentials: ${await extractError(response)}`);
        }
        return response.json();
    }

    async createCredentials(userId:string) {
        const response = await apiRequest(`/auth/users/${encodeURIComponent(userId)}/credentials`, {
            method: 'POST',
        });
        if (response.status !== 201) {
            throw new Error(await extractError(response));
        }
        return response.json();
    }

    async listUserGroups(userId:string, after:string, amount = DEFAULT_LISTING_AMOUNT) {
        const query = qs({after, amount});
        const response = await apiRequest(`/auth/users/${encodeURIComponent(userId)}/groups?` + query);
        if (response.status !== 200) {
            throw new Error(`could not list user groups: ${await extractError(response)}`);
        }
        return response.json();
    }

    async listUserPolicies(userId:string, effective = false, after = "", amount = DEFAULT_LISTING_AMOUNT) {
        const params = {after, amount,effective:''};
        if (effective) {
            params.effective = 'true'
        }
        const query = qs(params);
        const response = await apiRequest(`/auth/users/${encodeURIComponent(userId)}/policies?` + query);
        if (response.status !== 200) {
            throw new Error(`could not list policies: ${await extractError(response)}`);
        }
        return response.json()
    }

    async getPolicy(policyId:string) {
        const response = await apiRequest(`/auth/policies/${encodeURIComponent(policyId)}`);
        if (response.status !== 200) {
            throw new Error(`could not get policy: ${await extractError(response)}`);
        }
        return response.json();
    }

    async listGroupPolicies(groupId:string, after:string, amount = DEFAULT_LISTING_AMOUNT) {
        const query = qs({after, amount});
        const response = await apiRequest(`/auth/groups/${encodeURIComponent(groupId)}/policies?` + query);
        if (response.status !== 200) {
            throw new Error(`could not list policies: ${await extractError(response)}`);
        }
        return response.json();
    }

    async deleteUser(userId:string) {
        const response = await apiRequest(`/auth/users/${encodeURIComponent(userId)}`, {method: 'DELETE'});
        if (response.status !== 204) {
            throw new Error(await extractError(response));
        }
    }

    async deleteUsers(userIds:string[]) {
        for (let i = 0; i < userIds.length; i++) {
            const userId = userIds[i];
            await this.deleteUser(userId);
        }

    }

    async deleteGroup(groupId:string) {
        const response = await apiRequest(`/auth/groups/${encodeURIComponent(groupId)}`, {method: 'DELETE'});
        if (response.status !== 204) {
            throw new Error(await extractError(response));
        }
    }

    async deleteGroups(groupIds:string[]) {
        for (let i = 0; i < groupIds.length; i++) {
            const groupId = groupIds[i]
            await this.deleteGroup(groupId);
        }
    }

    async deletePolicy(policyId:string) {
        const response = await apiRequest(`/auth/policies/${encodeURIComponent(policyId)}`, {method: 'DELETE'});
        if (response.status !== 204) {
            throw new Error(await extractError(response));
        }
    }

    async deletePolicies(policyIds:string[]) {
        for (let i = 0; i < policyIds.length; i++) {
            const policyId = policyIds[i];
            await this.deletePolicy(policyId);
        }
    }
    
    // 登录，返回一个JSON对象，包含了认证令牌的信息
    async login(username: string, password: string) {
        await apiRequest(`/auth/login`, { 
            method: 'POST', 
            body: JSON.stringify({ name:username, password }) 
        }).then(async(response)=>{
            this.clearCurrentUser()
            const logininfo  = await response.json()
            const user = await this.getUserInfo(logininfo.token)
            cache.set('user', user.name)
            
            console.log(window.localStorage);
            return response.json()
        }).catch(async(err)=>{
                const errorBody = await extractError(err);
                switch (err.status) {
                    case 401:
                        throw new AuthenticationError(errorBody, err.status);
                    case 420:
                        throw new Error(`Too many requests: ${errorBody}`);
                    default:
                        throw new Error(`Internal server error: ${errorBody}`);
                }
        });
    }
    // 注册，返回一个JSON对象，包含了注册信息
    
    async register(userRegisterInfo: UserRegisterInfo) {
        let headers = new Headers()
        headers.append("Content-Type", "application/json")
        const response = await apiRequest(`/users/register`, { 
            method: 'POST', 
            body: JSON.stringify(userRegisterInfo) 
        }, headers);
        if (!response.ok) {
            const errorBody = await extractError(response);
            switch (response.status) {
                case 400:
                    throw new Error(`Validation Error: ${errorBody}`);
                case 420:
                    throw new Error(`Too many requests: ${errorBody}`);
                default:
                    throw new Error(`Internal server error: ${errorBody}`);
            }
        }
        return response.json();
    }
    // 获取当前登录用户的信息，返回一个JSON对象，包含了用户信息
    async getUserInfo(token:string):Promise<UserInfo>{
        let headers = new Headers()
        headers.append("Authorization", token)
        const response = await apiRequest(`/users/user`, { method: 'GET' },headers);
        if (!response.ok) {
            const errorBody = await extractError(response);
            switch (response.status) {
                case 401:
                    throw new AuthenticationError(errorBody, response.status);
                default:
                    throw new Error(`Internal server error: ${errorBody}`);
            }
        }

        return response.json();
    }
    
    // 注销登录
    async logout() {
        const response = await apiRequest(`/auth/logout`, { method: 'POST' });
        if (!response.ok) {
            const errorBody = await extractError(response);
            switch (response.status) {
                case 401:
                    throw new AuthenticationError(errorBody, response.status);
                case 420:
                    throw new Error(`Too many requests: ${errorBody}`);
                default:
                    throw new Error(`Unhandled error status: ${response.status}`);
            }
        }
        return response.json();
    }
    
}
