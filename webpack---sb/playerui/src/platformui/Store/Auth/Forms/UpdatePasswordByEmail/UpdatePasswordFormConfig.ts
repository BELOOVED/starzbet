import { createForm, form, submittingExtension, validationExtension } from "@sb/form-new";
import { type TPlatformAppState } from "../../../PlatformInitialState";
import { UPDATE_PASSWORD_FORM_FIELDS } from "./Model";
import { updatePasswordSubmitEpic } from "./Epics/UpdatePasswordSubmitEpic";

const UPDATE_PASSWORD_FORM_CONFIG = createForm<TPlatformAppState>({
  extensions: [validationExtension, submittingExtension],
  form: form({
    fields: UPDATE_PASSWORD_FORM_FIELDS,
  }),
  epics: [updatePasswordSubmitEpic],
});

export { UPDATE_PASSWORD_FORM_CONFIG };
