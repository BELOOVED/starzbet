import { mountUnmountFormEpicFactory } from "@sb/form-new";
import { verifyPhoneModalSelector } from "../../../../common/Store/Player/Selectors/PlayerSelectors";
import { type TPlatformAppState } from "../../PlatformInitialState";
import { VERIFY_CODE_FORM_NAME } from "../Model";
import { VERIFY_CODE_FORM_CONFIG } from "../VerifyCodeFormConfig";

const verifyCodeFormEpic = mountUnmountFormEpicFactory<TPlatformAppState>(
  verifyPhoneModalSelector,
  VERIFY_CODE_FORM_NAME,
  VERIFY_CODE_FORM_CONFIG,
);
export { verifyCodeFormEpic };
