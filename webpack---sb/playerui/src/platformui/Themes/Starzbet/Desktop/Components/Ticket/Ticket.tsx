import clsx from "clsx";
import { memo } from "react";
import { useTranslation } from "@sb/translator";
import {
  platformui_starzbet_ticket_title_department,
  platformui_starzbet_ticket_title_subject,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { qaAttr, TicketsPageQAAtr } from "@sb/qa-attributes";
import { EPlatform_TicketStatus } from "@sb/graphql-client";
import classes from "./Ticket.module.css";
import { LinkLocalized } from "../../../../../../common/Client/Core/Services/RouterService/Components/LinkLocalized/LinkLocalized";
import { DateFormat } from "../../../../../../common/Components/Date/DateFormat";
import { ticketDepartmentTKeys } from "../../../../../Store/Ticket/Model/Ticket";
import { routeMap } from "../../../../../RouteMap/RouteMap";
import { Ellipsis } from "../../../../../Components/Ellipsis/Ellipsis";
import { type TPlayerDepartment, type TPlayerTicket } from "../../../../../Store/Ticket/TicketInitialState";

const statusClass = {
  [EPlatform_TicketStatus.opened]: classes.opened,
  [EPlatform_TicketStatus.closed]: classes.closed,
};

interface ITicketHeadProps {
  subject: string;
  department: TPlayerDepartment;
}

const TicketHead = memo<ITicketHeadProps>(({
  subject,
  department,
}) => {
  const [t] = useTranslation();

  return (
    <div className={classes.ticketInfo}>
      <div className={classes.field}>
        <span className={classes.name}>
          <Ellipsis>
            {t(platformui_starzbet_ticket_title_subject)}
          </Ellipsis>
        </span>

        <span className={classes.text}>
          <Ellipsis>
            {subject}
          </Ellipsis>
        </span>
      </div>

      <div className={classes.field}>
        <span className={classes.name}>
          <Ellipsis>
            {t(platformui_starzbet_ticket_title_department)}
          </Ellipsis>
        </span>

        <span className={classes.text}>
          {t(ticketDepartmentTKeys[department])}
        </span>
      </div>
    </div>
  );
});
TicketHead.displayName = "TicketHead";

interface ITicketInfoProps extends ITicketHeadProps {
  openedAt: number;
}

const TicketInfo = memo<ITicketInfoProps>(({
  subject,
  department,
  openedAt,
}) => (
  <>
    <TicketHead
      subject={subject}
      department={department}
    />

    <div className={classes.date}>
      <DateFormat date={openedAt} format={"dd MMM yyyy HH:mm"} />
    </div>
  </>
));
TicketInfo.displayName = "TicketInfo";

const Ticket = memo<TPlayerTicket>(({
  id,
  openedAt,
  status,
  subject,
  department,
}) => {
  const params = { id };

  return (
    <LinkLocalized
      to={routeMap.ticketDetail}
      params={params}
      className={clsx(classes.ticket, statusClass[status])}
      {...qaAttr(TicketsPageQAAtr.ticketDetailsAction)}
    >
      <TicketInfo openedAt={openedAt} subject={subject} department={department} />
    </LinkLocalized>
  );
});
Ticket.displayName = "Ticket";

export { Ticket, TicketInfo };
