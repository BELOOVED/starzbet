import { combineEpics } from "redux-observable";
import "../DynamicStore/BonusBalanceBetSlipDecorator";
import { type TAppEpic } from "../../../../common/Store/Root/Epics/TAppEpic";
import { placeBetEpic } from "./PlaceBetEpic";
import { betSlipLocalStorageRouterEpic } from "./BetSlipLocalStorageRouterEpic";
import { betSlipShareEpic } from "./BetSlipShareEpic";
import { betSlipChangeTabEpic } from "./BetSlipChangeTabEpic";
import { betSlipRacingBetEpic } from "./BetSlipRacingBetEpic";

const betSlipRootEpic: TAppEpic = combineEpics(
  betSlipLocalStorageRouterEpic,
  betSlipShareEpic,
  betSlipChangeTabEpic,
  placeBetEpic,
  betSlipRacingBetEpic,
);

export { betSlipRootEpic };
