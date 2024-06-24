import { type ActionCreator } from "redux";
import { EPlatform_AnSpacePayPixKeyType } from "@sb/graphql-client";
import {
  createFormFieldPaths,
  every,
  field,
  type IDecoratorDefinition,
  type IFormAction,
  isFormFieldPath,
  isFormName,
  onAction,
  oneOf,
  runFormFieldsDisableCheck,
  selectFieldValue,
  setFieldValue,
  setFieldValueAction,
  type TFieldDefs,
  type TResolver,
  validateFormFields,
  whenIs,
  withDisableCheck,
  withValidation,
} from "@sb/form-new";
import { always } from "@sb/utils/Always";
import { getSelectOptions } from "../../../../../common/Components/Field/SelectModel";
import {
  FORM_CPF_VALIDATION,
  formEmailValidation,
  formPhoneNumberValidation,
  formRequiredValidation,
} from "../../../Form/Utils/FormValidations";
import { type TPlatformAppState } from "../../../PlatformInitialState";
import { WITHDRAW_FORM } from "../../Utils/Variables";
import { withdrawAnSpacePayPixValueByTypeSelector } from "./AnSpacePayFormSelectors";
import { type TAnSpacePayFormModel } from "./AnSpacePayFormModel";

const valueResolver: TResolver = (_, __, formName, state) =>
  selectFieldValue<EPlatform_AnSpacePayPixKeyType>(state, formName, AN_SPACE_PAY_FORM_FIELD_PATHS.type);

const AN_SPACE_PAY_FORM_FIELDS: TFieldDefs<keyof TAnSpacePayFormModel> = {
  value: oneOf({
    fields: {
      [EPlatform_AnSpacePayPixKeyType.email]: field({
        extensions: {
          ...withValidation(formRequiredValidation(), formEmailValidation()),
          ...withDisableCheck(always(false)),
        },
      }),
      [EPlatform_AnSpacePayPixKeyType.telefone]: field({
        extensions: {
          ...withValidation(formRequiredValidation(), formPhoneNumberValidation()),
          ...withDisableCheck(always(false)),
        },
      }),
      [EPlatform_AnSpacePayPixKeyType.cpfcnpj]: field({
        extensions: {
          ...withValidation(formRequiredValidation(), FORM_CPF_VALIDATION),
          ...withDisableCheck(always(true)),
        },
      }),
      [EPlatform_AnSpacePayPixKeyType.evp]: field({
        extensions: {
          ...withValidation(formRequiredValidation()),
          ...withDisableCheck(always(false)),
        },
      }),
    },
    resolver: valueResolver,
  }),
  type: field({
    extensions: withValidation(formRequiredValidation()),
  }),
};

const AN_SPACE_PAY_FORM_FIELD_PATHS = createFormFieldPaths(AN_SPACE_PAY_FORM_FIELDS);

const AN_SPACE_PAY_FORM_DECORATOR: IDecoratorDefinition<ActionCreator<IFormAction>, TPlatformAppState> =
  onAction(
    setFieldValueAction<EPlatform_AnSpacePayPixKeyType>,
    whenIs(
      every(
        isFormName(WITHDRAW_FORM),
        isFormFieldPath(AN_SPACE_PAY_FORM_FIELD_PATHS.type),
      ),
      (state, action, next) => {
        let nextState = next(state, action);
        const pixType = action.payload.value;

        if (!pixType) {
          return nextState;
        }

        const formName = action.metadata.formName;

        nextState = setFieldValue(
          nextState,
          AN_SPACE_PAY_FORM_FIELD_PATHS.value,
          withdrawAnSpacePayPixValueByTypeSelector(nextState, pixType),
          formName,
        );

        nextState = validateFormFields(nextState, formName, AN_SPACE_PAY_FORM_FIELD_PATHS.value);

        return runFormFieldsDisableCheck(nextState, formName);
      },
    ),
  );

const AN_SPACE_PAY_TYPE_OPTIONS = getSelectOptions(Object.values(EPlatform_AnSpacePayPixKeyType));

export {
  AN_SPACE_PAY_FORM_FIELDS,
  AN_SPACE_PAY_FORM_FIELD_PATHS,
  AN_SPACE_PAY_FORM_DECORATOR,

  AN_SPACE_PAY_TYPE_OPTIONS,
};
