import type { TCallManagerSymbolPair } from "@sb/call-manager";
import { cmsPagesQueryOptionalFields, query_Cms_Pages } from "@sb/graphql-client/CmsUI";
import { ECms_PageWhereFieldPaths, EWhere_Predicate } from "@sb/graphql-client";
import type { TProjectCode } from "@sb/sdk/common/cms/api/model/ProjectCode";
import { cmsui_page_error_loadPages } from "@sb/translates/cmsui/Keys";
import type { TCmsTheme } from "@sb/cms-config";
import type { TCmsAppEpic } from "../../Model/TCmsAppEpic";
import { queryNormalizeEpic } from "../../CMS/Utils/QueryNormalizeEpic";

const loadPagesEpicFactory = (
  pageRef: string,
  loadSymbol: TCallManagerSymbolPair,
  paginatorName: string,
  projectCode: TProjectCode,
  theme: TCmsTheme,
): TCmsAppEpic => queryNormalizeEpic(
  pageRef,
  loadSymbol,
  query_Cms_Pages,
  {
    variables: {
      theme,
      where: {
        predicate: EWhere_Predicate.and,
        operands: [
          {
            fieldPath: ECms_PageWhereFieldPaths.cmsPageProjectCode,
            predicate: EWhere_Predicate.eq,
            value: projectCode,
          },
          {
            fieldPath: ECms_PageWhereFieldPaths.cmsPageRemovedAt,
            predicate: EWhere_Predicate.isNull,
          },
        ],
      },
    },
    optionalFields: cmsPagesQueryOptionalFields,
    normalizationData: { resultId: paginatorName, gateway: true },
  },
  cmsui_page_error_loadPages,
);

export { loadPagesEpicFactory };
