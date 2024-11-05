// tslint:disable
/**
 * JZConsole
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


// @ts-ignore
import * as globalImportUrl from 'url';
import globalAxios, { AxiosPromise, AxiosInstance } from 'axios';
import { Configuration } from '../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
/**
 * MemberApi - axios parameter creator
 * @export
 */
export const MemberApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary invite member
         * @param {string} owner 
         * @param {string} repository 
         * @param {string} userId 
         * @param {string} groupId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        inviteMember: async (owner: string, repository: string, userId: string, groupId: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'owner' is not null or undefined
            if (owner === null || owner === undefined) {
                throw new RequiredError('owner','Required parameter owner was null or undefined when calling inviteMember.');
            }
            // verify required parameter 'repository' is not null or undefined
            if (repository === null || repository === undefined) {
                throw new RequiredError('repository','Required parameter repository was null or undefined when calling inviteMember.');
            }
            // verify required parameter 'userId' is not null or undefined
            if (userId === null || userId === undefined) {
                throw new RequiredError('userId','Required parameter userId was null or undefined when calling inviteMember.');
            }
            // verify required parameter 'groupId' is not null or undefined
            if (groupId === null || groupId === undefined) {
                throw new RequiredError('groupId','Required parameter groupId was null or undefined when calling inviteMember.');
            }
            const localVarPath = `/repos/{owner}/{repository}/member/invite`
                .replace(`{${"owner"}}`, encodeURIComponent(String(owner)))
                .replace(`{${"repository"}}`, encodeURIComponent(String(repository)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (userId !== undefined) {
                localVarQueryParameter['user_id'] = userId;
            }

            if (groupId !== undefined) {
                localVarQueryParameter['group_id'] = groupId;
            }


    
            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary invite member
         * @param {string} owner 
         * @param {string} repository 
         * @param {string} userId 
         * @param {string} groupId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        inviteMember_1: async (owner: string, repository: string, userId: string, groupId: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'owner' is not null or undefined
            if (owner === null || owner === undefined) {
                throw new RequiredError('owner','Required parameter owner was null or undefined when calling inviteMember_1.');
            }
            // verify required parameter 'repository' is not null or undefined
            if (repository === null || repository === undefined) {
                throw new RequiredError('repository','Required parameter repository was null or undefined when calling inviteMember_1.');
            }
            // verify required parameter 'userId' is not null or undefined
            if (userId === null || userId === undefined) {
                throw new RequiredError('userId','Required parameter userId was null or undefined when calling inviteMember_1.');
            }
            // verify required parameter 'groupId' is not null or undefined
            if (groupId === null || groupId === undefined) {
                throw new RequiredError('groupId','Required parameter groupId was null or undefined when calling inviteMember_1.');
            }
            const localVarPath = `/repos/{owner}/{repository}/member/invite`
                .replace(`{${"owner"}}`, encodeURIComponent(String(owner)))
                .replace(`{${"repository"}}`, encodeURIComponent(String(repository)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (userId !== undefined) {
                localVarQueryParameter['user_id'] = userId;
            }

            if (groupId !== undefined) {
                localVarQueryParameter['group_id'] = groupId;
            }


    
            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Revoke member in repository
         * @param {string} owner 
         * @param {string} repository 
         * @param {string} userId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        revokeMember: async (owner: string, repository: string, userId: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'owner' is not null or undefined
            if (owner === null || owner === undefined) {
                throw new RequiredError('owner','Required parameter owner was null or undefined when calling revokeMember.');
            }
            // verify required parameter 'repository' is not null or undefined
            if (repository === null || repository === undefined) {
                throw new RequiredError('repository','Required parameter repository was null or undefined when calling revokeMember.');
            }
            // verify required parameter 'userId' is not null or undefined
            if (userId === null || userId === undefined) {
                throw new RequiredError('userId','Required parameter userId was null or undefined when calling revokeMember.');
            }
            const localVarPath = `/repos/{owner}/{repository}/member`
                .replace(`{${"owner"}}`, encodeURIComponent(String(owner)))
                .replace(`{${"repository"}}`, encodeURIComponent(String(repository)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (userId !== undefined) {
                localVarQueryParameter['user_id'] = userId;
            }


    
            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Revoke member in repository
         * @param {string} owner 
         * @param {string} repository 
         * @param {string} userId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        revokeMember_2: async (owner: string, repository: string, userId: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'owner' is not null or undefined
            if (owner === null || owner === undefined) {
                throw new RequiredError('owner','Required parameter owner was null or undefined when calling revokeMember_2.');
            }
            // verify required parameter 'repository' is not null or undefined
            if (repository === null || repository === undefined) {
                throw new RequiredError('repository','Required parameter repository was null or undefined when calling revokeMember_2.');
            }
            // verify required parameter 'userId' is not null or undefined
            if (userId === null || userId === undefined) {
                throw new RequiredError('userId','Required parameter userId was null or undefined when calling revokeMember_2.');
            }
            const localVarPath = `/repos/{owner}/{repository}/member`
                .replace(`{${"owner"}}`, encodeURIComponent(String(owner)))
                .replace(`{${"repository"}}`, encodeURIComponent(String(repository)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (userId !== undefined) {
                localVarQueryParameter['user_id'] = userId;
            }


    
            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary update member by user id and change group role
         * @param {string} owner 
         * @param {string} repository 
         * @param {string} userId 
         * @param {string} groupId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateMemberGroup: async (owner: string, repository: string, userId: string, groupId: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'owner' is not null or undefined
            if (owner === null || owner === undefined) {
                throw new RequiredError('owner','Required parameter owner was null or undefined when calling updateMemberGroup.');
            }
            // verify required parameter 'repository' is not null or undefined
            if (repository === null || repository === undefined) {
                throw new RequiredError('repository','Required parameter repository was null or undefined when calling updateMemberGroup.');
            }
            // verify required parameter 'userId' is not null or undefined
            if (userId === null || userId === undefined) {
                throw new RequiredError('userId','Required parameter userId was null or undefined when calling updateMemberGroup.');
            }
            // verify required parameter 'groupId' is not null or undefined
            if (groupId === null || groupId === undefined) {
                throw new RequiredError('groupId','Required parameter groupId was null or undefined when calling updateMemberGroup.');
            }
            const localVarPath = `/repos/{owner}/{repository}/member`
                .replace(`{${"owner"}}`, encodeURIComponent(String(owner)))
                .replace(`{${"repository"}}`, encodeURIComponent(String(repository)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (userId !== undefined) {
                localVarQueryParameter['user_id'] = userId;
            }

            if (groupId !== undefined) {
                localVarQueryParameter['group_id'] = groupId;
            }


    
            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary update member by user id and change group role
         * @param {string} owner 
         * @param {string} repository 
         * @param {string} userId 
         * @param {string} groupId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateMemberGroup_3: async (owner: string, repository: string, userId: string, groupId: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'owner' is not null or undefined
            if (owner === null || owner === undefined) {
                throw new RequiredError('owner','Required parameter owner was null or undefined when calling updateMemberGroup_3.');
            }
            // verify required parameter 'repository' is not null or undefined
            if (repository === null || repository === undefined) {
                throw new RequiredError('repository','Required parameter repository was null or undefined when calling updateMemberGroup_3.');
            }
            // verify required parameter 'userId' is not null or undefined
            if (userId === null || userId === undefined) {
                throw new RequiredError('userId','Required parameter userId was null or undefined when calling updateMemberGroup_3.');
            }
            // verify required parameter 'groupId' is not null or undefined
            if (groupId === null || groupId === undefined) {
                throw new RequiredError('groupId','Required parameter groupId was null or undefined when calling updateMemberGroup_3.');
            }
            const localVarPath = `/repos/{owner}/{repository}/member`
                .replace(`{${"owner"}}`, encodeURIComponent(String(owner)))
                .replace(`{${"repository"}}`, encodeURIComponent(String(repository)));
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (userId !== undefined) {
                localVarQueryParameter['user_id'] = userId;
            }

            if (groupId !== undefined) {
                localVarQueryParameter['group_id'] = groupId;
            }


    
            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * MemberApi - functional programming interface
 * @export
 */
export const MemberApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @summary invite member
         * @param {string} owner 
         * @param {string} repository 
         * @param {string} userId 
         * @param {string} groupId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async inviteMember(owner: string, repository: string, userId: string, groupId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>> {
            const localVarAxiosArgs = await MemberApiAxiosParamCreator(configuration).inviteMember(owner, repository, userId, groupId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary invite member
         * @param {string} owner 
         * @param {string} repository 
         * @param {string} userId 
         * @param {string} groupId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async inviteMember_1(owner: string, repository: string, userId: string, groupId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>> {
            const localVarAxiosArgs = await MemberApiAxiosParamCreator(configuration).inviteMember_1(owner, repository, userId, groupId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary Revoke member in repository
         * @param {string} owner 
         * @param {string} repository 
         * @param {string} userId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async revokeMember(owner: string, repository: string, userId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>> {
            const localVarAxiosArgs = await MemberApiAxiosParamCreator(configuration).revokeMember(owner, repository, userId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary Revoke member in repository
         * @param {string} owner 
         * @param {string} repository 
         * @param {string} userId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async revokeMember_2(owner: string, repository: string, userId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>> {
            const localVarAxiosArgs = await MemberApiAxiosParamCreator(configuration).revokeMember_2(owner, repository, userId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary update member by user id and change group role
         * @param {string} owner 
         * @param {string} repository 
         * @param {string} userId 
         * @param {string} groupId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateMemberGroup(owner: string, repository: string, userId: string, groupId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>> {
            const localVarAxiosArgs = await MemberApiAxiosParamCreator(configuration).updateMemberGroup(owner, repository, userId, groupId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary update member by user id and change group role
         * @param {string} owner 
         * @param {string} repository 
         * @param {string} userId 
         * @param {string} groupId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateMemberGroup_3(owner: string, repository: string, userId: string, groupId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>> {
            const localVarAxiosArgs = await MemberApiAxiosParamCreator(configuration).updateMemberGroup_3(owner, repository, userId, groupId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * MemberApi - factory interface
 * @export
 */
export const MemberApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * 
         * @summary invite member
         * @param {string} owner 
         * @param {string} repository 
         * @param {string} userId 
         * @param {string} groupId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        inviteMember(owner: string, repository: string, userId: string, groupId: string, options?: any): AxiosPromise<object> {
            return MemberApiFp(configuration).inviteMember(owner, repository, userId, groupId, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary invite member
         * @param {string} owner 
         * @param {string} repository 
         * @param {string} userId 
         * @param {string} groupId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        inviteMember_1(owner: string, repository: string, userId: string, groupId: string, options?: any): AxiosPromise<object> {
            return MemberApiFp(configuration).inviteMember_1(owner, repository, userId, groupId, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Revoke member in repository
         * @param {string} owner 
         * @param {string} repository 
         * @param {string} userId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        revokeMember(owner: string, repository: string, userId: string, options?: any): AxiosPromise<object> {
            return MemberApiFp(configuration).revokeMember(owner, repository, userId, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Revoke member in repository
         * @param {string} owner 
         * @param {string} repository 
         * @param {string} userId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        revokeMember_2(owner: string, repository: string, userId: string, options?: any): AxiosPromise<object> {
            return MemberApiFp(configuration).revokeMember_2(owner, repository, userId, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary update member by user id and change group role
         * @param {string} owner 
         * @param {string} repository 
         * @param {string} userId 
         * @param {string} groupId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateMemberGroup(owner: string, repository: string, userId: string, groupId: string, options?: any): AxiosPromise<object> {
            return MemberApiFp(configuration).updateMemberGroup(owner, repository, userId, groupId, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary update member by user id and change group role
         * @param {string} owner 
         * @param {string} repository 
         * @param {string} userId 
         * @param {string} groupId 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateMemberGroup_3(owner: string, repository: string, userId: string, groupId: string, options?: any): AxiosPromise<object> {
            return MemberApiFp(configuration).updateMemberGroup_3(owner, repository, userId, groupId, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * MemberApi - object-oriented interface
 * @export
 * @class MemberApi
 * @extends {BaseAPI}
 */
export class MemberApi extends BaseAPI {
    /**
     * 
     * @summary invite member
     * @param {string} owner 
     * @param {string} repository 
     * @param {string} userId 
     * @param {string} groupId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MemberApi
     */
    public inviteMember(owner: string, repository: string, userId: string, groupId: string, options?: any) {
        return MemberApiFp(this.configuration).inviteMember(owner, repository, userId, groupId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary invite member
     * @param {string} owner 
     * @param {string} repository 
     * @param {string} userId 
     * @param {string} groupId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MemberApi
     */
    public inviteMember_1(owner: string, repository: string, userId: string, groupId: string, options?: any) {
        return MemberApiFp(this.configuration).inviteMember_1(owner, repository, userId, groupId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Revoke member in repository
     * @param {string} owner 
     * @param {string} repository 
     * @param {string} userId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MemberApi
     */
    public revokeMember(owner: string, repository: string, userId: string, options?: any) {
        return MemberApiFp(this.configuration).revokeMember(owner, repository, userId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Revoke member in repository
     * @param {string} owner 
     * @param {string} repository 
     * @param {string} userId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MemberApi
     */
    public revokeMember_2(owner: string, repository: string, userId: string, options?: any) {
        return MemberApiFp(this.configuration).revokeMember_2(owner, repository, userId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary update member by user id and change group role
     * @param {string} owner 
     * @param {string} repository 
     * @param {string} userId 
     * @param {string} groupId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MemberApi
     */
    public updateMemberGroup(owner: string, repository: string, userId: string, groupId: string, options?: any) {
        return MemberApiFp(this.configuration).updateMemberGroup(owner, repository, userId, groupId, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary update member by user id and change group role
     * @param {string} owner 
     * @param {string} repository 
     * @param {string} userId 
     * @param {string} groupId 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof MemberApi
     */
    public updateMemberGroup_3(owner: string, repository: string, userId: string, groupId: string, options?: any) {
        return MemberApiFp(this.configuration).updateMemberGroup_3(owner, repository, userId, groupId, options).then((request) => request(this.axios, this.basePath));
    }

}