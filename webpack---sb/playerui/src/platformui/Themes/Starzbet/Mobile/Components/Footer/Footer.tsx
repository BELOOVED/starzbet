import clsx from "clsx";
import { type FC, memo, type PropsWithChildren } from "react";
import { useSelector } from "react-redux";
import { isNil, isNotNil, Time, withCondition, withParams } from "@sb/utils";
import { EPlatformBlockMap } from "@sb/cms-core";
import { useTranslation } from "@sb/translator";
import { platformui_starzbet_title_lastUpdate } from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useRouteMatch } from "@sb/react-router-compat";
import classes from "./Footer.module.css";
import { Text } from "../../../../../../common/Themes/Starzbet/Components/Text/Text";
import { Button } from "../../../../../../common/Themes/Starzbet/Components/Button/Button";
import { Space } from "../../../../../../common/Components/Space/Space";
import { NativeHorizontalScroll } from "../../../../../../common/Components/NativeHorizontalScroll/NativeHorizontalScroll";
import { ArrowLeftIcon } from "../../../../../../common/Themes/Starzbet/Components/Icons/ArrowIcon/ArrowLeftIcon";
import { isAllFieldNilOrEmpty } from "../../../../../Utils/IsAllFieldInObjectAreNil";
import { isThemeTwoFooter } from "../../../../../Store/CMS/Utils/isTypeOf";
import { smoothScrollToTop } from "../../../../../Utils/ScrollToTop";
import { CMSFooterSectionWithLicenseSelector } from "../../../../../Store/CMS/Selectors/CMSLicenceBlockSelectors";
import { cmsBlockSucceededSelector } from "../../../../../Store/CMS/Selectors/CMSSelectors";
import { MultiLangText } from "../../../../../Components/CMSComponents/CMSText/MultiLangText/MultiLangText";
import { ImageSimpleLink } from "../../../../../Components/CMSComponents/CMSImageLink/ImageLink";
import { CMSImage } from "../../../../../Components/CMSComponents/CMSFiles/CMSFiles";
import { routeMap } from "../../../../../RouteMap/RouteMap";
import { getImgLazyStyles } from "../../../../../Store/CMS/Utils/Helpers";
import { sportsBookRoutes } from "../../../../../RouteMap/SportsbookRoutes";
import {
  CMSFooterBlockSelector,
  CMSFooterLinkListSelector,
  CMSFooterLogoSelector,
  CMSFooterPaymentMethodsListSelector,
  CMSFooterProviderListSelector,
  CMSFooterResponsibleGamblingContentSelector,
  CMSFooterSocialLinkListSelector,
  CMSFooterUpdatedAtSelector,
} from "../../../Store/CMS/Selectors/CMSFooterSelectors";
import { Language } from "../../../Components/Language/Language";
import { type IClassNameProps, type ILinksBlockWithTitle } from "../../../Model/FooterInterfaceAndTypes";
import { PageTitleMediaLink } from "../../../Components/CMSComponents/LinksBlock/LinksBlock";
import { LicenceLogo } from "../../../Components/LicenceLogo/LicenceLogo";

interface ITrackClassName {
  trackClassName?: string;
}

interface IWithSpace {
  value: 4 | 8 | 12 | 16 | 24;
  vertical?: boolean;
}

const WrapperForSectionWithSpace: FC<PropsWithChildren & IClassNameProps & IWithSpace> = ({
  children,
  className,
  vertical,
  value,
}) => (
  <div className={classes.wrapperSection}>
    <div className={clsx(classes.maxWidth, className)}>
      <Space value={value} vertical={vertical}>
        {children}
      </Space>
    </div>
  </div>
);
WrapperForSectionWithSpace.displayName = "WrapperForSectionWithSpace";

const SectionWithCarousel: FC<PropsWithChildren & IClassNameProps & ITrackClassName> = ({
  children,
  className,
  trackClassName,
}) => (
  <div className={classes.wrapperSection}>
    <div className={clsx(classes.maxWidth, className)}>
      <NativeHorizontalScroll
        className={classes.scroll}
        trackClassName={trackClassName}
      >
        {children}
      </NativeHorizontalScroll>
    </div>
  </div>
);
SectionWithCarousel.displayName = "SectionWithCarousel";

const LinksBlockWithTitle = memo<ILinksBlockWithTitle>(({ list, index }) => {
  if (isNil(list)) {
    return null;
  }

  return (
    <div className={classes.pageTitleLink}>
      <Text
        colorScheme={"text"}
        textSize={"16"}
        textGap={"24"}
        textWeight={"500"}
        capitalize
      >
        <PageTitleMediaLink list={list} index={index} />
      </Text>
    </div>
  );
});
LinksBlockWithTitle.displayName = "LinksBlockWithTitle";

const imgLazyStylesPayment = getImgLazyStyles({ height: "32px", width: "32px" });

const FirstSection = memo(() => {
  const paymentMethodsList = useSelector(CMSFooterPaymentMethodsListSelector);

  return (isNotNil(paymentMethodsList))
    ? (
      <SectionWithCarousel className={classes.firstSection}>
        {
          paymentMethodsList.map((method, index) => isNotNil(method)
            ? (
              <div className={classes.paymentMethodWrapper} key={index}>
                <CMSImage className={classes.paymentMethodImg} img={method.logoImage?.image} {...imgLazyStylesPayment} />

                <Text
                  className={classes.paymentMethodText}
                  textGap={"16"}
                  textSize={"14"}
                  colorScheme={"text"}
                  textWeight={"500"}
                  capitalize
                  noWrap
                >
                  <MultiLangText arr={method.title?.description} />
                </Text>
              </div>
            )
            : null)
        }
      </SectionWithCarousel>
    )
    : null;
});
FirstSection.displayName = "FirstSection";

const FourthSection = memo(() => {
  const linkList = useSelector(CMSFooterLinkListSelector);

  return isNotNil(linkList)
    ? (
      <SectionWithCarousel className={classes.fourthSection} trackClassName={classes.trackClassName}>
        {linkList.map((item, index) => <LinksBlockWithTitle list={item} key={index} index={index} />)}
      </SectionWithCarousel>
    )
    : null;
});
FourthSection.displayName = "FourthSection";

const SecondSection = memo(() => {
  const providerList = useSelector(CMSFooterProviderListSelector);

  return (isNotNil(providerList))
    ? (
      <SectionWithCarousel className={classes.secondSection}>
        {
          providerList.map((method, index) => isNotNil(method)
            ? (
              <CMSImage
                className={classes.providerImg}
                img={method.image}
                key={index}
                loading={"lazy"}
              />
            )
            : null)
        }
      </SectionWithCarousel>
    )
    : null;
});
SecondSection.displayName = "SecondSection";

const imgLazyStylesLogo = getImgLazyStyles({ height: "32px", width: "32px" });

const WrapperForLogoWithLanguage = memo(() => {
  const socialLinkList = useSelector(CMSFooterSocialLinkListSelector);

  const logo = useSelector(CMSFooterLogoSelector);

  return (
    <div className={classes.logoWithLanguage}>
      <div className={classes.logoWrapper}>
        {
          isNotNil(logo)
            ? (
              <div className={classes.logo}>
                <CMSImage className={classes.logoImage} img={logo.image} {...imgLazyStylesLogo} />
              </div>
            )
            : null
        }

        {isNotNil(logo) && isNotNil(socialLinkList) ? <div className={classes.separator} /> : null}

        {
          isNotNil(socialLinkList)
            ? (
              <div className={classes.socialLinksWrapper}>
                {
                  socialLinkList.map((el, index) => (
                    <ImageSimpleLink
                      imageClassName={classes.socialLinkImg}
                      key={index}
                      imageLink={el}
                    />
                  ))
                }
              </div>
            )
            : null
        }
      </div>
    </div>
  );
});
WrapperForLogoWithLanguage.displayName = "WrapperForLogoWithLanguage";

const WrapperGambling = memo(() => {
  const responsibleGamblingList = useSelector(CMSFooterResponsibleGamblingContentSelector);

  return (
    <div className={classes.wrapperGambling}>
      <NativeHorizontalScroll className={classes.scrollGambling}>
        {
          isNotNil(responsibleGamblingList)
            ? (
              <div className={classes.responsibleGamblingWrapper}>
                {
                  responsibleGamblingList.map((el, index) => (
                    <ImageSimpleLink
                      imageClassName={classes.responsibleGamblingMethod}
                      key={index}
                      imageLink={el}
                    />
                  ))
                }
              </div>
            )
            : null
        }
      </NativeHorizontalScroll>

      <Button className={classes.goTopButton} colorScheme={"orange-gradient"} onClick={smoothScrollToTop}>
        <ArrowLeftIcon size={"s"} />
      </Button>
    </div>
  );
});
WrapperGambling.displayName = "WrapperGambling";

const ThirdSection = memo(() => {
  const logo = useSelector(CMSFooterLogoSelector);

  const socialLinkList = useSelector(CMSFooterSocialLinkListSelector);

  const sectionWithLicense = useSelector(CMSFooterSectionWithLicenseSelector);

  const updatedAt = useSelector(CMSFooterUpdatedAtSelector);

  const [t] = useTranslation();

  return isNotNil(logo) || isNotNil(socialLinkList)
    ? (
      <WrapperForSectionWithSpace className={classes.thirdSection} vertical={true} value={16}>
        <WrapperForLogoWithLanguage />

        {isNotNil(sectionWithLicense) ? <LicenceLogo /> : null}

        {
          isNotNil(updatedAt)
            ? (
              <Text
                colorScheme={"text"}
                textSize={"14"}
                textGap={"24"}
                textWeight={"500"}
                capitalize
              >
                {t(platformui_starzbet_title_lastUpdate)}

                {": "}

                {Time.format(Number(updatedAt), "MMM dd, yyyy HH:mm:ss")}
              </Text>
            )
            : null
        }

        <WrapperGambling />

        <Language direction={"top"} />
      </WrapperForSectionWithSpace>
    )
    : null;
});
ThirdSection.displayName = "ThirdSection";

type TRouteMap = typeof routeMap

const gameRoutes: Partial<TRouteMap[keyof TRouteMap]>[] = [
  routeMap.casino,
  routeMap.liveCasino,
  routeMap.games,
  routeMap.virtual,
  ...sportsBookRoutes,
];

const Footer = memo(() => {
  const footerBlock = useSelector(CMSFooterBlockSelector);

  const isGameRoute = useRouteMatch(gameRoutes);

  if (isNil(footerBlock) || !isThemeTwoFooter(footerBlock)) {
    return null;
  }
  const { _DISABLED_ } = footerBlock;

  return _DISABLED_ || isAllFieldNilOrEmpty(footerBlock)
    ? null
    : (
      <footer className={clsx(classes.footer, isGameRoute && classes.footerGame)}>
        <FirstSection />

        <SecondSection />

        <ThirdSection />

        <FourthSection />
      </footer>
    );
});
Footer.displayName = "Footer";

const FooterWrapper = withCondition(
  withParams(cmsBlockSucceededSelector, EPlatformBlockMap.FOOTER),
  Footer,
);

export { FooterWrapper };
