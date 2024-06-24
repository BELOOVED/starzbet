import { callManagerWasSucceededSelector } from "@sb/call-manager";
import { createMemoSelector, createSimpleSelector, getNotNil, omit, type TSelector, withParams } from "@sb/utils";
import { selectFieldValue, selectFormValue } from "@sb/form-new";
import { type EPlatform_CallRequestDepartment } from "@sb/graphql-client";
import { ECallOptionName } from "@sb/betting-core/ECallOptionName";
import { localClientTimeZoneOffsetSelector } from "../../../../common/Store/Player/Selectors/LocalClientTimeZoneOffsetSelector";
import { type ISelectOption } from "../../../../common/Components/Field/SelectModel";
import { phoneValueToString } from "../../../../common/Utils/PhoneValueToString";
import { type TPlatformAppState } from "../../PlatformInitialState";
import { localeSelector } from "../../Locale/Selectors/localeSelector";
import {
  CALL_REQUESTS_CALL_OPTIONS_LOADING_SYMBOL,
  CALL_REQUESTS_SLOTS_LOADING_SYMBOL,
  CREATE_CALL_REQUEST_FORM_CALL_OPTION_NAME_FIELD_PATH,
  CREATE_CALL_REQUEST_FORM_DEPARTMENT_FIELD_PATH,
  CREATE_CALL_REQUEST_FORM_NAME,
  CREATE_CALL_REQUEST_FORM_SLOT_DATE_FIELD_PATH,
  type TCreateCallRequestForm,
} from "../CallRequestVariables";
import { callRequestsIsSlotMatchWithDate, createCallRequestFormSlotFilter } from "../Utils/CreateCallRequestFormSlotFilter";
import { createCallRequestFormFormatSlotTimeRange } from "../Utils/CreateCallRequestFormFormatSlotTime";
import { callRequestsActiveOptionsSelector, callRequestsSelectors } from "./CallRequestsSelectors";

const createCallRequestFormSlotDateFieldSelector = withParams(
  selectFieldValue<string>,
  CREATE_CALL_REQUEST_FORM_NAME,
  CREATE_CALL_REQUEST_FORM_SLOT_DATE_FIELD_PATH,
);

const createCallRequestFormDepartmentFieldSelector = withParams(
  selectFieldValue<EPlatform_CallRequestDepartment>,
  CREATE_CALL_REQUEST_FORM_NAME,
  CREATE_CALL_REQUEST_FORM_DEPARTMENT_FIELD_PATH,
);

const createCallRequestFormCallOptionNameFieldSelector = withParams(
  selectFieldValue<ECallOptionName>,
  CREATE_CALL_REQUEST_FORM_NAME,
  CREATE_CALL_REQUEST_FORM_CALL_OPTION_NAME_FIELD_PATH,
);

const createCallRequestFormReadyToMountSelector: TSelector<TPlatformAppState, boolean> =
  withParams(callManagerWasSucceededSelector, [CALL_REQUESTS_SLOTS_LOADING_SYMBOL, CALL_REQUESTS_CALL_OPTIONS_LOADING_SYMBOL]);

const createCallRequestFormInitialValuesSelector = (state: TPlatformAppState) => {
  const slots = callRequestsSelectors.activeActualSlots(state);
  const callOptions = callRequestsActiveOptionsSelector(state);

  const firstSlot = Object.values(slots)[0];

  return {
    //todo HY and AM fix this shit (after form fixed)
    // contactInfo: { code: isBrazil ? phoneCodes.BRA : phoneCodes.TUR },
    slotDate: firstSlot ? Number(firstSlot.startTime) : undefined,
    callOptionName: callOptions[0]?.callOptionName,
  };
};

const createCallRequestFormCalendarDisabledDaysSelector = createSimpleSelector(
  [
    callRequestsSelectors.activeActualSlots,
    localeSelector,
    localClientTimeZoneOffsetSelector,
  ],
  (slots, locale, offset) =>
    (date: Date) => !Object.values(slots).some((slot) => callRequestsIsSlotMatchWithDate(slot, date, locale, offset)),
);

const createCallRequestFormDepartmentOptionsSelector = createMemoSelector(
  [
    callRequestsSelectors.activeActualSlots,
    createCallRequestFormSlotDateFieldSelector,
    localeSelector,
    localClientTimeZoneOffsetSelector,
  ],
  (slots, date, locale, offset) => Object.values(slots).reduce<ISelectOption<EPlatform_CallRequestDepartment>[]>(
    (acc, slot) => {
      if (createCallRequestFormSlotFilter(slot, date, locale, offset)) {
        return acc;
      }

      if (acc.find((it) => it.value === slot.department)) {
        return acc;
      }

      acc.push({ value: slot.department });

      return acc;
    },
    [],
  ),
);

const createCallRequestFormSlotIdOptionsSelector = createMemoSelector(
  [
    callRequestsSelectors.activeActualSlots,
    createCallRequestFormSlotDateFieldSelector,
    createCallRequestFormDepartmentFieldSelector,
    localeSelector,
    localClientTimeZoneOffsetSelector,
  ],
  (slots, date, department, locale, offset) => Object.values(slots).reduce<ISelectOption<string>[]>(
    (acc, slot) => {
      if (createCallRequestFormSlotFilter(slot, date, locale, offset)) {
        return acc;
      }

      if (slot.department !== department) {
        return acc;
      }

      if (acc.find((it) => it.value === slot.id)) {
        return acc;
      }

      acc.push({ value: slot.id });

      return acc;
    },
    [],
  ),
);

const createCallRequestFormSlotIdOptionByIdSelector = createSimpleSelector(
  [
    (_, id: string) => id,
    callRequestsSelectors.activeActualSlots,
    localeSelector,
    localClientTimeZoneOffsetSelector,
  ],
  (id, slots, locale, offset) => {
    const { startTime, endTime } = getNotNil(slots[id], ["createCallRequestFormSlotIdOptionByIdSelector"], "slot");

    return createCallRequestFormFormatSlotTimeRange(startTime, endTime, locale, offset);
  },
);

const createCallRequestFormCallPayloadSelector = createSimpleSelector(
  [withParams(selectFormValue<TCreateCallRequestForm>, CREATE_CALL_REQUEST_FORM_NAME)],
  ({ callOptionName, contactInfo: info, ...rest }) => {
    const contactInfo = callOptionName === ECallOptionName.MOBILE ? phoneValueToString(info) : info;

    return {
      contactInfo,
      callOptionName,
      ...omit(["slotDate"], rest),
    };
  },
);

const createCallRequestFormActiveCallOptionsSelector = createMemoSelector(
  [callRequestsActiveOptionsSelector],
  (options) => options.map((val) => ({ value: val.callOptionName })),
);

export {
  createCallRequestFormReadyToMountSelector,
  createCallRequestFormInitialValuesSelector,
  createCallRequestFormCalendarDisabledDaysSelector,
  createCallRequestFormDepartmentOptionsSelector,
  createCallRequestFormSlotIdOptionsSelector,
  createCallRequestFormSlotIdOptionByIdSelector,
  createCallRequestFormCallOptionNameFieldSelector,
  createCallRequestFormCallPayloadSelector,
  createCallRequestFormActiveCallOptionsSelector,
};
