import { Repositories } from "./Repositories";
import { Branches } from "./Branches";
import { Tags } from "./Tags";
import { Objects } from "./Objects";
import { Commits } from "./Commits";
import { Setup } from "./Setup";
import { Refs } from "./Refs";
import { Auth } from "./Auth";
import { Actions } from "./Actions";
import { Retention } from "./Retention/index";
import { Config } from "./Config";
import { BranchProtectionRules } from "./BranchProtectionRules";
import { Statistics } from "./Statistics";
import { Staging } from "./Staging";
import { OTFDiffs } from "./OTFDiffs";
import { Import } from "./Import";
import mergeHeaders from 'merge-headers';
import { AdditionalHeaders, LinkToPathParams, QueryParts, RequestData, UploadWithProgress, _Headers, _Response } from "./interface";

export const API_ENDPOINT = '/api/v1';
export const DEFAULT_LISTING_AMOUNT = 100;

export const SETUP_STATE_INITIALIZED = "initialized";
export const SETUP_STATE_NOT_INITIALIZED = "not_initialized";

class LocalCache {
    get(key: string) {
        const value = localStorage.getItem(key);
        if (value !== null) {
            return JSON.parse(value);
        }
        return null;
    }

    set(key: string, value: string) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    delete(key: string) {
        localStorage.removeItem(key);
    }
}

export const cache = new LocalCache();

export const linkToPath = ({ repoId, branchId, path, presign = false }: LinkToPathParams) => {
    const query = qs({
        path,
        presign,
    });
    return `${API_ENDPOINT}/repositories/${repoId}/refs/${branchId}/objects?${query}`;
};

export const qs = (queryParts: QueryParts) => {
    const parts = Object.keys(queryParts).map(key => [key, String(queryParts[key])]);
    return new URLSearchParams(parts).toString();
};

export const extractError = async (response: Response) => {
    let body;
    if (response.headers.get('Content-Type') === 'application/json') {
        const jsonBody = await response.json();
        body = jsonBody.message;
    } else {
        body = await response.text();
    }
    return body;
};

export const defaultAPIHeaders = new Headers({
    "Accept": "application/json",
    "Content-Type": "application/json",
    "X-Lakefs-Client": "lakefs-webui/__buildVersion",
});

const authenticationError = "error authenticating request"

export const apiRequest = async (uri: string, requestData: RequestData = {}, additionalHeaders?: Headers) => {
    let headers = defaultAPIHeaders
    if (additionalHeaders) {
        headers = mergeHeaders(defaultAPIHeaders, additionalHeaders)
    }

    const response = await fetch(`${API_ENDPOINT}${uri}`, { headers, ...requestData });

    // check if we're missing credentials
    if (response.status === 401) {
        const errorMessage = await extractError(response);
        if (errorMessage === authenticationError) {
            cache.delete('user');
            throw new AuthenticationError('Authentication Error', response.status);
        }
        throw new AuthorizationError(errorMessage);
    }

    return response;
};

// helper errors
export class NotFoundError extends Error {
    constructor(message: string) {
        super(message)
        this.name = this.constructor.name;
    }
}

export class BadRequestError extends Error {
    constructor(message: string) {
        super(message)
        this.name = this.constructor.name;
    }
}

export class AuthorizationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class AuthenticationError extends Error {
    status: number;
    constructor(message: string, status: number) {
        super(message);
        this.status = status;
        this.name = this.constructor.name;
    }
}

export class MergeError extends Error {
    payload: Record<string, string>;
    constructor(message: string, payload: Record<string, string>) {
        super(message);
        this.name = this.constructor.name;
        this.payload = payload;
    }
}

export class RepositoryDeletionError extends Error {
    repoId: string;
    constructor(message: string, repoId: string) {
        super(message);
        this.name = this.constructor.name;
        this.repoId = repoId;
    }
}

// actual actions:

// uploadWithProgress uses good ol' XMLHttpRequest because progress indication in fetch() is
//  still not well supported across browsers (see https://stackoverflow.com/questions/35711724/upload-progress-indicators-for-fetch).
export const uploadWithProgress: UploadWithProgress = (url, file, method = 'POST', onProgress, additionalHeaders: AdditionalHeaders = {}) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.upload.addEventListener('progress', event => {
            if (onProgress) {
                onProgress((event.loaded / event.total) * 100);
            }
        });
        xhr.addEventListener('load', () => {
            resolve({
                status: xhr.status,
                body: xhr.responseText,
                contentType: xhr.getResponseHeader('Content-Type'),
                etag: xhr.getResponseHeader('ETag'),
                contentMD5: xhr.getResponseHeader('Content-MD5'),
            })
        });
        xhr.addEventListener('error', () => reject(new Error('Upload Failed')));
        xhr.addEventListener('abort', () => reject(new Error('Upload Aborted')));
        xhr.open(method, url, true);
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.setRequestHeader('X-Lakefs-Client', 'lakefs-webui/__buildVersion');
        if (additionalHeaders) {
            Object.keys(additionalHeaders).map(key => xhr.setRequestHeader(key, additionalHeaders[key]))
        }
        if (url.startsWith(API_ENDPOINT)) {
            // swagger API requires a form with a "content" field
            const data = new FormData();
            data.append('content', file);
            xhr.send(data);
        } else {
            xhr.send(file);
        }
    });
};

export const repositories = new Repositories();
export const branches = new Branches();
export const tags = new Tags();
export const objects = new Objects();
export const commits = new Commits();
export const refs = new Refs();
export const setup = new Setup();
export const auth = new Auth();
export const actions = new Actions();
export const retention = new Retention();
export const config = new Config();
export const branchProtectionRules = new BranchProtectionRules();
export const statistics = new Statistics();
export const staging = new Staging();
export const otfDiffs = new OTFDiffs();
export const imports = new Import();
