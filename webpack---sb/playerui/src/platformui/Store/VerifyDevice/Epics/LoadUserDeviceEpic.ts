import { switchMap } from "rxjs";
import {
  platformSelfPlayerDevicesQueryOptionalFields,
  query_Platform_SelfPlayerDevices,
} from "@sb/graphql-client/PlayerUI";
import { isCreator } from "@sb/utils";
import { gqlLoadingFactory } from "../../../../common/Utils/EpicUtils/GqlLoadingFactory";
import { type TPlatformEpic } from "../../Root/Epic/TPlatformEpic";
import { USER_DEVICES_LOADING_SYMBOL } from "../VerifyDeviceSelectors";
import { loadUserDevicesAction, playerDevicesReceivedAction } from "../VerifyDeviceActions";

const loadUserDeviceEpic: TPlatformEpic = gqlLoadingFactory(
  USER_DEVICES_LOADING_SYMBOL,
  query_Platform_SelfPlayerDevices,
  () => ({
    optionalFields: platformSelfPlayerDevicesQueryOptionalFields,
    variables: {},
  }),
  playerDevicesReceivedAction,
  ({ platform: { SelfPlayerDevices } }) => [SelfPlayerDevices],
);

const updateUserDevicesEpic: TPlatformEpic = (action$, state$, dependencies) => action$.pipe(
  isCreator(loadUserDevicesAction),
  switchMap(() => loadUserDeviceEpic(action$, state$, dependencies)),
);

export { loadUserDeviceEpic, updateUserDevicesEpic };
