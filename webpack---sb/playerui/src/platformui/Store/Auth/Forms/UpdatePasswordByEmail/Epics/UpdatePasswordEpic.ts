import { mountUnmountFormEpicFactory } from "@sb/form-new";
import { withParams } from "@sb/utils";
import { EAuthModal } from "../../../../../../common/Store/Modal/Model/EModal";
import { isAuthModalByTypeSelector } from "../../../../../../common/Store/Modal/Selectors/IsAuthModalByTypeSelector";
import { type TPlatformAppState } from "../../../../PlatformInitialState";
import { UPDATE_PASSWORD_FORM_NAME } from "../Model";
import { UPDATE_PASSWORD_FORM_CONFIG } from "../UpdatePasswordFormConfig";

const updatePasswordFormEpic = mountUnmountFormEpicFactory<TPlatformAppState>(
  withParams(isAuthModalByTypeSelector, EAuthModal.updatePassword),
  UPDATE_PASSWORD_FORM_NAME,
  UPDATE_PASSWORD_FORM_CONFIG,
);

export { updatePasswordFormEpic };
