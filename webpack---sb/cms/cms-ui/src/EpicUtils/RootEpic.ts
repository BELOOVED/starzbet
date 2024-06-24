import { merge, of } from "rxjs";
import { type AnyAction } from "redux";
import { removeAllRefsAction } from "@sb/rorm";
import { callManagerRemoveSymbolAction } from "@sb/call-manager";
import { type TExplicitAny, type TSelector } from "@sb/utils";
import type { HttpRpcClient } from "@sb/network-bus/RpcClient";
import { unmountFormAction } from "@sb/form-new";
import { type TCmsAppEpic, type TCmsAppEpicDependencies } from "../Model/TCmsAppEpic";
import { onStartWithCMSDeps } from "../CMS/Epics/RootEpic";
import { getDepsWithFormNameAndDefCreatorFn } from "../CMS/Utils/Helpers";
import { changeCurrentFormAction } from "../CMS/CMSActions";
import { getCmsDefinition, type TCmsDefinitionParam } from "../CMS/Utils/DefinitionByEnvCode";
import { CMS_CALL_SYMBOLS, CMS_REF_SYMBOL } from "../CMS/Model/CMSSymbol";
import { type ICMSContext } from "../Context/CMSContext";
import { type TCmsAppState } from "../Model/TCmsAppState";

const rootEpicWithDeps = (
  formName: string,
  getRpcClient: (deps: TCmsAppEpicDependencies<TCmsAppState>) => HttpRpcClient,
  context: ICMSContext,
  cmsDefParam: TCmsDefinitionParam,
  showDeletedVariablesSelector: TSelector<TExplicitAny, boolean> = () => false,
): TCmsAppEpic =>
  (action$, state$, dependencies) => {
    const definition = getCmsDefinition(
      context.cmsThemeSelector(state$.value),
      cmsDefParam,
    );

    return merge(
      onStartWithCMSDeps(
        action$,
        state$,
        getDepsWithFormNameAndDefCreatorFn(
          dependencies,
          formName,
          definition,
          context,
          getRpcClient,
          cmsDefParam,
          showDeletedVariablesSelector,
        ),
      ),
      of(changeCurrentFormAction(formName)),
    );
  };

const finalizeHandlers = (formName: string) => [
  removeAllRefsAction(CMS_REF_SYMBOL),
  callManagerRemoveSymbolAction(CMS_CALL_SYMBOLS),
  unmountFormAction(formName),
] satisfies AnyAction[];

export { rootEpicWithDeps, finalizeHandlers };
