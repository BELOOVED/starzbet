import { pipe } from "rxjs";
import { map } from "rxjs/operators";
import { insertMultipleMapToOrmAction, refCodeKey, type TInsertMultipleMapOptions } from "@sb/rorm";
import { type TRecord } from "@sb/graphql-client";

const recordsToOrmMap = (recordsMap: Record<string, TRecord[]>) => Object.entries(recordsMap).reduce<TInsertMultipleMapOptions["map"]>(
  (mapAcc, [recordName, recordsArr]) => ({
    ...mapAcc,
    [recordName]: recordsArr.reduce(
      (recordsAcc, record) => ({
        ...recordsAcc,
        [record.id]: record,
      }),
      {} as Record<string, TRecord>,
    ),
  }),
  {},
);

const insertRecordsByRef = (ref: string) => pipe(
  map((recordsMap: Record<string, TRecord[]>) => insertMultipleMapToOrmAction({
    map: recordsToOrmMap(recordsMap),
    extra: { [refCodeKey]: ref },
  })),
);

export { recordsToOrmMap, insertRecordsByRef };

