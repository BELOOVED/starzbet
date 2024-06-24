import { memo } from "react";
import { type TVoidFn, useParamSelector } from "@sb/utils";
import classes from "./ReplyMessage.module.css";
import { CloseDefaultIcon } from "../../../../../../common/Themes/Starzbet/Components/Icons/CloseIcon/CloseIcon";
import { ticketMessageByIdSelector } from "../../../../../Store/Ticket/Selectors/TicketSelectors";
import { RepliedMessage } from "../TicketMessage/TicketMessage";

interface IReplyMessageProps {
  parentMessage: string;
  setParentMessage: TVoidFn;
}

const ReplyMessage = memo<IReplyMessageProps>(({ parentMessage, setParentMessage }) => {
  const message = useParamSelector(ticketMessageByIdSelector, [parentMessage]);

  const handler = () => setParentMessage(null);

  return (
    <div className={classes.replyMessage}>
      <RepliedMessage {...message} />

      <button className={classes.close} onClick={handler}>
        <CloseDefaultIcon color={"darkText"} />
      </button>
    </div>
  );
});
ReplyMessage.displayName = "ReplyMessage";

export { ReplyMessage };
