import { memo } from "react";
import type { TCms_ImageWithTheme_Type_Fragment } from "@sb/graphql-client/CmsUI";
import { ImageWrapperWithProgressiveLoading } from "../../../../../Components/CMSComponents/CMSFiles/CMSFiles";
import { useGetImgHeight } from "../../../../../Hooks/UseGetImgHeight";

const useGetCmsImgParams = (height: number) => {
  const ratio = 2;
  const width = height * 2;

  return {
    imgParams: {
      height,
      width,
      aspectRatio: ratio.toString(),
    },
    size: {
      width,
      height,
    },
  };
};

interface ICMSPromoImage extends IWithClassName{
  image:  TCms_ImageWithTheme_Type_Fragment | null;
  height: number;
}

const CMSPromoImage = memo<ICMSPromoImage>(({
  image,
  className,
  height,
}) => {
  const { size, imgParams } = useGetCmsImgParams(height);

  return (
    <ImageWrapperWithProgressiveLoading
      size={size}
      className={className}
      img={image}
      imgParams={imgParams}
    />
  );
});
CMSPromoImage.displayName = "CMSPromoImage";

const useGetCmsImgModalMobileParams = (margins: number) => {
  const ratio = 2;
  const height = useGetImgHeight(ratio, margins, 1, 0, 0);
  const width = height * 2;

  return {
    imgParams: {
      height,
      width,
      aspectRatio: ratio.toString(),
    },
    size: {
      width,
      height,
    },
  };
};

interface ICMSPromoMobileImage {
  margins: number;
}

const CMSPromoMobileImage = memo<Omit<ICMSPromoImage, "height"> & ICMSPromoMobileImage>(({
  image,
  className,
  margins,
}) => {
  const { size, imgParams } = useGetCmsImgModalMobileParams(margins);

  return (
    <ImageWrapperWithProgressiveLoading
      size={size}
      className={className}
      img={image}
      imgParams={imgParams}
    />
  );
});
CMSPromoMobileImage.displayName = "CMSPromoMobileImage";

export { CMSPromoImage, CMSPromoMobileImage };
