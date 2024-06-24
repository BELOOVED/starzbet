import { EMPTY, switchMap } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { isCreator } from "@sb/utils";
import { Logger } from "../../../../common/Utils/Logger";
import { modalOpenAction } from "../../../../common/Store/Modal/ModalActions";
import { EModal } from "../../../../common/Store/Modal/Model/EModal";
import { callWithAbort } from "../../../../common/Utils/EpicUtils/CallWithAbort";
import { type TPlatformEpic } from "../../Root/Epic/TPlatformEpic";
import { removeDeviceAction } from "../VerifyDeviceActions";

const removeDeviceEpic: TPlatformEpic = (action$, _, dependencies) => action$.pipe(
  isCreator(removeDeviceAction),
  switchMap(
    ({ payload: { id } }) =>
      callWithAbort(dependencies.platformHttpApi.callRemoveDevice, { deviceId: id }).pipe(
        map(() => modalOpenAction(EModal.removeDevice)),
        catchError((e) => {
          Logger.error.rpc("Remove Device Error:", e);

          return EMPTY;
        }),
      ),
  ),
);

export { removeDeviceEpic };
