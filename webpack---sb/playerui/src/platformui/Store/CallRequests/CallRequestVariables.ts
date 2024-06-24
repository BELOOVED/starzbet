import { createCallManagerSymbol } from "@sb/call-manager";
import { ECallRequestStatus, type EPlatform_CallRequestDepartment } from "@sb/graphql-client";
import type { TFormFieldPath } from "@sb/form-new";
import { type ECallOptionName } from "@sb/betting-core/ECallOptionName";
import { type TPhoneValue } from "../../../common/Model/TPhoneValue";

const CREATE_CALL_REQUEST_FORM_NAME = "createCallRequestForm";
const CALL_REQUESTS_LOADING_SYMBOL = createCallManagerSymbol("call_requests");

const CALL_REQUESTS_SLOTS_LOADING_SYMBOL = createCallManagerSymbol("call_requests_slots");
const CALL_REQUESTS_CALL_OPTIONS_LOADING_SYMBOL = createCallManagerSymbol("call_requests_call_options");

const CALL_REQUESTS_VOID_REQUEST_STATUSES = [
  ECallRequestStatus.rejected,
  ECallRequestStatus.canceled,
];

type TCallOptionAndContactInfo = {
  callOptionName: ECallOptionName.MOBILE;
  contactInfo: TPhoneValue;
} | {
  callOptionName: Exclude<ECallOptionName, ECallOptionName.MOBILE>;
  contactInfo: string;
}
type TCreateCallRequestForm =
  {
    slotDate: number;
    department: EPlatform_CallRequestDepartment;
    slotId: string;
    description: string;
  } & TCallOptionAndContactInfo

const CREATE_CALL_REQUEST_FORM_SLOT_DATE_FIELD_PATH: TFormFieldPath<TCreateCallRequestForm> = ["slotDate"];
const CREATE_CALL_REQUEST_FORM_DEPARTMENT_FIELD_PATH: TFormFieldPath<TCreateCallRequestForm> = ["department"];
const CREATE_CALL_REQUEST_FORM_SLOT_ID_FIELD_PATH: TFormFieldPath<TCreateCallRequestForm> = ["slotId"];
const CREATE_CALL_REQUEST_FORM_CALL_OPTION_NAME_FIELD_PATH: TFormFieldPath<TCreateCallRequestForm> = ["callOptionName"];
const CREATE_CALL_REQUEST_FORM_CONTACT_INFO_FIELD_PATH: TFormFieldPath<TCreateCallRequestForm> = ["contactInfo"];
const CREATE_CALL_REQUEST_FORM_DESCRIPTION_FIELD_PATH: TFormFieldPath<TCreateCallRequestForm> = ["description"];

export {
  CREATE_CALL_REQUEST_FORM_NAME,
  CALL_REQUESTS_SLOTS_LOADING_SYMBOL,
  CALL_REQUESTS_CALL_OPTIONS_LOADING_SYMBOL,
  CALL_REQUESTS_VOID_REQUEST_STATUSES,
  CALL_REQUESTS_LOADING_SYMBOL,
  CREATE_CALL_REQUEST_FORM_DESCRIPTION_FIELD_PATH,
  CREATE_CALL_REQUEST_FORM_CONTACT_INFO_FIELD_PATH,
  CREATE_CALL_REQUEST_FORM_CALL_OPTION_NAME_FIELD_PATH,
  CREATE_CALL_REQUEST_FORM_SLOT_ID_FIELD_PATH,
  CREATE_CALL_REQUEST_FORM_DEPARTMENT_FIELD_PATH,
  CREATE_CALL_REQUEST_FORM_SLOT_DATE_FIELD_PATH,
};
export type { TCreateCallRequestForm };
