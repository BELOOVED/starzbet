import { map, switchMap } from "rxjs";
import { distinctUntilChanged } from "rxjs/operators";
import type { TCallManagerSymbol } from "@sb/call-manager";
import { ECms_VariableWhereFieldPaths, EWhere_Predicate } from "@sb/graphql-client";
import { getProjectCodeByFormName } from "../../CMS/Utils/Helpers";
import { CMS_REF_SYMBOL, VARIABLE_TABLE_COMMON_LOADER_SYMBOL } from "../../CMS/Model/CMSSymbol";
import { CMS_VARIABLE_TABLE_COMMON_PAGINATOR_NAME } from "../../CMS/Model/PaginatorNames";
import { type TCmsAppEpic } from "../../Model/TCmsAppEpic";
import { getFormName, getShowDeletedVariablesSelector } from "../../EpicUtils/EpicUtils";
import { loadVariablesEpicFactory } from "./LoadVariablesEpicFactory";

const loadVariablesEpicWithFormName = (
  formName: string,
  isLoadDeletedVariables: boolean,
  loadSymbol: TCallManagerSymbol,
  paginatorName: string,
): TCmsAppEpic => (action$, state$, dependencies) => {
  const projectCode = getProjectCodeByFormName(formName);

  return loadVariablesEpicFactory(
    CMS_REF_SYMBOL,
    loadSymbol,
    paginatorName,
    projectCode,
    [
      {
        fieldPath: ECms_VariableWhereFieldPaths.cmsVariableRemovedAt,
        predicate: isLoadDeletedVariables ? EWhere_Predicate.isNotNull : EWhere_Predicate.isNull,
      },
    ],
  )(action$, state$, dependencies);
};

const loadVariablesEpic:TCmsAppEpic = (action$, state$, dependencies) => {
  const showDeletedVariablesSelector = getShowDeletedVariablesSelector(dependencies);

  const formName = getFormName(dependencies);

  return state$.pipe(
    map(showDeletedVariablesSelector),
    distinctUntilChanged(),
    switchMap((flag) => loadVariablesEpicWithFormName(
      formName,
      flag,
      VARIABLE_TABLE_COMMON_LOADER_SYMBOL,
      CMS_VARIABLE_TABLE_COMMON_PAGINATOR_NAME,
    )(action$, state$, dependencies)),
  );
};

export { loadVariablesEpic };
