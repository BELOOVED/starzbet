import { type TBet } from "../../../sportsbookui/Store/MyBets/Model/TBet";

const sharedBetOpenDetailsClickedAction = (betId: string) => ({
  type: "SHARED_BET_OPEN_DETAILS_CLICKED",
  payload: { betId },
});

const sharedBetRetryClickedAction = (betId: string) => ({
  type: "SHARED_BET_RETRY_CLICKED",
  payload: { betId },
});

const sharedBetLoadedAction = (bet: TBet) => ({
  type: "SHARED_BET_LOADED",
  payload: { bet },
});

export {
  sharedBetOpenDetailsClickedAction,
  sharedBetRetryClickedAction,
  sharedBetLoadedAction,
};
