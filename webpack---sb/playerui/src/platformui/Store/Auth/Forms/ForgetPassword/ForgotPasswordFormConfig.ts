import { createForm, form, submittingExtension, validationExtension } from "@sb/form-new";
import { type TPlatformAppState } from "../../../PlatformInitialState";
import { FORGOT_PASSWORD_FORM_FIELDS } from "./Model";
import { forgotPasswordSubmitEpic } from "./Epics/ForgotPasswordSubmitEpic";

const FORGOT_PASSWORD_FORM_CONFIG = createForm<TPlatformAppState>({
  extensions: [validationExtension, submittingExtension],
  form: form({
    fields: FORGOT_PASSWORD_FORM_FIELDS,
  }),
  epics: [forgotPasswordSubmitEpic],
});

export { FORGOT_PASSWORD_FORM_CONFIG };
