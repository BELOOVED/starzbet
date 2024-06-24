import { of } from "rxjs";
import { DiffProtocolWithBaseExtractor } from "@sb/diff-protocol";
import { EPostfix } from "@sb/sdk";
import { type IWithFeed } from "../../FeedState";
import { feedResetLineReadyAction } from "../../FeedActions";

class KironFeedDiffProtocol extends DiffProtocolWithBaseExtractor<IWithFeed> {
  protected hasInitSnapshot() {
    return false;
  }

  protected getCurrentVersion() {
    return 0;
  }

  protected override preRetry() {
    return of(feedResetLineReadyAction(EPostfix.kiron));
  }
}

export { KironFeedDiffProtocol };
