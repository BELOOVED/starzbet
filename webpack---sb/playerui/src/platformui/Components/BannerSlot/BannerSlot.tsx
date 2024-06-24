// @ts-nocheck
/* eslint-disable rulesdir/jsx-no-reference-prop */
import clsx from "clsx";
import { Fragment, memo } from "react";
import { useSelector } from "react-redux";
import { isNotEmpty, objToComponent, useParamSelector, withProps } from "@sb/utils";
import classes from "./BannerSlot.module.css";
import { resolveNativeOrReactLink } from "../../../common/Utils/RouterUtils/ResolveNativeOrReactLink";
import { platformConfigSystemLocaleSelector } from "../../../common/Store/Config/Selectors/ConfigSelectors";
import { LinkToTop } from "../../../common/Components/LinkToTop/LinkToTop";
import { bannersByParamsSelector } from "../../../common/Store/Banner/Selectors/BannerSelectors";
import { PublicImage } from "../../../common/Components/PublicImage";
import { localeSelector } from "../../Store/Locale/Selectors/localeSelector";
import { getTranslatedText } from "../TranslateRecord/TranslateRecord";

const Text = memo(({ text }) => {
  const locale = useSelector(localeSelector);
  const systemLocale = useSelector(platformConfigSystemLocaleSelector);

  if (text.length === 0) {
    return null;
  }

  const __html = getTranslatedText(text, locale, systemLocale);

  return (
    <div dangerouslySetInnerHTML={{ __html }} />
  );
});
Text.displayName = "Text";

const BannerLink = ({
  link,
  openInNewWindow,
  children,
  ...props
}) => {
  const target = openInNewWindow ? "_blank" : "_self";
  const resolvedLink = resolveNativeOrReactLink(link);

  if (!resolvedLink) {
    return children;
  }

  return resolvedLink.isNative
    ? <a href={resolvedLink.link} target={target} {...props}>{children}</a>
    : <LinkToTop to={resolvedLink.link} target={target} {...props}>{children}</LinkToTop>;
};
BannerLink.displayName = "BannerLink";

const Banner = ({ children, images }) => (
  children(
    images.map(({
      link,
      image,
      title1,
      title2,
      title3,
      description,
      openInNewWindow,
    }) => ({
      link: link
        ? withProps(BannerLink)({ openInNewWindow, link })
        : Fragment,
      image: image.pathToFile
        ? withProps(PublicImage)({ pathToFile: image.pathToFile })
        : Fragment,
      title1: title1
        ? withProps(Text)({ text: title1 })
        : Fragment,
      title2: title2
        ? withProps(Text)({ text: title2 })
        : Fragment,
      title3: title3
        ? withProps(Text)({ text: title3 })
        : Fragment,
      description: description
        ? withProps(Text)({ text: description })
        : Fragment,
    })),
  )
);
Banner.displayName = "Banner";

const BannerSlot = ({
  device,
  page,
  slot,
  children,
  isMain = false,
  className = "",
}) => {
  const banners = useParamSelector(bannersByParamsSelector, [device, page, slot]);

  const container = clsx(
    classes.bannerContainer,
    className,
    !banners.length && classes.noop,
  );

  if (isMain && isNotEmpty(banners)) {
    return (
      <div className={container}>
        {banners.map(objToComponent("id", { children })(Banner))}
      </div>
    );
  }

  return (
    <>
      {banners.map(objToComponent("id", { children })(Banner))}
    </>
  );
};
BannerSlot.displayName = "BannerSlot";

export { BannerSlot };
