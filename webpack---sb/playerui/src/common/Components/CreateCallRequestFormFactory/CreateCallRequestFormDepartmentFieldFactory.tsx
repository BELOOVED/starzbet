import { type CSSProperties, memo } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "@sb/translator";
import { type EPlatform_CallRequestDepartment } from "@sb/graphql-client";
import { PlayerUIQaAttributes } from "@sb/qa-attributes";
import {
  createCallRequestFormDepartmentOptionsSelector,
} from "../../../platformui/Store/CallRequests/Selectors/CreateCallRequestFormSelectors";
import { callRequestDepartmentTKeys } from "../../../platformui/Store/CallRequests/Model/CallRequests";
import { CREATE_CALL_REQUEST_FORM_DEPARTMENT_FIELD_PATH } from "../../../platformui/Store/CallRequests/CallRequestVariables";
import { type ISelectOption } from "../Field/SelectModel";
import { type ICreateCallRequestFormDepartmentFieldFactoryProps } from "./CreateCallRequestFormFactoryModel";

const Option = memo<ISelectOption<EPlatform_CallRequestDepartment>>(({ value }) => {
  const [t] = useTranslation();

  return t(callRequestDepartmentTKeys[value]);
});
Option.displayName = "Option";

const STYLE: CSSProperties = { gridArea: "department" };

const CreateCallRequestFormDepartmentFieldFactory = memo<ICreateCallRequestFormDepartmentFieldFactoryProps>(({
  labelTKey,
  placeholderTKey,
  SelectField,
}) => {
  const [t] = useTranslation();

  const options = useSelector(createCallRequestFormDepartmentOptionsSelector);

  return (
    <SelectField
      style={STYLE}
      fieldPath={CREATE_CALL_REQUEST_FORM_DEPARTMENT_FIELD_PATH}
      options={options}
      label={t(labelTKey)}
      placeholder={t.plain(placeholderTKey)}
      optionComponent={Option}
      qaAttributeSelect={PlayerUIQaAttributes.RequestCallBackPage.DepartmentSelect}
      qaAttributeOption={PlayerUIQaAttributes.RequestCallBackPage.DepartmentOption}
    />
  );
});
CreateCallRequestFormDepartmentFieldFactory.displayName = "CreateCallRequestFormDepartmentFieldFactory";

export { CreateCallRequestFormDepartmentFieldFactory };
