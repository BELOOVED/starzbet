import { combineEpics } from "redux-observable";
import { filter, map } from "rxjs/operators";
import { isCreator } from "@sb/utils";
import { removedTokenAction } from "../../../../platformui/Store/Auth/AuthActions";
import { type TAppEpic } from "../../../../common/Store/Root/Epics/TAppEpic";
import { hasEditableBet } from "../../MyBets/Selectors/MyBetsSelectors";
import { cancelEditBetAction } from "../../MyBets/MyBetsActions";
import { betSlipChangeTabAction, betSlipCreatePickAction, betSlipRemovePickAction } from "../BetSlipActions";
import { betSlipTabEnum } from "../Model/BetSlipTab";

const betSlipChangeTabEpic: TAppEpic = combineEpics(
  (action$, state$) => action$.pipe(
    isCreator(betSlipCreatePickAction, betSlipRemovePickAction),
    filter(() => !hasEditableBet(state$.value)),
    map(() => betSlipChangeTabAction(betSlipTabEnum.betConstructor)),
  ),
  (action$) => action$.pipe(
    isCreator(removedTokenAction),
    map(() => betSlipChangeTabAction(betSlipTabEnum.betConstructor)),
  ),
  (action$, state$) => action$.pipe(
    isCreator(betSlipChangeTabAction),
    filter(({ payload: { tab } }) => tab === betSlipTabEnum.betConstructor && hasEditableBet(state$.value)),
    map(cancelEditBetAction),
  ),
);

export { betSlipChangeTabEpic };
