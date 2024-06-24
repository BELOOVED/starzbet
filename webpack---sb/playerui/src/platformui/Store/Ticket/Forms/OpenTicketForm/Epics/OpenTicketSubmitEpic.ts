import { selectFormValue } from "@sb/form-new";
import { temporaryFileSelector } from "@sb/file-service";
import { playerIdNotNilSelector } from "../../../../../../common/Store/Player/Selectors/PlayerSelectors";
import { callWithAbort } from "../../../../../../common/Utils/EpicUtils/CallWithAbort";
import { formSubmitEpicFactory } from "../../../../../Utils/FormSubmitEpicFactory";
import { requestTicketsEpic } from "../../../Epics/RequestTicketsEpic";
import { OPEN_TICKET_FORM_NAME, type TOpenTicketForm } from "../Model";

const openTicketSubmitEpic = formSubmitEpicFactory({
  formName: OPEN_TICKET_FORM_NAME,
  createCall: (state, deps) => {
    const payload = selectFormValue<TOpenTicketForm>(state, OPEN_TICKET_FORM_NAME);
    const relatedPlayerId = playerIdNotNilSelector(state);

    return callWithAbort(
      deps.platformHttpApi.callOpenTicket,
      {
        ...payload,
        files: payload.attachedFiles?.files?.map(({ id }) => temporaryFileSelector(state, id, ["openTicketSubmitEpic"])),
        relation: {
          __payloadKind: "PlayerRelation",
          id: relatedPlayerId,
        },
      },
    );
  },
  onSuccess: () => requestTicketsEpic,
});

export { openTicketSubmitEpic };
