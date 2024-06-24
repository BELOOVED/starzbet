import { from, switchMap } from "rxjs";
import { type Action } from "redux";
import { isCreator, isNil } from "@sb/utils";
import { type TAppEpic } from "../../../../common/Store/Root/Epics/TAppEpic";
import { eventIdByOutcomeIdSelector, marketIdListByEventIdSelector } from "../../Feed/Selectors/FeedSelectors";
import { betSlipCreatePickAction, betSlipRacingAddBetSlip, betSlipRemovePlaceAction } from "../BetSlipActions";
import { betSlipRaceCastPickSelector, outcomeByMarketIdThroughCastSelector } from "../Selectors/VirtualSelectors";
import { outcomeIdListByPicksSelector } from "../Selectors/BetSlipSelectors";
import { pickKind } from "../Model/BetPick";

const betSlipRacingBetEpic: TAppEpic = (action$, state$) => action$.pipe(
  isCreator(betSlipRacingAddBetSlip),
  switchMap(({ payload: { eventId } }) => {
    const marketIds: Record<string, string[]> = betSlipRaceCastPickSelector(state$.value);
    const marketIdsByEvent = marketIdListByEventIdSelector(state$.value, eventId);

    const marketIdsWithoutMarketIdsByEvent = Object.keys(marketIds)
      .filter((marketId) => marketIdsByEvent.includes(marketId));

    const actions = marketIdsWithoutMarketIdsByEvent
      .reduce<Action[]>(
        (acc, marketId) => {
          const outcomeId: string = outcomeByMarketIdThroughCastSelector(state$.value, marketId);
          const outcomeExistIdList = outcomeIdListByPicksSelector(state$.value);
          if (isNil(outcomeId)) {
            return acc;
          }
          if (outcomeExistIdList.includes(outcomeId)) {
            return acc;
          }
          const eventId = eventIdByOutcomeIdSelector(state$.value, outcomeId);
          acc.push(betSlipCreatePickAction(pickKind.base, outcomeId));
          acc.push(betSlipRemovePlaceAction(eventId));

          return acc;
        },
        [],
      );

    return from(actions);
  }),
);

export { betSlipRacingBetEpic };
