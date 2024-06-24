import { concat, type Observable, of } from "rxjs";
import { combineEpics } from "redux-observable";
import { DiffProtocol } from "@sb/diff-protocol";
import type { TPlatform_VipClubLeaderBoard_QueryResult } from "@sb/graphql-client/PlayerUI";
import { getNotNil } from "@sb/utils";
import { callManagerStartAction } from "@sb/call-manager";
import { type EPlatform_VipClubLeaderBoardPeriod } from "@sb/graphql-client";
import { type TMixAppEpic } from "../../../../../common/Store/Root/Epics/TMixAppEpic";
import { createConnectedEpic } from "../../../../../common/Utils/EpicUtils/CreateConnectedByRouteEpic";
import { type IVipClubLeaderBoardUpdatePayload } from "../../VipClubModels";
import { VIP_CLUB_LEADER_BOARD_LIMIT, VIP_CLUB_LEADER_BOARD_LOADING_SYMBOL } from "../../VipClubVariables";
import { VipClubLeaderBoardDiffProvider } from "./VipClubLeaderBoardDiffProvider";
import { VipClubLeaderBoardSnapshotProvider } from "./VipClubLeaderBoardSnapshotProvider";

class VipClubLeaderBoardDiffProtocol extends DiffProtocol<TPlatform_VipClubLeaderBoard_QueryResult, IVipClubLeaderBoardUpdatePayload> {
  protected override versionSnapshotExtractor = (payload: TPlatform_VipClubLeaderBoard_QueryResult) =>
    getNotNil(payload.platform.VipClubLeaderBoard[0], ["VipClubLeaderBoardDiffProtocol"], "versionSnapshotExtractor").version;
  protected override versionDiffExtractor = (payload: IVipClubLeaderBoardUpdatePayload) => payload.version;

  protected hasInitSnapshot() {
    return false;
  }

  protected getCurrentVersion() {
    return 0;
  }

  protected override getGap(nextVersion: number): Observable<never> {
    throw new Error(
      `Missed update in VipClubLeaderBoardDiffProtocol, versions: current-${this.currentVersion} next-${nextVersion}, but gap not supported`,
    );
  }
}

const vipClubLeaderBoardDiffProtocolConnectedEpic = (activePeriod: EPlatform_VipClubLeaderBoardPeriod, offset = 0): TMixAppEpic =>
  combineEpics(
    () => of(callManagerStartAction(VIP_CLUB_LEADER_BOARD_LOADING_SYMBOL)),
    createConnectedEpic(
      (action$, state$, dependencies) => {
        const diffProvider = new VipClubLeaderBoardDiffProvider(dependencies.connection, activePeriod);
        const snapshotProvider = new VipClubLeaderBoardSnapshotProvider(dependencies.graphQLClient, {
          period: activePeriod,
          limit: VIP_CLUB_LEADER_BOARD_LIMIT,
          offset,
        });
        const diffProtocol = new VipClubLeaderBoardDiffProtocol(snapshotProvider, diffProvider);

        return concat(
          of(callManagerStartAction(VIP_CLUB_LEADER_BOARD_LOADING_SYMBOL)),
          diffProtocol.runEpic(action$, state$, dependencies),
        );
      },
    ),
  )
;

export { vipClubLeaderBoardDiffProtocolConnectedEpic };
