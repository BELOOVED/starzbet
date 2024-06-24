import { callManagerStartedSelector, createCallManagerSymbol } from "@sb/call-manager";
import { createSimpleSelector, getNotNil } from "@sb/utils";
import { type TDeviceVerificationStrategyType } from "@sb/sdk/authprofile/model/authprofile/DeviceVerificationStrategyType";
import { getDeviceIdSelector } from "@sb/auth";
import { type IWithVerifyDevice } from "./VerifyDeviceInitialState";

const verifyTokenSelector = ({ tokenDto }: IWithVerifyDevice) => getNotNil(tokenDto, ["VerifyDeviceSelector"], "tokenDto");

const notNilDeviceSelector = ({ device }: IWithVerifyDevice) => getNotNil(device, ["VerifyDeviceSelector"], "notNilDeviceSelector");

const deviceIdSelector = (state: IWithVerifyDevice) => notNilDeviceSelector(state).id;

const verificationStrategySelector = (state: IWithVerifyDevice) => notNilDeviceSelector(state).verificationStrategy;

const tokenReceiverSelector = (state: IWithVerifyDevice) => {
  const strategy = verificationStrategySelector(state);

  return "maskedReceiver" in strategy ? strategy.maskedReceiver : undefined;
};

const verifyDeviceStrategyTypeSelector = (state: IWithVerifyDevice) => verificationStrategySelector(state).type;

const selectOptionsSelector = (state: IWithVerifyDevice) => verificationStrategySelector(state).selectOptions;

const resendSelectOptionsSelector = createSimpleSelector(
  [
    selectOptionsSelector,
    verifyDeviceStrategyTypeSelector,
  ],
  (options, type): TDeviceVerificationStrategyType[] => {
    if (type === "SELECTIVE") {
      return ["EMAIL", "PHONE"];
    }

    if (options.includes(type)) {
      return options;
    }

    return [...options, type];
  },
);

const isSelectiveStrategySelector = (state: IWithVerifyDevice) => verifyDeviceStrategyTypeSelector(state) === "SELECTIVE";

const hasVerifyDeviceSelector = ({ device }: IWithVerifyDevice) => !!device;

const playerDevicesSelector = ({ devices }: IWithVerifyDevice) => devices;

const currentDeviceSelector = createSimpleSelector(
  [playerDevicesSelector, getDeviceIdSelector],
  (devices, currentDeviceId) => {
    if (!devices) {
      return null;
    }

    return devices.find((el) => el.id === currentDeviceId);
  },
);

const isAvailableResendSelector = ({ isAvailableResend }: IWithVerifyDevice) => isAvailableResend;

const USER_DEVICES_LOADING_SYMBOL = createCallManagerSymbol("USER_DEVICES_LOADING_SYMBOL");
const playerDevicesLoadingSelector = callManagerStartedSelector.with.symbol(USER_DEVICES_LOADING_SYMBOL);

export {
  verifyTokenSelector,
  deviceIdSelector,
  tokenReceiverSelector,
  hasVerifyDeviceSelector,
  USER_DEVICES_LOADING_SYMBOL,
  playerDevicesSelector,
  playerDevicesLoadingSelector,
  isAvailableResendSelector,
  isSelectiveStrategySelector,
  resendSelectOptionsSelector,
  currentDeviceSelector,
};
