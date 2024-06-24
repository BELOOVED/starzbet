import type { TPlatform_Game_Fragment, TPlatform_PlayerBonus_Fragment } from "@sb/graphql-client/PlayerUI";
import type { IMoney } from "@sb/utils";
import { type TCallResponsePayload } from "@sb/sdk";
import { type call_GetGameLinkCommand } from "@sb/sdk/SDKClient/gamemanager";
import {
  type IBonusCanceledPayload,
  type IBonusCompletedPayload,
  type IBonusLostPayload,
  type IBonusWonPayload,
  type TBonusActivatedPayload,
  type TProceededToWageringStagePayload,
} from "../../Model/BonusWebSocketEvents";

type TGameLinkType = TCallResponsePayload<typeof call_GetGameLinkCommand>["type"]

interface IPlayGameState {
  link: string | null;
  type: TGameLinkType | null;
  game: TPlatform_Game_Fragment | null;
  playerBonuses: TPlatform_PlayerBonus_Fragment[];
  playerBonusHasBeenCanceled: IBonusCanceledPayload | null;
  playerBonusHasBeenWon: IBonusWonPayload | null;
  playerBonusHasBeenCompleted: IBonusCompletedPayload | null;
  playerBonusHasBeenLost: IBonusLostPayload | null;
  playerBonusHasBeenActivated: TBonusActivatedPayload | null;
  playerBonusProceededToWageringStage: TProceededToWageringStagePayload | null;
  wageringProgress: null | { current: IMoney; total: IMoney; };
  isDemo: boolean | null;
}

type TPlayerBonusEventStateKey = Extract<
  keyof IPlayGameState,
  "playerBonusHasBeenCanceled" |
  "playerBonusHasBeenWon" |
  "playerBonusHasBeenLost" |
  "playerBonusHasBeenActivated" |
  "playerBonusHasBeenCompleted" |
  "playerBonusProceededToWageringStage"
>

type TWithPlayGameState = {
  playGame: IPlayGameState;
}

const playGameInitialState: TWithPlayGameState = {
  playGame: {
    link: null,
    type: null,
    game: null,
    playerBonuses: [],
    playerBonusHasBeenCanceled: null,
    playerBonusHasBeenWon: null,
    playerBonusHasBeenCompleted: null,
    playerBonusHasBeenLost: null,
    playerBonusHasBeenActivated: null,
    playerBonusProceededToWageringStage: null,
    wageringProgress: null,
    isDemo: null,
  },
};

export {
  type TGameLinkType,
  type TWithPlayGameState,
  type TPlayerBonusEventStateKey,
  playGameInitialState,
};
