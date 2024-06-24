import { type ComponentType, createElement, memo } from "react";
import { useSelector } from "react-redux";
import { FormWithWrapper, type TFormFieldPath, type TFormProps } from "@sb/form-new";
import { withProps } from "@sb/utils";
import { useTranslation } from "@sb/translator";
import { PlayerUIQaAttributes, qaAttr } from "@sb/qa-attributes";
import { keys } from "@sb/utils/Keys";
import { type IUpdatePlayerDetailsForm } from "../../../common/Store/Player/Model/IUpdatePlayerDetailsForm";
import {
  UPDATE_PLAYER_DETAILS_FORM_ADDRESS_FIELD_PATH,
  UPDATE_PLAYER_DETAILS_FORM_COUNTRY_FIELD_PATH,
  UPDATE_PLAYER_DETAILS_FORM_DATE_OF_BIRTH_FIELD_PATH,
  UPDATE_PLAYER_DETAILS_FORM_EMAIL_FIELD_PATH,
  UPDATE_PLAYER_DETAILS_FORM_IDENTITY_NUMBER_FIELD_PATH,
  UPDATE_PLAYER_DETAILS_FORM_LOGIN_FIELD_PATH,
  UPDATE_PLAYER_DETAILS_FORM_NAME,
  UPDATE_PLAYER_DETAILS_FORM_NAME_FIELD_PATH,
  UPDATE_PLAYER_DETAILS_FORM_PHONE_NUMBER_FIELD_PATH,
  UPDATE_PLAYER_DETAILS_FORM_POST_CODE_FIELD_PATH,
  UPDATE_PLAYER_DETAILS_FORM_SURNAME_FIELD_PATH,
  UPDATE_PLAYER_DETAILS_FORM_TOWN_CITY_FIELD_PATH,
} from "../../../common/Store/Player/PlayerVariables";
import { type TDefaultFieldProps } from "../../../common/Components/Field/FieldCreator";
import { type TTTextBaseFieldProps } from "../../../common/Components/Field/TextFieldCreator";
import { type TSelectFieldProps } from "../../../common/Components/Field/SelectModel";
import { hiddenDetailsSelector } from "../../../common/Store/Player/Selectors/PlayerSelectors";
import { countriesOptions } from "../../Utils/CountriesUtils";
import { CountryOption } from "../CountryOption/CountryOption";

interface IUpdatePlayerDetailsField<T> extends Pick<TDefaultFieldProps, "caption"> {
  labelTKey: string;
  component: ComponentType<T>;
}

interface IUpdatePlayerDetailsFormContentProps extends Record<
  keyof Omit<IUpdatePlayerDetailsForm, "country">,
  IUpdatePlayerDetailsField<TTTextBaseFieldProps>
>, IWithClassName {
  country: IUpdatePlayerDetailsField<TSelectFieldProps<string>>;
}

const FORM_FIELD_TO_FIELD_PATH_MAP: Record<keyof IUpdatePlayerDetailsForm, TFormFieldPath<IUpdatePlayerDetailsForm>> = {
  name: UPDATE_PLAYER_DETAILS_FORM_NAME_FIELD_PATH,
  surname: UPDATE_PLAYER_DETAILS_FORM_SURNAME_FIELD_PATH,
  identityNumber: UPDATE_PLAYER_DETAILS_FORM_IDENTITY_NUMBER_FIELD_PATH,
  login: UPDATE_PLAYER_DETAILS_FORM_LOGIN_FIELD_PATH,
  email: UPDATE_PLAYER_DETAILS_FORM_EMAIL_FIELD_PATH,
  phoneNumber: UPDATE_PLAYER_DETAILS_FORM_PHONE_NUMBER_FIELD_PATH,
  dateOfBirth: UPDATE_PLAYER_DETAILS_FORM_DATE_OF_BIRTH_FIELD_PATH,
  country: UPDATE_PLAYER_DETAILS_FORM_COUNTRY_FIELD_PATH,
  townCity: UPDATE_PLAYER_DETAILS_FORM_TOWN_CITY_FIELD_PATH,
  address: UPDATE_PLAYER_DETAILS_FORM_ADDRESS_FIELD_PATH,
  postcode: UPDATE_PLAYER_DETAILS_FORM_POST_CODE_FIELD_PATH,
};

const FORM_FIELD_TO_QA_ATTRIBUTE_MAP: Partial<Record<keyof IUpdatePlayerDetailsForm, string>> = {
  phoneNumber: PlayerUIQaAttributes.DetailsPage.MobileNumberInput,
  email: PlayerUIQaAttributes.DetailsPage.EmailInput,
  login: PlayerUIQaAttributes.DetailsPage.UsernameInput,
};

const NOOP = () => null;

const UpdatePlayerDetailsFormContent = memo<IUpdatePlayerDetailsFormContentProps>(({ className, ...props }) => {
  const [t] = useTranslation();
  const hidden = useSelector(hiddenDetailsSelector);

  return (
    <div {...qaAttr(PlayerUIQaAttributes.DetailsPage.FormContainer)} className={className}>
      {
        keys(props).map((key, i) => {
          if (key === "country") {
            const { component, labelTKey } = props[key];

            const CountrySelect = withProps(component)({
              options: countriesOptions,
              optionComponent: hidden ? NOOP : CountryOption,
            });

            return createElement(
              CountrySelect,
              {
                key: i,
                fieldPath: FORM_FIELD_TO_FIELD_PATH_MAP[key],
                label: t(labelTKey),
                style: { gridArea: key },
              },
            );
          }

          const { component, labelTKey, caption } = props[key];

          return createElement(
            component,
            {
              key: i,
              fieldPath: FORM_FIELD_TO_FIELD_PATH_MAP[key],
              label: t(labelTKey),
              caption,
              type: hidden ? "password" : "text",
              qaAttribute: FORM_FIELD_TO_QA_ATTRIBUTE_MAP[key],
              style: { gridArea: key },
            },
          );
        })
      }
    </div>
  );
});
UpdatePlayerDetailsFormContent.displayName = "UpdatePlayerDetailsFormContent";

type TUpdatePlayerDetailsFormFactoryProps = IUpdatePlayerDetailsFormContentProps & Pick<TFormProps, "fallbackContent"> & IWithClassName

const UpdatePlayerDetailsFormFactory = memo<TUpdatePlayerDetailsFormFactoryProps>(({ fallbackContent, ...props }) => (
  <FormWithWrapper
    formName={UPDATE_PLAYER_DETAILS_FORM_NAME}
    content={withProps(UpdatePlayerDetailsFormContent)(props)}
    fallbackContent={fallbackContent}
  />
));
UpdatePlayerDetailsFormFactory.displayName = "UpdatePlayerDetailsFormFactory";

export { UpdatePlayerDetailsFormFactory };
