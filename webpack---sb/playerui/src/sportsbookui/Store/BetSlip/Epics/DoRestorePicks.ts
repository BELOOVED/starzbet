import { concat, filter, map, merge, of } from "rxjs";
import { distinctUntilChanged, first } from "rxjs/operators";
import { type StateObservable } from "redux-observable";
import { withParams } from "@sb/utils";
import { isEventFetchedSelector, outcomeByIdSelector } from "../../Feed/Selectors/FeedSelectors";
import { feedAddEventSubscriberAction } from "../../Feed/FeedActions";
import { eventSubscriberEnum } from "../../Feed/Model/EventSubscriberEnum";
import { type TAppState } from "../../InitialState";
import { betSlipCreatePickAction } from "../BetSlipActions";
import { pickKind } from "../Model/BetPick";

const doRestorePicks = (state$: StateObservable<TAppState>, outrightOutcomes: string[], eventOutcomes: [string, string][]) => {
  const outrightOutcomeCreators = outrightOutcomes.map((outcomeId) => of(betSlipCreatePickAction(pickKind.base, outcomeId)));

  const eventOutcomeCreators = eventOutcomes.map(([eventId, outcomeId]) => {
    if (outcomeByIdSelector(state$.value, outcomeId)) {
      return of(betSlipCreatePickAction(pickKind.base, outcomeId));
    }

    return concat(
      of(feedAddEventSubscriberAction(eventSubscriberEnum.betSlip, eventId)),
      state$.pipe(
        map(withParams(isEventFetchedSelector, eventId)),
        distinctUntilChanged(),
        first(Boolean),
        filter(() => !!outcomeByIdSelector(state$.value, outcomeId)),
        map(() => betSlipCreatePickAction(pickKind.base, outcomeId)),
      ),
    );
  });

  return merge(...outrightOutcomeCreators, ...eventOutcomeCreators);
};

export { doRestorePicks };
