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
import { Aksk } from '../models';
// @ts-ignore
import { AkskList } from '../models';
// @ts-ignore
import { SafeAksk } from '../models';
/**
 * AksksApi - axios parameter creator
 * @export
 */
export const AksksApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary create aksk
         * @param {string} [description] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createAksk: async (description?: string, options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/users/aksk`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (description !== undefined) {
                localVarQueryParameter['description'] = description;
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
         * @summary create aksk
         * @param {string} [description] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createAksk_1: async (description?: string, options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/users/aksk`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (description !== undefined) {
                localVarQueryParameter['description'] = description;
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
         * @summary delete aksk
         * @param {string} [id] 
         * @param {string} [accessKey] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteAksk: async (id?: string, accessKey?: string, options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/users/aksk`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (id !== undefined) {
                localVarQueryParameter['id'] = id;
            }

            if (accessKey !== undefined) {
                localVarQueryParameter['access_key'] = accessKey;
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
         * @summary delete aksk
         * @param {string} [id] 
         * @param {string} [accessKey] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteAksk_2: async (id?: string, accessKey?: string, options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/users/aksk`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (id !== undefined) {
                localVarQueryParameter['id'] = id;
            }

            if (accessKey !== undefined) {
                localVarQueryParameter['access_key'] = accessKey;
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
         * @summary get aksk
         * @param {string} [id] 
         * @param {string} [accessKey] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAksk: async (id?: string, accessKey?: string, options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/users/aksk`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (id !== undefined) {
                localVarQueryParameter['id'] = id;
            }

            if (accessKey !== undefined) {
                localVarQueryParameter['access_key'] = accessKey;
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
         * @summary get aksk
         * @param {string} [id] 
         * @param {string} [accessKey] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAksk_3: async (id?: string, accessKey?: string, options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/users/aksk`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (id !== undefined) {
                localVarQueryParameter['id'] = id;
            }

            if (accessKey !== undefined) {
                localVarQueryParameter['access_key'] = accessKey;
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
         * @summary list aksks
         * @param {number} [after] return items after this value
         * @param {number} [amount] how many items to return
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listAksks: async (after?: number, amount?: number, options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/users/aksks`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (after !== undefined) {
                localVarQueryParameter['after'] = after;
            }

            if (amount !== undefined) {
                localVarQueryParameter['amount'] = amount;
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
         * @summary list aksks
         * @param {number} [after] return items after this value
         * @param {number} [amount] how many items to return
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listAksks_4: async (after?: number, amount?: number, options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/users/aksks`;
            const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (after !== undefined) {
                localVarQueryParameter['after'] = after;
            }

            if (amount !== undefined) {
                localVarQueryParameter['amount'] = amount;
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
 * AksksApi - functional programming interface
 * @export
 */
export const AksksApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @summary create aksk
         * @param {string} [description] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createAksk(description?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>> {
            const localVarAxiosArgs = await AksksApiAxiosParamCreator(configuration).createAksk(description, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary create aksk
         * @param {string} [description] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createAksk_1(description?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>> {
            const localVarAxiosArgs = await AksksApiAxiosParamCreator(configuration).createAksk_1(description, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary delete aksk
         * @param {string} [id] 
         * @param {string} [accessKey] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteAksk(id?: string, accessKey?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>> {
            const localVarAxiosArgs = await AksksApiAxiosParamCreator(configuration).deleteAksk(id, accessKey, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary delete aksk
         * @param {string} [id] 
         * @param {string} [accessKey] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteAksk_2(id?: string, accessKey?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<object>> {
            const localVarAxiosArgs = await AksksApiAxiosParamCreator(configuration).deleteAksk_2(id, accessKey, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary get aksk
         * @param {string} [id] 
         * @param {string} [accessKey] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getAksk(id?: string, accessKey?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<SafeAksk>> {
            const localVarAxiosArgs = await AksksApiAxiosParamCreator(configuration).getAksk(id, accessKey, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary get aksk
         * @param {string} [id] 
         * @param {string} [accessKey] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getAksk_3(id?: string, accessKey?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<SafeAksk>> {
            const localVarAxiosArgs = await AksksApiAxiosParamCreator(configuration).getAksk_3(id, accessKey, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary list aksks
         * @param {number} [after] return items after this value
         * @param {number} [amount] how many items to return
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listAksks(after?: number, amount?: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AkskList>> {
            const localVarAxiosArgs = await AksksApiAxiosParamCreator(configuration).listAksks(after, amount, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary list aksks
         * @param {number} [after] return items after this value
         * @param {number} [amount] how many items to return
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listAksks_4(after?: number, amount?: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AkskList>> {
            const localVarAxiosArgs = await AksksApiAxiosParamCreator(configuration).listAksks_4(after, amount, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * AksksApi - factory interface
 * @export
 */
export const AksksApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * 
         * @summary create aksk
         * @param {string} [description] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createAksk(description?: string, options?: any): AxiosPromise<object> {
            return AksksApiFp(configuration).createAksk(description, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary create aksk
         * @param {string} [description] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createAksk_1(description?: string, options?: any): AxiosPromise<object> {
            return AksksApiFp(configuration).createAksk_1(description, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary delete aksk
         * @param {string} [id] 
         * @param {string} [accessKey] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteAksk(id?: string, accessKey?: string, options?: any): AxiosPromise<object> {
            return AksksApiFp(configuration).deleteAksk(id, accessKey, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary delete aksk
         * @param {string} [id] 
         * @param {string} [accessKey] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteAksk_2(id?: string, accessKey?: string, options?: any): AxiosPromise<object> {
            return AksksApiFp(configuration).deleteAksk_2(id, accessKey, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary get aksk
         * @param {string} [id] 
         * @param {string} [accessKey] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAksk(id?: string, accessKey?: string, options?: any): AxiosPromise<SafeAksk> {
            return AksksApiFp(configuration).getAksk(id, accessKey, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary get aksk
         * @param {string} [id] 
         * @param {string} [accessKey] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAksk_3(id?: string, accessKey?: string, options?: any): AxiosPromise<SafeAksk> {
            return AksksApiFp(configuration).getAksk_3(id, accessKey, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary list aksks
         * @param {number} [after] return items after this value
         * @param {number} [amount] how many items to return
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listAksks(after?: number, amount?: number, options?: any): AxiosPromise<AkskList> {
            return AksksApiFp(configuration).listAksks(after, amount, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary list aksks
         * @param {number} [after] return items after this value
         * @param {number} [amount] how many items to return
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listAksks_4(after?: number, amount?: number, options?: any): AxiosPromise<AkskList> {
            return AksksApiFp(configuration).listAksks_4(after, amount, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * AksksApi - object-oriented interface
 * @export
 * @class AksksApi
 * @extends {BaseAPI}
 */
export class AksksApi extends BaseAPI {
    /**
     * 
     * @summary create aksk
     * @param {string} [description] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AksksApi
     */
    public createAksk(description?: string, options?: any) {
        return AksksApiFp(this.configuration).createAksk(description, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary create aksk
     * @param {string} [description] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AksksApi
     */
    public createAksk_1(description?: string, options?: any) {
        return AksksApiFp(this.configuration).createAksk_1(description, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary delete aksk
     * @param {string} [id] 
     * @param {string} [accessKey] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AksksApi
     */
    public deleteAksk(id?: string, accessKey?: string, options?: any) {
        return AksksApiFp(this.configuration).deleteAksk(id, accessKey, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary delete aksk
     * @param {string} [id] 
     * @param {string} [accessKey] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AksksApi
     */
    public deleteAksk_2(id?: string, accessKey?: string, options?: any) {
        return AksksApiFp(this.configuration).deleteAksk_2(id, accessKey, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary get aksk
     * @param {string} [id] 
     * @param {string} [accessKey] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AksksApi
     */
    public getAksk(id?: string, accessKey?: string, options?: any) {
        return AksksApiFp(this.configuration).getAksk(id, accessKey, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary get aksk
     * @param {string} [id] 
     * @param {string} [accessKey] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AksksApi
     */
    public getAksk_3(id?: string, accessKey?: string, options?: any) {
        return AksksApiFp(this.configuration).getAksk_3(id, accessKey, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary list aksks
     * @param {number} [after] return items after this value
     * @param {number} [amount] how many items to return
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AksksApi
     */
    public listAksks(after?: number, amount?: number, options?: any) {
        return AksksApiFp(this.configuration).listAksks(after, amount, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary list aksks
     * @param {number} [after] return items after this value
     * @param {number} [amount] how many items to return
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AksksApi
     */
    public listAksks_4(after?: number, amount?: number, options?: any) {
        return AksksApiFp(this.configuration).listAksks_4(after, amount, options).then((request) => request(this.axios, this.basePath));
    }

}