import { debounceTime, of, switchMap } from "rxjs";
import { distinctUntilChanged, map } from "rxjs/operators";
import { type Epic } from "redux-observable";
import { EProviderCode } from "@sb/betting-core/EProviderCode";
import { type TMatch } from "@sb/react-router-compat";
import { EGamePage } from "@sb/betting-core/EGamePage";
import { callManagerRemoveSymbolAction, createCallManagerSymbol } from "@sb/call-manager";
import { routerEpic } from "@sb/router";
import { type TExplicitAny, withParams } from "@sb/utils";
import { type TCallResponsePayload } from "@sb/sdk";
import { type call_GetSnapshotQuery } from "@sb/sdk/SDKClient/pragmaticplaydga";
import { type TMixAppEpic } from "../../../../common/Store/Root/Epics/TMixAppEpic";
import { gameProviderEnum, gameProviderTabs } from "../../../../common/Store/Provider/ProviderModel";
import { getMatch } from "../../../../common/Utils/RouterUtils/GetMatch";
import { resyncResourceFactory } from "../../../../common/Utils/EpicUtils/ResyncResourceFactory";
import { rpcLoadingFactory } from "../../../../common/Utils/EpicUtils/RpcLoadingFactory";
import {
  generateLocalizedMatchPath,
} from "../../../../common/Client/Core/Services/RouterService/Utils/GenerateLocalizedPathByRoute";
import { baseRouteMap } from "../../../RouteMap/RouteMap";
import { type IDepsWithPlatformHttpApi } from "../../Root/Epic/IDepsWithPlatformHttpApi";
import {
  isWithDgaByPageAndCombineProvidersSelector,
  isWithDgaByPageAndLabelIdSelector,
} from "../../Games/Selectors/GamesSelectors";
import { liveCasinoIsWithDgaSelector } from "../../LiveCasino/Selectors/LiveCasinoSelectors";
import { type TWithGamesState } from "../../Games/GamesInitialState";
import { type TWithLiveCasinoState } from "../../LiveCasino/LiveCasinoInitialState";
import { fetchedSnapshotAction } from "../PragmaticDgaActions";

type TSnapshotPayload = TCallResponsePayload<typeof call_GetSnapshotQuery>;

const PRAGMATIC_DGA_LOADING_SYMBOL = createCallManagerSymbol("PRAGMATIC_DGA_LOADING_SYMBOL");

const match = getMatch({
  path: generateLocalizedMatchPath(
    baseRouteMap.liveCasinoProvider,
    { provider: gameProviderTabs[gameProviderEnum[EProviderCode.PRAGMATIC_PLAY]] },
  ),
});

const storePragmaticPayloadEpic = (payload: TSnapshotPayload): Epic => () => of(fetchedSnapshotAction(payload));

const loadPragmaticDgaSnapshotEpic = rpcLoadingFactory({
  callSymbol: PRAGMATIC_DGA_LOADING_SYMBOL,
  method: (dependencies: IDepsWithPlatformHttpApi) => dependencies.platformHttpApi.callPragmaticDgaGetSnapshot,
  onLoad: storePragmaticPayloadEpic,
  payload: {},
});

const pragmaticDgaResyncEpic = resyncResourceFactory({
  loadEpic: loadPragmaticDgaSnapshotEpic,
  loadSymbol: PRAGMATIC_DGA_LOADING_SYMBOL,
  subscriptions: [
    {
      uri: "sumstats.platform.pragmaticdga",
      onUpdate: storePragmaticPayloadEpic,
    },
  ],
});

const pragmaticDgaConnectedByRouteEpic: TMixAppEpic = routerEpic({
  name: "pragmaticDgaConnectedByRouteEpic",
  match,
  onStart: () => pragmaticDgaResyncEpic,
  onStop: () => () => of(callManagerRemoveSymbolAction(PRAGMATIC_DGA_LOADING_SYMBOL)),
});

const createPragmaticDgaResyncEpic = <A extends TExplicitAny[]>(
  selector: (state: TWithGamesState & TWithLiveCasinoState, ...args: A) => boolean,
  ...args: A
): TMixAppEpic => (action$, state$, dependencies) => (
    state$.pipe(
      map(withParams(selector, ...args)),
      distinctUntilChanged(),
      debounceTime(500), // to avoid unnecessary connection creation due to redirectors on router
      switchMap((condition) => {
        if (!condition) {
          return of(callManagerRemoveSymbolAction(PRAGMATIC_DGA_LOADING_SYMBOL));
        }

        return pragmaticDgaResyncEpic(action$, state$, dependencies);
      }),
    )
  );

const labelDgaEpic = ({
  params: { labelId },
}: TMatch<{
  labelId: string;
}>) => createPragmaticDgaResyncEpic(
  isWithDgaByPageAndLabelIdSelector,
  EGamePage.LIVE_CASINO,
  labelId,
);

const combineProvidersDgaEpic = () => createPragmaticDgaResyncEpic(
  isWithDgaByPageAndCombineProvidersSelector,
  EGamePage.LIVE_CASINO,
);

const searchDgaEpic = () => createPragmaticDgaResyncEpic(
  liveCasinoIsWithDgaSelector,
);

export {
  pragmaticDgaConnectedByRouteEpic,
  labelDgaEpic,
  combineProvidersDgaEpic,
  searchDgaEpic,
};
