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


import { Pagination } from './pagination';
import { Tag } from './tag';

/**
 * 
 * @export
 * @interface TagList
 */
export interface TagList {
    /**
     * 
     * @type {Pagination}
     * @memberof TagList
     */
    pagination: Pagination;
    /**
     * 
     * @type {Array<Tag>}
     * @memberof TagList
     */
    results: Array<Tag>;
}


