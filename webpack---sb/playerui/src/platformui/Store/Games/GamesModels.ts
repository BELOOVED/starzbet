import type { TPlatform_ExtendedGameLabelByPlayer_Fragment, TPlatform_GamePageInfo_Fragment } from "@sb/graphql-client/PlayerUI";
import { type EGamePage } from "@sb/betting-core/EGamePage";
import { type TGameProviderEnum } from "../../../common/Store/Provider/ProviderModel";

enum EExternalGameId {
  FALCON_TOMBALA = "falcon_tombala",
  SWEET_BONANZA = "vs20fruitsw",
  GATES_OF_OLYMPUS = "vs20olympgate",
  STREAK = "streak",
  JETX = "JetX",
  AVIATOR = "aviator",
  BETFAIR = "betfair",
}

interface IGamesWithPageInfo {
  gameIds: string[];
  pageInfo: TPlatform_GamePageInfo_Fragment;
  visibleRows: number;
  isWithDga?: boolean;
  loadedForPlayerBonusId?: string;
}

interface IGameProviderWithCount {
  gamesCount: number;
  provider: TGameProviderEnum;
}

interface IGamePage {
  page: EGamePage;
  gamesCount: number;
  labels: TPlatform_ExtendedGameLabelByPlayer_Fragment[];
  providers: IGameProviderWithCount[];
}

export type {
  IGamesWithPageInfo,
  IGameProviderWithCount,
  IGamePage,
};
export { EExternalGameId };
