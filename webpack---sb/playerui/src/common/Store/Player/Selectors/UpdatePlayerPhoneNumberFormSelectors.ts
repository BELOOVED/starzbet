import { createMemoSelector, createSimpleSelector, EAlpha3Code, isNil, type TSelector, withParams } from "@sb/utils";
import { selectFormValue } from "@sb/form-new";
import type { TCallPayload } from "@sb/sdk";
import { type call_UpdatePhoneCommand } from "@sb/sdk/SDKClient/platformplayer";
import { DEFAULT_PHONE_CODES, isAlpha2Code, parsePhoneNumber } from "@sb/phone-number";
import { alpha2CodeToAlpha3CodeMap } from "@sb/utils/Alpha2CodeToAlpha3CodeMap";
import { callManagerStartedSelector, callManagerSucceededSelector } from "@sb/call-manager";
import { type TPlatformAppState } from "../../../../platformui/Store/PlatformInitialState";
import { phoneValueToString } from "../../../Utils/PhoneValueToString";
import { getDefaultPhoneCode } from "../../../Utils/GetDefaultPhoneCode";
import { modalSelector } from "../../Modal/Selectors/ModalSelectors";
import { EModal } from "../../Modal/Model/EModal";
import { UPDATE_PLAYER_PHONE_NUMBER_FORM_NAME, UPDATE_PLAYER_PHONE_NUMBER_REQUEST_LOADING_SYMBOL } from "../PlayerVariables";
import { type IUpdatePlayerPhoneNumberForm } from "../Model/IUpdatePlayerPhoneNumberForm";
import { playerPhoneNumberSelector } from "./VerificationTokensSelectors";

const updatePlayerPhoneNumberFormCallPayloadSelector = createSimpleSelector(
  [withParams(selectFormValue<IUpdatePlayerPhoneNumberForm>, UPDATE_PLAYER_PHONE_NUMBER_FORM_NAME)],
  ({ phoneNumber, password, verificationCode }): TCallPayload<typeof call_UpdatePhoneCommand> => ({
    phoneNumber: phoneValueToString(phoneNumber),
    password,
    verificationCode,
  }),
);

const FALLBACK_PHONE_NUMBER = {
  number: "",
  code: getDefaultPhoneCode(),
};

const updatePlayerPhoneNumberFormInitialValuesSelector = createMemoSelector(
  [playerPhoneNumberSelector],
  (phoneNumber) => {
    if (phoneNumber === undefined) {
      return {
        phoneNumber: FALLBACK_PHONE_NUMBER,
        password: null,
      };
    }

    const parsed = parsePhoneNumber(phoneNumber);

    if (isNil(parsed)) {
      return {
        phoneNumber: FALLBACK_PHONE_NUMBER,
        password: null,
      };
    }

    const { countryCallingCode, country, nationalNumber } = parsed;

    const alpha3 = country && isAlpha2Code(country) ? alpha2CodeToAlpha3CodeMap[country] : EAlpha3Code.TUR;

    return {
      phoneNumber: {
        code: (DEFAULT_PHONE_CODES as Partial<Record<EAlpha3Code, string>>)[alpha3] ?? countryCallingCode,
        number: nationalNumber,
      },
      password: null,
    };
  },
);

const updatePlayerPhoneNumberFormShouldRenderSelector: TSelector<TPlatformAppState, boolean> = createSimpleSelector(
  [modalSelector],
  (modals) => modals[EModal.updatePhoneNumber] !== undefined,
);

const updatePlayerPhoneNumberRequestLoadingSelector = createSimpleSelector(
  [
    callManagerStartedSelector.with.symbol(UPDATE_PLAYER_PHONE_NUMBER_REQUEST_LOADING_SYMBOL),
    callManagerSucceededSelector.with.symbol(UPDATE_PLAYER_PHONE_NUMBER_REQUEST_LOADING_SYMBOL),

  ],
  (started, succeeded) => started && !succeeded,
);

export {
  updatePlayerPhoneNumberFormCallPayloadSelector,
  updatePlayerPhoneNumberFormInitialValuesSelector,
  updatePlayerPhoneNumberFormShouldRenderSelector,
  updatePlayerPhoneNumberRequestLoadingSelector,
};
