import { type TExtra, type TRecord, type TRecordDefinition } from "./Orm";

type TInsertRecordOptions<Record extends TRecord> = {
  what: TRecordDefinition;
  record: Record;
  extra: TExtra;
}

const insertRecordToOrmAction = <R extends TRecord>(options: TInsertRecordOptions<R>) => ({
  type: "@ORM/INSERT",
  payload: options,
});

type TInsertMultipleMapOptions<R extends TRecord = TRecord> = {
  map: Record<TRecordDefinition, Record<string, R>>;
  extra: TExtra;
}

const insertMultipleMapToOrmAction = <R extends TRecord>(options: TInsertMultipleMapOptions<R>) => ({
  type: "@ORM/INSERT_MULTIPLE_MAP",
  payload: options,
});

const removeAllRefsAction = (ref: string) => ({
  type: "@ORM/REMOVE_ALL_REFS",
  payload: { ref },
});

const removeRefAction = (ref: string, id: string) => ({
  type: "@ORM/REMOVE_REF",
  payload: { ref, id },
});

export {
  insertRecordToOrmAction,
  insertMultipleMapToOrmAction,
  removeAllRefsAction,
  removeRefAction,
  type TInsertMultipleMapOptions,
};
