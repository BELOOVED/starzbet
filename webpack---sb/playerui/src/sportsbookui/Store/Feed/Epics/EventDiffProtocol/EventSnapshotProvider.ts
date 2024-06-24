import { of } from "rxjs";
import { type EPostfix } from "@sb/sdk";
import { type IFrontendFeed } from "@sb/sdk/sportsbook/frontserver/api/dto/FrontendFeed";
import { type ISnapshotProvider } from "@sb/diff-protocol";
import { callWithAbort } from "../../../../../common/Utils/EpicUtils/CallWithAbort";
import type { HttpApi } from "../../../../Api/HttpApi";
import { feedEventFetchedAction } from "../../FeedActions";

class EventSnapshotProvider implements ISnapshotProvider<IFrontendFeed> {
  constructor(private sportsbookHttpApi: HttpApi, private postfix: EPostfix, private eventId: string) {
  }

  getSnapshot() {
    return callWithAbort(this.sportsbookHttpApi.callGetEventSnapshot, { postfix: this.postfix, eventId: this.eventId });
  }

  onLoad(snapshot: IFrontendFeed) {
    return of(feedEventFetchedAction(snapshot, this.eventId));
  }
}

export { EventSnapshotProvider };
