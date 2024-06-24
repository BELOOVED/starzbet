import { ETabStatus, TabsManager } from "@sb/tabs-manager";
import { IS_SERVER } from "@sb/utils";

enum ERefreshStatus {
  started = "started",
  failed = "failed",
}

interface IRefreshMessage {
  type: string;
  payload: {
    status: ERefreshStatus;
  };
}

class StubTabsManager {
  status = ETabStatus.leader;

  constructor() {
  }

  addEventListener() {
  }

  removeEventListener() {
  }

  postMessage() {
  }
}

const authTabsManager = (
  IS_SERVER
    ? new StubTabsManager()
    : new TabsManager<IRefreshMessage>("auth", false)
) as TabsManager<IRefreshMessage>;

export { authTabsManager, ERefreshStatus, type IRefreshMessage };
