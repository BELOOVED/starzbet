import { type TBet } from "../../../sportsbookui/Store/MyBets/Model/TBet";

interface ISharedBetsState {
  bets: Record<string, TBet>;
}

interface IWithSharedBetsState {
  sharedBets: ISharedBetsState;
}

const sharedBetsInitialState: IWithSharedBetsState = {
  sharedBets: {
    bets: {},
  },
};

export {
  type IWithSharedBetsState,
  sharedBetsInitialState,
};
