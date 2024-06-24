import { EMPTY, fromEvent, merge } from "rxjs";
import { map } from "rxjs/operators";
import { extractExport, getNotNil } from "@sb/utils";
import { routerEpic } from "@sb/router";
import { type TMixAppEpic } from "../../../../common/Store/Root/Epics/TMixAppEpic";
import { getMatch } from "../../../../common/Utils/RouterUtils/GetMatch";
import { restartOnParamsChanged } from "../../../../common/Utils/RouterUtils/RestartOnParamsChanged";
import { isMobileSelector } from "../../../../common/Store/DeviceInfo/DeviceInfoSelectors";
import { fallbackDesktopGridType, mediaQueryLists, mediaQueryWithGridTypeList } from "../Model/DesktopGamesOption";
import { changeGridTypeAction } from "../Actions/GamesActions";
import { ROUTE_PER_LABEL_AND_PROVIDER_MAP } from "../Model/RoutePerLabelMap";

const notNilGridType = (list: typeof mediaQueryWithGridTypeList, index: number) => getNotNil(
  list[index],
  ["watchGridTypeEpic"],
  "Grid",
);

const watchGridTypeEpic: TMixAppEpic = (_, state$) => {
  const isMobile = isMobileSelector(state$.value);

  if (isMobile) {
    return EMPTY;
  }

  const mediaObservables = mediaQueryLists
    .map((mediaQuery) => fromEvent<MediaQueryList>(mediaQuery, "change")
      .pipe(
        map((list) => {
          const currentIndex = mediaQueryWithGridTypeList.findIndex(([query]) => query === list.media);

          if (list.matches) {
            const gridType = notNilGridType(mediaQueryWithGridTypeList, currentIndex)[1];

            return changeGridTypeAction(gridType);
          }

          if (currentIndex === mediaQueryWithGridTypeList.length - 1) {
            return changeGridTypeAction(fallbackDesktopGridType);
          }

          const gridType = notNilGridType(mediaQueryWithGridTypeList, currentIndex + 1)[1];

          return changeGridTypeAction(gridType);
        }),
      ));

  return merge(
    ...mediaObservables,
  );
};

const loadGamesAfterGridChangeEpic = routerEpic({
  name: "loadGamesAfterGridChange",
  match: getMatch<{ labelId: string; }>(Object.keys(ROUTE_PER_LABEL_AND_PROVIDER_MAP)),
  onStart: () => import("./LoadGamesAfterGridChangeRouteEpic")
    .then(extractExport("loadGamesAfterGridChangeRouteEpic")),
  shouldRestart: restartOnParamsChanged,
});

export { watchGridTypeEpic, loadGamesAfterGridChangeEpic };
