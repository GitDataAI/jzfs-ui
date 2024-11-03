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


import { Credential } from './credential';
import { WebIdentity } from './web-identity';

/**
 * 
 * @export
 * @interface BlockStoreConfigS3
 */
export interface BlockStoreConfigS3 {
    /**
     * 
     * @type {Credential}
     * @memberof BlockStoreConfigS3
     */
    credentials: Credential;
    /**
     * 
     * @type {WebIdentity}
     * @memberof BlockStoreConfigS3
     */
    web_identity?: WebIdentity;
    /**
     * 
     * @type {boolean}
     * @memberof BlockStoreConfigS3
     */
    discover_bucket_region: boolean;
    /**
     * 
     * @type {string}
     * @memberof BlockStoreConfigS3
     */
    endpoint: string;
    /**
     * 
     * @type {boolean}
     * @memberof BlockStoreConfigS3
     */
    force_path_style?: boolean;
    /**
     * 
     * @type {string}
     * @memberof BlockStoreConfigS3
     */
    region?: string;
}


