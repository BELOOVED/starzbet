import { from, merge, of, switchMap, throwError } from "rxjs";
import {
  createForm,
  createFormFieldPaths,
  field,
  form,
  mountFormAction,
  submittingExtension,
  type TFieldDefs,
  validationExtension,
  withValidation,
} from "@sb/form-new";
import {
  call_FixFinVevoParazulaMakeFiatDepositCommand,
  call_FixFinVevoParazulaSmsPhaseCommand,
} from "@sb/sdk/SDKClient/paymentintegration";
import { newError } from "@sb/network-bus/Utils";
import { EErrorType } from "@sb/network-bus/Model";
import { formSubmitEpicFactory } from "../../../../Utils/FormSubmitEpicFactory";
import { formRequiredValidation } from "../../../Form/Utils/FormValidations";
import { type TPlatformAppState } from "../../../PlatformInitialState";
import { assertsFixFinFiatVevoParazulaResponse } from "../../Models/FixFinFiatModel";
import { bankingFormReceiveResponseAction } from "../../BankingActions";
import { PAYMENT_ERROR_CODES_MAP } from "../../Utils/BankingFormErrorFunction";
import { getDepositFormConfig } from "../DepositFormConfig";
import { type TFixFinVevoParazulaFormModel } from "./FixFinVevoParazulaFormModel";
import {
  depositFixFinVevoParazulaCallPayloadSelector,
  depositFixFinVevoParazulaSmsCallPayloadSelector,
} from "./FixFinVevoParazulaFormSelectors";
import { FIX_FIN_VEVO_PARAZULA_SMS_FORM, FIX_FIN_VEVO_PARAZULA_SMS_FORM_FIELDS } from "./FixFInVevoParazulaSmsFormModel";

const FIX_FIN_VEVO_PARAZULA_FORM_FIELDS: TFieldDefs<keyof TFixFinVevoParazulaFormModel> = {
  accountPassword: field({ extensions: withValidation(formRequiredValidation()) }),
  playerGovId: field({ extensions: withValidation(formRequiredValidation()) }),
};

const FIX_FIN_VEVO_PARAZULA_FORM_FIELD_PATHS = createFormFieldPaths(FIX_FIN_VEVO_PARAZULA_FORM_FIELDS);

const FIX_FIN_VEVO_PARAZULA_FORM_CONFIG = getDepositFormConfig({
  fields: FIX_FIN_VEVO_PARAZULA_FORM_FIELDS,

  callPair: [call_FixFinVevoParazulaMakeFiatDepositCommand, depositFixFinVevoParazulaCallPayloadSelector],

  onSuccess: (response) => () => {
    assertsFixFinFiatVevoParazulaResponse(response, "FIX_FIN_VEVO_PARAZULA_FORM_CONFIG:onSuccess");

    return merge(
      of(mountFormAction(
        FIX_FIN_VEVO_PARAZULA_SMS_FORM,
        FIX_FIN_VEVO_PARAZULA_SMS_FORM_CONFIG,
      )),
      of(bankingFormReceiveResponseAction(response)),
    );
  },
});

/** SMS Form **/

const FIX_FIN_VEVO_PARAZULA_SMS_FORM_CONFIG = createForm<TPlatformAppState>({
  extensions: [submittingExtension, validationExtension],

  form: form({ fields: FIX_FIN_VEVO_PARAZULA_SMS_FORM_FIELDS }),

  epics: [
    formSubmitEpicFactory({
      formName: FIX_FIN_VEVO_PARAZULA_SMS_FORM,

      createCall: (state, deps) => from(
        deps.platformHttpApi._callToPlatform(
          call_FixFinVevoParazulaSmsPhaseCommand,
          depositFixFinVevoParazulaSmsCallPayloadSelector(state),
        ),
      ).pipe(
        switchMap((response) => {
          assertsFixFinFiatVevoParazulaResponse(response, "FIX_FIN_VEVO_PARAZULA_SMS_FORM_CONFIG:onSuccess");

          if (!response.info.status) {
            return throwError(() => newError(
              EErrorType.SHOWABLE,
              PAYMENT_ERROR_CODES_MAP.fix_fin_vevo_parazula_custom_error,
              response.info.message,
              undefined,
            ));
          }

          return of(response);
        }),
      ),
    }),
  ],
});

export {
  FIX_FIN_VEVO_PARAZULA_FORM_FIELD_PATHS,

  FIX_FIN_VEVO_PARAZULA_FORM_CONFIG,
};
