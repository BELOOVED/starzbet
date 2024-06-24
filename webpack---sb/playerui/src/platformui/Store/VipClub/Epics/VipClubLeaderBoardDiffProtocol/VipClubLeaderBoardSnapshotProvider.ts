import { concat, from, of } from "rxjs";
import { type ISnapshotProvider } from "@sb/diff-protocol";
import { type Client, type TPlatform_VipClubLeaderBoardRequest } from "@sb/graphql-client";
import {
  platformVipClubLeaderBoardQueryOptionalFields,
  query_Platform_VipClubLeaderBoard,
  type TPlatform_VipClubLeaderBoard_QueryResult,
} from "@sb/graphql-client/PlayerUI";
import { callManagerSucceededAction } from "@sb/call-manager";
import { vipClubLeaderBoardReceivedAction } from "../../VipClubActions";
import { VIP_CLUB_LEADER_BOARD_LOADING_SYMBOL } from "../../VipClubVariables";

class VipClubLeaderBoardSnapshotProvider implements ISnapshotProvider<TPlatform_VipClubLeaderBoard_QueryResult> {
  constructor(private gqlClient: Client, private board: TPlatform_VipClubLeaderBoardRequest) {
  }

  getSnapshot() {
    return from(query_Platform_VipClubLeaderBoard(
      this.gqlClient,
      {
        variables: { request: { boards: [this.board] } },
        optionalFields: platformVipClubLeaderBoardQueryOptionalFields,
      },
    ));
  }

  onLoad(snapshot: TPlatform_VipClubLeaderBoard_QueryResult) {
    return concat(
      of(vipClubLeaderBoardReceivedAction(snapshot.platform.VipClubLeaderBoard)),
      of(callManagerSucceededAction(VIP_CLUB_LEADER_BOARD_LOADING_SYMBOL)),
    );
  }
}

export { VipClubLeaderBoardSnapshotProvider };
