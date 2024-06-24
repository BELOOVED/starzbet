import { type DetailedHTMLProps, type FC, type ImgHTMLAttributes, memo, type PropsWithChildren } from "react";
import { isNil, isNotNil, type TNullable, useParamSelector } from "@sb/utils";
import type { TCms_Apk_Type_Fragment, TCms_Image_Type_Fragment, TCms_ImageWithTheme_Type_Fragment } from "@sb/graphql-client/CmsUI";
import noimage from "./noimage.png";
import { PublicImage } from "../../../../common/Components/PublicImage";
import { publicApiUrl } from "../../../../common/Constants/PublicApiUrl";
import { getPathToPublicFileWithFormatExt } from "../../../../common/Utils/GetImageFormatParam";
import { type IImageParams } from "../../../Store/Games/GamesUtils";
import { CMSCorrectFileByFileIdsSelector, CMSPathToFileSelector } from "../../../Store/CMS/Selectors/CMSSelectors";
import { LazySimpleImage } from "../../LazyImage/LazyProgressiveImage";

type TImage = TCms_ImageWithTheme_Type_Fragment | TCms_Image_Type_Fragment

interface IImageWrapper {
  img: TNullable<TImage>;
  className?: string;
  withNoImage?: boolean;
}

interface IApkWrapper extends PropsWithChildren {
  file: TNullable<TCms_Apk_Type_Fragment>;
  className?: string;
}

interface IBackgroundWrapper extends PropsWithChildren {
  img: TNullable<TImage>;
  className?: string;
  withNoImage?: boolean;
}

type TCMSImage = IImageWrapper & DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>

const CMSImage = memo<TCMSImage>(({
  img,
  className,
  withNoImage,
  ...rest
}) => {
  const pathToFile = useParamSelector(CMSPathToFileSelector, [img]);

  if (isNotNil(pathToFile)) {
    return <PublicImage className={className} pathToFile={pathToFile} {...rest} />;
  }

  return withNoImage ? <img loading={"lazy"} src={noimage} alt={""} /> : null;
});
CMSImage.displayName = "CMSImage";

interface ICMSImageWrapper extends TCMSImage {
  wrapperClassName?: string;
}

const CMSImageWrapper = memo<ICMSImageWrapper>(({
  wrapperClassName,
  withNoImage,
  className,
  img,
  ...rest
}) => {
  const pathToFile = useParamSelector(CMSPathToFileSelector, [img]);
  if (isNotNil(pathToFile)) {
    return (
      <div className={wrapperClassName}>
        <PublicImage className={className} pathToFile={pathToFile} {...rest} />
      </div>
    );
  }

  return withNoImage ? <img loading={"lazy"} src={noimage} alt={""} /> : null;
});
CMSImageWrapper.displayName = "CMSImageWrapper";

interface ISize {
  size: {
    width: string | number;
    height: number;
  };
}

type TImageWrapperWithProgressiveLoading = { imgParams: IImageParams; } &
  ISize
  & IImageWrapper
  & DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>

const ImageWrapperWithProgressiveLoading = memo<TImageWrapperWithProgressiveLoading>(({
  img,
  className,
  size,
  imgParams,
  ...rest
}) => {
  const path = useParamSelector(CMSPathToFileSelector, [img]);

  const pathToFile = `${publicApiUrl}/${path}`;

  const params = {
    height: size.height,
  };

  return (
    <div {...rest} style={size}>
      <LazySimpleImage
        className={className}
        url={path ? pathToFile : undefined}
        param={params}
        imgParams={imgParams}
      />
    </div>
  );
});
ImageWrapperWithProgressiveLoading.displayName = "ImageWrapperWithProgressiveLoading";

const ApkWrapper: FC<IApkWrapper> = ({
  file,
  children,
  className,
}) => {
  const fileId = isNotNil(file) ? file.ids : null;
  const correctFile = useParamSelector(CMSCorrectFileByFileIdsSelector, [fileId]);

  if (isNil(correctFile)) {
    return <div className={className}>{children}</div>;
  }
  const pathToFile = `${publicApiUrl}/${correctFile.pathToFile}`;

  return (
    <a href={pathToFile} download={correctFile.originName} className={className}>{children}</a>
  );
};
ApkWrapper.displayName = "ApkWrapper";

const BackgroundWrapper: FC<IBackgroundWrapper> = ({
  img,
  className,
  children,
  withNoImage,
}) => {
  const pathToFile = useParamSelector(CMSPathToFileSelector, [img]);

  const style = isNotNil(pathToFile)
    ? { backgroundImage: `url(${getPathToPublicFileWithFormatExt(pathToFile)})` }
    : withNoImage && { backgroundImage: "url(./noimage.png)" };

  const nonNullableStyle = style || {};

  return (
    <div className={className} style={nonNullableStyle}>{children}</div>
  );
};
BackgroundWrapper.displayName = "BackgroundWrapper";

export {
  CMSImageWrapper,
  CMSImage,
  BackgroundWrapper,
  ApkWrapper,
  ImageWrapperWithProgressiveLoading,
};
