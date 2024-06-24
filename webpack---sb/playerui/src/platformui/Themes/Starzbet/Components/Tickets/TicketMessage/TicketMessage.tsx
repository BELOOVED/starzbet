import clsx from "clsx";
import { type FC, memo, type PropsWithChildren } from "react";
import { useTranslation } from "@sb/translator";
import {
  platformui_starzbet_ticket_title_operator,
  platformui_starzbet_ticket_title_reply,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { TicketsPageQAAtr } from "@sb/qa-attributes";
import { isNil, isNotEmpty, isNotNil, type TVoidFn, usePersistCallback } from "@sb/utils";
import type { TPlatform_TicketMessage_Fragment, TPlatform_TicketMessageAuthor_Fragment } from "@sb/graphql-client/PlayerUI";
import classes from "./TicketMessage.module.css";
import { DateFormat } from "../../../../../../common/Components/Date/DateFormat";
import { Thumbs } from "../../../Desktop/Components/Thumb/Thumb";
import { Button } from "../../../Desktop/Components/Button/Button";

interface IHeadProps {
  author: TPlatform_TicketMessageAuthor_Fragment;
}

const Head = memo<IHeadProps>(({ author }) => {
  const [t] = useTranslation();

  return (
    <div className={classes.head}>
      {
        <span className={classes.author}>
          {author.operator ? t(platformui_starzbet_ticket_title_operator) : ""}
        </span>
      }
    </div>
  );
});
Head.displayName = "Head";

interface IDateProps {
  createdAt: number;
  isOperator: boolean;
}

const Date = memo<IDateProps>(({ createdAt, isOperator }) => (
  <div className={clsx(classes.date, isOperator && classes.operatorDate)}>
    <DateFormat date={createdAt} format={"dd MMM yyyy • HH:mm"} />
  </div>
));
Date.displayName = "Date";

interface IContainerProps {
  isOperatorMessage: boolean;
}

const Container: FC<PropsWithChildren<IContainerProps>> = ({ isOperatorMessage, children }) => (
  <div className={clsx(classes.message, isOperatorMessage && classes.operators)}>
    {children}
  </div>
);
Container.displayName = "Container";

const RepliedMessage = memo<TPlatform_TicketMessage_Fragment>(({
  author,
  createdAt,
  text,
  attachedFiles,
  ...rest
}) => (
  <div className={classes.replied}>
    {
      author !== undefined
        ? (
          <>
            <Head author={author} />

            <Container isOperatorMessage={!author.player} {...rest}>
              {isNotEmpty(attachedFiles) ? <Thumbs files={attachedFiles} /> : null}

              {
                isNotNil(text) && text !== ""
                  ? (
                    <div className={classes.text}>
                      {text}
                    </div>
                  )
                  : null
              }
            </Container>
          </>
        )
        : null
    }

    <Date createdAt={createdAt} isOperator={false} />
  </div>
));
RepliedMessage.displayName = "RepliedMessage";

interface ITicketMessageProps extends TPlatform_TicketMessage_Fragment {
  setParentMessage: TVoidFn;
}

const TicketMessage = memo<ITicketMessageProps>(({
  author,
  id,
  text,
  createdAt,
  attachedFiles,
  parent,
  setParentMessage,
  ...rest
}) => {
  const player = author?.player;
  const [t] = useTranslation();

  const onClick = usePersistCallback(() => setParentMessage(id));

  const isOperator = isNil(player);

  return (
    <div className={clsx(classes.messageWrapper, isOperator && classes.operatorWrapper)}>
      {author !== undefined ? <Head author={author} /> : null}

      <Container isOperatorMessage={!player} {...rest}>
        {parent && <RepliedMessage {...parent} />}

        {isNotEmpty(attachedFiles) ? <Thumbs files={attachedFiles} /> : null}

        {
          isNotNil(text) && text !== ""
            ? (
              <div className={clsx(classes.text, !player && classes.operatorText)}>
                {text}
              </div>
            )
            : null
        }
      </Container>

      <div className={classes.bottom}>
        <Button
          className={classes.reply}
          onClick={onClick}
          qaAttribute={TicketsPageQAAtr.ticketChatReply}
        >
          {t(platformui_starzbet_ticket_title_reply)}
        </Button>

        <Date createdAt={createdAt} isOperator={isOperator} />
      </div>
    </div>
  );
});
TicketMessage.displayName = "TicketMessage";

export { RepliedMessage, TicketMessage };
