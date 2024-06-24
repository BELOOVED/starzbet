import { combineEpics, type Epic } from "redux-observable";
import { concat, of } from "rxjs";
import { type AnyAction } from "redux";
import {
  createConnectedEpic,
  type IDepsWithConnection,
} from "../../../../common/Utils/EpicUtils/CreateConnectedByRouteEpic";
import { whenPlayerIdExist } from "../../../../common/Store/Player/Epics/WhenPlayerIdExist";
import { type IDepsWithPlatformHttpApi } from "../../Root/Epic/TPlatformEpic";
import { type TPlatformAppState } from "../../PlatformInitialState";
import { userMessageRestAction } from "../UserMessageActions";
import { userMessageShouldResetSelector } from "../UserMessageSelectors";
import { userMessageSubscriptionEpic } from "./UserMessageSubscriptionEpic";
import { userMessageDetailsRouteEpic } from "./UserMessageDetailsRouteEpic";
import { userMessageLoadUnseenCountEpic } from "./UserMessageLoadUnseenCountEpic";
import { userMessageRouteEpic } from "./UserMessageRouteEpic";
import { userMessageLoadLastMessageEpic } from "./UserMessageLoadLastMessageEpic";
import { userMessageLoadMoreMessagesEpic } from "./UserMessageLoadMoreMessagesEpic";

type TUserMessageEpic<D = unknown> = Epic<
  AnyAction,
  AnyAction,
  TPlatformAppState,
  IDepsWithPlatformHttpApi & D
>;

const epic: TUserMessageEpic<IDepsWithConnection> = (action$, state$, deps) => {
  const combinedEpics$ = combineEpics(
    userMessageLoadUnseenCountEpic,
    userMessageLoadLastMessageEpic,
    userMessageSubscriptionEpic,
    userMessageRouteEpic,
    userMessageDetailsRouteEpic,
    userMessageLoadMoreMessagesEpic,
  )(action$, state$, deps);

  if (userMessageShouldResetSelector(state$.value)) {
    return concat(
      of(userMessageRestAction()),
      combinedEpics$,
    );
  }

  return combinedEpics$;
};

const userMessageConnectedEpic: TUserMessageEpic = whenPlayerIdExist(
  createConnectedEpic(epic),
);

export { userMessageConnectedEpic };
