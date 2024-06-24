import { type CSSProperties, memo } from "react";
import { useTranslation } from "@sb/translator";
import { PlayerUIQaAttributes } from "@sb/qa-attributes";
import { CREATE_CALL_REQUEST_FORM_DESCRIPTION_FIELD_PATH } from "../../../platformui/Store/CallRequests/CallRequestVariables";
import { type ICreateCallRequestFormDescriptionFieldFactoryProps } from "./CreateCallRequestFormFactoryModel";

const STYLE: CSSProperties = { gridArea: "description" };
const CreateCallRequestFormDescriptionFieldFactory = memo<ICreateCallRequestFormDescriptionFieldFactoryProps>(({
  TextareaField,
  placeholderTKey,
  labelTKey,
}) => {
  const [t] = useTranslation();

  return (
    <TextareaField
      fieldPath={CREATE_CALL_REQUEST_FORM_DESCRIPTION_FIELD_PATH}
      placeholder={t.plain(placeholderTKey)}
      label={t(labelTKey)}
      style={STYLE}
      qaAttribute={PlayerUIQaAttributes.RequestCallBackPage.MessageTextArea}
    />
  );
});
CreateCallRequestFormDescriptionFieldFactory.displayName = "CreateCallRequestFormDescriptionFieldFactory";

export { CreateCallRequestFormDescriptionFieldFactory };
