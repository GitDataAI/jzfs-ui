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
 * @interface Pagination
 */
export interface Pagination {
    /**
     * Next page is available
     * @type {boolean}
     * @memberof Pagination
     */
    has_more: boolean;
    /**
     * Token used to retrieve the next page
     * @type {string}
     * @memberof Pagination
     */
    next_offset: string;
    /**
     * Number of values found in the results
     * @type {number}
     * @memberof Pagination
     */
    results: number;
    /**
     * Maximal number of entries per page
     * @type {number}
     * @memberof Pagination
     */
    max_per_page: number;
}


