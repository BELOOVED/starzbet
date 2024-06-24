import { EMPTY, from, switchMap, takeWhile } from "rxjs";
import { type Epic } from "redux-observable";
import { type Action } from "redux";
import {
  query_Platform_Player,
  type TPlatform_Player_Fragment,
  type TPlatform_Player_QueryOptionalFields,
} from "@sb/graphql-client/PlayerUI";
import { type TCallManagerSymbol, type TWithCallManagerState } from "@sb/call-manager";
import { type TActionWithPayload, type TExplicitAny } from "@sb/utils";
import { type IWithAuthState, loggedSelector } from "@sb/auth";
import { type IDepsWithGraphQLClient } from "../../../../../platformui/Store/Root/Epic/TEpicWithGraphQLClient";
import { gqlLoadingFactory } from "../../../../Utils/EpicUtils/GqlLoadingFactory";
import { authTokenService } from "../../../Auth/AuthTokenService";

/*BACKGROUND EPIC, DON'T WAIT UNTIL IT'S DONE !!! */
const loadingPlayerFactory = (
  symbol: TCallManagerSymbol,
  optionalFields: TPlatform_Player_QueryOptionalFields,
  action: (player: TPlatform_Player_Fragment) => TActionWithPayload<TExplicitAny>,
): Epic<Action, Action, IWithAuthState & TWithCallManagerState, IDepsWithGraphQLClient> => (action$, state$, deps) => {
  if (!loggedSelector(state$.value)) {
    return EMPTY;
  }

  return from(authTokenService.getTokenOrError()).pipe(
    switchMap((token) => gqlLoadingFactory(
      symbol,
      query_Platform_Player,
      {
        optionalFields: optionalFields,
        variables: { accessToken: token.accessToken },
      },
      action,
      ({ platform: { Player } }) => [Player],
      () => true,
      undefined,
      true,
      authTokenService.createSignal(),
    )(action$, state$, deps).pipe(
      takeWhile(() => loggedSelector(state$.value)),
    )),
  );
};

export { loadingPlayerFactory };
