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


import { TreeEntry } from './tree-entry';

/**
 * 
 * @export
 * @interface TreeNode
 */
export interface TreeNode {
    /**
     * 
     * @type {string}
     * @memberof TreeNode
     */
    hash: string;
    /**
     * 
     * @type {string}
     * @memberof TreeNode
     */
    repository_id: string;
    /**
     * 
     * @type {number}
     * @memberof TreeNode
     */
    type: number;
    /**
     * 
     * @type {{ [key: string]: string; }}
     * @memberof TreeNode
     */
    properties: { [key: string]: string; };
    /**
     * 
     * @type {Array<TreeEntry>}
     * @memberof TreeNode
     */
    sub_objects: Array<TreeEntry>;
    /**
     * 
     * @type {number}
     * @memberof TreeNode
     */
    created_at: number;
    /**
     * 
     * @type {number}
     * @memberof TreeNode
     */
    updated_at: number;
}

