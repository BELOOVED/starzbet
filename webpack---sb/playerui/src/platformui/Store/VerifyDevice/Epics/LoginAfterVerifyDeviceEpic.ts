import { merge, of, switchMap } from "rxjs";
import { isCreator } from "@sb/utils";
import { authorizedAction } from "@sb/auth";
import { loadPlayerAllEpic } from "../../../../common/Store/Player/Epics/LoadPlayerAllEpic";
import { modalCloseAction } from "../../../../common/Store/Modal/ModalActions";
import { EModal } from "../../../../common/Store/Modal/Model/EModal";
import { type TPlatformEpic } from "../../Root/Epic/TPlatformEpic";
import { loginAfterVerifyDeviceAction, removeDeviceTokenAction } from "../VerifyDeviceActions";
import { verifyTokenSelector } from "../VerifyDeviceSelectors";

const loginAfterVerifyDeviceEpic: TPlatformEpic = (action$, state$, deps) => action$.pipe(
  isCreator(loginAfterVerifyDeviceAction),
  switchMap(() => {
    const token = verifyTokenSelector(state$.value);

    return merge(
      of(authorizedAction(token)),
      of(removeDeviceTokenAction()),
      of(modalCloseAction(EModal.verifyDevice)),
      loadPlayerAllEpic(action$, state$, deps),
    );
  }),
);

export { loginAfterVerifyDeviceEpic };
