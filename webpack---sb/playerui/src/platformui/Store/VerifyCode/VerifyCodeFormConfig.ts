import { createForm, form, submittingExtension, validationExtension } from "@sb/form-new";
import { type TPlatformAppState } from "../PlatformInitialState";
import { VERIFY_CODE_FORM_FIELDS } from "./Model";
import { verifyCodeSubmitEpic } from "./Epics/VerifyCodeSubmitEpic";

const VERIFY_CODE_FORM_CONFIG = createForm<TPlatformAppState>({
  extensions: [validationExtension, submittingExtension],
  form: form({
    fields: VERIFY_CODE_FORM_FIELDS,
  }),
  epics: [verifyCodeSubmitEpic],
});

export { VERIFY_CODE_FORM_CONFIG };
