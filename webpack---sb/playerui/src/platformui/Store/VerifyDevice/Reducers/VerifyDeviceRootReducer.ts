import { createRootReducer } from "@sb/utils";
import {
  lockResendVerifyCodeAction,
  playerDevicesReceivedAction,
  receiveTokenAfterVerifyDeviceAction,
  removeDeviceTokenAction,
  startVerifyDeviceAction,
  unlockResendVerifyCodeAction,
} from "../VerifyDeviceActions";
import { startVerifyDeviceReducer } from "./StartVerifyDeviceReducer";
import { removeDeviceTokenReducer } from "./RemoveDeviceTokenReducer";
import { receivedPlayerDeviceReducer } from "./ReceivedPlayerDeviceReducer";
import { unlockResendVerifyCodeReducer } from "./UnlockResendVerifyCodeReducer";
import { lockResendVerifyCodeReducer } from "./LockResendVerifyCodeReducer";
import { receiveTokenAfterVerifyDeviceReducer } from "./ReceiveTokenAfterVerifyDeviceReducer";

const verifyDeviceRootReducer = createRootReducer([
  [startVerifyDeviceReducer, startVerifyDeviceAction],
  [removeDeviceTokenReducer, removeDeviceTokenAction],
  [receivedPlayerDeviceReducer, playerDevicesReceivedAction],
  [unlockResendVerifyCodeReducer, unlockResendVerifyCodeAction],
  [lockResendVerifyCodeReducer, lockResendVerifyCodeAction],
  [receiveTokenAfterVerifyDeviceReducer, receiveTokenAfterVerifyDeviceAction],
]);

export { verifyDeviceRootReducer };
