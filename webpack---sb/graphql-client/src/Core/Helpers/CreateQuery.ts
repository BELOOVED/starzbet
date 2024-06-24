/* eslint-disable */
import createHashSum from "hash-sum";
import { ClientError, type Variables } from "graphql-request";
import { getNotNil, isAnyObject, isJsError, isNumber, isString, TExplicitAny } from "@sb/utils";
import type {
  TClient,
  TNormalizationData,
  TPersistedQueries,
  TQuery,
  TQueryArg,
  TQueryArgNormalizable,
  TQueryResult,
  TQueryResultNormalized,
  TRecordsManager,
} from "../Generated/Helpers/Types";
import { queryNormalizer } from "./QueryNormalizer";
import { hashSumSymbol, printQuery } from "./PrintQuery";
import { isTest } from "./EnvVariables";
import { TDocument, TFields } from "@sb/graphql-core";
import { Logger } from "./Logger";
import { queryNormalizerGateway } from "../Helpers/QueryNormalizerGateway";

export { ClientError } from "graphql-request";

const TOTAL_OPTIONAL_FIELDS = {
  [hashSumSymbol]: "::total::",
};

const INTERVAL = 250;

const isArgNormalizableUI = (arg: TQueryArg | TQueryArgNormalizable): arg is TQueryArgNormalizable => {
  const { normalizationData } = (arg as TQueryArgNormalizable);

  return normalizationData && !normalizationData.gateway;
};

const isArgNormalizableGateway = (arg: TQueryArg | TQueryArgNormalizable): arg is TQueryArgNormalizable =>
  !!(arg as TQueryArgNormalizable).normalizationData?.gateway;

const checkForExtraCall = (queryName: string, lastCall: number) => {
  if (isTest) {
    return;
  }

  if (Date.now() - lastCall < INTERVAL) {
    Logger.warn.gql(`Query "${queryName}" was called with an interval of less than ${INTERVAL}ms. High change of extra call`);
  }
};

const checkForOverFetching = (queryName: string, response: TExplicitAny) => {
  if (isTest) {
    return;
  }

  const responseSizeInKBytes = Math.ceil(new TextEncoder().encode(JSON.stringify(response)).length / 1000);

  if (responseSizeInKBytes > 300) {
    Logger.warn.gql(`Query "${queryName}" response size is ${responseSizeInKBytes}kB. High chance of over-fetching`);
  }
};

const getRequestDocument = (queryName: string, document: string, hash = "-"): string => {
  if (process.env.GRAPHQL_PERSISTED === "strict") {
    return `#${queryName}#${hash}#`;
  }

  if (process.env.GRAPHQL_PERSISTED === "both") {
    return `#${queryName}#${hash}#${document}`;
  }

  return document;
};

/**
 * Library "graphql-request" composes very long message with unnecessary information
 * There is no way to disabled that behaviour (at least for now)
 * Mutation required to store in message only necessary information
 */
const mutateClientError = (queryName: string, hash: undefined | string, reason: string, e: ClientError) => {
  try {
    if (e instanceof ClientError) {
      e.message = JSON.stringify({
        query: queryName,
        hash: hash ?? "UNKNOWN",
        response: e.response,
      });
    }
  } catch {

  }
};

const extractReason = (queryName: string, duration: number, e: TExplicitAny): string => {
  const fallback = `Failed Query "${queryName}"`;

  if (!(e instanceof ClientError)) {
    return fallback;
  }

  /**
   * Assuming that such long time is enough to be canceled by timeout (cloudflare cancels requests after 60 seconds)
   */
  if (duration > 58) {
    return `Failed Query by timeout(?) "${queryName}"`;
  }

  try {
    let error = e.response?.error;

    if (typeof error !== "string") {
      error = e.response?.errors?.[0]?.message;
    }

    if (typeof error !== "string") {
      return fallback;
    }

    if (/unresolved query/i.test(error)) {
      return `Unresolved Query "${queryName}"`;
    }

    const unresolvedUri = error.match(/url for uri: ([\w.]+) not resolved/i)?.[1];

    if (unresolvedUri) {
      return `Unresolved URI "${unresolvedUri}"`;
    }

    if (/internal server error/i.test(error)) {
      error = `Internal Server Error "${queryName}"`;

      try {
        const fullResponse = JSON.stringify(e.response);

        if (/domain logic exception/i.test(fullResponse)) {
          error = `Domain Logic Exception "${queryName}"`;
        } else if (/errors exception/i.test(fullResponse)) {
          error = `Errors Exception "${queryName}"`;
        } else if (/runtime exception/i.test(fullResponse)) {
          error = `Runtime Exception "${queryName}"`;
        }
      } catch {

      }

      return error;
    }
  } catch {

  }

  return fallback;
};

const networkErrors = [/Failed to fetch/, /Load failed/]

const isNonCriticalError = (e: unknown) => {
  if (isString(e) && networkErrors.some((it) => it.test(e))) {
    return true;
  }

  return isJsError(e) && networkErrors.some((it) => it.test(e.message));
}

/**
 * Top-level source have structure like
 *   source -> service -> query -> pageInfo
 *
 * So if level GT 2 that there will be no required pageInfo
 */
const findPageInfo = (source: TExplicitAny, level = 0) => {
  if (level > 2) {
    return null;
  }

  if (!isAnyObject(source)) {
    return null;
  }

  if (source.hasOwnProperty("pageInfo")) {
    const { pageInfo } = source;

    if (!isAnyObject(pageInfo)) {
      throw new Error("[createQuery -> extractTotal -> findPageInfo -> pageInfo] Object expected");
    }

    return pageInfo;
  }

  for (const value of Object.values(source)) {
    const pageInfo = findPageInfo(value, level + 1) as Record<string, TExplicitAny>;

    if (pageInfo) {
      return pageInfo;
    }
  }

  return null;
};

const extractTotal = (source: TExplicitAny): number => {
  const pageInfo = findPageInfo(source);

  if (pageInfo) {
    const { total } = pageInfo;

    if (!isNumber(total)) {
      throw new Error("[createQuery -> extractTotal -> pageInfo -> total] Number expected");
    }

    return total;
  }

  throw new Error("[createQuery -> extractTotal] Unable to extract total");
};

const creator = <O extends TFields>(
  kitName: string,
  queryName: string,
  document: TDocument<O>,
  ignoreBatching: boolean,
  persistedQueries: TPersistedQueries,
  total: boolean,
  recordsManagerCreator?: () => TRecordsManager,
) => {
  let lastCall = 0;

  return <R extends TQueryResult<TExplicitAny> | TQueryResultNormalized>(client: TClient, arg: TQueryArg | TQueryArgNormalizable): R => {
    const { signal, requestHeaders } = arg;
    let { variables } = arg;

    if (isArgNormalizableGateway(arg)) {
      variables = { ...variables, normalize: true };
    }

    const optionalFields = total
      ? TOTAL_OPTIONAL_FIELDS
      : arg.optionalFields;

    if (!optionalFields[hashSumSymbol]) {
      optionalFields[hashSumSymbol] = createHashSum(optionalFields);
    }

    checkForExtraCall(queryName, lastCall);

    lastCall = Date.now();

    const printed = printQuery(kitName, queryName, document, optionalFields);

    const hash = persistedQueries[queryName]?.[optionalFields[hashSumSymbol]];

    const start = performance.now();

    return client
      .request(getRequestDocument(queryName, printed, hash), ignoreBatching, variables, requestHeaders, signal)
      .then((response) => {
        checkForOverFetching(queryName, response);

        if (isArgNormalizableUI(arg)) {
          if (!recordsManagerCreator) {
            throw new Error(`Unable to normalize query "${queryName}" because whole kit was generated without normalization`);
          }

          return queryNormalizer(recordsManagerCreator(), arg.normalizationData, response);
        } else if (isArgNormalizableGateway(arg)) {
          return queryNormalizerGateway(kitName, queryName, arg.normalizationData, response as any)
        }

        if (total) {
          return extractTotal(response);
        }

        return response;
      })
      .catch((e) => {
        const end = performance.now();

        if (!signal?.aborted) {
          const duration = Math.round(end - start) / 1000;

          const reason = extractReason(queryName, duration, e);

          mutateClientError(queryName, hash, reason, e);

          const levelLogger = isNonCriticalError(e) ? Logger.warn : Logger.error;

          levelLogger.gql(reason, `Duration ${duration}s`, `Hash ${hash}`, e);
        }

        throw e;
      }) as R;
  };
};

const createQuery = <O extends TFields, V extends Variables, W extends boolean, N extends (null | TNormalizationData), R>(
  kitName: string,
  queryName: string,
  document: TDocument<O>,
  ignoreBatching: boolean,
  persistedQueries: TPersistedQueries,
  normalizable: N extends null ? false : true,
  withPageInfo: W,
  recordsManagerCreator?: () => TRecordsManager,
): TQuery<O, V, W, N, R> => {
  const curriedCreator = creator(
    kitName,
    queryName,
    document,
    ignoreBatching,
    persistedQueries,
    false,
    recordsManagerCreator,
  );

  const query = (client: TClient, arg: TQueryArg<O, V>) => curriedCreator<TQueryResult<R>>(client, arg);

  let normalize;
  let total;

  if (normalizable) {
    normalize = (client: TClient, arg: TQueryArgNormalizable<O, V, N>) => curriedCreator<TQueryResultNormalized>(client, arg);
  } else {
    normalize = null;
  }

  if (withPageInfo) {
    const curriedTotalCreator = creator(
      kitName,
      queryName,
      getNotNil(document.extra, ["createQuery", queryName, "document"], "total"),
      ignoreBatching,
      persistedQueries,
      true,
      recordsManagerCreator,
    );

    total = (client: TClient, arg: TQueryArgNormalizable<O, V, N>) => curriedTotalCreator<TQueryResultNormalized>(client, arg);

    const _total = (client: TClient, arg: TQueryArgNormalizable<O, V, N>) => curriedTotalCreator<TQueryResultNormalized>(client, arg);
    _total.normalize = (client: TClient, arg: TQueryArgNormalizable<O, V, N>) => curriedTotalCreator<TQueryResultNormalized>(client, arg);

    total = _total;
  } else {
    total = null;
  }

  query.queryName = queryName;
  query.normalize = normalize;
  query.total = total;

  return query as unknown as TQuery<O, V, W, N, R>;
};

export { createQuery };
