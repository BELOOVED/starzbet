import sum from "lodash/fp/sum";
import { deepEqual } from "fast-equals";
import { type EGamePage } from "@sb/betting-core/EGamePage";
import { type EPlatform_GameGridType, EPlatform_ImageSize } from "@sb/graphql-client";
import type {
  TPlatform_Game_Fragment,
  TPlatform_GameGridPosition_Fragment,
  TPlatform_GameLabelPositionSettings_Fragment,
  TPlatform_GamePreviewImage_Fragment,
  TPlatform_GameProviderByPlayer_Fragment,
} from "@sb/graphql-client/PlayerUI";
import {
  type computeGameGridLayout,
  getNotNil,
  groupBy2,
  isNil,
  isNotEmpty,
  isNotNil,
  type ShortLayout,
  sortBy,
  type TArrayNotEmpty,
} from "@sb/utils";
import { type EProviderCode } from "@sb/betting-core/EProviderCode";
import { matchPath } from "@sb/react-router-compat";
import { gameProviderTabs, isGameProvider, tabsToGameProvider, type TGameProviderEnum } from "../../../common/Store/Provider/ProviderModel";
import { IMAGE_FORMAT_PARAM, IS_WEBP_SUPPORTED } from "../../../common/Utils/GetImageFormatParam";
import { extractIds } from "../../../common/Utils/IDUtils";
import { combineProvidersPathByGamePageMap } from "../../Utils/GetGamesViewParams";
import { ignoredGameProviders, type TGameManagerPage } from "./Model/Games";
import { type IGameProviderWithCount } from "./GamesModels";

const findImage = (size: EPlatform_ImageSize, previewImages: TPlatform_GamePreviewImage_Fragment[]) =>
  previewImages.find((it) => it.imageSize === size);

const sizeToNumber: Record<EPlatform_ImageSize, 1 | 2 | 4> = {
  [EPlatform_ImageSize.size1]: 1,
  [EPlatform_ImageSize.size2]: 2,
  [EPlatform_ImageSize.size4]: 4,
};

type TEnumerate<N extends number, Acc extends number[] = []> = Acc["length"] extends N
  ? Acc[number]
  : TEnumerate<N, [...Acc, Acc["length"]]>

type TIntRange<F extends number, T extends number> = Exclude<TEnumerate<T>, TEnumerate<F>>

type TGetOptimizeUrlOptions = {
  url: string;
  height: number; //px
  width?: never;
  quality?: TIntRange<1, 100>;
} | {
  url: string;
  height?: never;
  width: number; //px
  quality?: TIntRange<1, 100>;
}

const roundUp = (num: number, multiple = 50): number => {
  const remainder = num % multiple;
  if (remainder === 0) {
    return num;
  }

  return num + (multiple - remainder);
};

const getOptimizeUrl = ({
  url,
  height,
  width,
  quality,
}: TGetOptimizeUrlOptions) => {
  const size = width ? `width=${width}` : `height=${height}`;

  const format = IMAGE_FORMAT_PARAM ? "&" + IMAGE_FORMAT_PARAM : "";

  const ext = IS_WEBP_SUPPORTED ? "webp" : "jpg";

  return `${url}.${ext}?quality=${quality}&${size}${format}`;
};

type TInfoParam = {
  width: number; //px
  height?: never;
} | {
  height: number; //px
  width?: never;
}

const getOptimizedImageUrl = (url: string, param: TInfoParam, quality: TGetOptimizeUrlOptions["quality"] = 20) => getOptimizeUrl(
  {
    quality,
    url,
    ...param.height !== undefined
      ? { height: param.height }
      : { width: param.width },
  },
);

const createSrcSetAttribute = (url: string, param: TInfoParam, quality: TGetOptimizeUrlOptions["quality"] = 20) => `${
  getOptimizedImageUrl(url, param, quality)} 1x,
  ${getOptimizedImageUrl(
    url,
    param.height !== undefined
      ? { height: param.height * 2 }
      : { width: param.width * 2 },
    quality,
  )} 2x`;

const gameImageInfoBySizeSelector = (
  size: EPlatform_ImageSize,
  previewImages: TPlatform_GamePreviewImage_Fragment[],
) => {
  const currentImage = findImage(size, previewImages);

  const image = currentImage || findImage(EPlatform_ImageSize.size1, previewImages);

  return image || null;
};

interface IImageParams {
  width: number | string;
  aspectRatio: string;
  height: number | string;
}

interface IImageInfo extends IImageParams {
  loading: "lazy" | "eager";
  src: string;
  srcset?: string;
  srcLow?: string;
  alt: string;
}

const aspectRatioMap: Record<1 | 2 | 4, Record<"w" | "h", 1 | 2>> = {
  1: { w: 1, h: 1 },
  2: { w: 2, h: 1 },
  4: { w: 1, h: 1 },
};

const aspectRatioSelector = (size: EPlatform_ImageSize, marginSum: number, param: TInfoParam) => {
  const gridSize = aspectRatioMap[sizeToNumber[size]];

  let w = gridSize.w;
  if (size === EPlatform_ImageSize.size2) {
    if (param.width !== undefined) {
      w += marginSum * 2 / param.width;
    } else {
      w += marginSum / param.height;
    }
  }

  const widthAndHeight = {
    width: param.width !== undefined ? param.width : param.height * w / gridSize.h,
    height: param.height !== undefined ? param.height : param.width * gridSize.h / w,
  };

  return {
    ...widthAndHeight,
    aspectRatio: `${w} / ${gridSize.h}`,
  };
};

const gameImageInfoBySizeAndParamSelector = (
  param: TInfoParam,
  url: string | undefined,
  imgParams: IImageParams | null,
): IImageInfo | null => {
  if (isNil(url) || isNil(imgParams)) {
    return null;
  }

  const newParam: TInfoParam = param.height !== undefined
    ? { height: roundUp(param.height) }
    : { width: roundUp(param.width) };

  return {
    loading: "lazy",
    src: getOptimizedImageUrl(url, newParam, 80),
    srcset: createSrcSetAttribute(url, newParam, 80),
    srcLow: getOptimizedImageUrl(url, { height: 50 }, 1),
    alt: "image",
    ...imgParams,
  };
};

const gamePositionByGridType = (gridType: EPlatform_GameGridType, positionSettings: TPlatform_GameGridPosition_Fragment[]) => (
  getNotNil(
    positionSettings.find((it) => it.gridType === gridType),
    ["gamePositionByGridType"],
    "position setting",
  ).position
);

const gamePositionByLabelId = (
  labelId: string,
  gridType: EPlatform_GameGridType,
  labelPositionSettings: TPlatform_GameLabelPositionSettings_Fragment[],
  positionSettings: TPlatform_GameGridPosition_Fragment[],
) => {
  // for system labels positionSettings contained not in labelPositionSettings but in positionSettings
  const settings = labelPositionSettings.find((it) => it.labelId === labelId)?.positionSettings || positionSettings;

  return gamePositionByGridType(gridType, settings);
};

const gamePositionByProvider = (
  gridType: EPlatform_GameGridType,
  providerPositionSettings: TPlatform_GameGridPosition_Fragment[],
  positionSettings: TPlatform_GameGridPosition_Fragment[],
) => providerPositionSettings.find((it) => it.gridType === gridType)?.position ||
    gamePositionByGridType(gridType, positionSettings);

const gamesByProviderCombiner = (provider: EProviderCode) => (games: TPlatform_Game_Fragment[]) => sortBy(
  ({ previewImages }) => !gameImageInfoBySizeSelector(EPlatform_ImageSize.size1, previewImages),
  games.filter((game) => provider === game.provider),
);

const computeGameGridHeight = (layout: ShortLayout[]): number => {
  const maxY = Math.max(...layout.map(({ y }) => y));

  const rows = groupBy2(({ y }) => y, layout);

  let dY = 0;

  const heights: number[] = [];

  while (dY <= maxY) {
    if (!rows[dY]) {
      dY++;

      heights.push(1);

      continue;
    }

    const maxH = rows[dY]
      ? Math.max(...getNotNil(rows[dY], ["computeGameGridHeight"], "rows[dY]").map(({ h }) => h))
      : 0;

    heights.push(maxH);

    dY = dY + maxH;
  }

  return sum(heights);
};

const computeByRow = (
  visibleRows: number,
  { matrix, layout }: ReturnType<typeof computeGameGridLayout>,
) => {
  const shortenedMatrix = matrix.slice(0, visibleRows);

  const ids = shortenedMatrix
    .flatMap((row) => row.map(({ current }) => current ? current.id : undefined))
    .filter(isNotNil);

  return layout
    .filter((it) => ids.includes(it.id))
    .map((it) => { // size 4 on last row should be shorted
      if (it.y + 1 === visibleRows && it.size === 4) {
        return {
          ...it,
          size: 2,
          w: 2,
          h: 1,
        };
      }

      return it;
    });
};

const concatIdForLoadingSymbol = (baseId: string | TGameProviderEnum, page: EGamePage) => `${page}__${baseId}`;

const reduceGameProviderWithCount = (acc: IGameProviderWithCount[], providerWithCount: TPlatform_GameProviderByPlayer_Fragment) => {
  if (ignoredGameProviders.includes(providerWithCount.provider)) {
    return acc;
  }

  if (isGameProvider(providerWithCount.provider)) {
    acc.push(({ gamesCount: providerWithCount.gamesCount, provider: providerWithCount.provider }));

    return acc;
  }

  throw new Error(`[getGameProviderWithCount] provider ${providerWithCount.provider} not listed in gameProviderEnum`);
};

const deepEqualNodeIds = <T extends IWithId>(a: T[], b: T[]) => deepEqual(extractIds(a), extractIds(b));

const SEPARATOR = ";";

const stringifyProviders = (providers: TGameProviderEnum[]) => providers
  .map((provider) => gameProviderTabs[provider])
  .join(SEPARATOR);

const parseProviders = (providers: string) => providers
  .split(SEPARATOR)
  .map((tab) => tabsToGameProvider[tab]) as TGameProviderEnum[];

const getProviders = (path: string, page: TGameManagerPage): TArrayNotEmpty<TGameProviderEnum> | null => {
  const isCombineProviders = matchPath(path, combineProvidersPathByGamePageMap[page]);

  // Not on combine providers route
  if (!isCombineProviders) {
    return null;
  }

  const arr = path.split("/");

  const providersString = getNotNil(arr[arr.length - 1], ["getProviders"], "providers");

  const providers = parseProviders(providersString);

  return isNotEmpty(providers) ? providers : null;
};

export {
  gameImageInfoBySizeAndParamSelector,
  gameImageInfoBySizeSelector,
  gamePositionByLabelId,
  gamePositionByProvider,
  gamesByProviderCombiner,
  computeGameGridHeight,

  computeByRow,
  concatIdForLoadingSymbol,
  reduceGameProviderWithCount,
  deepEqualNodeIds,
  aspectRatioSelector,
  getProviders,
  stringifyProviders,
  type IImageInfo,
  type TInfoParam,
  type IImageParams,
};
