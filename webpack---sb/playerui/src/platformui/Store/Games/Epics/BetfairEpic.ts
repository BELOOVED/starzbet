import { EMPTY, of, switchMap } from "rxjs";
import { catchError, distinctUntilChanged, filter, map } from "rxjs/operators";
import { DEVICE_INFO } from "@sb/utils";
import { routerEpic } from "@sb/router";
import { loggedSelector } from "@sb/auth";
import { Logger } from "../../../../common/Utils/Logger";
import { getMatch } from "../../../../common/Utils/RouterUtils/GetMatch";
import { callWithAbort } from "../../../../common/Utils/EpicUtils/CallWithAbort";
import { routeMap } from "../../../RouteMap/RouteMap";
import { type TPlatformEpic } from "../../Root/Epic/TPlatformEpic";
import { localeSelector } from "../../Locale/Selectors/localeSelector";
import { gameLinkForExternalGameReceivedAction, removeGameLinkForExternalGameAction } from "../Actions/GamesActions";
import { EExternalGameId } from "../GamesModels";

const getBetfairLinkEpic: TPlatformEpic = (action$, state$, dependencies) => state$.pipe(
  map(() => {
    const locale = localeSelector(state$.value);
    const logged = loggedSelector(state$.value);

    return { locale, logged };
  }),
  distinctUntilChanged((prev, curr) =>
    prev.locale === curr.locale && prev.logged === curr.logged),
  filter(({ logged }) => logged),
  switchMap(({ locale }) => callWithAbort(
    dependencies.platformHttpApi.callGetBetFairLink,
    {
      deviceInfo: DEVICE_INFO,
      locale,
    },
  ).pipe(
    map((link) => gameLinkForExternalGameReceivedAction(EExternalGameId.BETFAIR, link)),
    catchError((e) => {
      Logger.warn.epic("retryWithLog", e);

      return EMPTY;
    }),
  )),
);

const betfairPageEpic = routerEpic({
  name: "betfairPage",
  match: getMatch({ path: routeMap.betExchange }),
  onStart: () => getBetfairLinkEpic,
  onStop: () => () => of(removeGameLinkForExternalGameAction(EExternalGameId.BETFAIR)),
});

export { betfairPageEpic };
