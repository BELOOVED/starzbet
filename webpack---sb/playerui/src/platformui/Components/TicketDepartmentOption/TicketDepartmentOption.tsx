import { memo } from "react";
import { useTranslation } from "@sb/translator";
import { getNotNil } from "@sb/utils";
import type { ISelectOption } from "../../../common/Components/Field/SelectModel";
import { ticketDepartmentTKeys } from "../../Store/Ticket/Model/Ticket";
import { type TPlayerDepartment } from "../../Store/Ticket/TicketInitialState";

const TicketDepartmentOption = memo<ISelectOption<TPlayerDepartment>>(({ value }) => {
  const [t] = useTranslation();

  return t(getNotNil(ticketDepartmentTKeys[value], ["TicketDepartmentOption"], "ticketDepartmentTKeys by value"));
});
TicketDepartmentOption.displayName = "TicketDepartmentOption";

export { TicketDepartmentOption };
