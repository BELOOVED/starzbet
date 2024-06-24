import { of } from "rxjs";
import { type EPostfix } from "@sb/sdk";
import { type IFrontendFeed } from "@sb/sdk/sportsbook/frontserver/api/dto/FrontendFeed";
import { type ISnapshotProvider } from "@sb/diff-protocol";
import { callWithAbort } from "../../../../../common/Utils/EpicUtils/CallWithAbort";
import type { HttpApi } from "../../../../Api/HttpApi";
import { feedFetchedAction } from "../../FeedActions";

class FeedSnapshotProvider implements ISnapshotProvider<IFrontendFeed> {
  constructor(private sportsbookHttpApi: HttpApi, private postfix: EPostfix, private retriedNumber: number) {
  }

  getSnapshot() {
    return callWithAbort(this.sportsbookHttpApi.callGetMainLine, this.postfix);
  }

  onLoad(snapshot: IFrontendFeed) {
    return of(feedFetchedAction(snapshot, this.retriedNumber, this.postfix));
  }
}

export { FeedSnapshotProvider };
