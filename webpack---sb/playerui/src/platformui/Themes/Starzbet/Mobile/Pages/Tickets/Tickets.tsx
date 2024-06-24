import { memo } from "react";
import { useSelector } from "react-redux";
import {
  platformui_starzbet_navLink_myAccount,
  platformui_starzbet_ticket_title_allTickets,
  platformui_starzbet_ticket_title_tickets,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { isNotEmpty } from "@sb/utils";
import { useTranslation } from "@sb/translator";
import classes from "./Tickets.module.css";
import { ticketSelectors } from "../../../../../Store/Ticket/Selectors/TicketSelectors";
import { routeMap } from "../../../../../RouteMap/RouteMap";
import { Ticket } from "../../../Desktop/Components/Ticket/Ticket";
import { TicketPaginator } from "../../../Desktop/Components/Paginator/Paginator";
import { VerifiedIcon } from "../../../Components/Icons/VerifiedIcon/VerifiedIcon";
import { OpenTicketFailedModal } from "../../../Components/TicketsModal/OpenTicketFailedModal";
import { OpenTicketForm } from "../../../Components/Tickets/OpenTicketForm/OpenTicketForm";
import { AccountPage } from "../../Components/AccountPage/AccountPage";
import { type TPageHeaderSourceMap } from "../../Components/PageHeader/PageHeader";

const TicketsCards = memo(() => {
  const [t] = useTranslation();

  const nodes = useSelector(ticketSelectors.nodes);

  return (
    <>
      {
        isNotEmpty(nodes)
          ? (
            <div className={classes.title}>
              {t(platformui_starzbet_ticket_title_allTickets)}
            </div>
          )
          : null
      }

      {nodes.map((ticket) => <Ticket {...ticket} key={ticket.id} />)}
    </>
  );
});
TicketsCards.displayName = "TicketsCards";

const headerRouteMap: TPageHeaderSourceMap = [
  {
    titleTKey: platformui_starzbet_navLink_myAccount,
    path: routeMap.myAccountRoute,
  },
  {
    titleTKey: platformui_starzbet_ticket_title_tickets,
  },
];

const Tickets = memo(() => {
  const [t] = useTranslation();

  return (
    <AccountPage
      icon={VerifiedIcon}
      headerColorScheme={"orange-gradient"}
      routeMap={headerRouteMap}
      backPath={routeMap.myAccountRoute}
      title={t(platformui_starzbet_ticket_title_tickets)}
    >
      <OpenTicketFailedModal />

      <div className={classes.tickets}>
        <OpenTicketForm />

        <TicketsCards />

        <TicketPaginator />
      </div>
    </AccountPage>
  );
});
Tickets.displayName = "Tickets";

export { Tickets };
