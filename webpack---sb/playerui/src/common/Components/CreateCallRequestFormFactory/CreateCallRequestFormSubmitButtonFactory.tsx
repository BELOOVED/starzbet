import { type CSSProperties, memo } from "react";
import { useTranslation } from "@sb/translator";
import { useParamSelector } from "@sb/utils";
import { selectIsFormSubmittingStarted } from "@sb/form-new";
import { PlayerUIQaAttributes } from "@sb/qa-attributes";
import { CREATE_CALL_REQUEST_FORM_NAME } from "../../../platformui/Store/CallRequests/CallRequestVariables";
import { type ICreateCallRequestFormSubmitButtonFactoryProps } from "./CreateCallRequestFormFactoryModel";

const STYLE: CSSProperties = { gridArea: "submitButton" };

const CreateCallRequestFormSubmitButtonFactory = memo<ICreateCallRequestFormSubmitButtonFactoryProps>(({ Button, valueTKey }) => {
  const [t] = useTranslation();
  const loading = useParamSelector(selectIsFormSubmittingStarted, [CREATE_CALL_REQUEST_FORM_NAME]);

  return (
    <Button
      loading={loading}
      style={STYLE}
      type={"submit"}
      capitalize
      qaAttribute={PlayerUIQaAttributes.RequestCallBackPage.SubmitButton}
    >
      {t(valueTKey)}
    </Button>
  );
});
CreateCallRequestFormSubmitButtonFactory.displayName = "CreateCallRequestFormSubmitButtonFactory";

export { CreateCallRequestFormSubmitButtonFactory };
