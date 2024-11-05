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



/**
 * 
 * @export
 * @interface Branch
 */
export interface Branch {
    /**
     * 
     * @type {string}
     * @memberof Branch
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof Branch
     */
    repository_id: string;
    /**
     * 
     * @type {string}
     * @memberof Branch
     */
    commit_hash: string;
    /**
     * 
     * @type {string}
     * @memberof Branch
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof Branch
     */
    description?: string;
    /**
     * 
     * @type {string}
     * @memberof Branch
     */
    creator_id: string;
    /**
     * 
     * @type {number}
     * @memberof Branch
     */
    created_at: number;
    /**
     * 
     * @type {number}
     * @memberof Branch
     */
    updated_at: number;
}

