import type { TReducer } from "@sb/utils";
import { type reloadGameLinkAction } from "../../PlayGamePage/Actions/PlayGameActions";
import type { IWithBonusEvents } from "../BonusEventsInitialState";

const bonusCloseAllModalsReducer: TReducer<IWithBonusEvents, typeof reloadGameLinkAction> = (
  state,
) => ({
  ...state,
  bonusEvent: {
    ...state.bonusEvent,
    playerBonusHasBeenCanceled: null,
    playerBonusHasBeenWon: null,
    playerBonusHasBeenCompleted: null,
    playerBonusHasBeenLost: null,
    playerBonusHasBeenActivated: null,
    playerBonusProceededToWageringStage: null,
  },
});

export { bonusCloseAllModalsReducer };
