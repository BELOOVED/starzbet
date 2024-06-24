import type { TPlatform_SelfPlayerDevices_Fragment } from "@sb/graphql-client/PlayerUI";
import { type ITokenDto } from "@sb/sdk/authprofile/service/TokenDto";
import { type TLoginPlayerResponseDevice } from "../../../common/Store/Player/Model/TLoginPlayerResponse";

interface IWithVerifyDevice {
  device: TLoginPlayerResponseDevice | null;
  devices: TPlatform_SelfPlayerDevices_Fragment[] | null;
  tokenDto: ITokenDto | null;
  isAvailableResend: boolean;
}

const verifyDeviceInitialState: IWithVerifyDevice = {
  device: null,
  devices: null,
  isAvailableResend: false,
  tokenDto: null,
};

export { verifyDeviceInitialState };
export type { IWithVerifyDevice };
