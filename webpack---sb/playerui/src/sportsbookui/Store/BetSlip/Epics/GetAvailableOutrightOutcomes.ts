import { type StateObservable } from "redux-observable";
import { outcomeByIdSelector } from "../../Feed/Selectors/FeedSelectors";
import { type TAppState } from "../../InitialState";

const getAvailableOutrightOutcomes = (state$: StateObservable<TAppState>, outrightOutcomes: string[]): string[] => (
  outrightOutcomes.map((id) => outcomeByIdSelector(state$.value, id))
    .filter(Boolean)
    .map(({ id }) => id)
);

export { getAvailableOutrightOutcomes };
