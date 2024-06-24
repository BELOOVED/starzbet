import { useSelector } from "react-redux";
import { useMemo } from "react";
import { EPlatform_ImageSize } from "@sb/graphql-client";
import { type ShortLayout } from "@sb/utils";
import { IS_MOBILE_CLIENT_SIDE } from "../../../../../../common/Store/DeviceInfo/DeviceInfoConstant";
import { gameGridWidthMap } from "../../../../../Store/Games/Model/Games";
import { gridTypeSelector } from "../../../../../Store/Games/Selectors/GamesSelectors";
import { viewportWidthSelector } from "../../../../../Store/Viewport/ViewportSelectors";
import {
  getStylePositionedGameContainer as getStylePositionedGameContainerFactory,
} from "../../../../../Utils/GetStylePositionedGameContainer";
import { computeGameGridHeight } from "../../../../../Store/Games/GamesUtils";

const CONTAINER_PADDING = 70;

const X_MARGIN_IN_GAME_CONTAINER = IS_MOBILE_CLIENT_SIDE ? 10 : 10;

const X_MARGIN_SUM_IN_ONE_GAME_CONTAINER = X_MARGIN_IN_GAME_CONTAINER * 2;

const MARGIN_BOTTOM = 20;

const ADDITIONAL_HEIGHT = 66;

const getAdditionalHeight = (size: EPlatform_ImageSize) =>
  size === EPlatform_ImageSize.size4
    ? (ADDITIONAL_HEIGHT * 2) + X_MARGIN_IN_GAME_CONTAINER
    : ADDITIONAL_HEIGHT;

const ADDITIONAL_MARGIN = 0;

const useGameContainerWidth = () => {
  const currentGridType = useSelector(gridTypeSelector);
  const viewportWidth = useSelector(viewportWidthSelector);

  return useMemo(
    () => {
      //320 top winners width
      const containerWidth = Math.floor(Math.max(1024, viewportWidth) - 0.5 - 320);

      return Math.floor((containerWidth - CONTAINER_PADDING) / gameGridWidthMap[currentGridType]);
    },
    [currentGridType, viewportWidth],
  );
};

const getStylePositionedGameContainer = (params: {
  x: number;
  y: number;
  w: number;
  h: number;
  gameContainerWidth: number;
}) => getStylePositionedGameContainerFactory({
  ...params,
  xMarginSumInContainer: X_MARGIN_SUM_IN_ONE_GAME_CONTAINER,
  getAdditionalHeight,
  marginBottom: MARGIN_BOTTOM,
  additionalMargin: ADDITIONAL_MARGIN,
});

const getGameIMGHeight = (containerHeight: number, size: EPlatform_ImageSize) =>
  containerHeight - getAdditionalHeight(size) - MARGIN_BOTTOM - ADDITIONAL_MARGIN;

const getGameIMGWidth = (containerWidth: number) => containerWidth - X_MARGIN_SUM_IN_ONE_GAME_CONTAINER;

const getGamesContainerHeight = (layout: ShortLayout[], gameContainerWidth: number) =>
  computeGameGridHeight(layout) * (
    gameContainerWidth + ADDITIONAL_HEIGHT + ADDITIONAL_MARGIN - X_MARGIN_SUM_IN_ONE_GAME_CONTAINER + MARGIN_BOTTOM
  );

export {
  useGameContainerWidth,
  getStylePositionedGameContainer,
  getGameIMGWidth,
  getGameIMGHeight,
  getGamesContainerHeight,
  X_MARGIN_SUM_IN_ONE_GAME_CONTAINER,
};
