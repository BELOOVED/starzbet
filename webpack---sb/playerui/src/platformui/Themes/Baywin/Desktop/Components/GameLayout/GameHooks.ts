import { useSelector } from "react-redux";
import { useMemo } from "react";
import { EPlatform_ImageSize } from "@sb/graphql-client";
import { type ShortLayout } from "@sb/utils";
import { gameGridWidthMap } from "../../../../../Store/Games/Model/Games";
import { gridTypeSelector } from "../../../../../Store/Games/Selectors/GamesSelectors";
import { viewportWidthSelector } from "../../../../../Store/Viewport/ViewportSelectors";
import {
  getStylePositionedGameContainer as getStylePositionedGameContainerFactory,
  getStyleStaticGameContainer as getStyleStaticGameContainerFactory,
} from "../../../../../Utils/GetStylePositionedGameContainer";
import { computeGameGridHeight } from "../../../../../Store/Games/GamesUtils";
import { chatPropertySelectors } from "../../../../../Store/Chat/ChatSelectors";

const CONTAINER_PADDING = 50;

const getXMarginInGameContainer = (isMobile: boolean) => isMobile ? 10 : 8;

const getXMarginSumInOneGameContainer = (isMobile: boolean) =>
  getXMarginInGameContainer(isMobile) * 2;

const MARGIN_BOTTOM = 16;

const ADDITIONAL_HEIGHT = 56;

const getAdditionalHeight = (size: EPlatform_ImageSize, isMobile: boolean) =>
  size === EPlatform_ImageSize.size4
    ? (ADDITIONAL_HEIGHT * 2) + getXMarginInGameContainer(isMobile)
    : ADDITIONAL_HEIGHT;

const ADDITIONAL_MARGIN = 10;

const useGameContainerWidth = () => {
  const currentGridType = useSelector(gridTypeSelector);
  const viewportWidth = useSelector(viewportWidthSelector);
  const isChatVisible = useSelector(chatPropertySelectors.isDrawerVisible);
  const chatWidth = isChatVisible ? 300 : 0;
  const scrollWidth = document.body.style.overflow === "hidden" ? 8 : 0;

  return useMemo(
    () => {
      //268 - leftWidth
      const containerWidth = Math.floor(Math.max(1024, viewportWidth) - 268 - 0.5 - chatWidth - scrollWidth);

      return Math.floor((containerWidth - CONTAINER_PADDING) / gameGridWidthMap[currentGridType]);
    },
    [currentGridType, viewportWidth, isChatVisible],
  );
};

const getStylePositionedGameContainer = (params: {
  x: number;
  y: number;
  w: number;
  h: number;
  gameContainerWidth: number;
  isMobile: boolean;
}) => getStylePositionedGameContainerFactory({
  ...params,
  xMarginSumInContainer: getXMarginSumInOneGameContainer(params.isMobile),
  getAdditionalHeight: (size) => getAdditionalHeight(size, params.isMobile),
  marginBottom: MARGIN_BOTTOM,
  additionalMargin: ADDITIONAL_MARGIN,
});

const getStyleStaticGameContainer = (gameContainerWidth: number, isMobile: boolean) =>
  getStyleStaticGameContainerFactory(
    gameContainerWidth,
    getXMarginSumInOneGameContainer(isMobile),
    MARGIN_BOTTOM,
    ADDITIONAL_HEIGHT,
    ADDITIONAL_MARGIN,
  );

const getGameIMGHeight = (containerHeight: number, size: EPlatform_ImageSize, isMobile: boolean) =>
  containerHeight - getAdditionalHeight(size, isMobile) - MARGIN_BOTTOM - ADDITIONAL_MARGIN;

const getGameIMGWidth = (containerWidth: number, isMobile: boolean) => containerWidth - getXMarginSumInOneGameContainer(isMobile);

const getGamesContainerHeight = (layout: ShortLayout[], gameContainerWidth: number, isMobile: boolean) =>
  computeGameGridHeight(layout) * (
    gameContainerWidth + ADDITIONAL_HEIGHT + ADDITIONAL_MARGIN - getXMarginSumInOneGameContainer(isMobile) + MARGIN_BOTTOM
  );

export {
  useGameContainerWidth,
  getStyleStaticGameContainer,
  getStylePositionedGameContainer,
  getGameIMGWidth,
  getGameIMGHeight,
  getGamesContainerHeight,
  getXMarginSumInOneGameContainer,
  getAdditionalHeight,
};
