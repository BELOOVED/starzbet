import clsx from "clsx";
import { memo } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "@sb/translator";
import { qaAttr, TicketsPageQAAtr } from "@sb/qa-attributes";
import { useAction, withProps } from "@sb/utils";
import { FormWithWrapper } from "@sb/form-new";
import { platformui_starzbet_callRequests_placeholder_description } from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import classes from "./TicketSendForm.module.css";
import { IS_MOBILE_CLIENT_SIDE } from "../../../../../../common/Store/DeviceInfo/DeviceInfoConstant";
import { isFormModalOpenSelector } from "../../../../../../common/Store/Modal/Selectors/ModalSelectors";
import { formInfoModalCloseAction } from "../../../../../../common/Store/Modal/ModalActions";
import { FileField } from "../../../../../../common/Components/FileField/FileField";
import { TextareaField } from "../../../../../../common/Themes/Starzbet/Components/Field/Fields/TextareaField";
import { TICKET_SEND_FORM_NAME, TICKET_SEND_FORM_PATH } from "../../../../../Store/Ticket/Forms/TicketSendForm/Model";
import { useFormSubmitResult } from "../../../../../Store/Form/Hooks/UseFormSubmitResult";
import { getFormErrorTKey } from "../../../../../Store/Form/Utils/GetFormErrorTKey";
import { SendIcon } from "../../Icons/SendIcon/SendIcon";
import { ClipIcon } from "../../Icons/ClipIcon/ClipIcon";
import { ThemedModalErrorMessage } from "../../ThemedModal/ThemedModalPrefabs/ThemedModalMessage";
import { FilesList } from "../OpenTicketForm/UploadFiles/UploadFiles";

const Textarea = memo(() => {
  const [t] = useTranslation();

  return (
    <div className={classes.textarea}>
      <TextareaField
        qaAttribute={TicketsPageQAAtr.ticketChatMessageInput}
        placeholder={t.plain(platformui_starzbet_callRequests_placeholder_description)}
        fieldPath={TICKET_SEND_FORM_PATH.text}
        className={classes.field}
        ghost
        hideError
      />
    </div>
  );
});
Textarea.displayName = "Textarea";

interface IFileFooterProps {
  disabled: boolean;
}

const FileFooter = memo<IFileFooterProps>(({ disabled }) => (
  <div className={classes.fileFooter}>
    <label className={classes.attachLabel}>
      <ClipIcon size={"m"} className={classes.attach} />

      <FileField fieldPath={TICKET_SEND_FORM_PATH.attachedFiles} disabled={disabled} />
    </label>

    <FilesList fieldPath={TICKET_SEND_FORM_PATH.attachedFiles} />
  </div>
));
FileFooter.displayName = "FileFooter";

const TicketSendFormContent = memo(() => {
  const { submitErrors, loading } = useFormSubmitResult();
  const isFormModalOpen = useSelector(isFormModalOpenSelector);
  const closeInfoModal = useAction(formInfoModalCloseAction);

  const subtitle = getFormErrorTKey(submitErrors?.error);

  return (
    <div className={clsx(classes.container, IS_MOBILE_CLIENT_SIDE && classes.mobile)}>
      <div className={classes.wrapper}>
        {isFormModalOpen && submitErrors ? <ThemedModalErrorMessage hideModal={closeInfoModal} subtitle={subtitle} /> : null}

        <div className={classes.sendForm}>
          <Textarea />

          <button
            className={clsx(classes.send, loading && classes.disabled)}
            {...qaAttr(TicketsPageQAAtr.ticketChatSendMessage)}
            disabled={loading}
            type={"submit"}
          >
            <SendIcon size={"m"} />
          </button>
        </div>
      </div>

      <FileFooter disabled={loading} />
    </div>
  );
});
TicketSendFormContent.displayName = "TicketSendFormContent";

const TicketSendForm = withProps(FormWithWrapper)({
  formName: TICKET_SEND_FORM_NAME,
  content: TicketSendFormContent,
});

export { TicketSendForm };
