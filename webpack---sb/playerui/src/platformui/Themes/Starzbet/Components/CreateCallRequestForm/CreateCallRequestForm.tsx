import { withProps } from "@sb/utils";
import {
  platformui_starzbet_callRequest_contact,
  platformui_starzbet_callRequests_button_requestCallBack,
  platformui_starzbet_callRequests_error_failedToRequestCallBack,
  platformui_starzbet_callRequests_placeholder_callOption,
  platformui_starzbet_callRequests_placeholder_date,
  platformui_starzbet_callRequests_placeholder_department,
  platformui_starzbet_callRequests_placeholder_description,
  platformui_starzbet_callRequests_placeholder_timePeriod,
  platformui_starzbet_callRequests_title_callOption,
  platformui_starzbet_callRequests_title_date,
  platformui_starzbet_callRequests_title_department,
  platformui_starzbet_callRequests_title_message,
  platformui_starzbet_callRequests_title_mobileNumber,
  platformui_starzbet_callRequests_title_timePeriod,
  platformui_starzbet_callRequests_title_yourRequestHasBeenReceived,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { Loader } from "../../../../../common/Themes/Starzbet/Components/Loader/Loader";
import { CreateCallRequestFormFactory } from "../../../../../common/Components/CreateCallRequestFormFactory/CreateCallRequestFormFactory";
import { SelectField } from "../../../../../common/Themes/Starzbet/Components/Field/Fields/SelectField";
import { TextField } from "../../../../../common/Themes/Starzbet/Components/Field/Fields/TextField";
import { PhoneNumberField } from "../../../../../common/Themes/Starzbet/Components/Field/Fields/PhoneNumberField";
import { TextareaField } from "../../../../../common/Themes/Starzbet/Components/Field/Fields/TextareaField";
import { Button } from "../../../../../common/Themes/Starzbet/Components/Button/Button";
import { Field } from "../../../../../common/Themes/Starzbet/Components/Field/Field";
import { callRequestContactInfoInputs } from "../../Model/CallRequestContactInfoInputs";
import { DatePickerInput } from "../Inputs/DatePickerInput/DatePickerInput";
import { ThemedModalErrorMessage, ThemedModalSuccessMessage } from "../ThemedModal/ThemedModalPrefabs/ThemedModalMessage";

const CreateCallRequestForm = withProps(CreateCallRequestFormFactory)({
  slotDateField: {
    labelTKey: platformui_starzbet_callRequests_title_date,
    placeholderTKey: platformui_starzbet_callRequests_placeholder_date,
    DatePickerInput,
    Field,
  },
  departmentField: {
    SelectField,
    placeholderTKey: platformui_starzbet_callRequests_placeholder_department,
    labelTKey: platformui_starzbet_callRequests_title_department,
  },
  slotIdField: {
    labelTKey: platformui_starzbet_callRequests_title_timePeriod,
    placeholderTKey: platformui_starzbet_callRequests_placeholder_timePeriod,
    SelectField,
  },
  callOptionNameField: {
    labelTKey: platformui_starzbet_callRequests_title_callOption,
    placeholderTKey: platformui_starzbet_callRequests_placeholder_callOption,
    SelectField,
  },
  contactInfoField: {
    TextField,
    PhoneNumberField,
    labelTKey: platformui_starzbet_callRequests_title_mobileNumber,
    placeholderTKey: platformui_starzbet_callRequests_title_mobileNumber,
    contactInfoInputs: callRequestContactInfoInputs,
  },
  descriptionField: {
    labelTKey: platformui_starzbet_callRequests_title_message,
    placeholderTKey: platformui_starzbet_callRequests_placeholder_description,
    TextareaField,
  },
  submitButton: {
    Button: withProps(Button)({ ellipsis: true, colorScheme: "blue-gradient" }),
    valueTKey: platformui_starzbet_callRequests_button_requestCallBack,
  },
  submitResult: {
    successSubtitle: platformui_starzbet_callRequest_contact,
    successTitle: platformui_starzbet_callRequests_title_yourRequestHasBeenReceived,
    errorTitle: platformui_starzbet_callRequests_error_failedToRequestCallBack,
    SuccessMessage: ThemedModalSuccessMessage,
    ErrorMessage: ThemedModalErrorMessage,
  },
  fallbackContent: Loader,
});

export { CreateCallRequestForm };
