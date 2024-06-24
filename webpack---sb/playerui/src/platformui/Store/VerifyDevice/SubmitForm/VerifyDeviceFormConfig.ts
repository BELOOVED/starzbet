import { createForm, form, submittingExtension, validationExtension } from "@sb/form-new";
import { type TPlatformAppState } from "../../PlatformInitialState";
import { verifyDeviceSubmitEpic } from "../Epics/VerifyDeviceSubmitEpic";
import { VERIFY_DEVICES_FORM_FIELDS } from "./Model";

const VERIFY_DEVICE_FORM_CONFIG = createForm<TPlatformAppState>({
  extensions: [validationExtension, submittingExtension],
  form: form({
    fields: VERIFY_DEVICES_FORM_FIELDS,
  }),
  epics: [verifyDeviceSubmitEpic],
});

export { VERIFY_DEVICE_FORM_CONFIG };
