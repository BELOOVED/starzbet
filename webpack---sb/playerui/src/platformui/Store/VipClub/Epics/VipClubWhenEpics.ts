import { switchMap } from "rxjs";
import { combineEpics } from "redux-observable";
import { isCreator } from "@sb/utils";
import { type TMixAppEpic } from "../../../../common/Store/Root/Epics/TMixAppEpic";
import { vipClubLeaderBoardReceivedAction } from "../VipClubActions";

const vipClubWhenLeaderBoardReceivedEpic = (...epics: TMixAppEpic[]): TMixAppEpic => (action$, state$, dependencies) =>
  action$.pipe(
    isCreator(vipClubLeaderBoardReceivedAction),
    switchMap(() => combineEpics(
      ...epics,
    )(action$, state$, dependencies)),
  );

export { vipClubWhenLeaderBoardReceivedEpic };
