import { combineEpics } from "redux-observable";
import { of } from "rxjs";
import { routerEpic } from "@sb/router";
import { getMatch } from "../../../../common/Utils/RouterUtils/GetMatch";
import { type TAppEpic } from "../../../../common/Store/Root/Epics/TAppEpic";
import { sportMenuRemoveAllActiveIdAction } from "../SportMenuActions";
import { syncPathBySportMenuEpic } from "./SyncPathBySportMenuEpic";
import { syncSportMenuByPathEpic } from "./SyncSportMenuByPathEpic";
import { SPORT_ROUTES } from "./MatchOptions";

const sportMenuRootEpic: TAppEpic = routerEpic({
  name: "SportMenu",
  match: getMatch(SPORT_ROUTES),
  onStart: () => combineEpics(
    syncSportMenuByPathEpic,
    syncPathBySportMenuEpic,
  ),
  onStop: () => () => of(sportMenuRemoveAllActiveIdAction()),
});

export { sportMenuRootEpic };

