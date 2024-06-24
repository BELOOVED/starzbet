import { EMPTY, iif, merge, of, switchMap } from "rxjs";
import { isCreator } from "@sb/utils";
import { modalCloseAction } from "../../../../common/Store/Modal/ModalActions";
import { EModal } from "../../../../common/Store/Modal/Model/EModal";
import { pushLocalized } from "../../../../common/Client/Core/Services/RouterService/Utils/LocationChangeLocalized";
import { isMobileSelector } from "../../../../common/Store/DeviceInfo/DeviceInfoSelectors";
import { routeMap } from "../../../RouteMap/RouteMap";
import { type TPlatformEpic } from "../../Root/Epic/TPlatformEpic";
import { localeSelector } from "../../Locale/Selectors/localeSelector";
import { removeDeviceTokenAction, verifyDeviceInfoModalClosedAction } from "../VerifyDeviceActions";

const abortVerifyDeviceEpic: TPlatformEpic = (action$, state$) => action$.pipe(
  isCreator(verifyDeviceInfoModalClosedAction),
  switchMap(() => merge(
    of(removeDeviceTokenAction()),
    of(modalCloseAction(EModal.verifyDevice)),
    iif(
      () => isMobileSelector(state$.value),
      of(pushLocalized(localeSelector(state$.value), routeMap.root)),
      EMPTY,
    ),
  )),
);

export { abortVerifyDeviceEpic };
