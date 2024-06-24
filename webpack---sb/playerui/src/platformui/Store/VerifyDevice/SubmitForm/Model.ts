import { createFormFieldPaths, field, type TFieldDefs, withValidation } from "@sb/form-new";
import { isNil } from "@sb/utils";
import { platformui_deviceCode_checkInput_warn_length } from "@sb/translates/platformui/CommonTKeys";
import { FORM_STRING_SIZE_VALIDATION, formRequiredValidation } from "../../Form/Utils/FormValidations";

type TWithVerifyCode = {
  verifyCode: string;
}

const VERIFY_DEVICE_FORM_NAME = "verifyDevice";

const VERIFY_DEVICES_FORM_FIELDS: TFieldDefs<keyof TWithVerifyCode> = {
  verifyCode: field({
    extensions: withValidation(formRequiredValidation(), FORM_STRING_SIZE_VALIDATION(platformui_deviceCode_checkInput_warn_length, 4)),
  }),
};

const VERIFY_DEVICES_FORM_PATH = createFormFieldPaths(VERIFY_DEVICES_FORM_FIELDS);

const verifyDeviceValueConverter = (val: string | null | undefined) => isNil(val) ? "" : val;

export type { TWithVerifyCode };
export {
  VERIFY_DEVICES_FORM_FIELDS,
  VERIFY_DEVICES_FORM_PATH,
  VERIFY_DEVICE_FORM_NAME,
  verifyDeviceValueConverter,
};
