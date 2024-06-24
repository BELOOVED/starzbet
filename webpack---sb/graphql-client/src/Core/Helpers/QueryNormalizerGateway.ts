import { assertIsString, isAnyObject, isArray, isEmpty, type TAnyObject } from "@sb/utils";
import { type TNormalizationData, type TRecord } from "../Generated/Helpers/Types";

type TNormalized = Record<string, Record<string, TRecord>>;

type TData = {
  original: TAnyObject;
  normalized: TNormalized;
};

const SERVICE_NAMES = [
  "Affiliate",
  "Agent",
  "Aggregator",
  "Auth",
  "Banner",
  "Cms",
  "ExternalPlatform",
  "NamedFilter",
  "Platform",
  "PreAggregator",
  "PreAggregatorStatistics",
  "ScheduleStatistics",
  "ProviderManager",
  "Schedule",
  "Sportsbook",
  "Funsclub",
  "Statistics",
  "Streaming",
  "Notifier",
  "Protection",
  "CasinoAggregator",
];

const prependKitName = (kitName: string, recordName: string) => SERVICE_NAMES.some((it) => recordName.startsWith(`${it}_`))
  ? `${kitName}_${recordName}`
  : `Core_${recordName}`;

const hasPageInfo = (candidate: unknown): candidate is { pageInfo: TAnyObject; } =>
  isAnyObject(candidate) &&
  candidate.hasOwnProperty("pageInfo");

const hasEdges = (candidate: unknown): candidate is { edges: TAnyObject[]; } =>
  isAnyObject(candidate) &&
  candidate.hasOwnProperty("edges");

const hasId = (candidate: unknown): candidate is { id: string; } =>
  isAnyObject(candidate) &&
  candidate.hasOwnProperty("id");

const hasTypename = (candidate: unknown): candidate is { __typename: string; } =>
  isAnyObject(candidate) &&
  candidate.hasOwnProperty("__typename");

const isUnion = (candidate: unknown): candidate is { __union__: true; __typename: string; id: string; } =>
  isAnyObject(candidate) &&
  Boolean(candidate.__union__) &&
  hasId(candidate) &&
  hasTypename(candidate);

const queryNormalizerGateway = (
  kitName: string,
  queryName: string,
  normalizationData: TNormalizationData,
  data: TData,
): Record<string, TRecord[]> => {
  const normalized = Object
    .entries(data.normalized)
    .reduce<Record<string, TRecord[]>>(
      (acc, cur) => {
        acc[prependKitName(kitName, cur[0])] = Object.values(cur[1]);

        return acc;
      },
      {},
    );

  const { resultId } = normalizationData;

  if (!resultId) {
    return normalized;
  }

  assertIsString(resultId, "[queryNormalizerGateway -> resultId]");

  const [service] = Object.values(data.original);

  if (!isAnyObject(service)) {
    throw new Error(`[queryNormalizerGateway -> ${queryName}] Service must be an object`);
  }

  const [result] = Object.values(service);

  if (isAnyObject(result)) {
    if (hasPageInfo(result)) {
      const record = {
        id: resultId,
        ...result.pageInfo,
      };

      const recordName = hasEdges(result)
        ? "Core_PageInfo"
        : "Core_Total";

      return {
        ...normalized,
        [recordName]: [record],
      };
    }

    if (hasId(result)) {
      if (!hasTypename(result)) {
        throw new Error(`[queryNormalizerGateway -> ${queryName}] Field "__typename" must be a string}`);
      }

      const recordName = prependKitName(kitName, result.__typename);

      const records = normalized[recordName] ?? [];

      return {
        ...normalized,
        [recordName]: records.concat(result),
      };
    }
  }

  if (isArray(result)) {
    let record;

    /**
     * Array of Record and Non Records must be treated differently
     * Empty array contains no info in runtime should there be Record or Non Records
     * In such case it must be treated both ways at the same time
     */
    if (isEmpty(result)) {
      record = {
        id: resultId,
        ids: [],
        items: [],
      };
    } else if (result.every(hasId)) {
      if (result.every(isUnion)) {
        record = {
          id: resultId,
          ids: result.map((it) => ({ entityId: it.id, entityTypename: it.__typename })),
        };
      } else {
        record = {
          id: resultId,
          ids: result.map((it) => it.id),
        };
      }
    } else {
      record = {
        id: resultId,
        items: result,
      };
    }

    return {
      ...normalized,
      [`${kitName}_${queryName}_QueryResult`]: [record],
    };
  }

  const record = {
    id: resultId,
    value: result,
  };

  return {
    ...normalized,
    [`${kitName}_${queryName}_QueryResult`]: [record],
  };
};

export { queryNormalizerGateway };
