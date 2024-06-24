import type { IMoney } from "@sb/utils";
import type {
  IBonusCanceledPayload,
  IBonusCompletedPayload,
  IBonusLostPayload,
  IBonusWonPayload,
  TBonusActivatedPayload,
  TProceededToWageringStagePayload,
} from "../../Model/BonusWebSocketEvents";

interface IBonusEventsState {
  playerBonusHasBeenCanceled: IBonusCanceledPayload | null;
  playerBonusHasBeenWon: IBonusWonPayload | null;
  playerBonusHasBeenCompleted: IBonusCompletedPayload | null;
  playerBonusHasBeenLost: IBonusLostPayload | null;
  playerBonusHasBeenActivated: TBonusActivatedPayload | null;
  playerBonusProceededToWageringStage: TProceededToWageringStagePayload | null;
  wageringProgress: null | { current: IMoney; total: IMoney; };
}

type TBonusEvent = keyof IBonusEventsState;

interface IWithBonusEvents {
  bonusEvent: IBonusEventsState;
}

const bonusEventsInitialState: IWithBonusEvents = {
  bonusEvent: {
    playerBonusHasBeenCanceled: null,
    playerBonusHasBeenWon: null,
    playerBonusHasBeenCompleted: null,
    playerBonusHasBeenLost: null,
    playerBonusHasBeenActivated: null,
    playerBonusProceededToWageringStage: null,
    wageringProgress: null,
  },
};

export { bonusEventsInitialState, type IWithBonusEvents, type TBonusEvent };
