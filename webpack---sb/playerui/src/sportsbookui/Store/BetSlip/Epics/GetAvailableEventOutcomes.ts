import { type StateObservable } from "redux-observable";
import { entries, isArray, isString } from "@sb/utils";
import { type TAppState } from "../../InitialState";
import { eventSubSubscriptionsSelector, outcomeByIdSelector, selectEventById } from "../../Feed/Selectors/FeedSelectors";

const isEventOutcomesEntries = (entries: unknown[]): entries is [string, string][] => (
  entries.every((it) => isArray(it) && it.every(isString) && it.length === 2)
);

const castEventOutcomesEntries = (entries: unknown[]) => {
  if (isEventOutcomesEntries(entries)) {
    return entries;
  }

  throw new Error("[castEventOutcomesEntries]: can't cast to type [string, string][]");
};

const getAvailableEventOutcomes = (state$: StateObservable<TAppState>, eventOutcomesMap: Record<string, string[]>) => (
  castEventOutcomesEntries(
    entries(eventOutcomesMap)
      .filter(([eventId]) => !!selectEventById(state$.value, eventId))
      .flatMap(([eventId, outcomeIdList]) => outcomeIdList.map((outcomeId) => ([eventId, outcomeId]))),
  ).filter(([eventId, outcomeId]) => outcomeByIdSelector(state$.value, outcomeId) || !eventSubSubscriptionsSelector(state$.value)[eventId])
);

export { getAvailableEventOutcomes };
