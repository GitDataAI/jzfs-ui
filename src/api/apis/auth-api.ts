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
// @ts-ignore
import { AuthenticationToken } from '../models';
// @ts-ignore
import { InlineObject1 } from '../models';
// @ts-ignore
import { UserInfo } from '../models';
// @ts-ignore
import { UserRegisterInfo } from '../models';
/**
 * AuthApi - axios parameter creator
 * @export
 */
export const AuthApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary get information of the currently logged-in user
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getUserInfo: async (options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/users/user`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
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
         * @summary get information of the currently logged-in user
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getUserInfo_1: async (options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/users/user`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
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
         * @summary perform a login
         * @param {InlineObject1} [inlineObject1] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        login: async (inlineObject1?: InlineObject1, options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/auth/login`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof inlineObject1 !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(inlineObject1 !== undefined ? inlineObject1 : {}) : (inlineObject1 || "");

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary perform a login
         * @param {InlineObject1} [inlineObject1] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        login_2: async (inlineObject1?: InlineObject1, options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/auth/login`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof inlineObject1 !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(inlineObject1 !== undefined ? inlineObject1 : {}) : (inlineObject1 || "");

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary perform a logout
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        logout: async (options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/auth/logout`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
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
         * @summary perform a logout
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        logout_3: async (options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/auth/logout`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
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
         * @summary refresh token for more time
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        refreshToken: async (options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/users/refreshtoken`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
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
         * @summary refresh token for more time
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        refreshToken_4: async (options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/users/refreshtoken`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
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
         * @summary perform user registration
         * @param {UserRegisterInfo} [userRegisterInfo] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        register: async (userRegisterInfo?: UserRegisterInfo, options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/users/register`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof userRegisterInfo !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(userRegisterInfo !== undefined ? userRegisterInfo : {}) : (userRegisterInfo || "");

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary perform user registration
         * @param {UserRegisterInfo} [userRegisterInfo] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        register_5: async (userRegisterInfo?: UserRegisterInfo, options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/users/register`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            localVarUrlObj.query = {...localVarUrlObj.query, ...localVarQueryParameter, ...options.query};
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof userRegisterInfo !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(userRegisterInfo !== undefined ? userRegisterInfo : {}) : (userRegisterInfo || "");

            return {
                url: globalImportUrl.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * AuthApi - functional programming interface
 * @export
 */
export const AuthApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @summary get information of the currently logged-in user
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getUserInfo(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UserInfo>> {
            const localVarAxiosArgs = await AuthApiAxiosParamCreator(configuration).getUserInfo(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary get information of the currently logged-in user
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getUserInfo_1(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UserInfo>> {
            const localVarAxiosArgs = await AuthApiAxiosParamCreator(configuration).getUserInfo_1(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary perform a login
         * @param {InlineObject1} [inlineObject1] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async login(inlineObject1?: InlineObject1, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AuthenticationToken>> {
            const localVarAxiosArgs = await AuthApiAxiosParamCreator(configuration).login(inlineObject1, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary perform a login
         * @param {InlineObject1} [inlineObject1] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async login_2(inlineObject1?: InlineObject1, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AuthenticationToken>> {
            const localVarAxiosArgs = await AuthApiAxiosParamCreator(configuration).login_2(inlineObject1, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary perform a logout
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async logout(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>> {
            const localVarAxiosArgs = await AuthApiAxiosParamCreator(configuration).logout(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary perform a logout
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async logout_3(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>> {
            const localVarAxiosArgs = await AuthApiAxiosParamCreator(configuration).logout_3(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary refresh token for more time
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async refreshToken(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AuthenticationToken>> {
            const localVarAxiosArgs = await AuthApiAxiosParamCreator(configuration).refreshToken(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary refresh token for more time
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async refreshToken_4(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AuthenticationToken>> {
            const localVarAxiosArgs = await AuthApiAxiosParamCreator(configuration).refreshToken_4(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary perform user registration
         * @param {UserRegisterInfo} [userRegisterInfo] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async register(userRegisterInfo?: UserRegisterInfo, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>> {
            const localVarAxiosArgs = await AuthApiAxiosParamCreator(configuration).register(userRegisterInfo, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary perform user registration
         * @param {UserRegisterInfo} [userRegisterInfo] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async register_5(userRegisterInfo?: UserRegisterInfo, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>> {
            const localVarAxiosArgs = await AuthApiAxiosParamCreator(configuration).register_5(userRegisterInfo, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * AuthApi - factory interface
 * @export
 */
export const AuthApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * 
         * @summary get information of the currently logged-in user
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getUserInfo(options?: any): AxiosPromise<UserInfo> {
            return AuthApiFp(configuration).getUserInfo(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary get information of the currently logged-in user
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getUserInfo_1(options?: any): AxiosPromise<UserInfo> {
            return AuthApiFp(configuration).getUserInfo_1(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary perform a login
         * @param {InlineObject1} [inlineObject1] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        login(inlineObject1?: InlineObject1, options?: any): AxiosPromise<AuthenticationToken> {
            return AuthApiFp(configuration).login(inlineObject1, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary perform a login
         * @param {InlineObject1} [inlineObject1] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        login_2(inlineObject1?: InlineObject1, options?: any): AxiosPromise<AuthenticationToken> {
            return AuthApiFp(configuration).login_2(inlineObject1, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary perform a logout
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        logout(options?: any): AxiosPromise<object> {
            return AuthApiFp(configuration).logout(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary perform a logout
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        logout_3(options?: any): AxiosPromise<object> {
            return AuthApiFp(configuration).logout_3(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary refresh token for more time
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        refreshToken(options?: any): AxiosPromise<AuthenticationToken> {
            return AuthApiFp(configuration).refreshToken(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary refresh token for more time
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        refreshToken_4(options?: any): AxiosPromise<AuthenticationToken> {
            return AuthApiFp(configuration).refreshToken_4(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary perform user registration
         * @param {UserRegisterInfo} [userRegisterInfo] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        register(userRegisterInfo?: UserRegisterInfo, options?: any): AxiosPromise<object> {
            return AuthApiFp(configuration).register(userRegisterInfo, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary perform user registration
         * @param {UserRegisterInfo} [userRegisterInfo] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        register_5(userRegisterInfo?: UserRegisterInfo, options?: any): AxiosPromise<object> {
            return AuthApiFp(configuration).register_5(userRegisterInfo, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * AuthApi - object-oriented interface
 * @export
 * @class AuthApi
 * @extends {BaseAPI}
 */
export class AuthApi extends BaseAPI {
    /**
     * 
     * @summary get information of the currently logged-in user
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthApi
     */
    public getUserInfo(options?: any) {
        return AuthApiFp(this.configuration).getUserInfo(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary get information of the currently logged-in user
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthApi
     */
    public getUserInfo_1(options?: any) {
        return AuthApiFp(this.configuration).getUserInfo_1(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary perform a login
     * @param {InlineObject1} [inlineObject1] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthApi
     */
    public login(inlineObject1?: InlineObject1, options?: any) {
        return AuthApiFp(this.configuration).login(inlineObject1, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary perform a login
     * @param {InlineObject1} [inlineObject1] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthApi
     */
    public login_2(inlineObject1?: InlineObject1, options?: any) {
        return AuthApiFp(this.configuration).login_2(inlineObject1, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary perform a logout
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthApi
     */
    public logout(options?: any) {
        return AuthApiFp(this.configuration).logout(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary perform a logout
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthApi
     */
    public logout_3(options?: any) {
        return AuthApiFp(this.configuration).logout_3(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary refresh token for more time
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthApi
     */
    public refreshToken(options?: any) {
        return AuthApiFp(this.configuration).refreshToken(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary refresh token for more time
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthApi
     */
    public refreshToken_4(options?: any) {
        return AuthApiFp(this.configuration).refreshToken_4(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary perform user registration
     * @param {UserRegisterInfo} [userRegisterInfo] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthApi
     */
    public register(userRegisterInfo?: UserRegisterInfo, options?: any) {
        return AuthApiFp(this.configuration).register(userRegisterInfo, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary perform user registration
     * @param {UserRegisterInfo} [userRegisterInfo] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthApi
     */
    public register_5(userRegisterInfo?: UserRegisterInfo, options?: any) {
        return AuthApiFp(this.configuration).register_5(userRegisterInfo, options).then((request) => request(this.axios, this.basePath));
    }

}