import { catchError, switchMap } from "rxjs/operators";
import { EMPTY } from "rxjs";
import { isCreator } from "@sb/utils";
import { Logger } from "../../../../common/Utils/Logger";
import { callWithAbort } from "../../../../common/Utils/EpicUtils/CallWithAbort";
import { type TPlatformEpic } from "../../Root/Epic/TPlatformEpic";
import { ticketDetailReceivedAction } from "../TicketActions";
import { requestUnreadTicketsCountEpic } from "./RequestUnreadTicketsCount";

const onLoadTicketEpic: TPlatformEpic = (
  action$,
  state$,
  deps,
) => action$.pipe(
  isCreator(ticketDetailReceivedAction),
  switchMap(({ payload: { detail: { id } } }) => {
    const httpApi = deps.platformHttpApi;

    return callWithAbort(httpApi.callReadTicket, { ticketId: id }).pipe(
      switchMap(() => requestUnreadTicketsCountEpic(action$, state$, deps)),
      catchError((error) => {
        Logger.warn.epic("Error on read ticket", error);

        return EMPTY;
      }),
    );
  }),
);

export { onLoadTicketEpic };
