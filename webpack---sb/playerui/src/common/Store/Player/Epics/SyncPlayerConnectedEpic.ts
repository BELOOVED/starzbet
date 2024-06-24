import { EMPTY, merge, of, Subject, switchMap } from "rxjs";
import { combineEpics, type Epic } from "redux-observable";
import { type Action } from "redux";
import {
  platformPlayerEmailVerificationTokenQueryOptionalFields,
  platformPlayerPhoneVerificationTokenQueryOptionalFields,
  platformPlayerQueryOptionalFieldsNoRef,
} from "@sb/graphql-client/PlayerUI";
import { createCallManagerSymbol, type TWithCallManagerState } from "@sb/call-manager";
import { type IWithAuthState } from "@sb/auth";
import { routeMap } from "../../../../sportsbookui/RouteMap/RouteMap";
import { type IDepsWithGraphQLClient } from "../../../../platformui/Store/Root/Epic/TEpicWithGraphQLClient";
import {
  createConnectedByRouteEpic,
  type IDepsWithConnection,
} from "../../../Utils/EpicUtils/CreateConnectedByRouteEpic";
import { createSubscribe } from "../../../Utils/EpicUtils/CreateSubscribe";
import { whenLoggedAndWsAuthenticatedEpic } from "../../WsAuth/WsAuthEpic";
import { setAuthenticatedAction } from "../../WsAuth/WsAuthActions";
import { playerIdNotNilSelector } from "../Selectors/PlayerSelectors";
import { type IWithPlayerState } from "../InitialState/PlayerInitialState";
import {
  playerReceivedEmailVerificationTokenAction,
  playerReceivedGroupIdAction,
  playerReceivedPhoneVerificationTokenAction,
} from "../PlayerActions";
import { loadPlayerAllEpic } from "./LoadPlayerAllEpic";
import { whenPlayerIdExist } from "./WhenPlayerIdExist";
import { loadingPlayerFactory } from "./LoadingFactory/LoadingPlayerFactory";

const PLAYER_REQUEST_GROUP_ID_LOADING_SYMBOL = createCallManagerSymbol("PLAYER_REQUEST_GROUP_ID_LOADING_SYMBOL");
const PLAYER_REQUEST_PHONE_VERIFICATION_TOKEN_LOADING_SYMBOL = createCallManagerSymbol("PLAYER_REQUEST_PHONE_VERIFICATION_TOKEN_LOADING_SYMBOL");
const PLAYER_REQUEST_EMAIL_VERIFICATION_TOKEN_LOADING_SYMBOL = createCallManagerSymbol("PLAYER_REQUEST_EMAIL_VERIFICATION_TOKEN_LOADING_SYMBOL");

const requestGroupIdEpic = loadingPlayerFactory(
  PLAYER_REQUEST_GROUP_ID_LOADING_SYMBOL,
  platformPlayerQueryOptionalFieldsNoRef,
  playerReceivedGroupIdAction,
);

const requestPhoneVerificationTokenEpic = loadingPlayerFactory(
  PLAYER_REQUEST_PHONE_VERIFICATION_TOKEN_LOADING_SYMBOL,
  platformPlayerPhoneVerificationTokenQueryOptionalFields,
  playerReceivedPhoneVerificationTokenAction,
);

const requestEmailVerificationTokenEpic = loadingPlayerFactory(
  PLAYER_REQUEST_EMAIL_VERIFICATION_TOKEN_LOADING_SYMBOL,
  platformPlayerEmailVerificationTokenQueryOptionalFields,
  playerReceivedEmailVerificationTokenAction,
);

const playerGroupChangedSubject = new Subject();

const onPlayerGroupChanged: Epic<Action, Action, IWithAuthState & TWithCallManagerState, IDepsWithGraphQLClient> = (
  action$,
  state$,
  dependencies,
) => playerGroupChangedSubject.pipe(
  switchMap(() => merge(
    requestGroupIdEpic(action$, state$, dependencies),
    of(setAuthenticatedAction(false)),
  )),
);

const watchPlayerChangedEpic: Epic<Action, Action, IWithPlayerState, IDepsWithConnection> = (action$, state$, dependencies) => {
  const playerId = playerIdNotNilSelector(state$.value);

  return merge(
    createSubscribe(
      `sumstats.platform.player.event.player_group_updated.${playerId}`,
      () => () => {
        playerGroupChangedSubject.next(Date.now());

        return EMPTY;
      },
    )(action$, state$, dependencies),

    createSubscribe(
      `sumstats.platform.player.event.player_phone_verification_token_created.${playerId}`,
      () => requestPhoneVerificationTokenEpic,
    )(action$, state$, dependencies),

    createSubscribe(
      `sumstats.platform.player.event.player_email_verification_token_created.${playerId}`,
      () => requestEmailVerificationTokenEpic,
    )(action$, state$, dependencies),
  );
};

const syncPlayerConnectedEpic = combineEpics(
  whenLoggedAndWsAuthenticatedEpic(
    whenPlayerIdExist(
      createConnectedByRouteEpic(
        [routeMap.any],
        watchPlayerChangedEpic,
        undefined,
        loadPlayerAllEpic,
      ),
    ),
  ),
  onPlayerGroupChanged,
);

export { syncPlayerConnectedEpic };
