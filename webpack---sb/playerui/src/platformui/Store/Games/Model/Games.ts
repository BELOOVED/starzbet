import matches from "lodash/fp/matches";
import { EPlatform_GameGridType, EPlatform_ImageSize } from "@sb/graphql-client";
import { EProviderCode } from "@sb/betting-core/EProviderCode";
import { entries } from "@sb/utils";
import {
  platformui_gameLabel_activeFreeSpins,
  platformui_gameLabel_all,
  platformui_gameLabel_favourite,
  platformui_gameLabel_popular,
} from "@sb/translates/platformui/CommonTKeys";
import { EGamePage } from "@sb/betting-core/EGamePage";
import { EProductCode } from "@sb/betting-core/EProductCode";
import { createCallManagerSymbol } from "@sb/call-manager";

/**
 * this providers shouldn't be listed anywhere
 * it will be separate page for it
 * temp solution
 */
const ignoredGameProviders: EProviderCode[] = [
  EProviderCode.PARLAYBAY,
];

type TGridSize = {
  w: number;
  h: number;
}

const gridSizeMap: Record<EPlatform_ImageSize, TGridSize> = {
  [EPlatform_ImageSize.size1]: { w: 1, h: 1 },
  [EPlatform_ImageSize.size2]: { w: 2, h: 1 },
  [EPlatform_ImageSize.size4]: { w: 2, h: 2 },
};

const gameGridWidthMap: Record<EPlatform_GameGridType, number> = {
  [EPlatform_GameGridType.size2]: 2,
  [EPlatform_GameGridType.size3]: 3,
  [EPlatform_GameGridType.size4]: 4,
  [EPlatform_GameGridType.size6]: 6,
  [EPlatform_GameGridType.size8]: 8,
};

const systemLabels = {
  all: "c4c9e582-7068-4233-bbdc-37ec9fca0926",
  popular: "da9c050e-d828-42bb-95e5-66e72403d6cc",
  favourite: "52b3706c-b35a-415b-b5da-9045bf70d5e9",
  activeFreeSpins: "98f19a40-5253-4760-a801-db571c9ef210",
};

const systemLabelsTKeys: Record<string, string> = {
  "c4c9e582-7068-4233-bbdc-37ec9fca0926": platformui_gameLabel_all,
  "da9c050e-d828-42bb-95e5-66e72403d6cc": platformui_gameLabel_popular,
  "52b3706c-b35a-415b-b5da-9045bf70d5e9": platformui_gameLabel_favourite,
  "98f19a40-5253-4760-a801-db571c9ef210": platformui_gameLabel_activeFreeSpins,
};

const getImageSizeByGridSize = (w: number, h: number): EPlatform_ImageSize =>
  entries(gridSizeMap).find(([_, grid]) => matches({ w, h }, grid))?.[0] ||
  EPlatform_ImageSize.size1;

type TGameManagerPage = Exclude<EGamePage, EGamePage.VIRTUAL>;

const gameManagerPageToProductMap: Record<TGameManagerPage, EProductCode> = {
  [EGamePage.CASINO]: EProductCode.CASINO,
  [EGamePage.LIVE_CASINO]: EProductCode.LIVE_CASINO,
  [EGamePage.GAMES]: EProductCode.GAMES,
};

const gameManagerPages: [EGamePage.CASINO, EGamePage.LIVE_CASINO, EGamePage.GAMES] =
  [EGamePage.CASINO, EGamePage.LIVE_CASINO, EGamePage.GAMES];

interface IWithGamePage {
  page: TGameManagerPage;
}

const GAMES_BY_INTERNAL_IDS_LOADING_SYMBOL = createCallManagerSymbol("games_by_internal_ids");

interface IOnlineUpdate {
  subscribersCount: number;
}

export type {
  IWithGamePage,
  TGameManagerPage,
};

export {
  GAMES_BY_INTERNAL_IDS_LOADING_SYMBOL,
  gameManagerPages,
  ignoredGameProviders,
  gameGridWidthMap,
  systemLabels,
  getImageSizeByGridSize,
  systemLabelsTKeys,
  gameManagerPageToProductMap,
  type IOnlineUpdate,
};
