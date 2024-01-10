/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface LoginConfig {
  /**
   * RBAC will remain enabled on GUI if "external".  That only works
   * with an external auth service.
   */
  RBAC?: "simplified" | "external";
  /** primary URL to use for login. */
  login_url: string;
  /**
   * message to display to users who fail to login; a full sentence that is rendered
   * in HTML and may contain a link to a secondary login method
   */
  login_failed_message?: string;
  /** secondary URL to offer users to use for login. */
  fallback_login_url?: string;
  /** label to place on fallback_login_url. */
  fallback_login_label?: string;
  /** cookie names used to store JWT */
  login_cookie_names: string[];
  /** URL to use for logging out. */
  logout_url: string;
}

export interface SetupState {
  state?: "initialized" | "not_initialized";
  /** true if the comm prefs are missing. */
  comm_prefs_missing?: boolean;
  login_config?: {
    /**
     * RBAC will remain enabled on GUI if "external".  That only works
     * with an external auth service.
     */
    RBAC?: "simplified" | "external";
    /** primary URL to use for login. */
    login_url: string;
    /**
     * message to display to users who fail to login; a full sentence that is rendered
     * in HTML and may contain a link to a secondary login method
     */
    login_failed_message?: string;
    /** secondary URL to offer users to use for login. */
    fallback_login_url?: string;
    /** label to place on fallback_login_url. */
    fallback_login_label?: string;
    /** cookie names used to store JWT */
    login_cookie_names: string[];
    /** URL to use for logging out. */
    logout_url: string;
  };
}

export interface BranchCreation {
  name: string;
  source: string;
}

export enum RefType {
  Branch = "branch",
  Wip = "wip",
  Tag = "tag",
  Commit = "commit",
}

export interface Branch {
  /** @format uuid */
  id: string;
  /** @format uuid */
  repository_id: string;
  commit_hash: string;
  name: string;
  description?: string;
  /** @format uuid */
  creator_id: string;
  /** @format date-time */
  created_at: string;
  /** @format date-time */
  updated_at: string;
}

export interface BranchList {
  pagination: {
    /** Next page is available */
    has_more: boolean;
    /** Token used to retrieve the next page */
    next_offset: string;
    /**
     * Number of values found in the results
     * @min 0
     */
    results: number;
    /**
     * Maximal number of entries per page
     * @min 0
     */
    max_per_page: number;
  };
  results: {
    /** @format uuid */
    id: string;
    /** @format uuid */
    repository_id: string;
    commit_hash: string;
    name: string;
    description?: string;
    /** @format uuid */
    creator_id: string;
    /** @format date-time */
    created_at: string;
    /** @format date-time */
    updated_at: string;
  }[];
}

export interface CreateRepository {
  description?: string;
  name: string;
  /** block storage config url encoded json */
  blockstore_config?: string;
}

export interface UpdateRepository {
  description?: string;
  head?: string;
}

export interface RepositoryList {
  pagination: {
    /** Next page is available */
    has_more: boolean;
    /** Token used to retrieve the next page */
    next_offset: string;
    /**
     * Number of values found in the results
     * @min 0
     */
    results: number;
    /**
     * Maximal number of entries per page
     * @min 0
     */
    max_per_page: number;
  };
  results: {
    /** @format uuid */
    id: string;
    name: string;
    /** @format uuid */
    owner_id: string;
    head: string;
    use_public_storage: boolean;
    storage_adapter_params?: string;
    storage_namespace?: string;
    description?: string;
    /** @format uuid */
    creator_id: string;
    /** @format date-time */
    created_at: string;
    /** @format date-time */
    updated_at: string;
  }[];
}

export interface Repository {
  /** @format uuid */
  id: string;
  name: string;
  /** @format uuid */
  owner_id: string;
  head: string;
  use_public_storage: boolean;
  storage_adapter_params?: string;
  storage_namespace?: string;
  description?: string;
  /** @format uuid */
  creator_id: string;
  /** @format date-time */
  created_at: string;
  /** @format date-time */
  updated_at: string;
}

export interface Blob {
  hash: string;
  /** @format uuid */
  repository_id: string;
  check_sum: string;
  /** @format int8 */
  type: number;
  /** @format int64 */
  size: number;
  properties: Record<string, string>;
  /** @format date-time */
  created_at: string;
  /** @format date-time */
  updated_at: string;
}

export interface Signature {
  name: string;
  /** @format email */
  email: string;
  /** @format date-time */
  when: string;
}

export interface Commit {
  hash: string;
  /** @format uuid */
  repository_id: string;
  author: {
    name: string;
    /** @format email */
    email: string;
    /** @format date-time */
    when: string;
  };
  committer: {
    name: string;
    /** @format email */
    email: string;
    /** @format date-time */
    when: string;
  };
  merge_tag: string;
  message: string;
  tree_hash: string;
  parent_hashes: string[];
  /** @format date-time */
  created_at: string;
  /** @format date-time */
  updated_at: string;
}

export interface TreeEntry {
  name: string;
  hash: string;
  is_dir: boolean;
}

export interface FullTreeEntry {
  name: string;
  hash: string;
  is_dir: boolean;
  /** @format int64 */
  size: number;
  /** @format date-time */
  created_at: string;
  /** @format date-time */
  updated_at: string;
}

export interface TreeNode {
  hash: string;
  /** @format uuid */
  repository_id: string;
  /** @format int8 */
  type: number;
  properties: Record<string, string>;
  sub_objects: {
    name: string;
    hash: string;
    is_dir: boolean;
  }[];
  /** @format date-time */
  created_at: string;
  /** @format date-time */
  updated_at: string;
}

export interface Wip {
  /** @format uuid */
  id: string;
  current_tree: string;
  base_commit: string;
  /** @format uuid */
  repository_id: string;
  /** @format uuid */
  ref_id: string;
  /** @format int */
  state: number;
  /** @format uuid */
  creator_id: string;
  /** @format date-time */
  created_at: string;
  /** @format date-time */
  updated_at: string;
}

export interface Change {
  path: string;
  action: 1 | 2 | 3;
  base_hash?: string;
  to_hash?: string;
}

export interface UserUpdate {
  username: string;
  /** @format email */
  email: string;
  /** @minLength 8 */
  password?: string;
}

export interface UserInfo {
  /** @format uuid */
  id: string;
  name: string;
  /** @format email */
  email: string;
  /** @format date-time */
  current_sign_in_at?: string;
  /** @format date-time */
  last_sign_in_at?: string;
  /** @format ipv4 */
  current_sign_in_ip?: string;
  /** @format ipv4 */
  last_sign_in_ip?: string;
  /** @format date-time */
  created_at: string;
  /** @format date-time */
  updated_at: string;
}

export interface UserRegisterInfo {
  name: string;
  /** @minLength 8 */
  password: string;
  /** @format email */
  email: string;
}

export interface AuthenticationToken {
  /** a JWT token that could be used to authenticate requests */
  token: string;
  /**
   * Unix Epoch in seconds
   * @format int64
   */
  token_expiration?: number;
}

export interface VersionResult {
  /** program version */
  version: string;
  /** runtime version */
  api_version: string;
  latest_version?: string;
}

export type ObjectUserMetadata = Record<string, string>;

export interface ObjectStats {
  path: string;
  /** @format uint32 */
  path_mode?: number;
  checksum: string;
  /** @format int64 */
  size_bytes?: number;
  /**
   * Unix Epoch in seconds
   * @format int64
   */
  mtime: number;
  metadata?: Record<string, string>;
  /** Object media type */
  content_type?: string;
}

export interface ObjectStatsList {
  pagination: {
    /** Next page is available */
    has_more: boolean;
    /** Token used to retrieve the next page */
    next_offset: string;
    /**
     * Number of values found in the results
     * @min 0
     */
    results: number;
    /**
     * Maximal number of entries per page
     * @min 0
     */
    max_per_page: number;
  };
  results: {
    path: string;
    /** @format uint32 */
    path_mode?: number;
    checksum: string;
    /** @format int64 */
    size_bytes?: number;
    /**
     * Unix Epoch in seconds
     * @format int64
     */
    mtime: number;
    metadata?: Record<string, string>;
    /** Object media type */
    content_type?: string;
  }[];
}

export interface BlockStoreConfig {
  /** type of support storage type */
  type: "local" | "gs" | "azure" | "s3";
  default_namespace_prefix?: string;
  local?: {
    path: string;
  };
  azure?: {
    storage_access_key: string;
    storage_account: string;
    /** @format int64 */
    try_timeout: number;
  };
  gs?: {
    credentials_json: string;
    s3_endpoint: string;
  };
  s3?: {
    credentials: {
      access_key_id: string;
      secret_access_key: string;
      session_token: string;
    };
    web_identity?: {
      /** @format int64 */
      session_duration: number;
      /** @format int64 */
      session_expiry_window: number;
    };
    discover_bucket_region: boolean;
    endpoint: string;
    force_path_style?: boolean;
    region?: string;
  };
}

export interface WebIdentity {
  /** @format int64 */
  session_duration: number;
  /** @format int64 */
  session_expiry_window: number;
}

/** S3AuthInfo holds S3-style authentication. */
export interface S3AuthInfo {
  credentials: {
    access_key_id: string;
    secret_access_key: string;
    session_token: string;
  };
}

export interface Credential {
  access_key_id: string;
  secret_access_key: string;
  session_token: string;
}

export type SecureString = string;

export interface Pagination {
  /** Next page is available */
  has_more: boolean;
  /** Token used to retrieve the next page */
  next_offset: string;
  /**
   * Number of values found in the results
   * @min 0
   */
  results: number;
  /**
   * Maximal number of entries per page
   * @min 0
   */
  max_per_page: number;
}

export interface Error {
  /** short message explaining the error */
  message: string;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "http://localhost:3000/api/v1";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;
    const token = localStorage.getItem('token');


    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
        'Authorization': `${token}`
      },
      signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title jiaozifs API
 * @version 1.0.0
 * @license Apache 2.0 (https://www.apache.org/licenses/LICENSE-2.0.html)
 * @baseUrl http://localhost:34913/api/v1
 *
 * jiaozifs HTTP API
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  version = {
    /**
     * No description
     *
     * @tags common
     * @name GetVersion
     * @summary return program and runtime version
     * @request GET:/version
     */
    getVersion: (params: RequestParams = {}) =>
      this.request<
        {
          /** program version */
          version: string;
          /** runtime version */
          api_version: string;
          latest_version?: string;
        },
        any
      >({
        path: `/version`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  setup = {
    /**
     * No description
     *
     * @tags common
     * @name GetSetupState
     * @summary check if jiaozifs setup
     * @request GET:/setup
     */
    getSetupState: (params: RequestParams = {}) =>
      this.request<
        {
          state?: "initialized" | "not_initialized";
          /** true if the comm prefs are missing. */
          comm_prefs_missing?: boolean;
          login_config?: {
            /**
             * RBAC will remain enabled on GUI if "external".  That only works
             * with an external auth service.
             */
            RBAC?: "simplified" | "external";
            /** primary URL to use for login. */
            login_url: string;
            /**
             * message to display to users who fail to login; a full sentence that is rendered
             * in HTML and may contain a link to a secondary login method
             */
            login_failed_message?: string;
            /** secondary URL to offer users to use for login. */
            fallback_login_url?: string;
            /** label to place on fallback_login_url. */
            fallback_login_label?: string;
            /** cookie names used to store JWT */
            login_cookie_names: string[];
            /** URL to use for logging out. */
            logout_url: string;
          };
        },
        void
      >({
        path: `/setup`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  object = {
    /**
     * No description
     *
     * @tags objects
     * @name GetObject
     * @summary get object content
     * @request GET:/object/{owner}/{repository}
     * @secure
     */
    getObject: (
      owner: string,
      repository: string,
      query: {
        /** branch/tag to the ref */
        refName: string;
        /** relative to the ref */
        path: string;
        /** type indicate to retrieve from wip/branch/tag, default branch */
        type: "branch" | "wip" | "tag" | "commit";
      },
      params: RequestParams = {},
    ) =>
      this.request<File, void>({
        path: `/object/${owner}/${repository}`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags objects
     * @name HeadObject
     * @summary check if object exists
     * @request HEAD:/object/{owner}/{repository}
     * @secure
     */
    headObject: (
      owner: string,
      repository: string,
      query: {
        /** branch/tag to the ref */
        refName: string;
        /** relative to the ref */
        path: string;
        /** type indicate to retrieve from wip/branch/tag, default branch */
        type: "branch" | "wip" | "tag" | "commit";
      },
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/object/${owner}/${repository}`,
        method: "HEAD",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags objects
     * @name UploadObject
     * @request POST:/object/{owner}/{repository}
     * @secure
     */
    uploadObject: (
      owner: string,
      repository: string,
      query: {
        /** branch/tag to the ref */
        refName: string;
        /** relative to the ref */
        path: string;
      },
      data: {
        /**
         * Only a single file per upload which must be named "content".
         * @format binary
         */
        content?: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          path: string;
          /** @format uint32 */
          path_mode?: number;
          checksum: string;
          /** @format int64 */
          size_bytes?: number;
          /**
           * Unix Epoch in seconds
           * @format int64
           */
          mtime: number;
          metadata?: Record<string, string>;
          /** Object media type */
          content_type?: string;
        },
        void
      >({
        path: `/object/${owner}/${repository}`,
        method: "POST",
        query: query,
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags objects
     * @name DeleteObject
     * @summary delete object. Missing objects will not return a NotFound error.
     * @request DELETE:/object/{owner}/{repository}
     * @secure
     */
    deleteObject: (
      owner: string,
      repository: string,
      query: {
        /** branch/tag to the ref */
        refName: string;
        /** relative to the ref */
        path: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/object/${owner}/${repository}`,
        method: "DELETE",
        query: query,
        secure: true,
        ...params,
      }),
  };
  wip = {
    /**
     * No description
     *
     * @tags wip
     * @name GetWip
     * @summary get working in process
     * @request GET:/wip/{owner}/{repository}
     * @secure
     */
    getWip: (
      repository: string,
      owner: string,
      query: {
        /** ref name */
        refName: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @format uuid */
          id: string;
          current_tree: string;
          base_commit: string;
          /** @format uuid */
          repository_id: string;
          /** @format uuid */
          ref_id: string;
          /** @format int */
          state: number;
          /** @format uuid */
          creator_id: string;
          /** @format date-time */
          created_at: string;
          /** @format date-time */
          updated_at: string;
        },
        void
      >({
        path: `/wip/${owner}/${repository}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags wip
     * @name DeleteWip
     * @summary remove working in process
     * @request DELETE:/wip/{owner}/{repository}
     * @secure
     */
    deleteWip: (
      repository: string,
      owner: string,
      query: {
        /** ref name */
        refName: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/wip/${owner}/${repository}`,
        method: "DELETE",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags wip
     * @name RevertWipChanges
     * @summary revert changes in working in process, empty path will revert all
     * @request POST:/wip/{owner}/{repository}/revert
     * @secure
     */
    revertWipChanges: (
      repository: string,
      owner: string,
      query: {
        /** ref name */
        refName: string;
        /** prefix of path */
        pathPrefix?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/wip/${owner}/${repository}/revert`,
        method: "POST",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags wip
     * @name GetWipChanges
     * @summary get working in process changes
     * @request GET:/wip/{owner}/{repository}/changes
     * @secure
     */
    getWipChanges: (
      owner: string,
      repository: string,
      query: {
        /** ref name */
        refName: string;
        /** path */
        path?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          path: string;
          action: 1 | 2 | 3;
          base_hash?: string;
          to_hash?: string;
        }[],
        void
      >({
        path: `/wip/${owner}/${repository}/changes`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags wip
     * @name CommitWip
     * @summary commit working in process to branch
     * @request POST:/wip/{owner}/{repository}/commit
     * @secure
     */
    commitWip: (
      owner: string,
      repository: string,
      query: {
        /** ref name */
        refName: string;
        /** commit message */
        msg: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @format uuid */
          id: string;
          current_tree: string;
          base_commit: string;
          /** @format uuid */
          repository_id: string;
          /** @format uuid */
          ref_id: string;
          /** @format int */
          state: number;
          /** @format uuid */
          creator_id: string;
          /** @format date-time */
          created_at: string;
          /** @format date-time */
          updated_at: string;
        },
        void
      >({
        path: `/wip/${owner}/${repository}/commit`,
        method: "POST",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags wip
     * @name ListWip
     * @summary list wip in specific project and user
     * @request GET:/wip/{owner}/{repository}/list
     * @secure
     */
    listWip: (owner: string, repository: string, params: RequestParams = {}) =>
      this.request<
        {
          /** @format uuid */
          id: string;
          current_tree: string;
          base_commit: string;
          /** @format uuid */
          repository_id: string;
          /** @format uuid */
          ref_id: string;
          /** @format int */
          state: number;
          /** @format uuid */
          creator_id: string;
          /** @format date-time */
          created_at: string;
          /** @format date-time */
          updated_at: string;
        }[],
        void
      >({
        path: `/wip/${owner}/${repository}/list`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  repos = {
    /**
     * No description
     *
     * @tags commit
     * @name GetEntriesInRef
     * @summary list entries in ref
     * @request GET:/repos/{owner}/{repository}/contents
     * @secure
     */
    getEntriesInRef: (
      owner: string,
      repository: string,
      query: {
        /** specific path, if not specific return entries in root */
        path?: string;
        /** specific branch,  default to repostiory default branch(HEAD) */
        ref?: string;
        /** type indicate to retrieve from wip/branch/tag, default branch */
        type: "branch" | "wip" | "tag" | "commit";
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          name: string;
          hash: string;
          is_dir: boolean;
          /** @format int64 */
          size: number;
          /** @format date-time */
          created_at: string;
          /** @format date-time */
          updated_at: string;
        }[],
        void
      >({
        path: `/repos/${owner}/${repository}/contents`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags commit
     * @name CompareCommit
     * @summary compare two commit
     * @request GET:/repos/{owner}/{repository}/compare/{basehead}
     * @secure
     */
    compareCommit: (
      owner: string,
      repository: string,
      basehead: string,
      query?: {
        /** specific path, if not specific return entries in root */
        path?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          path: string;
          action: 1 | 2 | 3;
          base_hash?: string;
          to_hash?: string;
        }[],
        void
      >({
        path: `/repos/${owner}/${repository}/compare/${basehead}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags commit
     * @name GetCommitChanges
     * @summary get changes in commit
     * @request GET:/repos/{owner}/{repository}/changes/{commit_id}
     * @secure
     */
    getCommitChanges: (
      owner: string,
      repository: string,
      commitId: string,
      query?: {
        /** specific path, if not specific return entries in root */
        path?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          path: string;
          action: 1 | 2 | 3;
          base_hash?: string;
          to_hash?: string;
        }[],
        void
      >({
        path: `/repos/${owner}/${repository}/changes/${commitId}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags repo
     * @name GetCommitsInRepository
     * @summary get commits in repository
     * @request GET:/repos/{owner}/{repository}/commits
     * @secure
     */
    getCommitsInRepository: (
      owner: string,
      repository: string,
      query?: {
        /**
         * return items after this value
         * @format date-time-ns
         */
        after?: string;
        /**
         * how many items to return
         * @min -1
         * @max 1000
         * @default 100
         */
        amount?: number;
        /** ref(branch/tag) name */
        refName?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          hash: string;
          /** @format uuid */
          repository_id: string;
          author: {
            name: string;
            /** @format email */
            email: string;
            /** @format date-time */
            when: string;
          };
          committer: {
            name: string;
            /** @format email */
            email: string;
            /** @format date-time */
            when: string;
          };
          merge_tag: string;
          message: string;
          tree_hash: string;
          parent_hashes: string[];
          /** @format date-time */
          created_at: string;
          /** @format date-time */
          updated_at: string;
        }[],
        any
      >({
        path: `/repos/${owner}/${repository}/commits`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags repo
     * @name GetRepository
     * @summary get repository
     * @request GET:/repos/{owner}/{repository}
     * @secure
     */
    getRepository: (owner: string, repository: string, params: RequestParams = {}) =>
      this.request<
        {
          /** @format uuid */
          id: string;
          name: string;
          /** @format uuid */
          owner_id: string;
          head: string;
          use_public_storage: boolean;
          storage_adapter_params?: string;
          storage_namespace?: string;
          description?: string;
          /** @format uuid */
          creator_id: string;
          /** @format date-time */
          created_at: string;
          /** @format date-time */
          updated_at: string;
        },
        void
      >({
        path: `/repos/${owner}/${repository}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags repo
     * @name DeleteRepository
     * @summary delete repository
     * @request DELETE:/repos/{owner}/{repository}
     * @secure
     */
    deleteRepository: (owner: string, repository: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/repos/${owner}/${repository}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags repo
     * @name UpdateRepository
     * @summary update repository
     * @request POST:/repos/{owner}/{repository}
     * @secure
     */
    updateRepository: (
      owner: string,
      repository: string,
      data: {
        description?: string;
        head?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/repos/${owner}/${repository}`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags branches
     * @name ListBranches
     * @summary list branches
     * @request GET:/repos/{owner}/{repository}/branches
     * @secure
     */
    listBranches: (
      owner: string,
      repository: string,
      query?: {
        /** return items prefixed with this value */
        prefix?: string;
        /** return items after this value */
        after?: string;
        /**
         * how many items to return
         * @min -1
         * @max 1000
         * @default 100
         */
        amount?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          pagination: {
            /** Next page is available */
            has_more: boolean;
            /** Token used to retrieve the next page */
            next_offset: string;
            /**
             * Number of values found in the results
             * @min 0
             */
            results: number;
            /**
             * Maximal number of entries per page
             * @min 0
             */
            max_per_page: number;
          };
          results: {
            /** @format uuid */
            id: string;
            /** @format uuid */
            repository_id: string;
            commit_hash: string;
            name: string;
            description?: string;
            /** @format uuid */
            creator_id: string;
            /** @format date-time */
            created_at: string;
            /** @format date-time */
            updated_at: string;
          }[];
        },
        void
      >({
        path: `/repos/${owner}/${repository}/branches`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags branches
     * @name GetBranch
     * @summary get branch
     * @request GET:/repos/{owner}/{repository}/branch
     * @secure
     */
    getBranch: (
      owner: string,
      repository: string,
      query: {
        refName: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @format uuid */
          id: string;
          /** @format uuid */
          repository_id: string;
          commit_hash: string;
          name: string;
          description?: string;
          /** @format uuid */
          creator_id: string;
          /** @format date-time */
          created_at: string;
          /** @format date-time */
          updated_at: string;
        },
        void
      >({
        path: `/repos/${owner}/${repository}/branch`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags branches
     * @name DeleteBranch
     * @summary delete branch
     * @request DELETE:/repos/{owner}/{repository}/branch
     * @secure
     */
    deleteBranch: (
      owner: string,
      repository: string,
      query: {
        refName: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/repos/${owner}/${repository}/branch`,
        method: "DELETE",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags branches
     * @name CreateBranch
     * @summary create branch
     * @request POST:/repos/{owner}/{repository}/branch
     * @secure
     */
    createBranch: (
      owner: string,
      repository: string,
      data: {
        name: string;
        source: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          name: string;
          source: string;
        },
        void
      >({
        path: `/repos/${owner}/${repository}/branch`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  users = {
    /**
     * No description
     *
     * @tags repo
     * @name ListRepository
     * @summary list repository in specific owner
     * @request GET:/users/{owner}/repos
     * @secure
     */
    listRepository: (
      owner: string,
      query?: {
        /** return items prefixed with this value */
        prefix?: string;
        /**
         * return items after this value
         * @format date-time
         */
        after?: string;
        /**
         * how many items to return
         * @min -1
         * @max 1000
         * @default 100
         */
        amount?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          pagination: {
            /** Next page is available */
            has_more: boolean;
            /** Token used to retrieve the next page */
            next_offset: string;
            /**
             * Number of values found in the results
             * @min 0
             */
            results: number;
            /**
             * Maximal number of entries per page
             * @min 0
             */
            max_per_page: number;
          };
          results: {
            /** @format uuid */
            id: string;
            name: string;
            /** @format uuid */
            owner_id: string;
            head: string;
            use_public_storage: boolean;
            storage_adapter_params?: string;
            storage_namespace?: string;
            description?: string;
            /** @format uuid */
            creator_id: string;
            /** @format date-time */
            created_at: string;
            /** @format date-time */
            updated_at: string;
          }[];
        },
        void
      >({
        path: `/users/${owner}/repos`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags repo
     * @name ListRepositoryOfAuthenticatedUser
     * @summary list repository
     * @request GET:/users/repos
     * @secure
     */
    listRepositoryOfAuthenticatedUser: (
      query?: {
        /** return items prefixed with this value */
        prefix?: string;
        /**
         * return items after this value
         * @format date-time
         */
        after?: string;
        /**
         * how many items to return
         * @min -1
         * @max 1000
         * @default 100
         */
        amount?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          pagination: {
            /** Next page is available */
            has_more: boolean;
            /** Token used to retrieve the next page */
            next_offset: string;
            /**
             * Number of values found in the results
             * @min 0
             */
            results: number;
            /**
             * Maximal number of entries per page
             * @min 0
             */
            max_per_page: number;
          };
          results: {
            /** @format uuid */
            id: string;
            name: string;
            /** @format uuid */
            owner_id: string;
            head: string;
            use_public_storage: boolean;
            storage_adapter_params?: string;
            storage_namespace?: string;
            description?: string;
            /** @format uuid */
            creator_id: string;
            /** @format date-time */
            created_at: string;
            /** @format date-time */
            updated_at: string;
          }[];
        },
        void
      >({
        path: `/users/repos`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags repo
     * @name CreateRepository
     * @summary create repository
     * @request POST:/users/repos
     * @secure
     */
    createRepository: (
      data: {
        description?: string;
        name: string;
        /** block storage config url encoded json */
        blockstore_config?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** @format uuid */
          id: string;
          name: string;
          /** @format uuid */
          owner_id: string;
          head: string;
          use_public_storage: boolean;
          storage_adapter_params?: string;
          storage_namespace?: string;
          description?: string;
          /** @format uuid */
          creator_id: string;
          /** @format date-time */
          created_at: string;
          /** @format date-time */
          updated_at: string;
        }[],
        void
      >({
        path: `/users/repos`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name Register
     * @summary perform user registration
     * @request POST:/users/register
     */
    register: (
      data: {
        name: string;
        /** @minLength 8 */
        password: string;
        /** @format email */
        email: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/users/register`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name GetUserInfo
     * @summary get information of the currently logged-in user
     * @request GET:/users/user
     * @secure
     */
    getUserInfo: (params: RequestParams = {}) =>
      this.request<
        {
          /** @format uuid */
          id: string;
          name: string;
          /** @format email */
          email: string;
          /** @format date-time */
          current_sign_in_at?: string;
          /** @format date-time */
          last_sign_in_at?: string;
          /** @format ipv4 */
          current_sign_in_ip?: string;
          /** @format ipv4 */
          last_sign_in_ip?: string;
          /** @format date-time */
          created_at: string;
          /** @format date-time */
          updated_at: string;
        },
        void
      >({
        path: `/users/user`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  auth = {
    /**
     * No description
     *
     * @tags auth
     * @name Login
     * @summary perform a login
     * @request POST:/auth/login
     */
    login: (
      data: {
        name: string;
        password: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /** a JWT token that could be used to authenticate requests */
          token: string;
          /**
           * Unix Epoch in seconds
           * @format int64
           */
          token_expiration?: number;
        },
        void
      >({
        path: `/auth/login`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name Logout
     * @summary perform a logout
     * @request POST:/auth/logout
     * @secure
     */
    logout: (params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/auth/logout`,
        method: "POST",
        secure: true,
        ...params,
      }),
  };
}


const api = new Api()
export const version = api.version
export const setup = api.setup
export const object = api.object
export const wip = api.wip
export const repos = api.repos
export const users = api.users
export const auth = api.auth
