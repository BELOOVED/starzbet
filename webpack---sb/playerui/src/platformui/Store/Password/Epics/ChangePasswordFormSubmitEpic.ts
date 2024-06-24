import { merge, of } from "rxjs";
import { call_ChangePasswordCommand } from "@sb/sdk/SDKClient/platformplayer";
import { resetFormAction } from "@sb/form-new";
import { modalOpenAction } from "../../../../common/Store/Modal/ModalActions";
import { EModal } from "../../../../common/Store/Modal/Model/EModal";
import { formSubmitEpicFactory } from "../../../Utils/FormSubmitEpicFactory";
import { CHANGE_PASSWORD_FORM_NAME } from "../PasswordVariables";
import { changePasswordFormSubmitPayloadSelector } from "../Selectors/ChangePasswordFormSelectors";

const changePasswordFormSubmitEpic = formSubmitEpicFactory({
  formName: CHANGE_PASSWORD_FORM_NAME,
  callPair: [call_ChangePasswordCommand, changePasswordFormSubmitPayloadSelector],
  onSuccess: () => () => merge(
    of(modalOpenAction(EModal.changePasswordFormSuccess)),
    of(resetFormAction(CHANGE_PASSWORD_FORM_NAME)),
  ),
  onError: (error) => () => merge(
    of(modalOpenAction(EModal.changePasswordFormError, error)),
    of(resetFormAction(CHANGE_PASSWORD_FORM_NAME)),
  ),
});

export { changePasswordFormSubmitEpic };
