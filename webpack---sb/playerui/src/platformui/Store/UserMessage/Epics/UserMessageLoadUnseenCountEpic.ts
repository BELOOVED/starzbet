import { of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { callManagerFailedAction } from "@sb/call-manager";
import { Logger } from "../../../../common/Utils/Logger";
import { callWithAbort } from "../../../../common/Utils/EpicUtils/CallWithAbort";
import { type TPlatformEpic } from "../../Root/Epic/TPlatformEpic";
import { userMessageUnseenCountReceivedAction } from "../UserMessageActions";
import { USER_MESSAGE_UNSEEN_COUNT_LOADING_SYMBOL } from "../UserMessageVariables";

const userMessageLoadUnseenCountEpic: TPlatformEpic = (
  action$,
  state$,
  deps,
) => callWithAbort(deps.platformHttpApi.callUserMessageUnseenCount, {})
  .pipe(
    map((count) => userMessageUnseenCountReceivedAction(count)),
    catchError((error) => {
      Logger.warn.epic("Epic \"userMessageLoadUnseenCountEpic\" failed", error);

      return of(callManagerFailedAction(USER_MESSAGE_UNSEEN_COUNT_LOADING_SYMBOL, error));
    }),
  );

export { userMessageLoadUnseenCountEpic };

