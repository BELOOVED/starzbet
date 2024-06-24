// @ts-nocheck
import { createRootReducer } from "@sb/utils";
import { modalCloseAction, modalOpenAction } from "../../../../common/Store/Modal/ModalActions";
import {
  betSlipCompletePlaceBetAction,
  betSlipCreatePickAction,
  betSlipRemoveAllPickAction,
  betSlipRemovePickAction,
} from "../../BetSlip/BetSlipActions";
import { receiveMyBetsAction } from "../../MyBets/MyBetsActions";
import {
  feedAddEventSubscriberAction,
  feedEventFetchedAction,
  feedFetchedAction,
  feedRemoveEventSubscriberAction,
  feedResetLineReadyAction,
  feedUpdatedAction,
} from "../FeedActions";
import { feedFetchedReducer } from "./FeedFetchedReducer";
import { feedUpdatedReducer } from "./FeedUpdatedReducer";
import { feedEventFetchedReducer } from "./FeedEventFetchedReducer";
import { feedAddEventSubscriberReducer } from "./FeedAddEventSubscriberReducer";
import { feedRemoveEventSubscriberReducer } from "./FeedRemoveEventSubscriberReducer";
import { addSubscriberByModalReducer } from "./AddSubscriberByModalReducer";
import { removeSubscriberByModalReducer } from "./RemoveSubscriberByModalReducer";
import { addSubscriberByBetSlipReducer } from "./AddSubscriberByBetSlipReducer";
import { removeSubscriberByPickReducer } from "./RemoveSubscriberByPickReducer";
import { removeSubscriberByAllPicksReducer } from "./RemoveSubscriberByAllPicksReducer";
import { updateSubscribersByMyBetsReducer } from "./UpdateSubscribersByMyBetsReducer";
import { feedResetLineReadyReducer } from "./FeedResetLineReadyReducer";

const feedRootReducer = createRootReducer([
  [feedFetchedReducer, feedFetchedAction],
  [feedResetLineReadyReducer, feedResetLineReadyAction],
  [feedUpdatedReducer, feedUpdatedAction],

  [feedEventFetchedReducer, feedEventFetchedAction],
  [feedAddEventSubscriberReducer, feedAddEventSubscriberAction],
  [feedRemoveEventSubscriberReducer, feedRemoveEventSubscriberAction],
  [addSubscriberByModalReducer, modalOpenAction],
  [removeSubscriberByModalReducer, modalCloseAction],
  [addSubscriberByBetSlipReducer, betSlipCreatePickAction],
  [removeSubscriberByPickReducer, betSlipRemovePickAction],
  [removeSubscriberByAllPicksReducer, betSlipRemoveAllPickAction],
  [removeSubscriberByAllPicksReducer, betSlipCompletePlaceBetAction],
  [updateSubscribersByMyBetsReducer, receiveMyBetsAction],
]);

export { feedRootReducer };
