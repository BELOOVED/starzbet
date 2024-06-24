import { type CSSProperties, memo } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "@sb/translator";
import { simpleValueExtractor } from "@sb/form-new";
import { PlayerUIQaAttributes } from "@sb/qa-attributes";
import {
  createCallRequestFormCalendarDisabledDaysSelector,
} from "../../../platformui/Store/CallRequests/Selectors/CreateCallRequestFormSelectors";
import { CREATE_CALL_REQUEST_FORM_SLOT_DATE_FIELD_PATH } from "../../../platformui/Store/CallRequests/CallRequestVariables";
import { FieldCreator } from "../Field/FieldCreator";
import { type ICreateCallRequestSlotDateFieldFactoryProps } from "./CreateCallRequestFormFactoryModel";

const STYLE: CSSProperties = { gridArea: "slotDate" };

const CreateCallRequestFormSlotDateFieldFactory = memo<ICreateCallRequestSlotDateFieldFactoryProps>(({

  labelTKey,
  placeholderTKey,
  DatePickerInput,
  Field,
}) => {
  const disabledDay = useSelector(createCallRequestFormCalendarDisabledDaysSelector);

  const [t] = useTranslation();

  return (
    <FieldCreator<string>
      style={STYLE}
      ThemedField={Field}
      fieldPath={CREATE_CALL_REQUEST_FORM_SLOT_DATE_FIELD_PATH}
      valueExtractor={simpleValueExtractor}
      label={t(labelTKey)}
    >
      {
        (props) => (
          <DatePickerInput
            disabledDay={disabledDay}
            placeholder={placeholderTKey}
            qaAttribute={PlayerUIQaAttributes.RequestCallBackPage.DateSelect}
            {...props}
          />
        )
      }
    </FieldCreator>
  );
});
CreateCallRequestFormSlotDateFieldFactory.displayName = "CreateCallRequestFormSlotDateFieldFactory";

export { CreateCallRequestFormSlotDateFieldFactory };
