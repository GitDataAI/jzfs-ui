import {
  useNavigate,
  useLocation,
  useParams,
  generatePath,
} from "react-router-dom";
import { urlProps } from "./interface";

export const useQuery = <T>(): Partial<T> => {
  const location = useLocation();
  const result: Record<string, string> = {};
  for (const [key, value] of new URLSearchParams(location.search).entries()) {
    result[key] = value;
  }
  return result as Partial<T>;
};

interface URLDetails {
  pathname: string;
  params?: Record<string, string>;
  query?: string | Record<string, string> | string[][] | URLSearchParams | undefined |Partial<Record<string, string | undefined>>;
}

type URLBuilderInput = URLDetails | string;

// TODO(elad): Return URL
export const buildURL = (url: urlProps | string) => {
  if (typeof url === "string") return url;
  // otherwise, assume query, params and pathname  
  const path = generatePath(url.pathname, url.params ? url.params : {});
  if (!url.query) return path;
  const definedQuery = Object.fromEntries(
    Object.entries(url.query || {}).filter(([key, value]) => value !== undefined)
);
  const query = new URLSearchParams(definedQuery).toString();  
  return `${path}?${query}`;
};

export const useRouter = <
  Q = Record<string, string | undefined>,
  T extends { [K in keyof T]?: string | undefined } = Record<
    string,
    string | undefined
  >
>() => {
  const location = useLocation();
  const query = useQuery<Q>();
  const params = useParams<T>();
  const navigate = useNavigate();
  return {
    query,
    params,
    route: location.pathname,
    navigate,
    push: (url: URLBuilderInput) => navigate(buildURL(url)),
  };
};
