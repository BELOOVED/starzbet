/* eslint-disable */
import { capitalizeFirstLetter } from "@sb/utils";
import type {
  TDataRecord,
  TNormalizationData,
  TPlainNormalizer,
  TRecord,
  TRecordsManager,
  TRelationRecord,
} from "../Generated/Helpers/Types";

type TRecordNormalizerAdditionalData = { parentTypename: string; parentId: string; };

type TNormalizedData = {
  type: "record";
  typename: string;
  value: string;
} | {
  type: "records";
  typename?: string;
  value: Array<string>;
} | {
  type: "unknown";
  value: Array<string>;
} | {
  type: "unchanged";
  value: any;
};

const getRelationRecordName = (parentName: string, childName: string) => `${parentName}_To_${childName}`;

const isRecord = (recordsManager: TRecordsManager, data: Record<string, any>) => {
  if (!data.hasOwnProperty("__typename")) {
    return false;
  }

  if (recordsManager.predefinedNormalizerExists(data.__typename)) {
    return true;
  }

  return data.hasOwnProperty("id") && typeof data.id === "string";
};

const defaultRecordNormalizer: TPlainNormalizer<TDataRecord, TRecord, TRecordNormalizerAdditionalData | null> = (recordsManager, data, additionalData) => {
  const { id, __typename: typename } = data;

  const record: TRecord = { id };

  if (additionalData) {
    record.parentId = additionalData.parentId;
  }

  if (recordsManager.getOneToManyRelations()[typename]) {
    // @ts-ignore
    Object.values(recordsManager.getOneToManyRelations()[typename]).forEach((fieldName) => {
      record[`${fieldName}Id`] = id;
    });
  }

  return recordsManager.addRecord(
    data.__typename,
    Object.entries(data).reduce(
      (recordAcc, [recordKey, recordValue]) => {
        if (recordKey === "__typename") {
          return recordAcc;
        }

        const normalizedRecordValue = internalDataNormalizer(
          recordsManager,
          recordKey,
          recordValue,
          {
            parentTypename: data.__typename,
            parentId: data.id,
          },
        );

        if (normalizedRecordValue.type === "records") {
          return recordAcc;
        }

        if (normalizedRecordValue.type === "record") {
          return {
            ...recordAcc,
            [`${recordKey}Id`]: normalizedRecordValue.value,
          };
        }

        return {
          ...recordAcc,
          [recordKey]: normalizedRecordValue.value,
        };
      },
      record,
    ),
  );
};

const recordNormalizer: TPlainNormalizer<TDataRecord, TRecord, TRecordNormalizerAdditionalData | null> = (recordsManager, data, additionalData) => {
  const { __typename } = data;

  if (recordsManager.predefinedNormalizerExists(__typename)) {
    throw new Error(`Fragment with typename "${__typename}" have normalizer but default normalizer was called`);
  }

  if (!isRecord(recordsManager, data)) {
    throw new Error("Unable normalize data using default normalizer because data is not a record");
  }

  return defaultRecordNormalizer(recordsManager, data, additionalData);
};

const isPage = (data: Record<string, any>): data is Record<string, any> => {
  if (!data.hasOwnProperty("__typename")) {
    return false;
  }

  const { __typename } = data;

  if (!data.hasOwnProperty("pageInfo")) {
    return false;
  }

  if (!data.hasOwnProperty("edges")) {
    return true;
  }

  const { edges } = data;

  if (!Array.isArray(edges)) {
    throw new Error(`Edges is fragment with such typename is not array: ${__typename}`);
  }

  edges.forEach((edge) => {
    if (typeof edge !== "object" || edge === null) {
      throw new Error(`Edge in fragment with such typename is not an object: ${__typename}`);
    }

    if (!edge.hasOwnProperty("node")) {
      throw new Error(`Edge in fragment with such typename have no node: ${__typename}`);
    }
  });

  return true;
};

const primitiveResultNormalizer = (resultNormalizerName: string, recordsManager: TRecordsManager, data: any, normalizationData: TNormalizationData) => {
  recordsManager.getPredefinedNormalizer(resultNormalizerName)(recordsManager, data, normalizationData);
};

const addMissingRelationRecord = (recordsManager: TRecordsManager, recordNormalizerAdditionalData: TRecordNormalizerAdditionalData, key: string) => {
  const relations = recordsManager.getOneToManyRelations()[recordNormalizerAdditionalData.parentTypename];

  if (relations) {
    let childName: null | string = null;

    Object.entries(relations).forEach((entry) => {
      if (entry[1] === key) {
        childName = entry[0];
      }
    });

    if (childName) {
      const relationRecordName = getRelationRecordName(recordNormalizerAdditionalData.parentTypename, childName);

      if (!recordsManager.recordExists(relationRecordName, recordNormalizerAdditionalData.parentId)) {
        recordsManager.addRecord<TRelationRecord>(
          relationRecordName,
          {
            id: recordNormalizerAdditionalData.parentId,
            ids: [],
          },
        );
      }

    }
  }
}
const internalDataNormalizer = (recordsManager: TRecordsManager, key: string | undefined, data: any, recordNormalizerAdditionalData?: TRecordNormalizerAdditionalData): TNormalizedData => {
  if (Array.isArray(data)) {
    const value = data.map((dataValue) => internalDataNormalizer(recordsManager, undefined, dataValue, recordNormalizerAdditionalData).value);

    if (data.length === 0) {
      if (key && recordNormalizerAdditionalData) {
        addMissingRelationRecord(recordsManager, recordNormalizerAdditionalData, key);
      }

      return {
        type: "unknown",
        value,
      };
    }

    // @ts-ignore FIXME @strong-ts
    if (isRecord(recordsManager, data[0])) {
      // @ts-ignore FIXME @strong-ts
      const { __typename } = data[0];

      if (recordNormalizerAdditionalData) {
        if (recordsManager.oneToManyRelationExists(recordNormalizerAdditionalData.parentTypename, __typename)) {
          recordsManager.addRecord<TRelationRecord>(
            getRelationRecordName(recordNormalizerAdditionalData.parentTypename, __typename),
            {
              id: recordNormalizerAdditionalData.parentId,
              ids: value,
            },
          );
        }
      }

      return {
        type: "records",
        value,
      };
    }

    return {
      type: "unchanged",
      value,
    };
  }

  if (typeof data === "object" && data !== null) {
    if (isRecord(recordsManager, data)) {
      const { __typename } = data;

      if (recordsManager.predefinedNormalizerExists(__typename)) {
        return {
          type: "record",
          value: recordsManager.getPredefinedNormalizer(__typename)(recordsManager, data, recordNormalizerAdditionalData).id,
          typename: __typename,
        };
      }

      return {
        type: "record",
        value: defaultRecordNormalizer(recordsManager, data, recordNormalizerAdditionalData ?? null).id,
        typename: __typename,
      };
    }

    return {
      type: "unchanged",
      value: Object.entries(data).reduce(
        (unchangedAcc, [unchangedKey, unchangedValue]) => ({
          ...unchangedAcc,
          [unchangedKey]: internalDataNormalizer(recordsManager, unchangedKey, unchangedValue).value,
        }),
        {},
      ),
    };
  }

  if (key && recordNormalizerAdditionalData) {
    addMissingRelationRecord(recordsManager, recordNormalizerAdditionalData, key);
  }

  return {
    type: "unchanged",
    value: data,
  };
};

const dataNormalizer = <R extends ReturnType<typeof internalDataNormalizer>["value"]>(recordsManager: TRecordsManager, data: any): R =>
  internalDataNormalizer(recordsManager, undefined, data).value;

const resultNormalizer = (
  recordsManager: TRecordsManager,
  normalizationData: TNormalizationData,
  serviceName: string,
  resultName: string,
  data: any,
) => {
  const { resultId } = normalizationData;

  if (typeof resultId !== "string") {
    throw new Error(`Normalization data resultId must be string got ${typeof resultId}`);
  }

  const recordName = `${serviceName.charAt(0).toUpperCase() + serviceName.slice(1)}_${resultName}_QueryResult`;

  recordsManager.addRecord(
    recordName,
    {
      id: resultId,
      ids: data.map((item: any) => internalDataNormalizer(recordsManager, undefined, item).value),
    },
  );
};

const pageNormalizer = (recordsManager: TRecordsManager, data: any, normalizationData: TNormalizationData) => {
  const { pageInfo, edges } = data;

  const { resultId } = normalizationData;

  if (typeof resultId !== "string") {
    throw new Error(`Normalization data resultId must be string got ${typeof resultId}`);
  }

  if (edges) {
    recordsManager.addRecord(
      "PageInfo",
      {
        id: resultId,
        hasNextPage: pageInfo.hasNextPage,
        hasPreviousPage: pageInfo.hasPreviousPage,
        endCursor: pageInfo.endCursor,
        startCursor: pageInfo.startCursor,
        ids: edges.map((edge: Record<string, any>) => internalDataNormalizer(recordsManager, undefined, edge.node).value),
        total: pageInfo.total,
      },
    );

    return;
  }

  recordsManager.addRecord(
    "Total",
    {
      id: resultId,
      total: pageInfo.total,
    },
  );
};

const getQueryResult = (data: any) => {
  if (typeof data !== "object" || data === null) {
    throw new Error("Data must be object");
  }

  const serviceEntries: Array<[string, any]> = Object.entries(data);

  if (serviceEntries.length !== 1) {
    throw new Error("Data must contain only service entry");
  }

  const [serviceEntry] = serviceEntries;

  if (typeof serviceEntry !== "object" || serviceEntry === null) {
    throw new Error("Service entry must be object");
  }

  const resultEntries: Array<[string, any]> = Object.entries(serviceEntry[1]);

  if (resultEntries.length !== 1) {
    throw new Error("Service entry must contain only service result entry");
  }

  const [resultEntry] = resultEntries;

  const [serviceName] = serviceEntry;

  // @ts-ignore
  const [resultName, result] = resultEntry;

  return { serviceName, resultName, result };
};

const queryNormalizer = (
  recordsManager: TRecordsManager,
  normalizationData: TNormalizationData,
  data: any,
) => {
  const { serviceName, resultName, result } = getQueryResult(data);

  let normalized = false;
  const resultNormalizerName = `${capitalizeFirstLetter(serviceName)}_${resultName}_QueryResult`;
  if (recordsManager.predefinedNormalizerExists(resultNormalizerName)) {
    primitiveResultNormalizer(resultNormalizerName, recordsManager, data, normalizationData);
    normalized = true;
  } else if (isPage(result)) {
    pageNormalizer(recordsManager, result, normalizationData);

    normalized = true;
  }
    /**
     * It is impossible to determine if array is array of record or not when it is empty
     * There for empty array determines as array of records
     */
  // @ts-ignore FIXME @strong-ts
  else if (Array.isArray(result) && (result.length === 0 || isRecord(recordsManager, result[0]))) {
    resultNormalizer(recordsManager, normalizationData, serviceName, resultName, result);

    normalized = true;
  }

  if (!normalized) {
    // TODO @lebedev hotfix
    internalDataNormalizer(recordsManager, undefined, result, normalizationData as TRecordNormalizerAdditionalData);
  }

  return recordsManager.getMergedRecords();
};

export type { TRecordNormalizerAdditionalData };
export { dataNormalizer, recordNormalizer, queryNormalizer };
