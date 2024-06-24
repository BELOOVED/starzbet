import { distinctUntilChanged, filter, map, switchMap } from "rxjs/operators";
import { combineEpics } from "redux-observable";
import { EMPTY } from "rxjs";
import { loggedSelector } from "@sb/auth";
import { isNil } from "@sb/utils";
import { type TMixAppEpic } from "../../../../common/Store/Root/Epics/TMixAppEpic";
import { notVerifiedEpic } from "../../../../common/Store/Player/Epics/NotVerifiedEpic";
import { sessionClosedConnectedEpic } from "../../../../common/Store/Player/Epics/SessionClosedConnectedEpic";
import { playerLoggedEpic } from "../../../../common/Store/Player/Epics/PlayerLoggedEpic";
import { playerDetailsSelectors } from "../../../../common/Store/Player/Selectors/PlayerSelectors";
import { bankingRootEpic } from "../../Banking/Epics/BankingRootEpic";
import { transactionRequestsRootEpic } from "../../TransactionRequests/Epics/TransactionRequestsRootEpic";
import { historyRouteEpic } from "../../History/Epics/HistoryRouteEpic";
import { ticketsRouteEpic } from "../../Ticket/Epics/TicketsRouteEpic";
import { playerKycRootEpic } from "../../Kyc/Epics/PlayerKycRootEpic";
import { requestUnreadTicketsCountEpic } from "../../Ticket/Epics/RequestUnreadTicketsCount";
import { recentlyPlayedGamesEpics, shuffleGameEpics } from "../../Games/Epics/PlatformGameManagerRootEpic";
import { userDevicesRootEpic } from "../../VerifyDevice/Epics/UserDevicesRootEpic";
import { twoFactorAuthRouterEpic } from "../../TwoFactorAuth/Epics/TwoFactorAuthRouterEpic";

const awaitPlayerIdEpics = (...epics: TMixAppEpic[]): TMixAppEpic => (action$, state$, dependencies) => state$.pipe(
  map(playerDetailsSelectors.id),
  distinctUntilChanged(),
  switchMap((id) => {
    if (isNil(id)) {
      return EMPTY;
    }

    return combineEpics(...epics)(action$, state$, dependencies);
  }),
);
const authorizedEpics: TMixAppEpic = (action$, state$, dependencies) => state$.pipe(
  map(loggedSelector),
  distinctUntilChanged(),
  filter(Boolean),
  switchMap(() => combineEpics(
    playerKycRootEpic,
    awaitPlayerIdEpics(
      ticketsRouteEpic,
      requestUnreadTicketsCountEpic,
      playerLoggedEpic,
      transactionRequestsRootEpic,
      historyRouteEpic,
      twoFactorAuthRouterEpic,
      recentlyPlayedGamesEpics,
      shuffleGameEpics,
      userDevicesRootEpic,
    ),
    bankingRootEpic,
    notVerifiedEpic,
    sessionClosedConnectedEpic,
  )(action$, state$, dependencies)),
);

export { authorizedEpics };
