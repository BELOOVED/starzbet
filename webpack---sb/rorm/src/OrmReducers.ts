import { createRootReducer } from "@sb/utils";
import { type TOrm } from "./Orm";
import { insertMultipleMapToOrmAction, insertRecordToOrmAction, removeAllRefsAction, removeRefAction } from "./OrmActions";
import { type IWithOrmState } from "./OrmSelectors";
import { type TOrmWithRefCounter } from "./RefCounter";

const insertReducer = (orm: TOrm) =>
  (state: IWithOrmState, { payload: { extra, record, what } }: ReturnType<typeof insertRecordToOrmAction>) => ({
    ...state,
    orm: orm.insert({
      state: state.orm,
      extra,
      record,
      what,
    }),
  });

const removeAllRefsReducer = (orm: TOrmWithRefCounter<TOrm>) =>
  (state: IWithOrmState, { payload: { ref } }: ReturnType<typeof removeAllRefsAction>) => ({
    ...state,
    orm: orm.removeAllRefs(state.orm, ref),
  });

const removeRefReducer = (orm: TOrmWithRefCounter<TOrm>) =>
  (state: IWithOrmState, { payload: { ref, id } }: ReturnType<typeof removeRefAction>) => ({
    ...state,
    orm: orm.removeRef(state.orm, ref, id),
  });

const insertMultipleMapReducer = (orm: TOrm) =>
  (state: IWithOrmState, { payload: { extra, map } }: ReturnType<typeof insertMultipleMapToOrmAction>) => {
    let nextOrmState = state.orm;

    Object.entries(map).forEach(([record, recordMap]) => {
      nextOrmState = orm.insertMap({
        state: nextOrmState,
        extra: extra,
        what: record,
        map: recordMap,
      });
    });

    return {
      ...state,
      orm: nextOrmState,
    };
  };

const ormReducer = (orm: TOrmWithRefCounter<TOrm>) => createRootReducer([
  [insertReducer(orm), insertRecordToOrmAction],
  [insertMultipleMapReducer(orm), insertMultipleMapToOrmAction],
  [removeAllRefsReducer(orm), removeAllRefsAction],
  [removeRefReducer(orm), removeRefAction],
]);

export { ormReducer };
