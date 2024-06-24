import copy from "copy-to-clipboard";
import { concat, EMPTY, ignoreElements, of, tap } from "rxjs";
import { combineEpics } from "redux-observable";
import { routerEpic, routerLocationSearchSelector } from "@sb/router";
import { decodeBase64, isArray, isCreator, isNil, isString } from "@sb/utils";
import { getMatch } from "../../../../common/Utils/RouterUtils/GetMatch";
import { replaceLocalized } from "../../../../common/Client/Core/Services/RouterService/Utils/LocationChangeLocalized";
import { type TAppEpic } from "../../../../common/Store/Root/Epics/TAppEpic";
import { routeMap } from "../../../RouteMap/RouteMap";
import { appPathNamespaceSelector } from "../../App/Selectors/AppSelectors";
import { outrightByIdSelector } from "../../Feed/Selectors/FeedSelectors";
import { localeSelector } from "../../Locale/LocaleSelector";
import { betSlipRemoveAllPickAction, betSlipShareAction } from "../BetSlipActions";
import { betSlipPicksSelector } from "../Selectors/BetSlipPicksSelectors";
import { encodePicks } from "../Model/EncodePicks";
import { type TLocalStoragePick } from "../Model/BetPick";
import { getPicksFromLocalStorage } from "./GetPicksFromLocalStorage";
import { waitMainLineIsReadyEpic } from "./WaitMainLineIsReadyEpic";
import { getAvailableOutrightOutcomes } from "./GetAvailableOutrightOutcomes";
import { getAvailableEventOutcomes } from "./GetAvailableEventOutcomes";
import { doRestorePicks } from "./DoRestorePicks";

const shareMatchOptions = {
  path: routeMap.share,
};

const copyToClipBoardEpic: TAppEpic = (action$, state$) => action$.pipe(
  isCreator(betSlipShareAction),
  tap(() => {
    const picks = betSlipPicksSelector(state$.value);

    const pathNamespace = appPathNamespaceSelector(state$.value);

    const str = encodePicks(picks.map(({ outcomeId }) => outcomeId));

    copy(`${window.location.origin}${pathNamespace}${routeMap.share}?picks=${str}`);
  }),
  ignoreElements(),
);

const doRestore = (picksInSearchParam: string): TAppEpic => (action$, state$) => {
  const eventOutcomesMap = {} as Record<string, string[]>;

  const outrightOutcomes = [] as string[];

  const pickOutcomeIds = JSON.parse(decodeBase64(decodeURIComponent(picksInSearchParam)));

  const picksFromStorage: TLocalStoragePick[] = getPicksFromLocalStorage(state$.value);

  if (isArray(pickOutcomeIds)) {
    pickOutcomeIds.forEach((outcomeId) => {
      if (!isString(outcomeId)) {
        return;
      }

      const existInStorage = picksFromStorage.find((it) => it.outcomeId === outcomeId);

      if (existInStorage) {
        return;
      }

      const splitted = outcomeId.split("->");

      const [parentId] = splitted;

      if (!parentId) {
        return;
      }

      if (outrightByIdSelector(state$.value, parentId)) {
        outrightOutcomes.push(outcomeId);

        return;
      }

      if (!eventOutcomesMap.hasOwnProperty(parentId)) {
        eventOutcomesMap[parentId] = [];
      }

      const item = eventOutcomesMap[parentId];

      if (!item) {
        return;
      }

      item.push(outcomeId);
    });
  }

  const availableOutrightOutcomes = getAvailableOutrightOutcomes(state$, outrightOutcomes);

  const availableEventOutcomes = getAvailableEventOutcomes(state$, eventOutcomesMap);

  const locale = localeSelector(state$.value);

  if (availableOutrightOutcomes.length === 0 && availableEventOutcomes.length === 0) {
    return of(replaceLocalized(locale, routeMap.preLive.root));
  }

  return concat(
    of(betSlipRemoveAllPickAction()),
    of(replaceLocalized(locale, routeMap.preLive.root)),
    doRestorePicks(state$, availableOutrightOutcomes, availableEventOutcomes),
  );
};

const restorePicksFromUrlAndRedirectEpic: TAppEpic = (action$, state$, dependencies) => {
  const search: string = routerLocationSearchSelector(state$.value);
  const searchParams = new URLSearchParams(search);
  const picksInSearchParam = searchParams.get("picks");

  if (isNil(picksInSearchParam)) {
    return EMPTY;
  }

  return waitMainLineIsReadyEpic(doRestore(picksInSearchParam))(action$, state$, dependencies);
};

const betSlipShareEpic: TAppEpic = combineEpics(
  copyToClipBoardEpic,
  routerEpic({
    name: "restorePicksFromUrlAndRedirect",
    match: getMatch(shareMatchOptions),
    onStart: () => restorePicksFromUrlAndRedirectEpic,
    shouldStop: () => false,
  }),
);

export { betSlipShareEpic };
