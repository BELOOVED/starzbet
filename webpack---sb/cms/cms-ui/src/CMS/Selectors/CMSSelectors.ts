import { ERecordName, type TCms_Block_Record, type TCms_Page_Fragment } from "@sb/graphql-client/CmsUI";
import { createOrmSelector, deferGetOne } from "@sb/rorm";
import { loadedResultIdsSelector } from "@sb/adminui-core/Store/Selectors/RecordIdsSelectorFactory";
import { type TCmsAppState } from "../../Model/TCmsAppState";
import { PAGES_CALL_SYMBOL } from "../Model/CMSSymbol";
import { CMS_PAGES_PAGINATOR } from "../Model/PaginatorNames";

const getCmsPageByPageIdSelector = createOrmSelector(
  (pageId: string) => deferGetOne<TCms_Page_Fragment>({
    what: ERecordName.cmsPage,
    id: pageId,
  }),
);

const getOneBlockContentByBlockIdSelector = createOrmSelector(
  (blockId: string) => deferGetOne<TCms_Block_Record>({
    what: ERecordName.cmsBlock,
    id: blockId,
  }),
);

const cmsPageIdsSelector = (state: TCmsAppState) =>
  loadedResultIdsSelector(state, ERecordName.cmsPagesQueryResult, CMS_PAGES_PAGINATOR, PAGES_CALL_SYMBOL);

export {
  getOneBlockContentByBlockIdSelector,
  getCmsPageByPageIdSelector,
  cmsPageIdsSelector,

};
