import { of } from "rxjs";
import { resetFormAction, selectFormValue } from "@sb/form-new";
import { temporaryFileSelector } from "@sb/file-service";
import { formInfoModalOpenAction } from "../../../../../../common/Store/Modal/ModalActions";
import { callWithAbort } from "../../../../../../common/Utils/EpicUtils/CallWithAbort";
import { formSubmitEpicFactory } from "../../../../../Utils/FormSubmitEpicFactory";
import { ticketDetailSelectors } from "../../../Selectors/TicketSelectors";
import { TICKET_SEND_FORM_NAME, type TTicketSendForm } from "../Model";

const ticketSendSubmitEpic = formSubmitEpicFactory({
  formName: TICKET_SEND_FORM_NAME,
  createCall: (state, deps) => {
    const payload = selectFormValue<TTicketSendForm>(state, TICKET_SEND_FORM_NAME);
    const ticketId = ticketDetailSelectors.id(state);

    return callWithAbort(
      deps.platformHttpApi.callAddMessageToTicket,
      {
        ...payload,
        ticketId,
        files: payload.attachedFiles?.files?.map(({ id }) => temporaryFileSelector(state, id, ["openTicketSubmitEpic"])),
      },
    );
  },
  onSuccess: () => () => of(resetFormAction(
    TICKET_SEND_FORM_NAME,
    {
      attachedFiles: {
        files: [],
      },
    },
  )),
  onError: () => () => of(formInfoModalOpenAction()),
});

export { ticketSendSubmitEpic };
