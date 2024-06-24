import {
  platformui_callRequests_callOption_facebook,
  platformui_callRequests_callOption_faceTime,
  platformui_callRequests_callOption_googleMeet,
  platformui_callRequests_callOption_instagram,
  platformui_callRequests_callOption_mobile,
  platformui_callRequests_callOption_signal,
  platformui_callRequests_callOption_skype,
  platformui_callRequests_callOption_telegram,
  platformui_callRequests_callOption_twitter,
  platformui_callRequests_callOption_whatsApp,
  platformui_callRequests_department_account,
  platformui_callRequests_department_bonus,
  platformui_callRequests_department_cashback,
  platformui_callRequests_department_general,
  platformui_callRequests_department_technical,
  platformui_callRequests_status_canceled,
  platformui_callRequests_status_fulfilled,
  platformui_callRequests_status_pending,
  platformui_callRequests_status_rejected,
  type TCommonTKeys,
} from "@sb/translates/platformui/CommonTKeys";
import { ECallOptionName } from "@sb/betting-core/ECallOptionName";
import { EPlatform_CallRequestDepartment } from "@sb/graphql-client";

const callRequestDepartmentTKeys: Record<EPlatform_CallRequestDepartment, TCommonTKeys> = {
  [EPlatform_CallRequestDepartment.general]: platformui_callRequests_department_general,
  [EPlatform_CallRequestDepartment.account]: platformui_callRequests_department_account,
  [EPlatform_CallRequestDepartment.technical]: platformui_callRequests_department_technical,
  [EPlatform_CallRequestDepartment.bonus]: platformui_callRequests_department_bonus,
  [EPlatform_CallRequestDepartment.cashback]: platformui_callRequests_department_cashback,
};

const callRequestStatusEnum = {
  PENDING: "PENDING",
  REJECTED: "REJECTED",
  CANCELED: "CANCELED",
  FULFILLED: "FULFILLED",
};

const callRequestStatusTKeys = {
  [callRequestStatusEnum.PENDING]: platformui_callRequests_status_pending,
  [callRequestStatusEnum.REJECTED]: platformui_callRequests_status_rejected,
  [callRequestStatusEnum.CANCELED]: platformui_callRequests_status_canceled,
  [callRequestStatusEnum.FULFILLED]: platformui_callRequests_status_fulfilled,
};

const callRequestOptionsTKeys: Record<ECallOptionName, TCommonTKeys> = {
  [ECallOptionName.MOBILE]: platformui_callRequests_callOption_mobile,
  [ECallOptionName.FACEBOOK]: platformui_callRequests_callOption_facebook,
  [ECallOptionName.INSTAGRAM]: platformui_callRequests_callOption_instagram,
  [ECallOptionName.SIGNAL]: platformui_callRequests_callOption_signal,
  [ECallOptionName.SKYPE]: platformui_callRequests_callOption_skype,
  [ECallOptionName.TELEGRAM]: platformui_callRequests_callOption_telegram,
  [ECallOptionName.TWITTER]: platformui_callRequests_callOption_twitter,
  [ECallOptionName.WHATSAPP]: platformui_callRequests_callOption_whatsApp,
  [ECallOptionName.GOOGLE_MEET]: platformui_callRequests_callOption_googleMeet,
  [ECallOptionName.FACE_TIME]: platformui_callRequests_callOption_faceTime,
};

export {
  callRequestDepartmentTKeys,
  callRequestStatusEnum,
  callRequestStatusTKeys,
  callRequestOptionsTKeys,

};
