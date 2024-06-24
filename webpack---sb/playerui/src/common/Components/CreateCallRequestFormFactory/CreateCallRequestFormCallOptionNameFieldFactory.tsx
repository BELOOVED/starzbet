import { type CSSProperties, memo } from "react";
import { useSelector } from "react-redux";
import { type ECallOptionName } from "@sb/betting-core/ECallOptionName";
import { useTranslation } from "@sb/translator";
import { PlayerUIQaAttributes } from "@sb/qa-attributes";
import { callRequestOptionsTKeys } from "../../../platformui/Store/CallRequests/Model/CallRequests";
import { CREATE_CALL_REQUEST_FORM_CALL_OPTION_NAME_FIELD_PATH } from "../../../platformui/Store/CallRequests/CallRequestVariables";
import {
  createCallRequestFormActiveCallOptionsSelector,
} from "../../../platformui/Store/CallRequests/Selectors/CreateCallRequestFormSelectors";
import { type ISelectOption } from "../Field/SelectModel";
import { type ICreateCallRequestFormCallOptionNameFieldFactoryProps } from "./CreateCallRequestFormFactoryModel";

const Option = memo<ISelectOption<ECallOptionName>>(({ value }) => {
  const [t] = useTranslation();

  return t(callRequestOptionsTKeys[value]);
});
Option.displayName = "Option";

const STYLE: CSSProperties = { gridArea: "callOptionName" };

const CreateCallRequestFormCallOptionNameFieldFactory = memo<ICreateCallRequestFormCallOptionNameFieldFactoryProps>(({
  placeholderTKey,
  labelTKey,
  SelectField,
}) => {
  const [t] = useTranslation();
  const options = useSelector(createCallRequestFormActiveCallOptionsSelector);

  return (
    <SelectField
      style={STYLE}
      fieldPath={CREATE_CALL_REQUEST_FORM_CALL_OPTION_NAME_FIELD_PATH}
      options={options}
      placeholder={t.plain(placeholderTKey)}
      label={t(labelTKey)}
      optionComponent={Option}
      qaAttributeSelect={PlayerUIQaAttributes.RequestCallBackPage.CallOptionSelect}
      qaAttributeOption={PlayerUIQaAttributes.RequestCallBackPage.CallOptionOption}
    />
  );
});
CreateCallRequestFormCallOptionNameFieldFactory.displayName = "CreateCallRequestFormCallOptionNameFieldFactory";

export { CreateCallRequestFormCallOptionNameFieldFactory };
