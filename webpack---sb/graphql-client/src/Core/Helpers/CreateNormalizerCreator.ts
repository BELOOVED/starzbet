import type { TNormalizer, TPlainNormalizer, TRecord, TRecordsManager } from "../Generated/Helpers/Types";

const createNormalizerCreator = <RecordNames extends string>() =>
  <Data extends { __typename: string; } | { __voidTypename: string; }, Result extends TRecord, AdditionalData = null>(
    // @ts-ignore
    typename: Data extends { __typename: string; } ? Data["__typename"] : Data["__voidTypename"],
    recordName: RecordNames,
    normalizer: TPlainNormalizer<Data, Result, AdditionalData>,
  ): TNormalizer<Data, Result, AdditionalData> => {
    const result = (recordsManager: TRecordsManager, data: Data, additionalData: AdditionalData) => {
      const record = normalizer(recordsManager, data, additionalData);

      return recordsManager.addRecord(recordName, record);
    };

    result.typename = typename;

    return result;
  };

export { createNormalizerCreator };
