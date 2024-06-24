import { combineEpics } from "redux-observable";
import { mountUnmountFormEpicFactory } from "@sb/form-new";
import { type TPlatformAppState } from "../../PlatformInitialState";
import { hasVerifyDeviceSelector } from "../VerifyDeviceSelectors";
import { VERIFY_DEVICE_FORM_CONFIG } from "../SubmitForm/VerifyDeviceFormConfig";
import { VERIFY_DEVICE_FORM_NAME } from "../SubmitForm/Model";
import { resendVerifyCodeEpic } from "./ResendVerifyCodeEpic";
import { abortVerifyDeviceEpic } from "./AbortVerifyDeviceEpic";
import { loginAfterVerifyDeviceEpic } from "./LoginAfterVerifyDeviceEpic";

const verifyDeviceFormEpic = mountUnmountFormEpicFactory<TPlatformAppState>(
  hasVerifyDeviceSelector,
  VERIFY_DEVICE_FORM_NAME,
  VERIFY_DEVICE_FORM_CONFIG,
);

const verifyDeviceRootEpics = combineEpics(
  resendVerifyCodeEpic,
  abortVerifyDeviceEpic,
  loginAfterVerifyDeviceEpic,
  verifyDeviceFormEpic,
);

export { verifyDeviceRootEpics };
