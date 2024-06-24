import { concat, filter, from, of, switchMap } from "rxjs";
import { catchError, distinctUntilChanged, map } from "rxjs/operators";
import { routerEpic } from "@sb/router";
import { DEVICE_INFO } from "@sb/utils";
import {
  EGetLiveSpinsStreamSettingsCommandErrorCode,
} from "@sb/sdk/ErrorMapping/gameintegration/GetLiveSpinsStreamSettingsCommandErrorMapping";
import { callManagerFailedAction, callManagerSucceededAction } from "@sb/call-manager";
import { loggedSelector } from "@sb/auth";
import { getMatch } from "../../../../common/Utils/RouterUtils/GetMatch";
import { Logger } from "../../../../common/Utils/Logger";
import { callWithAbort } from "../../../../common/Utils/EpicUtils/CallWithAbort";
import { routeMap } from "../../../RouteMap/RouteMap";
import { LiveSpinsApi } from "../../../Api/LiveSpinsApi";
import { type TPlatformEpic } from "../../Root/Epic/TPlatformEpic";
import { localeSelector } from "../../Locale/Selectors/localeSelector";
import { liveSpinsAuthTokenAction, liveSpinsStreamsAction } from "../Actions/LiveSpinsActions";
import { liveSpinsScriptLoadedSelector } from "../Selectors/LiveSpinsSelectors";
import { fallbackLocale, LocaleMap } from "../Model/LocaleModel";
import { LIVE_SPINS_LOADED_SYMBOL } from "../Model/Symbols";

const liveSpinsRouterEpic = routerEpic({
  name: "liveSpinsRouterEpic",
  match: getMatch({ path: routeMap.root, exact: true }),
  onStart: () => liveSpinsEpic,
});

const liveSpinsEpic: TPlatformEpic = (action$, state$, dependencies) => state$.pipe(
  map(liveSpinsScriptLoadedSelector),
  distinctUntilChanged(),
  filter(Boolean),
  switchMap(() => state$.pipe(
    map(loggedSelector),
    distinctUntilChanged(),
    switchMap(() => {
      const locale = localeSelector(state$.value);

      const correctLocale = LocaleMap[locale] ?? fallbackLocale;

      return callWithAbort(dependencies.platformHttpApi.callGetLiveSpinsStreamSettings, { deviceInfo: DEVICE_INFO }).pipe(
        switchMap(({
          apiUrl,
          uiUrl,
          tenantId,
          authToken,
        }) => {
          const api = new LiveSpinsApi(correctLocale, tenantId, { api: apiUrl, ui: uiUrl });

          api.init();

          const client = api.getLiveSpinsClient();

          return from(client).pipe(
            switchMap((client) => {
              client.onUpdate(() => {
                const updatedStreams = client.getStreams();
                of(liveSpinsStreamsAction(updatedStreams));
              });
              const streams = client.getStreams();
              const scheduledStreams = client.getScheduledStreams();

              const allStreams = [...streams, ...scheduledStreams];

              return concat(
                of(liveSpinsStreamsAction(allStreams)),
                of(liveSpinsAuthTokenAction(authToken)),
                of(callManagerSucceededAction(LIVE_SPINS_LOADED_SYMBOL)),
              );
            }),
          );
        }),
        catchError((error) => {
          error?.[0]?.code === EGetLiveSpinsStreamSettingsCommandErrorCode.gameProviderIsInactive
            ? Logger.info.app("Live Spins Provider are inactive")
            : Logger.warn.epic("[liveSpinsEpic] load error", error);

          return of(callManagerFailedAction(LIVE_SPINS_LOADED_SYMBOL, error));
        }),
      );
    }),
  )),
);

export { liveSpinsRouterEpic };
