import { memo } from "react";
import { useSelector } from "react-redux";
import { useActionWithBind, withCondition } from "@sb/utils";
import { callManagerRemoveSymbolAction } from "@sb/call-manager";
import { openTicketFailedMessageSelector, openTicketFailedSelector } from "../../../../Store/Ticket/Selectors/TicketSelectors";
import { TICKETS_OPEN_TICKET_SYMBOL } from "../../../../Store/Ticket/Model/Ticket";
import { ThemedModalErrorMessage } from "../ThemedModal/ThemedModalPrefabs/ThemedModalMessage";

const OpenTicketFailedModal = withCondition(
  openTicketFailedSelector,
  memo(() => {
    const errorMessage = useSelector(openTicketFailedMessageSelector);

    const onClose = useActionWithBind(callManagerRemoveSymbolAction, TICKETS_OPEN_TICKET_SYMBOL);

    return (
      <ThemedModalErrorMessage
        hideModal={onClose}
        title={errorMessage}
      />
    );
  }),
);
OpenTicketFailedModal.displayName = "OpenTicketFailedModal";

export { OpenTicketFailedModal };
