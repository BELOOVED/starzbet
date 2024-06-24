import type { TPlatform_SelfPlayerDevices_Fragment } from "@sb/graphql-client/PlayerUI";
import { type ITokenDto } from "@sb/sdk/authprofile/service/TokenDto";
import type { TDeviceVerificationStrategyType } from "@sb/sdk/authprofile/model/authprofile/DeviceVerificationStrategyType";
import { type TLoginPlayerResponseDevice } from "../../../common/Store/Player/Model/TLoginPlayerResponse";

const startVerifyDeviceAction = (device: TLoginPlayerResponseDevice) => ({
  type: "@PLATFORM/START_VERIFY_DEVICE",
  payload: { device },
});

const removeDeviceTokenAction = () => ({
  type: "@PLATFORM/REMOVE_DEVICE_TOKEN",
});

const resendVerifyCodeAction = (type?: TDeviceVerificationStrategyType) => ({
  type: "@PLATFORM/RESEND_DEVICE_TOKEN",
  payload: { type },
});

const verifyDeviceInfoModalClosedAction = () => ({
  type: "@PLATFORM/VERIFY_DEVICE_INFO_MODAL_CLOSE",
});

const loginAfterVerifyDeviceAction = () => ({
  type: "@PLATFORM/LOGIN_AFTER_VERIFY_DEVICE",
});

const receiveTokenAfterVerifyDeviceAction = (payload: ITokenDto) => ({
  type: "@PLATFORM/RECEIVE_TOKEN_AFTER_VERIFY_DEVICE",
  payload,
});

const playerDevicesReceivedAction = (payload: TPlatform_SelfPlayerDevices_Fragment[]) => ({
  type: "@PLATFORM/USER_DEVICES_RECEIVED",
  payload,
});

const unlockResendVerifyCodeAction = () => ({
  type: "@PLATFORM/UNLOCK_RESEND_VERIFY_DEVICE",
});

const lockResendVerifyCodeAction = () => ({
  type: "@PLATFORM/LOCK_RESEND_VERIFY_DEVICE",
});

const removeDeviceAction = (id: string) => ({
  type: "@PLATFORM/REMOVE_DEVICES",
  payload: { id },
});

const loadUserDevicesAction = () => ({
  type: "@PLATFORM/LOAD_USER_DEVICES",
});

export {
  startVerifyDeviceAction,
  removeDeviceTokenAction,
  resendVerifyCodeAction,
  verifyDeviceInfoModalClosedAction,
  loginAfterVerifyDeviceAction,
  playerDevicesReceivedAction,
  unlockResendVerifyCodeAction,
  lockResendVerifyCodeAction,
  removeDeviceAction,
  loadUserDevicesAction,
  receiveTokenAfterVerifyDeviceAction,
};
