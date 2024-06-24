import { EPlatform_ImageSize } from "@sb/graphql-client";
import { getImageSizeByGridSize } from "../Store/Games/Model/Games";

const getStylePositionedGameContainer = (
  {
    gameContainerWidth,
    xMarginSumInContainer,
    marginBottom,
    x,
    y,
    w,
    h,
    getAdditionalHeight,
    additionalMargin = 0,
  }: {
    gameContainerWidth: number;
    xMarginSumInContainer: number;
    marginBottom: number;
    x: number;
    y: number;
    w: number;
    h: number;
    additionalMargin?: number;
    getAdditionalHeight?: (size: EPlatform_ImageSize) => number;
  },
) => {
  if (!getAdditionalHeight) {
    return ({
      width: gameContainerWidth * w,
      height: (gameContainerWidth * h) + marginBottom - (xMarginSumInContainer),
      left: x * gameContainerWidth,
      top: y * (gameContainerWidth + marginBottom - xMarginSumInContainer),
    });
  }
  const size = getImageSizeByGridSize(w, h);

  return ({
    width: gameContainerWidth * w,
    height: (gameContainerWidth * h) + getAdditionalHeight(size) + additionalMargin - xMarginSumInContainer + marginBottom,
    left: x * gameContainerWidth,
    top: y * (
      gameContainerWidth + getAdditionalHeight(EPlatform_ImageSize.size1) + additionalMargin - xMarginSumInContainer + marginBottom
    ),
  });
};

//Always size === 1
const getStyleStaticGameContainer = (
  gameContainerWidth: number,
  xMarginSumInContainer: number,
  marginBottom: number,
  additionalHeight?: number,
  additionalMargin = 0,
) => {
  if (!additionalHeight) {
    return ({
      width: gameContainerWidth,
      height: gameContainerWidth + marginBottom - xMarginSumInContainer,
    });
  }

  return ({
    width: gameContainerWidth,
    height: gameContainerWidth + additionalHeight + marginBottom + additionalMargin - xMarginSumInContainer,
  });
};

export { getStylePositionedGameContainer, getStyleStaticGameContainer };
