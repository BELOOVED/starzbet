import { type CSSProperties, memo } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "@sb/translator";
import { ECallOptionName } from "@sb/betting-core/ECallOptionName";
import { simpleValueExtractor } from "@sb/form-new";
import { PlayerUIQaAttributes } from "@sb/qa-attributes";
import {
  createCallRequestFormCallOptionNameFieldSelector,
} from "../../../platformui/Store/CallRequests/Selectors/CreateCallRequestFormSelectors";
import { CREATE_CALL_REQUEST_FORM_CONTACT_INFO_FIELD_PATH } from "../../../platformui/Store/CallRequests/CallRequestVariables";
import { type  ICreateCallRequestContactInfoFieldFactoryProps } from "./CreateCallRequestFormFactoryModel";

const STYLE: CSSProperties = { gridArea: "contactInfo" };

const CreateCallRequestContactInfoFieldFactory = memo<ICreateCallRequestContactInfoFieldFactoryProps>(({
  TextField,
  PhoneNumberField,
  placeholderTKey,
  labelTKey,
  contactInfoInputs,
}) => {
  const callOption = useSelector(createCallRequestFormCallOptionNameFieldSelector);

  const [t] = useTranslation();

  if (!callOption) {
    return null;
  }

  if (callOption === ECallOptionName.MOBILE) {
    return (
      <PhoneNumberField
        style={STYLE}
        valueExtractor={simpleValueExtractor}
        fieldPath={CREATE_CALL_REQUEST_FORM_CONTACT_INFO_FIELD_PATH}
        label={t(labelTKey)}
        placeholder={t.plain(placeholderTKey)}
        inputQaAttribute={PlayerUIQaAttributes.RequestCallBackPage.CallOptionInput}
        validationQaAttribute={PlayerUIQaAttributes.RequestCallBackPage.CallOptionInputFieldValidation}
      />
    );
  }

  const inputInfo = contactInfoInputs[callOption];

  return (
    <TextField
      fieldPath={CREATE_CALL_REQUEST_FORM_CONTACT_INFO_FIELD_PATH}
      label={t(inputInfo.title)}
      placeholder={t.plain(inputInfo.placeholder)}
      qaAttribute={PlayerUIQaAttributes.RequestCallBackPage.CallOptionInput}
    />
  );
});
CreateCallRequestContactInfoFieldFactory.displayName = "CreateCallRequestContactInfoFieldFactory";

export { CreateCallRequestContactInfoFieldFactory };
