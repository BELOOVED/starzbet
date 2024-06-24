import { GraphQLClient } from "graphql-request";
import {
  Cheater,
  encodeBase64Binary,
  extractMaybePromise,
  IS_SERVER,
  isDev,
  isEmpty,
  isString,
  type TExplicitAny,
  type TMaybePromise,
} from "@sb/utils";
import { mergeDeepRight } from "@sb/utils/MergeDeepRight";
import { createHeadersWithMetadata } from "@sb/network-bus/Utils";
import { Client } from "./Client";

const LS_REQUEST_METHOD_KEY = "@@gqlclient/requestMethod";

const FALLBACK_METHOD = isDev ? "POST" : "GET";

const getRequestMethodFromLocalStorage = () => window.localStorage.getItem(LS_REQUEST_METHOD_KEY) ?? FALLBACK_METHOD;

type TFactory = () => TMaybePromise<Record<string, string>>;

const getHostAndPath = (info: RequestInfo) => {
  if (!isString(info) || isEmpty(info)) {
    return "";
  }

  return info;
};

interface IRequestBody {
  query: string;
  variables?: Record<string, TExplicitAny>;
}

interface IParsedBody {
  name: string | undefined;
  hash: string | undefined;
  query: string;
  bypassCache: boolean;
}

const maxQuerySize = 2048; // 4096 - limit of uws, 2 it's capacity

const parseBody = (jsonBody: IRequestBody): IParsedBody => {
  const [_, name, hash] = jsonBody.query.split("#");

  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  const encodedQuery = encodeURIComponent(`#${name}#${hash}#`);

  const encodedVariables = encodeURIComponent(encodeBase64Binary(JSON.stringify(jsonBody.variables || {})));

  const bypassCache = Boolean(jsonBody.variables?.bypassCache);

  const bypassCacheQuery = bypassCache ? "&bypassCache=true" : "";

  return {
    name,
    hash,
    query: `?query=${encodedQuery}&variables=${encodedVariables}${bypassCacheQuery}`,
    bypassCache,
  };
};

let requestMethod = !IS_SERVER ? getRequestMethodFromLocalStorage() : FALLBACK_METHOD;

const customFetch = (headersFactory: TFactory, metadataFactory?: TFactory) =>
  async (info: RequestInfo, init: RequestInit): Promise<Response> => {
    if (!isString(init.body)) {
      throw new Error("Invalid body.");
    }

    const headers = await extractMaybePromise(headersFactory());

    const headersWithMetadata = metadataFactory
      ? createHeadersWithMetadata(await extractMaybePromise(metadataFactory()))
      : {};

    const mergedHeaders = {
      ...headers,
      ...headersWithMetadata,
    };

    const jsonBody = JSON.parse(init.body) as IRequestBody;

    const requestInit: RequestInit = {
      headers: mergedHeaders,
      referrer: "", // disable `referrer` on some page we have long queryString with workspace.
    };

    let queryString = "";

    const parsedBody = parseBody(jsonBody);

    if (requestMethod === "POST") {
      return fetch(`${getHostAndPath(info)}?gql=${parsedBody.name ?? ""}`, mergeDeepRight(init ?? {}, requestInit));
    }

    if (jsonBody.query.includes("#")) {
      // max limit for uws.js
      if (!parsedBody.bypassCache && parsedBody.query.length < maxQuerySize) {
        queryString = parsedBody.query;
        requestInit.method = "GET";
        // to prevent send body in GET request
        delete init.body;
      } else {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        queryString = `?name=${parsedBody.name}`;
      }
    }

    return fetch(
      `${getHostAndPath(info)}${queryString}`,
      mergeDeepRight(init ?? {}, requestInit),
    );
  };

Cheater.add(
  ["gqlcrm"],
  () => {
    requestMethod = requestMethod === "GET" ? "POST" : "GET";
    if (!IS_SERVER) {
      window.localStorage.setItem(LS_REQUEST_METHOD_KEY, requestMethod);
    }
  },
  "GQL CHANGE REQUEST METHOD",
);

const createClient = (url: string, headersFactory: TFactory, metadataFactory?: TFactory) => {
  const graphQLClient = new GraphQLClient(
    url,
    {
      fetch: customFetch(headersFactory, metadataFactory),
    },
  );

  return new Client(graphQLClient);
};

export { createClient };
