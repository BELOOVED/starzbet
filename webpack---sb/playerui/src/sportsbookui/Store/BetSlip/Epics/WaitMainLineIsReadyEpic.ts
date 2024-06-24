import { distinctUntilChanged, first, map, switchMap } from "rxjs/operators";
import { isNotEmpty } from "@sb/utils";
import { type TAppEpic } from "../../../../common/Store/Root/Epics/TAppEpic";
import { lineIsReadySelector, outcomesSelector } from "../../Feed/Selectors/FeedSelectors";
import { type TAppState } from "../../InitialState";

const allIsReadySelector = (state: TAppState) => (
  lineIsReadySelector(state) && isNotEmpty(outcomesSelector(state))
);

const waitMainLineIsReadyEpic = (epic: TAppEpic): TAppEpic => (action$, state$, dependencies) => state$.pipe(
  map(allIsReadySelector),
  distinctUntilChanged(),
  first(Boolean),
  switchMap(() => epic(action$, state$, dependencies)),
);

export { waitMainLineIsReadyEpic };
