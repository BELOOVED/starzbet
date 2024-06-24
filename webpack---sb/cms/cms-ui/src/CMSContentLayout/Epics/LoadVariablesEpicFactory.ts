import { type TCallManagerSymbol } from "@sb/call-manager";
import { query_Cms_Variables } from "@sb/graphql-client/CmsUI";
import { cmsVariablesQueryOptionalFields } from "@sb/graphql-client/CmsUI/OptionalFields/Cms/Cms_Variables_Query";
import { type TProjectCode } from "@sb/sdk/common/cms/api/model/ProjectCode";
import { ECms_VariableWhereFieldPaths, EWhere_Predicate } from "@sb/graphql-client";
import { cmsui_variable_error_loadVariables } from "@sb/translates/cmsui/Keys";
import { type TCmsAppEpic } from "../../Model/TCmsAppEpic";
import { queryNormalizeEpic } from "../../CMS/Utils/QueryNormalizeEpic";
import { getCMSContext } from "../../EpicUtils/EpicUtils";

interface IWhere {
  fieldPath: ECms_VariableWhereFieldPaths;
  predicate: EWhere_Predicate;
  value?: string;
}
const loadVariablesEpicFactory = (
  pageRef: string,
  loadSymbol: TCallManagerSymbol,
  paginatorName: string,
  projectCode: TProjectCode,
  where: IWhere[],
): TCmsAppEpic => (action$, state$, deps) => queryNormalizeEpic(
  pageRef,
  loadSymbol,
  query_Cms_Variables,
  {
    variables: {
      theme: getCMSContext(deps).cmsThemeSelector(state$.value),
      where: {
        predicate: EWhere_Predicate.and,
        operands: [
          {
            fieldPath: ECms_VariableWhereFieldPaths.cmsVariableProjectCode,
            predicate: EWhere_Predicate.eq,
            value: projectCode,
          },
          ...where,
        ],
      },
    },
    optionalFields: cmsVariablesQueryOptionalFields,
    normalizationData: { resultId: paginatorName, gateway: true },
  },
  cmsui_variable_error_loadVariables,
)(action$, state$, deps);

export { loadVariablesEpicFactory };
