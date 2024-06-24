import { mergeMap } from "rxjs";
import { isCreator } from "@sb/utils";
import { type TAppEpic } from "../../../../common/Store/Root/Epics/TAppEpic";
import { requestBetStatesAction } from "../MyBetsActions";
import { fetchBetStates } from "./FetchBetStates";

const requestBetStatesEpic: TAppEpic = (action$, state$, { sportsbookHttpApi }) => action$.pipe(
  isCreator(requestBetStatesAction),
  mergeMap(({ payload: { betId } }) => fetchBetStates(betId, state$.value, sportsbookHttpApi)),
);

export { requestBetStatesEpic };
