import { combineEpics } from "redux-observable";
import { switchMap } from "rxjs/operators";
import { isCreator } from "@sb/utils";
import { routerEpic } from "@sb/router";
import { type TMixAppEpic } from "../../../../common/Store/Root/Epics/TMixAppEpic";
import { getMatch } from "../../../../common/Utils/RouterUtils/GetMatch";
import { ticketsMatchOptions } from "../../PlatformMatchOptions";
import { ticketNextPageAction, ticketPrevPageAction } from "../TicketActions";
import { openTicketFormEpic } from "../Forms/OpenTicketForm/Epics/OpenTicketFormEpic";
import { requestTicketsEpic } from "./RequestTicketsEpic";

const ticketsPaginatorEpic: TMixAppEpic = (
  action$,
  state$,
  dependencies,
) => action$.pipe(
  isCreator(ticketNextPageAction, ticketPrevPageAction),
  switchMap(() => requestTicketsEpic(
    action$,
    state$,
    dependencies,
  )),
);

const ticketsRouteEpic = routerEpic({
  name: "tickets",
  match: getMatch(ticketsMatchOptions),
  onStart: () => combineEpics(
    requestTicketsEpic,
    ticketsPaginatorEpic,
    openTicketFormEpic,
  ),
});

export { ticketsRouteEpic };
