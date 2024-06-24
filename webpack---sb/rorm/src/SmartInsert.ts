import { isNil, updateDeep } from "@sb/utils";
import { type IOrmState, type TBaseOrm, type TInsertParameters } from "./Orm";
import { type TOrmWithRefCounter } from "./RefCounter";

/**
 * Decorate base TOrm and add smart insert behavior.
 */
const withSmartInsert = <T extends TOrmWithRefCounter<TBaseOrm>>(orm: T): T => ({
  ...orm,

  insert(parameters: TInsertParameters): IOrmState {
    const { state, what, record } = parameters;

    const oldRecord = orm.findOne({
      state,
      what,
      id: record.id,
    });

    if (isNil(oldRecord)) {
      return orm.insert(parameters);
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const updatedOldRecord = updateDeep(oldRecord, record);

    if (updatedOldRecord === oldRecord) {
      /**
       * when return state - it will skip withRefCounter decorator
       */
      return orm.insert(parameters, true);
    }

    return orm.insert({ ...parameters, record: updatedOldRecord });
  },
});

export { withSmartInsert };
