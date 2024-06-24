// @ts-nocheck
import { isSettled } from "../../../Utils/IsSettled";
import { eventSubscriberEnum } from "../Model/EventSubscriberEnum";
import { isOutrightPick } from "../Model/Outright";
import { eventByIdSelector } from "../Selectors/FeedSelectors";
import { addSubscriberHandler } from "./Handlers/AddSubscriberHandler";
import { filterSubscribersHandler } from "./Handlers/FilterSubscribersHandler";

const updateSubscribersByMyBetsReducer = (state, { payload: { bets } }) => {
  let nextState = {
    ...state,
    feed: {
      ...state.feed,
      eventSub: {
        ...state.feed.eventSub,
        subscribers: filterSubscribersHandler(state.feed.eventSub.subscribers, eventSubscriberEnum.myBets),
      },
    },
  };

  //todo where do remove???
  bets.forEach((bet) => {
    if (!isSettled(bet)) {
      bet.picks.filter((pick) => !isOutrightPick(pick)).forEach(({ event }) => {
        if(!eventByIdSelector(state, event.id)){
          return;
        }

        nextState = addSubscriberHandler(nextState, event.id, eventSubscriberEnum.myBets);
      });
    }
  });

  return nextState;
};

export { updateSubscribersByMyBetsReducer };
