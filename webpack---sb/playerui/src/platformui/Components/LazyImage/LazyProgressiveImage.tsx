import { type ComponentType, memo, useState } from "react";
import { clsx } from "clsx";
import { type EPlatform_ImageSize } from "@sb/graphql-client";
import type { TPlatform_GamePreviewImage_Fragment } from "@sb/graphql-client/PlayerUI";
import { isNotNil, type TVoidFn, withProps } from "@sb/utils";
import classes from "./LazyImage.module.css";
import { LazyNoImage } from "../../../common/Components/LazyNoImage/LazyNoImage";
import {
  aspectRatioSelector,
  gameImageInfoBySizeAndParamSelector,
  gameImageInfoBySizeSelector,
  type IImageInfo,
  type IImageParams,
  type TInfoParam,
} from "../../Store/Games/GamesUtils";

interface ILazyGameProgressiveImageProps extends IWithClassName {
  imgInfo: IImageInfo;
  setError?: TVoidFn;
  withoutGradient?: boolean;
}

const LazyProgressiveImage = memo<ILazyGameProgressiveImageProps>(({
  imgInfo,
  className,
  setError,
  withoutGradient,
}) => {
  const [loaded, setLoaded] = useState(false);

  const onLoad = () => setLoaded(true);
  const onError = () => setError?.(true);

  const withAspectRatio = { aspectRatio: imgInfo.aspectRatio };

  return (
    <div className={clsx(classes.lazyGameImg, loaded && classes.loaded, className)} style={withAspectRatio}>
      <img
        className={clsx(className, classes.imgHigh)}
        src={imgInfo.src}
        srcSet={imgInfo.srcset}
        alt={imgInfo.alt}
        onLoad={onLoad}
        onError={onError}
        loading={imgInfo.loading}
        width={imgInfo.width}
        height={imgInfo.height}
        style={withAspectRatio}
      />

      {
        isNotNil(imgInfo.srcLow)
          ? (
            <img
              src={imgInfo.srcLow}
              alt={imgInfo.alt}
              loading={imgInfo.loading}
              className={clsx(classes.imgLow, className)}
              width={imgInfo.width}
              height={imgInfo.height}
              style={withAspectRatio}
            />
          )
          : null
      }

      {withoutGradient ? null : <div className={clsx(className, classes.gradientOverlay)} style={withAspectRatio} />}
    </div>
  );
});
LazyProgressiveImage.displayName = "LazyProgressiveImage";

interface ILazyGameImageProps extends IWithClassName {
  size: EPlatform_ImageSize;
  previewImages: TPlatform_GamePreviewImage_Fragment[];
  param: TInfoParam;
  marginSum: number;
  containerClassName?: string;
}

const LazyGameImage = memo<ILazyGameImageProps>((
  {
    param,
    size,
    previewImages,
    className,
    marginSum,
    containerClassName,
  },
) => {
  const image = gameImageInfoBySizeSelector(size, previewImages);

  const url = image?.file.url;
  const imgParams = aspectRatioSelector(size, marginSum, param);

  const imgInfo = gameImageInfoBySizeAndParamSelector(param, url, imgParams);
  const style = aspectRatioSelector(size, marginSum, param);

  const NoImage = withProps(LazyNoImage)({
    size,
    className,
    style,
    containerClassName,
  });

  return <LazyBaseImage imgInfo={imgInfo} className={className} LazyNoImage={NoImage} />;
});
LazyGameImage.displayName = "LazyGameImage";

interface ILazyBaseImage extends IWithClassName {
  imgInfo: IImageInfo | null;
  LazyNoImage: ComponentType;
}

const LazyBaseImage = memo<ILazyBaseImage>((
  {
    imgInfo,
    className,
    LazyNoImage,
  },
) => {
  const [error, setError] = useState(false);

  return imgInfo && !error
    ? <LazyProgressiveImage imgInfo={imgInfo} className={className} setError={setError} />
    : <LazyNoImage />;
});
LazyBaseImage.displayName = "LazyBaseImage";

const NullComponent = memo(() => null);
NullComponent.displayName = "NullComponent";

interface ILazySimpleImage extends IWithClassName {
  url: string | undefined;
  param: TInfoParam;
  imgParams: IImageParams;
  LazyNoImage?: ComponentType;
}

const LazySimpleImage = memo<ILazySimpleImage>((
  {
    param,
    url,
    className,
    imgParams,
    LazyNoImage,
  },
) => {
  const imgInfo = gameImageInfoBySizeAndParamSelector(param, url, imgParams);

  return <LazyBaseImage imgInfo={imgInfo} className={className} LazyNoImage={LazyNoImage ?? NullComponent} />;
});
LazySimpleImage.displayName = "LazySimpleImage";

export { LazyGameImage, LazySimpleImage, LazyProgressiveImage };
