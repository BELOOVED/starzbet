import { ETabStatus } from "@sb/tabs-manager";
import { authTabsManager } from "../Store/AuthTabsManager";

const isLeaderTab = () => authTabsManager.status == ETabStatus.leader;

export { isLeaderTab };
