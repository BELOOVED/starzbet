import { type TCallManagerSymbolPair } from "@sb/call-manager";
import { cmsBlocksQueryAdminUIOptionalFields, query_Cms_Blocks } from "@sb/graphql-client/CmsUI";
import { type ECms_BlockWhereFieldPaths, EWhere_Predicate } from "@sb/graphql-client";
import { type TFieldPath } from "@sb/form-new";
import { getIdByPath } from "@sb/cms-core";
import { cmsui_block_error_loadBlocks } from "@sb/translates/cmsui/Keys";
import { BLOCK_CALL_SYMBOL, CMS_REF_SYMBOL } from "../../CMS/Model/CMSSymbol";
import { CMS_BLOCKS_PAGINATOR } from "../../CMS/Model/PaginatorNames";
import { type TCmsAppEpic } from "../../Model/TCmsAppEpic";
import { queryNormalizeEpic } from "../../CMS/Utils/QueryNormalizeEpic";
import { getCMSContext } from "../../EpicUtils/EpicUtils";

const loadBlockContentEpicFactory = (
  pageRef: string,
  loadSymbol: TCallManagerSymbolPair,
  resultId: string,
  value: string,
  pathWhere: ECms_BlockWhereFieldPaths,
): TCmsAppEpic => (action$, state$, deps) => queryNormalizeEpic(
  pageRef,
  loadSymbol,
  query_Cms_Blocks,
  {
    variables: {
      theme: getCMSContext(deps).cmsThemeSelector(state$.value),
      where: {
        predicate: EWhere_Predicate.eq,
        fieldPath: pathWhere,
        value,
      },
    },
    optionalFields: cmsBlocksQueryAdminUIOptionalFields,
    normalizationData: { resultId, gateway: true },
  },
  cmsui_block_error_loadBlocks,
)(action$, state$, deps);

//todo @DS drop path: TFieldPath
const loadBlockContentEpic = (
  path: TFieldPath,
  pageId: string,
  pathWhere: ECms_BlockWhereFieldPaths,
):TCmsAppEpic => loadBlockContentEpicFactory(
  CMS_REF_SYMBOL,
  [BLOCK_CALL_SYMBOL, getIdByPath(path)],
  CMS_BLOCKS_PAGINATOR,
  pageId,
  pathWhere,
);

export { loadBlockContentEpic };
