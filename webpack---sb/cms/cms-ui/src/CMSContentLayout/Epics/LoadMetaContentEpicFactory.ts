import { type TCallManagerSymbolPair } from "@sb/call-manager";
import { query_Cms_PageMetaContents } from "@sb/graphql-client/CmsUI";
import { cmsPageMetaContentsQueryAdminUIOptionalFields } from "@sb/graphql-client/CmsUI/OptionalFields/Cms/Cms_PageMetaContents_Query";
import { type TFieldPath } from "@sb/form-new";
import { getIdByPath } from "@sb/cms-core";
import { cmsui_block_error_loadBlocks } from "@sb/translates/cmsui/Keys";
import { CMS_REF_SYMBOL, META_CONTENT_CALL_SYMBOL, META_CONTENT_RESULT_ID } from "../../CMS/Model/CMSSymbol";
import { type TCmsAppEpic } from "../../Model/TCmsAppEpic";
import { queryNormalizeEpic } from "../../CMS/Utils/QueryNormalizeEpic";
import { getCMSContext } from "../../EpicUtils/EpicUtils";

const loadMetaContentEpicFactory = (
  pageRef: string,
  loadSymbol: TCallManagerSymbolPair,
  resultId: string,
  ids: string[],
): TCmsAppEpic => (action$, state$, deps) => queryNormalizeEpic(
  pageRef,
  loadSymbol,
  query_Cms_PageMetaContents,
  {
    variables: {
      theme: getCMSContext(deps).cmsThemeSelector(state$.value),
      ids,
    },
    optionalFields: cmsPageMetaContentsQueryAdminUIOptionalFields,
    normalizationData: { resultId, gateway: true },
  },
  cmsui_block_error_loadBlocks,
)(action$, state$, deps);

//todo Sotnikov drop path: TFieldPath
const loadMetaContentEpic = (path: TFieldPath, pageId: string) => loadMetaContentEpicFactory(
  CMS_REF_SYMBOL,
  [META_CONTENT_CALL_SYMBOL, getIdByPath(path)],
  META_CONTENT_RESULT_ID,
  [pageId],
);

export { loadMetaContentEpic };
