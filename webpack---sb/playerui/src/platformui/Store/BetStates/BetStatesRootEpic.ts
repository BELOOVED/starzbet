import { switchMap } from "rxjs/operators";
import { getNotNil, isCreator } from "@sb/utils";
import {
  query_Sportsbook_BetStates,
  sportsbookBetStatesQueryOptionalFields,
  type TSportsbook_BetState_Fragment,
} from "@sb/graphql-client/PlayerUI";
import { type TMixAppEpic } from "../../../common/Store/Root/Epics/TMixAppEpic";
import { gqlLoadingFactory } from "../../../common/Utils/EpicUtils/GqlLoadingFactory";
import { graphQlSportsbookDataSelector } from "../Root/Selectors/GraphQlSelectors";
import { platformBetStatesFetchedAction, platformLoadBetStatesAction } from "./BetStatesActions";
import { BET_STATES_SYMBOL } from "./BetStatesSelectors";

const betStatesLoadEpic = (betId: string) => {
  const action = (betStat: TSportsbook_BetState_Fragment[]) => platformBetStatesFetchedAction(betId, betStat);

  return gqlLoadingFactory(
    BET_STATES_SYMBOL,
    query_Sportsbook_BetStates,
    {
      optionalFields: sportsbookBetStatesQueryOptionalFields,
      variables: { id: betId },
    },
    action,
    (response) => [getNotNil(graphQlSportsbookDataSelector(response).BetStates, ["load bet states"], "null").items],
  );
};

const betStatesRootEpic: TMixAppEpic = (action$, state$, dependencies) => action$.pipe(
  isCreator(platformLoadBetStatesAction),
  switchMap(({ payload: { betId } }) => betStatesLoadEpic(betId)(action$, state$, dependencies)),
);

export { betStatesRootEpic };
