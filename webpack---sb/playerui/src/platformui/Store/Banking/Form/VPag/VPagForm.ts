import { type ActionCreator } from "redux";
import { EPlatform_VpagPixType } from "@sb/graphql-client";
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
import { withdrawVpagPixValueByTypeSelector } from "./VPagFormSelectors";
import { type TVPagFormModel } from "./VPagFormModel";

const valueResolver: TResolver = (_, __, formName, state) =>
  selectFieldValue<EPlatform_VpagPixType>(state, formName, VPAG_FORM_FIELD_PATHS.type);

const VPAG_FORM_FIELDS: TFieldDefs<keyof TVPagFormModel> = {
  value: oneOf({
    fields: {
      [EPlatform_VpagPixType.email]: field({
        extensions: {
          ...withValidation(formRequiredValidation(), formEmailValidation()),
          ...withDisableCheck(always(false)),
        },
      }),
      [EPlatform_VpagPixType.phone]: field({
        extensions: {
          ...withValidation(formRequiredValidation(), formPhoneNumberValidation()),
          ...withDisableCheck(always(false)),
        },
      }),
      [EPlatform_VpagPixType.cpf]: field({
        extensions: {
          ...withValidation(formRequiredValidation(), FORM_CPF_VALIDATION),
          ...withDisableCheck(always(true)),
        },
      }),
    },
    resolver: valueResolver,
  }),
  type: field({
    extensions: withValidation(formRequiredValidation()),
  }),
};

const VPAG_FORM_FIELD_PATHS = createFormFieldPaths(VPAG_FORM_FIELDS);

const VPAG_FORM_DECORATOR: IDecoratorDefinition<ActionCreator<IFormAction>, TPlatformAppState> =
  onAction(
    setFieldValueAction<EPlatform_VpagPixType>,
    whenIs(
      every(
        isFormName(WITHDRAW_FORM),
        isFormFieldPath(VPAG_FORM_FIELD_PATHS.type),
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
          VPAG_FORM_FIELD_PATHS.value,
          withdrawVpagPixValueByTypeSelector(nextState, pixType),
          formName,
        );

        nextState = validateFormFields(nextState, formName, VPAG_FORM_FIELD_PATHS.value);

        return runFormFieldsDisableCheck(nextState, formName);
      },
    ),
  );

const VPAG_TYPE_OPTIONS = getSelectOptions(Object.values(EPlatform_VpagPixType));

export {
  VPAG_FORM_FIELDS,
  VPAG_FORM_FIELD_PATHS,

  VPAG_TYPE_OPTIONS,
  VPAG_FORM_DECORATOR,
};
