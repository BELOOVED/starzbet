import { memo } from "react";
import { isNil, isNotNil, type TNullable, useParamSelector } from "@sb/utils";
import type {
  TCms_ImageWithLinkOrSimpleImage_Union_Fragment,
  TCms_ListWithImageAndSimpleInputContent_Type_Fragment,
  TCms_MediaLink_Union_Fragment,
} from "@sb/graphql-client/CmsUI";
import classes from "./ImageLink.module.css";
import { NavLinkLocalized } from "../../../../common/Client/Core/Services/RouterService/Components/NavLinkLocalized/NavLinkLocalized";
import { routeMap } from "../../../RouteMap/RouteMap";
import { useCorrectTextByLocale } from "../../../Hooks/UseCorrectTextByLocale";
import { getImgLazyStyles } from "../../../Store/CMS/Utils/Helpers";
import { isExternalMediaLink, isThemeImage } from "../../../Store/CMS/Utils/TypeGuards";
import { type TImage } from "../../../Store/CMS/Model/CmsModel";
import { CMSCorrectUrlSelector } from "../../../Store/CMS/Selectors/CMSPageContentSelectors";
import { getCorrectLinkByUrl } from "../../../Store/CMS/Utils/GetCorrectLinkByUrl";
import { Ellipsis } from "../../Ellipsis/Ellipsis";
import { CMSImage } from "../CMSFiles/CMSFiles";

interface IImageGeneral {
  imageClassName?: string;
  linkWrapperClassName?: string;
  linkClassName?: string;
  anchorClassName?: string;
}

interface IImageSimpleLink extends IImageGeneral {
  imageLink: null | TCms_ListWithImageAndSimpleInputContent_Type_Fragment;
  withoutAnchor?: boolean;
}

interface IImageLinkWithText extends IImageGeneral {
  imageMediaLink: TCms_MediaLink_Union_Fragment | null;
  img: TNullable<TImage>;
  withoutAnchor?: boolean;
}

interface IImageLink extends IImageGeneral {
  imageLink: TCms_ImageWithLinkOrSimpleImage_Union_Fragment | null;
  withoutAnchor?: boolean;
}

const imgLazyStyles = getImgLazyStyles();

const ImageLinkWithText = memo<IImageLinkWithText>(({
  linkWrapperClassName,
  imageClassName,
  anchorClassName,
  imageMediaLink,
  img,
  withoutAnchor,
  linkClassName,
}) => {
  const anchor = useCorrectTextByLocale(imageMediaLink?.anchor);

  const correctUrl = useParamSelector(CMSCorrectUrlSelector, [imageMediaLink]);

  const linkClass = isExternalMediaLink(imageMediaLink) ? linkClassName : classes.mediaLink;

  const internalLink = getCorrectLinkByUrl(routeMap.cms, correctUrl);

  const ImageContent = (
    <>
      <CMSImage img={img} className={imageClassName} {...imgLazyStyles} />

      {
        isNotNil(anchor) && !withoutAnchor
          ? (
            <div className={anchorClassName}>
              <Ellipsis>{anchor}</Ellipsis>
            </div>
          )
          : null
      }
    </>
  );

  return (
    <div className={linkWrapperClassName}>
      {
        isExternalMediaLink(imageMediaLink)
          ? (
            <a className={linkClass} href={correctUrl}>
              {ImageContent}
            </a>
          )
          : (
            <NavLinkLocalized className={linkClass} {...internalLink}>
              {ImageContent}
            </NavLinkLocalized>
          )
      }
    </div>
  );
});
ImageLinkWithText.displayName = "ImageLinkWithText";

const ImageSimpleLink = memo<IImageSimpleLink>(({
  imageLink,
  imageClassName,
  linkWrapperClassName,
}) => {
  if (isNil(imageLink)) {
    return null;
  }
  const { logoImage, link } = imageLink;

  if (isNil(logoImage)) {
    return null;
  }

  return link
    ? (
      <a
        className={linkWrapperClassName}
        target={"_blank"}
        href={`//${link}`}
        rel={"noreferrer"}
      >
        <CMSImage img={logoImage.image} className={imageClassName} {...imgLazyStyles} />
      </a>
    )
    : (
      <div className={linkWrapperClassName}>
        <CMSImage img={logoImage.image} className={imageClassName} {...imgLazyStyles} />
      </div>
    );
});
ImageSimpleLink.displayName = "ImageSimpleLink";

const ImageLink = memo<IImageLink>(({
  imageLink,
  imageClassName,
  linkWrapperClassName,
  linkClassName,
  withoutAnchor,
  anchorClassName,
}) => {
  if (isNil(imageLink)) {
    return null;
  }
  const { logoImage } = imageLink;

  if (isNil(logoImage?.image) || !isThemeImage(logoImage?.image)) {
    return null;
  }

  if ("mediaLinkWrapper" in imageLink && isNotNil(imageLink.mediaLinkWrapper) && isNotNil(imageLink.mediaLinkWrapper.mediaLink)) {
    return (
      <ImageLinkWithText
        imageClassName={imageClassName}
        img={logoImage?.image}
        imageMediaLink={imageLink.mediaLinkWrapper.mediaLink}
        linkWrapperClassName={linkWrapperClassName}
        linkClassName={linkClassName}
        anchorClassName={anchorClassName}
        withoutAnchor={withoutAnchor}
      />
    );
  }

  return (
    <div className={linkWrapperClassName}>
      <CMSImage img={logoImage?.image} className={imageClassName} {...imgLazyStyles} />
    </div>
  );
});
ImageLink.displayName = "ImageLink";

export { ImageSimpleLink, ImageLink };
