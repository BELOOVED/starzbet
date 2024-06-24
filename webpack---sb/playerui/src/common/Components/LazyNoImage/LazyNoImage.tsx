import { type CSSProperties, memo } from "react";
import { EPlatform_ImageSize } from "@sb/graphql-client";
import noimageS2 from "./noimageSize2.png";
import noimage from "./noimage.png";

const noimageIntrinsicSizeMap: Record<EPlatform_ImageSize, { width: string; height: string; }> = {
  [EPlatform_ImageSize.size1]: { width: "500px", height: "500px" },
  [EPlatform_ImageSize.size2]: { width: "1004", height: "494px" },
  [EPlatform_ImageSize.size4]: { width: "500px", height: "500px" },
};

interface ILazyNoImage extends IWithClassName {
  size?: EPlatform_ImageSize;
  style: CSSProperties;
  containerClassName?: string;
}

const srcMap: Record<EPlatform_ImageSize, string> = {
  [EPlatform_ImageSize.size1]: noimage,
  [EPlatform_ImageSize.size2]: noimageS2,
  [EPlatform_ImageSize.size4]: noimage,
};
const LazyNoImage = memo<ILazyNoImage>((
  {
    className,
    size,
    style,
    containerClassName,
  },
) => (
  <div className={containerClassName} style={style}>
    <img
      className={className}
      src={srcMap[size || EPlatform_ImageSize.size1]}
      alt={"noimage"}
      {...noimageIntrinsicSizeMap[size || EPlatform_ImageSize.size1]}
      loading={"lazy"}
    />
  </div>
));
LazyNoImage.displayName = "LazyNoImage";

export {
  LazyNoImage,
};
