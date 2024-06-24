import { type ButtonHTMLAttributes, memo, useCallback } from "react";
import { useSelector } from "react-redux";
import { useChatAutoscroll } from "@sb/utils";
import {
  platformui_starzbet_navLink_myAccount,
  platformui_starzbet_ticket_title_details,
  platformui_starzbet_ticket_title_tickets,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import classes from "./TicketDetail.module.css";
import { Arrow } from "../../../../../../sportsbookui/Themes/Starzbet/OriginalApplication/Components/Arrow/Arrow";
import { Loader } from "../../../../../../common/Themes/Starzbet/Components/Loader/Loader";
import { ticketDetailLastMassageAuthorIdSelector, ticketSelectors } from "../../../../../Store/Ticket/Selectors/TicketSelectors";
import { routeMap } from "../../../../../RouteMap/RouteMap";
import { useParentMessage } from "../../../../../Store/Ticket/Forms/TicketSendForm/Hooks/UseParentMessage";
import { TicketMessage } from "../../../Components/Tickets/TicketMessage/TicketMessage";
import { TicketSendForm } from "../../../Components/Tickets/TicketSendForm/TicketSendForm";
import { ReplyMessage } from "../../../Components/Tickets/ReplyMessage/ReplyMessage";
import { VerifiedIcon } from "../../../Components/Icons/VerifiedIcon/VerifiedIcon";
import { type TPageHeaderSourceMap } from "../../../Desktop/Components/PageHeader/PageHeader";
import { AccountPage } from "../../Components/AccountPage/AccountPage";

const ScrollToBottomButton = memo<ButtonHTMLAttributes<HTMLButtonElement>>(({ ...props }) => (
  <button className={classes.scrollButton} {...props}>
    <Arrow expanded={false} />
  </button>
));
ScrollToBottomButton.displayName = "ScrollToBottomButton";

const headerRouteMap: TPageHeaderSourceMap = [
  {
    titleTKey: platformui_starzbet_navLink_myAccount,
    path: routeMap.myAccountRoute,
  },
  {
    titleTKey: platformui_starzbet_ticket_title_tickets,
    path: routeMap.tickets,
  },
  {
    titleTKey: platformui_starzbet_ticket_title_details,
  },
];

const TicketDetail = memo(() => {
  const [t] = useTranslation();

  const detail = useSelector(ticketSelectors.detail);

  const isAbleToReply = detail.status === "OPENED";

  const lastMessageAuthorId = useSelector(ticketDetailLastMassageAuthorIdSelector);

  const [parentMessage, setParentMessage] = useParentMessage();

  const shouldScrollCheck = useCallback(() => Boolean(lastMessageAuthorId), [lastMessageAuthorId]);

  const {
    scrollableRef,
    onScroll,
    isScrollInBottom,
    scrollToBottom,
  } = useChatAutoscroll<HTMLDivElement>(shouldScrollCheck, [lastMessageAuthorId, detail.messages]);

  const scrollButtonOnClickHandler = useCallback(() => scrollToBottom("smooth"), [scrollToBottom]);

  if (Object.keys(detail).length === 0) {
    return <Loader />;
  }

  return (
    <AccountPage
      icon={VerifiedIcon}
      headerColorScheme={"orange-gradient"}
      routeMap={headerRouteMap}
      backPath={routeMap.tickets}
      title={t(platformui_starzbet_ticket_title_tickets)}
    >
      <div className={classes.detail} ref={scrollableRef} onScroll={onScroll}>
        <div className={classes.messages}>
          {detail.messages.map((it) => <TicketMessage {...it} setParentMessage={setParentMessage} key={it.id} />)}

          {!isScrollInBottom && !parentMessage ? (<ScrollToBottomButton onClick={scrollButtonOnClickHandler} />) : null}
        </div>

        <div className={classes.fixed}>
          {parentMessage ? (<ReplyMessage parentMessage={parentMessage} setParentMessage={setParentMessage} />) : null}

          {isAbleToReply ? (<TicketSendForm />) : null}
        </div>
      </div>
    </AccountPage>
  );
});
TicketDetail.displayName = "TicketDetail";

export { TicketDetail };
