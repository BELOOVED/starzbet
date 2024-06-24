import { type IOrmState, type TBaseOrm, type TInsertParameters, type TRemoveParameters } from "./Orm";

const refCodeKey = "@ref";

type TRefMap = Record<string, Record<string, string[]>>;
type TRefCountMap = Record<string, Record<string, string[]>>;

type TOrmWithRefCounter<T extends TBaseOrm> = T & {
  insert: (parameters: TInsertParameters, shouldSkipRewrite?: boolean) => IOrmState;
  removeAllRefs: (state: IOrmState, ref: string) => IOrmState;
  removeRef: (state: IOrmState, ref: string, id: string) => IOrmState;

  refCount: (recordName: string, id: string) => number;

  refMap: TRefMap;
  refCountMap: TRefCountMap;
};

/**
 * Decorate base TOrm and add refCounter behavior.
 */
const withRefCounter: <T extends TBaseOrm>(orm: T) => TOrmWithRefCounter<T> = (orm) => {
  // ref => recordName => id[]
  const refMap: TRefMap = {};
  // recordName => id => ref[]
  const refCountMap: TRefCountMap = {};

  const removeRefCounter = (ref: string, recordName: string, id: string) => {
    const refsCount = refCountMap[recordName];

    if (refsCount) {
      const refsCountForId = refsCount[id];
      if (refsCountForId) {
        refsCount[id] = refsCountForId.filter((it) => it !== ref);
      }
    }

    const refs = refMap[ref];

    if (refs) {
      const refsForRecord = refs[recordName];

      if (refsForRecord) {
        refs[recordName] = refsForRecord.filter((it) => it !== id);
      }
    }
  };

  const removeMultipleRefCounter = (ref: string, record: string, ids: string[]) => {
    ids.forEach((id) => removeRefCounter(ref, record, id));
  };

  return {
    ...orm,
    insert(
      {
        state,
        what,
        record,
        extra,
      }: TInsertParameters,
      shouldSkipRewrite = false,
    ): IOrmState {
      const ref = extra[refCodeKey];

      if (ref) {
        // insert to ref
        let refMapForRef = refMap[ref];
        if (!refMapForRef) {
          refMapForRef = refMap[ref] = {};
        }

        let refMapForRecords = refMapForRef[what];
        if (!refMapForRecords) {
          refMapForRecords = refMapForRef[what] = [];
        }

        refMapForRecords.push(record.id);

        // insert to refCounter
        let refCountMapForRecords = refCountMap[what];
        if (!refCountMapForRecords) {
          refCountMapForRecords = refCountMap[what] = {};
        }

        let refCountMapForRecord = refCountMapForRecords[record.id];
        if (!refCountMapForRecord) {
          refCountMapForRecord = refCountMapForRecords[record.id] = [];
        }

        refCountMapForRecord.push(ref);
      }

      if (shouldSkipRewrite) {
        return state;
      }

      return orm.insert({
        state,
        record,
        what,
        extra,
      });
    },

    remove({
      state,
      what,
      id,
      throwError,
      extra,
    }: TRemoveParameters): IOrmState {
      // decrement refCount
      if (extra[refCodeKey]) {
        removeRefCounter(extra[refCodeKey], what, id);
      }

      const refCount = this.refCount(what, id);

      // don't remove
      if (refCount !== 0) {
        return state;
      }

      return orm.remove({
        state,
        what,
        id,
        throwError,
        extra,
      });
    },

    removeAllRefs(state, ref) {
      return Object
        .entries(refMap[ref] || {})
        .reduce(
          (state, [recordName, ids]) => {
          // drop counter
            removeMultipleRefCounter(ref, recordName, ids);

            const idsWithoutRefs = ids.filter((id) => this.refCount(recordName, id) === 0);

            if (idsWithoutRefs.length === 0) {
              return state;
            }

            return orm.removeMany({
              state,
              what: recordName,
              ids: idsWithoutRefs,
              throwError: false,
              extra: {},
            });
          },
          state,
        );
    },

    removeRef(state, ref, id) {
      return Object
        .entries(refMap[ref] || {})
        .reduce(
          (state, [recordName]) => {
          // drop counter
            removeRefCounter(ref, recordName, id);

            const shouldRemoveRecord = this.refCount(recordName, id) === 0;

            if (shouldRemoveRecord) {
              return orm.remove({
                state,
                what: recordName,
                id,
                throwError: false,
                extra: {},
              });
            } else {
              return state;
            }
          },
          state,
        );
    },

    refCount(recordName: string, id: string) {
      return refCountMap[recordName]?.[id]?.length || 0;
    },

    // add by link
    refMap: refMap,

    // add by link
    refCountMap: refCountMap,
  };
};

export {
  refCodeKey,
  type TRefMap,
  type TRefCountMap,
  type TOrmWithRefCounter,
  withRefCounter,
};
