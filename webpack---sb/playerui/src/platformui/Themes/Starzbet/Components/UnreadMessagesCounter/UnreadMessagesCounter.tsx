import { PlayerUIQaAttributes } from "@sb/qa-attributes";
import { withProps } from "@sb/utils";
import { ticketSelectors } from "../../../../Store/Ticket/Selectors/TicketSelectors";
import { Counter } from "../Counter/Counter";

const UnreadMessagesCounter = withProps(Counter)({
  selector: ticketSelectors.unreadCounter,
  qaAttribute: PlayerUIQaAttributes.SideMenu.MessagesCounter,
});

export { UnreadMessagesCounter };
