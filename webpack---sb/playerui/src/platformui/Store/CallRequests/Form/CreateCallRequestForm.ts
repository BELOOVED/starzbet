import type { ActionCreator } from "redux";
import {
  createForm,
  disableExtension,
  dropField,
  every,
  field,
  form,
  formMountedAction,
  type IFormAction,
  isFormFieldPath,
  isFormName,
  KindService,
  objectField,
  onAction,
  oneOf,
  runFormFieldsDisableCheck,
  selectFieldValue,
  setFieldValue,
  setFieldValueAction,
  submittingExtension,
  type TFieldDefs,
  validationExtension,
  validationRules,
  whenIs,
  withDisableCheck,
  withValidation,
} from "@sb/form-new";
import { ECallOptionName } from "@sb/betting-core/ECallOptionName";
import { phoneValueToString } from "../../../../common/Utils/PhoneValueToString";
import { type TPhoneValue } from "../../../../common/Model/TPhoneValue";
import { getDefaultPhoneCode } from "../../../../common/Utils/GetDefaultPhoneCode";
import { formPhoneNumberValidation, formRequiredValidation } from "../../Form/Utils/FormValidations";
import type { TPlatformAppState } from "../../PlatformInitialState";
import { formResetDecorator } from "../../Form/Utils/FormResetDecorator";
import type { TCreateCallRequestForm } from "../CallRequestVariables";
import {
  CREATE_CALL_REQUEST_FORM_CALL_OPTION_NAME_FIELD_PATH,
  CREATE_CALL_REQUEST_FORM_CONTACT_INFO_FIELD_PATH,
  CREATE_CALL_REQUEST_FORM_DEPARTMENT_FIELD_PATH,
  CREATE_CALL_REQUEST_FORM_NAME,
  CREATE_CALL_REQUEST_FORM_SLOT_DATE_FIELD_PATH,
  CREATE_CALL_REQUEST_FORM_SLOT_ID_FIELD_PATH,
} from "../CallRequestVariables";
import {
  createCallRequestFormCallOptionNameFieldSelector,
  createCallRequestFormInitialValuesSelector,
} from "../Selectors/CreateCallRequestFormSelectors";
import { createCallRequestFormSubmitEpic } from "../Epics/CreateCallRequestFormSubmitEpic";

const CREATE_CALL_REQUEST_FORM_FIELDS: TFieldDefs<keyof TCreateCallRequestForm> = {
  slotDate: field({ extensions: withValidation(validationRules.required()) }),
  department: field({
    extensions: {
      ...withValidation(formRequiredValidation()),
      ...withDisableCheck((state, formName) => !selectFieldValue(state, formName, CREATE_CALL_REQUEST_FORM_SLOT_DATE_FIELD_PATH)),
    },
  }),
  slotId: field({
    extensions: {
      ...withValidation(formRequiredValidation()),
      ...withDisableCheck((state, formName) => !selectFieldValue(state, formName, CREATE_CALL_REQUEST_FORM_DEPARTMENT_FIELD_PATH)),
    },
  }),
  callOptionName: field({
    extensions: {
      ...withValidation(formRequiredValidation()),
    },
  }),
  contactInfo: oneOf({
    fields: {
      username: field({
        extensions: {
          ...withValidation(formRequiredValidation()),
        },
      }),
      phoneNumber: objectField({
        extensions: {
          ...withValidation<TPhoneValue>(
            formRequiredValidation<TPhoneValue>(),
            (value, fieldPath, formName, state) => formPhoneNumberValidation()(phoneValueToString(value), fieldPath, formName, state),
          ),
        },
      }),
    },
    resolver: (value, fieldPath, formName, state) => {
      const callOption = createCallRequestFormCallOptionNameFieldSelector(state);

      return callOption === ECallOptionName.MOBILE ? "phoneNumber" : "username";
    },
  }),
  description: field(({
    extensions: {
      ...withValidation(formRequiredValidation()),
    },
  })),
};

const dropAllNestedFieldsWhenSlotDateChangedDecorator = onAction<ActionCreator<IFormAction>, TPlatformAppState>(
  setFieldValueAction,
  whenIs(
    every(
      isFormName(CREATE_CALL_REQUEST_FORM_NAME),
      isFormFieldPath(CREATE_CALL_REQUEST_FORM_SLOT_DATE_FIELD_PATH),
    ),
    (state, action, next) => {
      let nextState = next(state, action);

      nextState = dropField(nextState, CREATE_CALL_REQUEST_FORM_DEPARTMENT_FIELD_PATH, CREATE_CALL_REQUEST_FORM_NAME);
      nextState = dropField(nextState, CREATE_CALL_REQUEST_FORM_SLOT_ID_FIELD_PATH, CREATE_CALL_REQUEST_FORM_NAME);

      nextState = runFormFieldsDisableCheck(nextState, CREATE_CALL_REQUEST_FORM_NAME);

      return nextState;
    },
  ),
);

const dropAllNestedFieldsWhenDepartmentChangedDecorator = onAction<ActionCreator<IFormAction>, TPlatformAppState>(
  setFieldValueAction,
  whenIs(
    every(
      isFormName(CREATE_CALL_REQUEST_FORM_NAME),
      isFormFieldPath(CREATE_CALL_REQUEST_FORM_DEPARTMENT_FIELD_PATH),
    ),
    (state, action, next) => {
      let nextState = next(state, action);

      nextState = dropField(nextState, CREATE_CALL_REQUEST_FORM_SLOT_ID_FIELD_PATH, CREATE_CALL_REQUEST_FORM_NAME);

      nextState = runFormFieldsDisableCheck(nextState, CREATE_CALL_REQUEST_FORM_NAME);

      return nextState;
    },
  ),
);

const dropAllNestedFieldsWhenCallOptionNameChangedDecorator = onAction<ActionCreator<IFormAction>, TPlatformAppState>(
  setFieldValueAction,
  whenIs(
    every(
      isFormName(CREATE_CALL_REQUEST_FORM_NAME),
      isFormFieldPath(CREATE_CALL_REQUEST_FORM_CALL_OPTION_NAME_FIELD_PATH),
    ),
    (state, action, next) => {
      let nextState = next(state, action);

      nextState = dropField(nextState, CREATE_CALL_REQUEST_FORM_CONTACT_INFO_FIELD_PATH, CREATE_CALL_REQUEST_FORM_NAME);

      return nextState;
    },
  ),
);

const setContactInfoFieldValue = (nextState: TPlatformAppState) => setFieldValue(
  nextState,
  KindService.addKindToLast(CREATE_CALL_REQUEST_FORM_CONTACT_INFO_FIELD_PATH, "phoneNumber"),
  { code: getDefaultPhoneCode(), value: "" },
  CREATE_CALL_REQUEST_FORM_NAME,
);

//todo remove after form-new fixed
const setInitialValueDecorator = onAction<ActionCreator<IFormAction>, TPlatformAppState>(
  formMountedAction,
  (state, action, next) => {
    let nextState = next(state, action);

    const callOptionName = createCallRequestFormCallOptionNameFieldSelector(state);

    nextState = callOptionName === ECallOptionName.MOBILE ? setContactInfoFieldValue(nextState) : nextState;

    return nextState;
  },
);

const CREATE_CALL_REQUEST_FORM_DECORATORS = [
  dropAllNestedFieldsWhenSlotDateChangedDecorator,
  dropAllNestedFieldsWhenDepartmentChangedDecorator,
  dropAllNestedFieldsWhenCallOptionNameChangedDecorator,
  setInitialValueDecorator,
  formResetDecorator(CREATE_CALL_REQUEST_FORM_NAME, createCallRequestFormInitialValuesSelector),
];

const CREATE_CALL_REQUEST_FORM_CONFIG = createForm<TPlatformAppState>({
  extensions: [validationExtension, disableExtension, submittingExtension],
  form: form({ fields: CREATE_CALL_REQUEST_FORM_FIELDS }),
  decorators: CREATE_CALL_REQUEST_FORM_DECORATORS,
  epics: [createCallRequestFormSubmitEpic],
});

export {
  CREATE_CALL_REQUEST_FORM_CONFIG,
};
