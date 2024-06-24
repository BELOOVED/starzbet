import { memo } from "react";
import {
  platformui_starzbet_callRequests_placeholder_description,
  platformui_starzbet_ticket_button_attachAFile,
  platformui_starzbet_ticket_button_openATicket,
  platformui_starzbet_ticket_placeholder_subject,
  platformui_starzbet_ticket_title_department,
  platformui_starzbet_ticket_title_selectDepartment,
  platformui_starzbet_ticket_title_subject,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import { withProps } from "@sb/utils";
import { qaAttr, TicketsPageQAAtr } from "@sb/qa-attributes";
import { FormWithWrapper } from "@sb/form-new";
import classes from "./OpenTicketForm.module.css";
import { Button } from "../../../../../../common/Themes/Starzbet/Components/Button/Button";
import { FileField } from "../../../../../../common/Components/FileField/FileField";
import { SelectField } from "../../../../../../common/Themes/Starzbet/Components/Field/Fields/SelectField";
import { TextField } from "../../../../../../common/Themes/Starzbet/Components/Field/Fields/TextField";
import { TextareaField } from "../../../../../../common/Themes/Starzbet/Components/Field/Fields/TextareaField";
import { TICKETS_DEPARTMENT_LIST } from "../../../../../Store/Ticket/Model/Ticket";
import { OPEN_TICKET_FORM_NAME, OPEN_TICKET_FORM_PATH } from "../../../../../Store/Ticket/Forms/OpenTicketForm/Model";
import { useFormSubmitResult } from "../../../../../Store/Form/Hooks/UseFormSubmitResult";
import type { TPlayerDepartment } from "../../../../../Store/Ticket/TicketInitialState";
import { TicketDepartmentOption } from "../../../../../Components/TicketDepartmentOption/TicketDepartmentOption";
import { ThemedModalFormSubmitResult } from "../../ThemedModal/ThemedModalFormSubmitResult/ThemedModalFormSubmitResult";
import { FilesList } from "./UploadFiles/UploadFiles";

const SelectCol = memo(() => {
  const [t] = useTranslation();

  return (
    <div className={classes.col}>
      <SelectField<TPlayerDepartment>
        options={TICKETS_DEPARTMENT_LIST}
        fieldPath={OPEN_TICKET_FORM_PATH.department}
        optionComponent={TicketDepartmentOption}
        label={t(platformui_starzbet_ticket_title_department)}
        placeholder={t.plain(platformui_starzbet_ticket_title_selectDepartment)}
        qaAttributeSelect={TicketsPageQAAtr.ticketDepartmentSelectDrawer}
        qaAttributeOption={TicketsPageQAAtr.ticketDepartmentSelectOptionDrawer}
      />
    </div>
  );
});
SelectCol.displayName = "SelectCol";

const SubjectCol = memo(() => {
  const [t] = useTranslation();

  return (
    <div className={classes.col}>
      <TextField
        label={t(platformui_starzbet_ticket_title_subject)}
        placeholder={t.plain(platformui_starzbet_ticket_placeholder_subject)}
        fieldPath={OPEN_TICKET_FORM_PATH.subject}
        qaAttribute={TicketsPageQAAtr.ticketSubjectInputDrawer}
      />
    </div>
  );
});
SubjectCol.displayName = "SubjectCol";

const Message = memo(() => {
  const [t] = useTranslation();

  return (
    <TextareaField
      qaAttribute={TicketsPageQAAtr.ticketMessageInputDrawer}
      placeholder={t.plain(platformui_starzbet_callRequests_placeholder_description)}
      fieldPath={OPEN_TICKET_FORM_PATH.text}
      ghost
    />
  );
});
Message.displayName = "Message";

const OpenTicketFormContent = memo(() => {
  const [t] = useTranslation();

  const { submitErrors, loading } = useFormSubmitResult();

  return (
    <>
      <div className={classes.row}>
        <SubjectCol />

        <SelectCol />
      </div>

      <ThemedModalFormSubmitResult errorSubtitle={submitErrors?.error} />

      <div className={classes.row}>
        <div className={classes.messageCol}>
          <Message />

          <div className={classes.ticketsTextAreaBottom}>
            <label className={classes.attachBtn}>
              {t(platformui_starzbet_ticket_button_attachAFile)}

              <FileField fieldPath={OPEN_TICKET_FORM_PATH.attachedFiles} />
            </label>

            <FilesList fieldPath={OPEN_TICKET_FORM_PATH.attachedFiles} />
          </div>
        </div>
      </div>

      <div className={classes.buttons}>
        <Button
          loading={loading}
          type={"submit"}
          capitalize
          colorScheme={"blue-gradient"}
          {...qaAttr(TicketsPageQAAtr.createTicketButtonDrawer)}
          className={classes.submit}
        >
          {t(platformui_starzbet_ticket_button_openATicket)}
        </Button>
      </div>
    </>
  );
});
OpenTicketFormContent.displayName = "OpenTicketFormContent";

const OpenTicketForm = withProps(FormWithWrapper)({
  content: OpenTicketFormContent,
  formName: OPEN_TICKET_FORM_NAME,
});

export { OpenTicketForm };
