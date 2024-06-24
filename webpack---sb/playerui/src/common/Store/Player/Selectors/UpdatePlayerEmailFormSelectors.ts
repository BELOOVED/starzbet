import { createMemoSelector, createSimpleSelector, type TSelector, withParams } from "@sb/utils";
import { selectFormValue } from "@sb/form-new";
import type { TCallPayload } from "@sb/sdk";
import { type call_UpdateEmailCommand } from "@sb/sdk/SDKClient/platformplayer";
import { callManagerStartedSelector, callManagerSucceededSelector } from "@sb/call-manager";
import { type TPlatformAppState } from "../../../../platformui/Store/PlatformInitialState";
import { modalSelector } from "../../Modal/Selectors/ModalSelectors";
import { EModal } from "../../Modal/Model/EModal";
import { UPDATE_PLAYER_EMAIL_FORM_NAME, UPDATE_PLAYER_EMAIL_REQUEST_LOADING_SYMBOL } from "../PlayerVariables";
import { type IUpdatePlayerEmailForm } from "../Model/IUpdatePlayerEmailForm";
import { emailFromTokenSelector } from "./VerificationTokensSelectors";

const updatePlayerEmailFormCallPayloadSelector = createSimpleSelector(
  [withParams(selectFormValue<IUpdatePlayerEmailForm>, UPDATE_PLAYER_EMAIL_FORM_NAME)],
  (formValues): TCallPayload<typeof call_UpdateEmailCommand> => formValues,
);

const updatePlayerEmailFormInitialValuesSelector = createMemoSelector(
  [emailFromTokenSelector],
  (email) => ({ email, password: null }),
);

const updatePlayerEmailFormShouldRenderSelector: TSelector<TPlatformAppState, boolean> = createSimpleSelector(
  [modalSelector],
  (modals) => modals[EModal.updateEmail] !== undefined,
);

const updatePlayerEmailRequestLoadingSelector = createSimpleSelector(
  [
    callManagerStartedSelector.with.symbol(UPDATE_PLAYER_EMAIL_REQUEST_LOADING_SYMBOL),
    callManagerSucceededSelector.with.symbol(UPDATE_PLAYER_EMAIL_REQUEST_LOADING_SYMBOL),

  ],
  (started, succeeded) => started && !succeeded,
);

export {
  updatePlayerEmailFormCallPayloadSelector,
  updatePlayerEmailFormInitialValuesSelector,
  updatePlayerEmailFormShouldRenderSelector,
  updatePlayerEmailRequestLoadingSelector,
};
