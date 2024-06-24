import { defer, Observable, of } from "rxjs";
import { type IWebsocketConnection } from "@sb/network-bus/Websocket";
import { type IDiffProvider } from "@sb/diff-protocol";
import { type EPlatform_VipClubLeaderBoardPeriod } from "@sb/graphql-client";
import { logArrayError, logWarnOrError } from "../../../../../common/Utils/Logger";
import { vipClubLeaderBoardUpdateReceivedAction } from "../../VipClubActions";
import { type IVipClubLeaderBoardUpdatePayload } from "../../VipClubModels";

class VipClubLeaderBoardDiffProvider implements IDiffProvider<IVipClubLeaderBoardUpdatePayload> {
  protected uri: string;

  constructor(
    private connection: IWebsocketConnection,
    private activePeriod: EPlatform_VipClubLeaderBoardPeriod,
  ) {
    this.uri = `sumstats.vip_club.leader_board.${this.activePeriod}`;
  }

  getGap(): Observable<never> {
    throw new Error("Gap in VipClubLeaderBoardDiffProvider not supported");
  }

  onLoad(update: IVipClubLeaderBoardUpdatePayload | IVipClubLeaderBoardUpdatePayload[]) {
    return of(vipClubLeaderBoardUpdateReceivedAction(update));
  }

  subscribe() {
    return defer(() => new Observable<IVipClubLeaderBoardUpdatePayload>((subscriber) => {
      let subscribed = false;

      this.connection.subscribe(
        this.uri,
        {
          subscriber: (payload: IVipClubLeaderBoardUpdatePayload) => subscriber.next(payload),
          unsubscriber: () => subscriber.unsubscribe(),
        },
      )
        .then(() => subscribed = true)
        .catch((err) => subscriber.error(err));

      return () => subscribed && this.connection.unsubscribe(this.uri).catch((error) => {
        logArrayError(
          error,
          (e) => logWarnOrError(e).epic("[VipClubLeaderBoardDiffProvider]", e),
        );
      });
    }));
  }
}

export { VipClubLeaderBoardDiffProvider };
