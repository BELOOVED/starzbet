import { EPlatform_GameGridType } from "@sb/graphql-client";
import { IS_SERVER } from "@sb/utils";

const ALL_PROVIDERS_PAGE_ROWS_COUNT_PER_LABEL = 2; // 'providers/all'
const GAME_LIST_INITIAL_ROWS_COUNT = 4;  // 'providers/provider' || 'labels/labelId' todo ?? for search
const GAME_LIST_LOAD_MORE_STEP = 4;  // 'providers/provider' || 'labels/labelId' todo ?? for search

const fallbackDesktopGridType = EPlatform_GameGridType.size8; // fallback for not matched media

const FALLBACK = [
  ["(max-width: 1438px)", EPlatform_GameGridType.size3],
  ["(max-width: 1918px)", EPlatform_GameGridType.size4],
  ["(max-width: 5118px)", EPlatform_GameGridType.size6],
] as const satisfies readonly (readonly [string, EPlatform_GameGridType])[];

const BETORSPIN = [
  ["(max-width: 1438px)", EPlatform_GameGridType.size4],
  ["(max-width: 1910px)", EPlatform_GameGridType.size6],
  ["(max-width: 5118px)", EPlatform_GameGridType.size8],
] as const satisfies readonly (readonly [string, EPlatform_GameGridType])[];

const BAYWIN = [
  ["(max-width: 1200px)", EPlatform_GameGridType.size3],
  ["(max-width: 1440px)", EPlatform_GameGridType.size4],
  ["(max-width: 5118px)", EPlatform_GameGridType.size6],
] as const satisfies readonly (readonly [string, EPlatform_GameGridType])[];

const STARZBET = [
  ["(max-width: 1350px)", EPlatform_GameGridType.size4],
  ["(max-width: 1920px)", EPlatform_GameGridType.size6],
  ["(max-width: 5118px)", EPlatform_GameGridType.size8],
] as const satisfies readonly (readonly [string, EPlatform_GameGridType])[];

const BETPUBLIC = [
  ["(max-width: 1350px)", EPlatform_GameGridType.size3],
  ["(max-width: 1600px)", EPlatform_GameGridType.size4],
  ["(max-width: 2500px)", EPlatform_GameGridType.size6],
  ["(max-width: 5118px)", EPlatform_GameGridType.size8],
] as const satisfies readonly (readonly [string, EPlatform_GameGridType])[];

const ZLOT = [
  ["(max-width: 1438px)", EPlatform_GameGridType.size3],
  ["(max-width: 1910px)", EPlatform_GameGridType.size4],
  ["(max-width: 5118px)", EPlatform_GameGridType.size6],
] as const satisfies readonly (readonly [string, EPlatform_GameGridType])[];

const BETWIZ = [
  ["(max-width: 1200px)", EPlatform_GameGridType.size3],
  ["(max-width: 1438px)", EPlatform_GameGridType.size4],
  ["(max-width: 1910px)", EPlatform_GameGridType.size6],
  ["(max-width: 5118px)", EPlatform_GameGridType.size8],
] as const satisfies readonly (readonly [string, EPlatform_GameGridType])[];

const mediaQueryWithGridTypeListByThemeMap: Record<string, readonly (readonly [string, EPlatform_GameGridType])[]> = {
  "betorspin": BETORSPIN,
  "baywin": BAYWIN,
  "starzbet": STARZBET,
  "betpublic": BETPUBLIC,
  "zlot": ZLOT,
  "betwiz": BETWIZ,
};

const mediaQueryWithGridTypeList = mediaQueryWithGridTypeListByThemeMap[process.env.THEME] ?? FALLBACK;

const mediaQueryLists = IS_SERVER ? [] : mediaQueryWithGridTypeList.map(([query]) => query).map(window.matchMedia);

export {
  ALL_PROVIDERS_PAGE_ROWS_COUNT_PER_LABEL,
  GAME_LIST_INITIAL_ROWS_COUNT,
  GAME_LIST_LOAD_MORE_STEP,
  fallbackDesktopGridType,
  mediaQueryLists,
  mediaQueryWithGridTypeList,
};
