import { selectFormValue } from "@sb/form-new";
import { getLocalStorage } from "../../../../../../common/Store/LocalStorage/localStorageKeys";
import { callWithAbort } from "../../../../../../common/Utils/EpicUtils/CallWithAbort";
import { platformLocalStorageKeys } from "../../../../../../common/Store/LocalStorage/PlatformLocalStorageKeys";
import { formSubmitEpicFactory } from "../../../../../Utils/FormSubmitEpicFactory";
import { type TPlatformAppState } from "../../../../PlatformInitialState";
import { type IDepsWithPlatformHttpApi } from "../../../../Root/Epic/TPlatformEpic";
import { type TWithPassword, UPDATE_PASSWORD_FORM_NAME } from "../Model";

const createCall = (state: TPlatformAppState, deps: IDepsWithPlatformHttpApi) => {
  const { newPassword } = selectFormValue<TWithPassword>(state, UPDATE_PASSWORD_FORM_NAME);
  const token = getLocalStorage(platformLocalStorageKeys.passwordRecoveryToken);

  return callWithAbort(deps.platformHttpApi.callPlatformUpdatePasswordByEmail, { newPassword, token });
};

const updatePasswordSubmitEpic = formSubmitEpicFactory({
  formName: UPDATE_PASSWORD_FORM_NAME,
  createCall,
});

export { updatePasswordSubmitEpic };
