import { AuthenticationError, apiRequest, cache, extractError} from "../index"
import { UserInfo } from "../interface/Api";
export class Auth {
    clearCurrentUser() {
        cache.delete('user');
        cache.delete('token');
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
