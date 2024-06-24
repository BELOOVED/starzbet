import { createForm, form, submittingExtension, validationExtension } from "@sb/form-new";
import { type TPlatformAppState } from "../../../PlatformInitialState";
import { LOGIN_FORM_FIELDS } from "./Model";
import { lockForTimeEpic, loginSubmitEpic } from "./Epics/LoginSubmitEpic";

const LOGIN_FORM_CONFIG = createForm<TPlatformAppState>({
  extensions: [validationExtension, submittingExtension],
  form: form({
    fields: LOGIN_FORM_FIELDS,
  }),
  epics: [loginSubmitEpic, lockForTimeEpic],
});

export { LOGIN_FORM_CONFIG };
