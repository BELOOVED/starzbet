import { filter, interval, of, switchMap, throttle } from "rxjs";
import { combineEpics, type Epic } from "redux-observable";
import { type Action } from "redux";
import { distinctUntilChanged, first, map } from "rxjs/operators";
import { type IMoney, isCreator, type TActionWithPayload, type TSelector } from "@sb/utils";
import { type IWithAuthState, loggedSelector } from "@sb/auth";
import { type TWithCallManagerState } from "@sb/call-manager";
import { betSlipCompletePlaceBetAction } from "../../../../sportsbookui/Store/BetSlip/BetSlipActions";
import { cashOutCompleteAction } from "../../../../sportsbookui/Store/CashOut/CashOutAction";
import { type IDepsWithGraphQLClient } from "../../../../platformui/Store/Root/Epic/TEpicWithGraphQLClient";
import { createSubscribe } from "../../../Utils/EpicUtils/CreateSubscribe";
import { createConnectedEpic, type IDepsWithConnection } from "../../../Utils/EpicUtils/CreateConnectedByRouteEpic";
import { whenLoggedAndWsAuthenticatedEpic } from "../../WsAuth/WsAuthEpic";
import { type IWithWsAuthState } from "../../WsAuth/WsAuthState";
import {
  playerBonusWalletBalanceReceivedAction,
  playerFreeBetWalletBalanceReceivedAction,
  playerMinimalReceivedAction,
  playerRequestWalletAction,
  playerWalletBalanceReceivedAction,
} from "../PlayerActions";
import { type IWithPlayerState } from "../InitialState/PlayerInitialState";
import { playerIdNotNilSelector } from "../Selectors/PlayerSelectors";
import {
  bonusWalletSelectors,
  freeBetWalletSelectors,
  playerBonusWalletIsNotNilSelector,
  playerFreeBetWalletIsNotNilSelector,
  playerWalletIsNotNilSelector,
  playerWalletSelectors,
} from "../Selectors/WalletSelectors";
import { playerRequestWalletEpic } from "./LoadingFactory/PlayerRequestWalletEpic";
import { whenPlayerIdExist } from "./WhenPlayerIdExist";

type TSyncWalletEpic<D = unknown> = Epic<
  Action,
  Action,
  IWithPlayerState & IWithAuthState & IWithWsAuthState & TWithCallManagerState, D & IDepsWithGraphQLClient
>;

const walletAffectActions = [
  betSlipCompletePlaceBetAction,
  cashOutCompleteAction,
  playerRequestWalletAction,
  playerMinimalReceivedAction,
];

const syncWalletOnActionsEpic: TSyncWalletEpic = (action$, state$, deps) => action$.pipe(
  isCreator(...walletAffectActions),
  filter(() => loggedSelector(state$.value)),
  throttle(() => interval(500)),
  switchMap(() => playerRequestWalletEpic(action$, state$, deps)),
);

const walletSubscribeEpicFactory = (
  conditionSelector: TSelector<IWithPlayerState, boolean>,
  selector: TSelector<IWithPlayerState, string>,
  succeedActionCreator: (balance: IMoney) => TActionWithPayload<{ balance: IMoney; }>,
): TSyncWalletEpic<IDepsWithConnection> => (action$, state$, deps) => state$.pipe(
  map(conditionSelector),
  distinctUntilChanged(),
  first(Boolean),
  map(() => selector(state$.value)),
  switchMap((walletId) => {
    const playerId = playerIdNotNilSelector(state$.value);

    return createSubscribe<IMoney>(
      `sumstats.platform.payment.transaction.event.transaction_created_v4.${playerId}.${walletId}`,
      (payload) => () => of(succeedActionCreator(payload)),
      "[walletSubscribeEpicFactory] failed",
    )(action$, state$, deps);
  }),
);

const walletSubscribeEpic = walletSubscribeEpicFactory(
  playerWalletIsNotNilSelector,
  playerWalletSelectors.id,
  playerWalletBalanceReceivedAction,
);

const bonusWalletSubscribeEpic = walletSubscribeEpicFactory(
  playerBonusWalletIsNotNilSelector,
  bonusWalletSelectors.id,
  playerBonusWalletBalanceReceivedAction,
);

const freeBetWalletSubscribeEpic = walletSubscribeEpicFactory(
  playerFreeBetWalletIsNotNilSelector,
  freeBetWalletSelectors.id,
  playerFreeBetWalletBalanceReceivedAction,
);

const walletConnectedEpics: TSyncWalletEpic = createConnectedEpic(
  combineEpics(
    walletSubscribeEpic,
    bonusWalletSubscribeEpic,
    freeBetWalletSubscribeEpic,
  ),
);

const syncWalletConnectedEpic = combineEpics(
  syncWalletOnActionsEpic,
  whenLoggedAndWsAuthenticatedEpic(
    whenPlayerIdExist(
      walletConnectedEpics,
    ),
  ),
);

export { syncWalletConnectedEpic };
