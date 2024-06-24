import { concat, EMPTY, merge, type Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { type Epic } from "redux-observable";
import { type AnyAction } from "redux";
import { type TArrayNotEmpty, type TExplicitAny } from "@sb/utils";
import { createSubscribe } from "../../../../common/Utils/EpicUtils/CreateSubscribe";
import { type IDepsWithConnection } from "../../../../common/Utils/EpicUtils/CreateConnectedByRouteEpic";
import { Logger } from "../../../../common/Utils/Logger";
import { playerIdNotNilSelector } from "../../../../common/Store/Player/Selectors/PlayerSelectors";
import { playerGroupIdNotNilSelector } from "../../../../common/Store/Player/Selectors/PlayerGroupIdSelectors";
import { whenPlayerGroupIdChangedEpic } from "../../../../common/Store/Player/Epics/WhenPlayerGroupIdChangedEpic";
import { pushLocalized } from "../../../../common/Client/Core/Services/RouterService/Utils/LocationChangeLocalized";
import { routeMap } from "../../../RouteMap/RouteMap";
import { type IDepsWithPlatformHttpApi, type TPlatformEpic } from "../../Root/Epic/TPlatformEpic";
import { type TPlatformAppState } from "../../PlatformInitialState";
import { localeSelector } from "../../Locale/Selectors/localeSelector";
import { userMessageMessageCreatedAction, userMessageMessageDeletedAction } from "../UserMessageActions";
import { EUserMessageAction, isUserMessageSubscription } from "../UserMessageModels";
import {
  userMessageFindDetailedMessageIdSelector,
  userMessageFindMessageByIdSelector,
  userMessageIsMessageExistsSelector,
} from "../UserMessageSelectors";
import { userMessageLoadMessageWithoutSeenByIdEpicFactory } from "./UserMessageLoadMessageByIdEpicFactory";
import { userMessageLoadUnseenCountEpic } from "./UserMessageLoadUnseenCountEpic";

type TActionHandlerEpicFactory = (messageId: string) => TPlatformEpic;

const handleMessageCreationEpicFactory: TActionHandlerEpicFactory = (messageId) =>
  (action$, state$, deps) => merge(
    of(userMessageMessageCreatedAction()),
    userMessageLoadMessageWithoutSeenByIdEpicFactory(messageId, true)(action$, state$, deps),
  );

const handleMessageUpdateEpicFactory: TActionHandlerEpicFactory = (messageId) =>
  (action$, state$, deps) => {
    const exists = userMessageIsMessageExistsSelector(state$.value, messageId);

    if (exists) {
      return userMessageLoadMessageWithoutSeenByIdEpicFactory(messageId)(action$, state$, deps);
    }

    return EMPTY;
  };

const handleMessageDeletionEpicFactory: TActionHandlerEpicFactory = (messageId) =>
  (action$, state$, deps) => {
    const detailedId = userMessageFindDetailedMessageIdSelector(state$.value);
    const locale = localeSelector(state$.value);

    const out$: TArrayNotEmpty<Observable<AnyAction>> = [
      of(userMessageMessageDeletedAction(messageId)),
    ];

    /**
     * If message that details of with is currently opened we must
     * push user to another route before deleting message from state
     */
    if (detailedId && detailedId === messageId) {
      out$.unshift(of(pushLocalized(locale, routeMap.userMessages)));
    }

    const message = userMessageFindMessageByIdSelector(state$.value, messageId);

    /**
     * After deleting message from state we must update unseen count (in reducer)
     * If there is no such message in state we don't know was it seen or not
     * so count must be re-fetched
     */
    if (!message) {
      out$.push(userMessageLoadUnseenCountEpic(action$, state$, deps));
    }

    return concat(...out$);
  };

const ACTION_TO_EPIC_FACTORY: Record<EUserMessageAction, TActionHandlerEpicFactory> = {
  [EUserMessageAction.created]: handleMessageCreationEpicFactory,
  [EUserMessageAction.updated]: handleMessageUpdateEpicFactory,
  [EUserMessageAction.deleted]: handleMessageDeletionEpicFactory,
};

const handlePayloadEpicFactory = (payload: TExplicitAny): TPlatformEpic => {
  if (!isUserMessageSubscription(payload)) {
    throw new Error(`[handlePayloadEpicFactory] Subscription payload is unknown - ${payload}`);
  }

  const { messageId, type } = payload;

  return ACTION_TO_EPIC_FACTORY[type](messageId);
};

const userMessageGroupSubscriptionEpic: Epic<
  AnyAction,
  AnyAction,
  TPlatformAppState,
  IDepsWithPlatformHttpApi & IDepsWithConnection
> = (action$, state$, dependencies) => {
  const groupId = playerGroupIdNotNilSelector(state$.value);

  return createSubscribe(`sumstats.user_messages.group.player.${groupId}`, handlePayloadEpicFactory)(action$, state$, dependencies);
};

const userMessageSubscriptionEpic: Epic<
  AnyAction,
  AnyAction,
  TPlatformAppState,
  IDepsWithPlatformHttpApi & IDepsWithConnection
> = (action$, state$, deps) => {
  const playerId = playerIdNotNilSelector(state$.value);

  const epics = [
    "sumstats.user_messages.all.player",
    `sumstats.user_messages.user.player.${playerId}`,
  ].map((it) => createSubscribe(it, handlePayloadEpicFactory)(action$, state$, deps));

  return merge(
    ...epics,
    whenPlayerGroupIdChangedEpic(userMessageGroupSubscriptionEpic)(action$, state$, deps),
  ).pipe(
    catchError((error) => {
      Logger.warn.epic("Epic \"userMessageSubscriptionEpic\" failed", error);

      return EMPTY;
    }),
  );
};

export { userMessageSubscriptionEpic };
