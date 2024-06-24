import { filter, map, of, switchMap } from "rxjs";
import { distinctUntilChanged } from "rxjs/operators";
import { callManagerSucceededSelector } from "@sb/call-manager";
import { resetFormAction } from "@sb/form-new";
import { withParams } from "@sb/utils";
import { PAGES_CALL_SYMBOL } from "../../CMS/Model/CMSSymbol";
import { getFormName } from "../../EpicUtils/EpicUtils";
import { type TCmsAppEpic } from "../../Model/TCmsAppEpic";
import { cmsPageIdsSelector, getRootPageSelector } from "../CMSPageSelectors";

const mountPagesEpic: TCmsAppEpic = (_, state$, dependencies) => state$.pipe(
  map(withParams(callManagerSucceededSelector, PAGES_CALL_SYMBOL)),
  distinctUntilChanged(),
  filter(Boolean),
  switchMap(() => {
    const formName = getFormName(dependencies);

    const pageIds = cmsPageIdsSelector(state$.value);
    const pagesState = pageIds.reduce(
      (acc, id) => ({
        ...acc,
        ...getRootPageSelector(state$.value, formName, id),
      }),
      {},
    );

    return of(
      resetFormAction(
        formName,
        pagesState,
      ),
    );
  }),
);

export { mountPagesEpic };
