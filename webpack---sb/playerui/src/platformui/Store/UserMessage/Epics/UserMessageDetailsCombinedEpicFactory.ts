import { catchError, map, switchMap } from "rxjs/operators";
import { EMPTY, filter, of, take } from "rxjs";
import { combineEpics } from "redux-observable";
import { type TSelector } from "@sb/utils";
import { Logger } from "../../../../common/Utils/Logger";
import { callWithAbort } from "../../../../common/Utils/EpicUtils/CallWithAbort";
import { type TPlatformEpic } from "../../Root/Epic/TPlatformEpic";
import { type TPlatformAppState } from "../../PlatformInitialState";
import {
  userMessageIsMessageExistsSelector,
  userMessageIsMessageSeenSelector,
  userMessagePropertySelectors,
} from "../UserMessageSelectors";
import { userMessageDropUnseenMessageIdAction, userMessageMessageSeenAction } from "../UserMessageActions";
import { userMessageLoadMessageByIdEpicFactory } from "./UserMessageLoadMessageByIdEpicFactory";

const markMessageAsSeenEpicFactory = (
  detailedIdSelector: TSelector<TPlatformAppState, string>,
  isDetailedIdExistSelector: TSelector<TPlatformAppState, boolean>,
): TPlatformEpic =>
  (_, state$, deps) =>
    state$
      .pipe(
        map(isDetailedIdExistSelector),
        filter(Boolean),
        take(1),
        map(() => detailedIdSelector(state$.value)),
        filter((id) => !userMessageIsMessageSeenSelector(state$.value, id)),
        switchMap(
          (id) => callWithAbort(deps.platformHttpApi.callUserMessageMarkAsSeen, { messageIds: [id] })
            .pipe(
              //the message can be deleted during call processing
              filter(() => userMessageIsMessageExistsSelector(state$.value, id)),
              map(() => userMessageMessageSeenAction(id)),
              catchError((error) => {
                Logger.warn.epic("Epic \"markAsSeenEpic\" failed", error);

                return EMPTY;
              }),
            ),
        ),
      );

const loadMessageEpicFactory = (
  detailedIdSelector: TSelector<TPlatformAppState, string>,
): TPlatformEpic =>
  (action$, state$, deps) => {
    const id = detailedIdSelector(state$.value);

    const exists = userMessageIsMessageExistsSelector(state$.value, id);

    if (exists) {
      return EMPTY;
    }

    return userMessageLoadMessageByIdEpicFactory(id)(action$, state$, deps);
  };

const dropUnseenMessageIdEpicFactory = (
  detailedIdSelector: TSelector<TPlatformAppState, string>,
): TPlatformEpic =>
  (_, state$) => {
    const unseenId = userMessagePropertySelectors.unseenId(state$.value);

    if (!unseenId) {
      return EMPTY;
    }

    const id = detailedIdSelector(state$.value);

    if (unseenId !== id) {
      return EMPTY;
    }

    return of(userMessageDropUnseenMessageIdAction());
  };

const userMessageDetailsCombinedEpicFactory = (
  detailedIdSelector: TSelector<TPlatformAppState, string>,
  isDetailedExistSelector: TSelector<TPlatformAppState, boolean>,
): TPlatformEpic => combineEpics(
  markMessageAsSeenEpicFactory(detailedIdSelector, isDetailedExistSelector),
  loadMessageEpicFactory(detailedIdSelector),
  dropUnseenMessageIdEpicFactory(detailedIdSelector),
);

export { userMessageDetailsCombinedEpicFactory };
