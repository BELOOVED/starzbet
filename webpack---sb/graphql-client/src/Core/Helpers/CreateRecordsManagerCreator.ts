/* eslint-disable */
import { TNormalizers, TRecord, TRecordsManager, TRelationsConfig } from "../Generated/Helpers/Types";
import { Logger } from "./Logger";

const checkRecordValue = (typename: string) =>
  (value: any) => {
    if (Array.isArray(value)) {
      value.forEach(checkRecordValue(typename));

      return;
    }

    if (typeof value === "object" && value !== null) {
      if (value.hasOwnProperty("id") && typeof value.id === "string") {
        Logger.error.gql(`Record with such name contains record inside itself: ${typename}`);
      }

      Object.values(value).forEach(checkRecordValue(typename));

      return;
    }

    return;
  };

const mergeRecords = (records: Array<TRecord>) => {
  const grouped = records.reduce<Record<string, Array<TRecord>>>(
    (acc, record) => {
      if (!acc[record.id]) {
        acc[record.id] = [];
      }

      // @ts-ignore
      acc[record.id].push(record);

      return acc;
    },
    {},
  );

  return Object.values(grouped).reduce<Array<TRecord>>(
    (merged, group) => [
      ...merged,
      // @ts-ignore
      group.reduce<TRecord>((duplicate, record) => ({ ...duplicate, ...record }), group[0]),
    ],
    [],
  );
};
const getRecordNameWithKitPrefix = (kitName: string, name: string) => name.startsWith(`${kitName}_`)
  ? name
  : `${kitName}_${name}`;

const getRecordNameWithoutKitPrefix = (kitName: string, name: string) => name.replace(new RegExp(`^${kitName}_`), "");

const findRecordName = (kitName: string, recordNames: string[], name: string) => {
  if (recordNames.includes(name)) {
    return name;
  }

  const recordName = recordNames.find((it) => {
    const splitted = it.split("_");

    splitted.shift();

    const shortened = splitted.join("_");

    return getRecordNameWithoutKitPrefix(kitName, name) === shortened;
  });

  if (recordName) {
    return recordName;
  }

  return null;
};

const createRecordsManagerCreator = <N extends string>(kitName: string, predefinedNormalizers: TNormalizers, relationsConfig: TRelationsConfig, coreRecordNames: string[], kitRecordNames: string[]) =>
  (): TRecordsManager => {
    const findPredefinedNormalizer = (typename: string) =>
      predefinedNormalizers.find((predefinedNormalizer) => predefinedNormalizer.typename === typename);

    const predefinedNormalizerExists = (typename: string) => !!findPredefinedNormalizer(typename);

    const getPredefinedNormalizer = (typename: string) => {
      const predefinedNormalizer = findPredefinedNormalizer(typename);

      if (!predefinedNormalizer) {
        throw new Error(`There is no predefined normalizer for such typename: ${typename}`);
      }

      return predefinedNormalizer;
    };

    const getOneToManyRelations = () => relationsConfig.oneToMany;
    const oneToManyRelationExists = (parentName: string, child: string) => !!relationsConfig.oneToMany[parentName]?.[child];

    const records: Record<string, Array<TRecord>> = {};

    const addRecord = <R extends TRecord>(name: string, record: R) => {
      const recordName = findRecordName(kitName, coreRecordNames, name) ?? findRecordName(kitName, kitRecordNames, name);

      if (!recordName) {
        throw new Error(`There is no such record name: ${name}`);
      }

      Object.values(record).forEach(checkRecordValue(recordName));

      if (!records[recordName]) {
        records[recordName] = [];
      }

      // @ts-ignore
      records[recordName].push(record);

      return record;
    };

    const recordExists = (name: string, id: string) => {
      const recordName = getRecordNameWithKitPrefix(kitName, name);

      if (!records[recordName]) {
        return false;
      }

      // @ts-ignore
      return !!records[recordName].find((record) => record.id === id);
    };

    const getRecords = () => records;
    const getMergedRecords = () => Object.entries(records).reduce<ReturnType<TRecordsManager["getRecords"]>>(
      (acc, cur) => ({
        ...acc,
        [cur[0]]: mergeRecords(cur[1]),
      }),
      {},
    );

    return {
      predefinedNormalizerExists,
      getPredefinedNormalizer,
      getOneToManyRelations,
      oneToManyRelationExists,
      addRecord,
      recordExists,
      getRecords,
      getMergedRecords,
    };
  };

export { createRecordsManagerCreator };
