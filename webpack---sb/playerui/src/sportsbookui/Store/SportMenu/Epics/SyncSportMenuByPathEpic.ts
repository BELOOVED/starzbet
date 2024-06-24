import { first, of } from "rxjs";
import { distinctUntilChanged, map, switchMap } from "rxjs/operators";
import { deduplicate, isNotEmpty } from "@sb/utils";
import { routerEpic, routerLocationPathnameSelector } from "@sb/router";
import { IS_MOBILE_CLIENT_SIDE } from "../../../../common/Store/DeviceInfo/DeviceInfoConstant";
import { type TAppEpic } from "../../../../common/Store/Root/Epics/TAppEpic";
import {
  categoriesSelector,
  eventsSelector,
  marketsSelector,
  outcomesSelector,
  scopesSelector,
  scoresSelector,
  sportsSelector,
  tournamentsSelector,
} from "../../Feed/Selectors/FeedSelectors";
import { sportMenuActiveSelector, sportMenuDisabledSelector, sportMenuIdsToSetActiveSelector } from "../Selectors/SportMenuSelectors";
import {
  setDisabledSportMenuAction,
  sportMenuRemoveAllActiveIdAction,
  sportMenuRemoveAllTournamentIdAction,
  sportMenuSetActiveIdsAction,
} from "../SportMenuActions";
import { getSelectionMatch } from "./MatchOptions";

const requiredSelectors = [
  scopesSelector,
  categoriesSelector,
  tournamentsSelector,
  eventsSelector,
  sportsSelector,
  scoresSelector,
  marketsSelector,
  outcomesSelector,
];

const resetSportMenuEpic: TAppEpic = () => IS_MOBILE_CLIENT_SIDE
  ? of(sportMenuRemoveAllActiveIdAction())
  : of(sportMenuRemoveAllTournamentIdAction());

const syncSportMenuByPathEpic = routerEpic({
  name: "syncSportMenuByPathEpic",
  match: getSelectionMatch,
  onStart: (): TAppEpic => (action$, state$) => (
    state$.pipe(
      map(routerLocationPathnameSelector),
      distinctUntilChanged(),
      switchMap((pathname: string) => state$.pipe(
        first((state) => requiredSelectors.some((selector) => isNotEmpty(Object.values(selector(state))))),
        switchMap(() => {
          if(sportMenuDisabledSelector(state$.value)){
            return of(setDisabledSportMenuAction(false));
          }

          const {
            sportIds,
            categoryIds,
            tournamentIds,
          } = sportMenuIdsToSetActiveSelector(state$.value, pathname);

          const prevSportIds = sportMenuActiveSelector(state$.value).sportIds;
          const prevCategoryIds = sportMenuActiveSelector(state$.value).categoryIds;

          return of(sportMenuSetActiveIdsAction(
            deduplicate([...sportIds, ...prevSportIds]),
            deduplicate([...categoryIds, ...prevCategoryIds]),
            tournamentIds,
          ));
        }),
      )),
    )
  ),
  onStop: () => resetSportMenuEpic,
});

export { syncSportMenuByPathEpic };
