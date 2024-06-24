import { createMemoSelector, createSimpleSelector, type TExplicitAny, type TNullable, type TSelector } from "@sb/utils";
import { type IPageInfoRecord } from "@sb/rorm-records";
import { ERecordName as ECoreRecordName, type TPageInfo_Record, type TUnionId_Fragment } from "@sb/graphql-client";
import { callManagerWasSucceededSelector, type TCallManagerSymbol, type TWithCallManagerState } from "@sb/call-manager";
import { createOrmSelector, deferGetOne, type IWithOrmState } from "@sb/rorm";
import { FAKE_RECORD_PREFIX } from "../../Utils/UIKitUtils/HadnleFakeRecord";

const NOOP_IDS: never[] = [];

/**
 * @deprecated
 * use loadedPageInfoIdsSelector
 */
const recordIdsSelectorFactory = <S extends TSelector<TExplicitAny, TNullable<IPageInfoRecord>, TExplicitAny>>(selector: S) =>
  createSimpleSelector(
    [selector],
    (pageInfo) => pageInfo?.recordsIds ?? NOOP_IDS,
  );

/**
 * @deprecated
 * use loadedPageInfoIdsSelector
 */
const pageInfoIdsSelectorFactory = <S extends TSelector<TExplicitAny, TNullable<TPageInfo_Record>, TExplicitAny[]>>(selector: S) =>
  createSimpleSelector(
    [selector],
    (pageInfo) => pageInfo?.ids ?? NOOP_IDS,
  );

const pageInfoIdsWithFakeIdsSelectorFactory = <S extends TSelector<TExplicitAny, TNullable<TPageInfo_Record>, TExplicitAny>>(
  selector: S,
  length: number,
) => createMemoSelector(
    [selector],
    (pageInfo) => {
      const currentIds: string[] = pageInfo?.ids ?? NOOP_IDS;

      return new Array(length)
        .fill(null)
        .map(
          (it, index) => currentIds[index]
            ? currentIds[index]
            : `${FAKE_RECORD_PREFIX}${index}`,
        );
    },
  );

const getOnePageInfoSelector = createOrmSelector((pageInfoId: string) => deferGetOne<TPageInfo_Record>({
  what: ECoreRecordName.pageInfo,
  id: pageInfoId,
}));

const loadedPageInfoSelector = createMemoSelector(
  <S extends IWithOrmState & TWithCallManagerState>(
    state: S,
    id: string,
    loaderSymbol: TCallManagerSymbol,
    loaderId?: string,
  ): TPageInfo_Record => {
    if (callManagerWasSucceededSelector(state, loaderSymbol, loaderId)) {
      return getOnePageInfoSelector(state, id);
    }

    return {
      id: loaderSymbol,
      hasNextPage: false,
      hasPreviousPage: false,
      endCursor: null,
      startCursor: null,
      ids: NOOP_IDS,
      total: null,
    };
  },
  { resultEqual: "deepEqual" },
);

const loadedPageInfoIdsSelector = <S extends IWithOrmState & TWithCallManagerState>(
  state: S,
  pageInfoId: string,
  loaderSymbol: TCallManagerSymbol,
  loaderId?: string,
): string[] => {
  if (callManagerWasSucceededSelector(state, loaderSymbol, loaderId)) {
    return getOnePageInfoSelector(state, pageInfoId).ids;
  }

  return NOOP_IDS;
};

const loadedResultIdsSelector = <S extends IWithOrmState & TWithCallManagerState, R extends string>(
  state: S,
  recordName: R,
  id: string,
  loaderSymbol: TCallManagerSymbol,
  loaderId?: string,
): string[] => {
  if (callManagerWasSucceededSelector(state, loaderSymbol, loaderId)) {
    return deferGetOne<{ id: string; ids: string[]; }>({
      what: recordName,
      id,
    })(state.orm).ids;
  }

  return NOOP_IDS;
};

const loadedUnionResultIdsSelector = <S extends IWithOrmState & TWithCallManagerState, R extends string>(
  state: S,
  recordName: R,
  id: string,
  loaderSymbol: TCallManagerSymbol,
  loaderId?: string,
): TUnionId_Fragment[] => {
  if (callManagerWasSucceededSelector(state, loaderSymbol, loaderId)) {
    return deferGetOne<{ id: string; ids: TUnionId_Fragment[]; }>({
      what: recordName,
      id,
    })(state.orm).ids;
  }

  return NOOP_IDS;
};

export {
  recordIdsSelectorFactory,
  pageInfoIdsSelectorFactory,
  pageInfoIdsWithFakeIdsSelectorFactory,
  getOnePageInfoSelector,
  loadedPageInfoSelector,
  loadedPageInfoIdsSelector,
  loadedResultIdsSelector,
  loadedUnionResultIdsSelector,
};
