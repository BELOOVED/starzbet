import { type CSSProperties, memo } from "react";
import { useSelector } from "react-redux";
import { useParamSelector } from "@sb/utils";
import { useTranslation } from "@sb/translator";
import { PlayerUIQaAttributes } from "@sb/qa-attributes";
import {
  createCallRequestFormSlotIdOptionByIdSelector,
  createCallRequestFormSlotIdOptionsSelector,
} from "../../../platformui/Store/CallRequests/Selectors/CreateCallRequestFormSelectors";
import { CREATE_CALL_REQUEST_FORM_SLOT_ID_FIELD_PATH } from "../../../platformui/Store/CallRequests/CallRequestVariables";
import { type ISelectOption } from "../Field/SelectModel";
import type { ICreateCallRequestFormSlotIdFieldFactoryProps } from "./CreateCallRequestFormFactoryModel";

const Option = memo<ISelectOption<string>>(({ value }) => {
  const option = useParamSelector(createCallRequestFormSlotIdOptionByIdSelector, [value]);

  return option;
});
Option.displayName = "Option";

const STYLE: CSSProperties = { gridArea: "slotId" };

const CreateCallRequestFormSlotIdFieldFactory = memo<ICreateCallRequestFormSlotIdFieldFactoryProps>(({
  labelTKey,
  placeholderTKey,
  SelectField,
}) => {
  const [t] = useTranslation();
  const options = useSelector(createCallRequestFormSlotIdOptionsSelector);

  return (
    <SelectField
      style={STYLE}
      label={t(labelTKey)}
      fieldPath={CREATE_CALL_REQUEST_FORM_SLOT_ID_FIELD_PATH}
      options={options}
      optionComponent={Option}
      placeholder={t.plain(placeholderTKey)}
      qaAttributeSelect={PlayerUIQaAttributes.RequestCallBackPage.TimePeriodSelect}
      qaAttributeOption={PlayerUIQaAttributes.RequestCallBackPage.TimePeriodOption}
    />
  );
});
CreateCallRequestFormSlotIdFieldFactory.displayName = "CreateCallRequestFormSlotIdFieldFactory";

export { CreateCallRequestFormSlotIdFieldFactory };
