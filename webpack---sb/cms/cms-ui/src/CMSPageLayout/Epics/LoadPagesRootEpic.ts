import { filter, map, merge, of, switchMap } from "rxjs";
import { distinctUntilChanged } from "rxjs/operators";
import { EBlockTypeMap } from "@sb/cms-core";
import { callManagerRemoveSymbolAction } from "@sb/call-manager";
import { BLOCK_CALL_SYMBOL, CMS_REF_SYMBOL, PAGES_CALL_SYMBOL } from "../../CMS/Model/CMSSymbol";
import { CMS_PAGES_PAGINATOR } from "../../CMS/Model/PaginatorNames";
import { cmsPagesWasSucceededSelector } from "../../CMSContentLayout/Selectors/CMSLayoutSelectors";
import { getProjectCodeByFormName } from "../../CMS/Utils/Helpers";
import { type TCmsAppEpic } from "../../Model/TCmsAppEpic";
import { getCMSContext, getFormName } from "../../EpicUtils/EpicUtils";
import { dispatchCmsUpdateEvent } from "../../WindowEvenCreator";
import { loadPagesEpicFactory } from "./LoadPagesEpicFactory";

const createLoadPagesEpic = (isHandler = false):TCmsAppEpic => (action$, state$, dependencies) => {
  const formName = getFormName(dependencies);

  if(isHandler){
    dispatchCmsUpdateEvent({ pages: true });
  }

  const projectCode = getProjectCodeByFormName(formName);

  return merge(
    of(callManagerRemoveSymbolAction(BLOCK_CALL_SYMBOL)),
    loadPagesEpicFactory(
      CMS_REF_SYMBOL,
      PAGES_CALL_SYMBOL,
      CMS_PAGES_PAGINATOR,
      projectCode,
      getCMSContext(dependencies).cmsThemeSelector(state$.value),
    )(action$, state$, dependencies),
  );
};

const loadPagesEpic = createLoadPagesEpic(true);

const loadPagesRootEpic: TCmsAppEpic = (action$, state$, dependencies) => {
  const { activeTabSelector } = getCMSContext(dependencies);

  return state$.pipe(
    map((state) => activeTabSelector(state)),
    distinctUntilChanged(),
    filter((tab) => (tab === EBlockTypeMap.PAGES || tab === EBlockTypeMap.BLOCKS) && !cmsPagesWasSucceededSelector(state$.value)),
    switchMap(() => createLoadPagesEpic()(action$, state$, dependencies)),
  );
};

export { loadPagesRootEpic, loadPagesEpic };
