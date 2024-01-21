import { cache } from "..";
import {Api, ApiConfig, ContentType, FullRequestParams, HttpResponse, QueryParamsType, RequestParams } from "./Api";

type CancelToken = Symbol | string | number;

export class HttpClient<SecurityDataType = unknown> {
    public baseUrl: string = window.JIAOZIFS_API_URL;
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
      const token = cache.get('token');
  
      return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
          'Authorization': `Bearer ${token}`
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
  
// const api = new Api()
// export const version = api.version
// export const setup = api.setup
// export const object = api.object
// export const wip = api.wip
// export const repos = api.repos
// export const users = api.users
// export const auth = api.auth