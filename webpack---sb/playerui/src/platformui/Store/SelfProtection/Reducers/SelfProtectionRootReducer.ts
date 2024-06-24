import { createRootReducer } from "@sb/utils";
import { removedTokenAction } from "../../Auth/AuthActions";
import { realityChecksTimeExpiredAction, selfProtectionReceivedAction, setRealityChecksTimerAction } from "../SelfProtectionActions";
import { selfProtectionReceivedReducer } from "./SelfProtectionReceivedReducer";
import { changeRealityCheckExpiredReducer } from "./ChangeRealityCheckExpiredReducer";

const selfProtectionRootReducer = createRootReducer([
  [selfProtectionReceivedReducer, selfProtectionReceivedAction],
  [changeRealityCheckExpiredReducer(false), setRealityChecksTimerAction],
  [changeRealityCheckExpiredReducer(false), removedTokenAction],
  [changeRealityCheckExpiredReducer(true), realityChecksTimeExpiredAction],
]);

export { selfProtectionRootReducer };
