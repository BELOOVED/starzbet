import clsx from "clsx";
import { createElement, memo } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "@sb/translator";
import { isNotNil, stopPropagation, type TVoidFn } from "@sb/utils";
import classes from "./NavBar.module.css";
import { IS_MOBILE_CLIENT_SIDE } from "../../../../../common/Store/DeviceInfo/DeviceInfoConstant";
import { CloseIcon } from "../../../../../common/Themes/Starzbet/Components/Icons/CloseIcon";
import { When } from "../../../../../common/Components/When";
import { LinkLocalized } from "../../../../../common/Client/Core/Services/RouterService/Components/LinkLocalized/LinkLocalized";
import { NavLinkLocalized } from "../../../../../common/Client/Core/Services/RouterService/Components/NavLinkLocalized/NavLinkLocalized";
import { scrollToTop, withScrollToTop } from "../../../../Utils/ScrollToTop";
import { Ellipsis } from "../../../../Components/Ellipsis/Ellipsis";
import { ImageSimpleLink } from "../../../../Components/CMSComponents/CMSImageLink/ImageLink";
import { CMSFooterSocialLinkListSelector } from "../../Store/CMS/Selectors/CMSFooterSelectors";
import { PromotionTabWrapper } from "../CMSComponents/HeaderPromoTab/HeaderPromoTab";
import { Language } from "../Language/Language";
import { GAMES_LINKS, NAV_LINKS } from "./Links";

interface INavSectionProps {
  onClick: TVoidFn;
}

const NavSection = memo<INavSectionProps>(({ onClick }) => {
  const [t] = useTranslation();

  return (
    <div className={classes.navSection}>
      {
        NAV_LINKS.map((
          {
            path,
            tKey,
            icon,
            isActive,
            exact,
          },
          i,
        ) => (
          <NavLinkLocalized
            key={i}
            to={path}
            exact={exact}
            className={classes.item}
            activeClassName={classes.activeItem}
            isActive={isActive}
            onClick={onClick}
          >
            {createElement(icon)}

            <div className={classes.linkTitle}>
              <Ellipsis>
                {t(tKey)}
              </Ellipsis>
            </div>
          </NavLinkLocalized>
        ))
      }

      <PromotionTabWrapper
        className={classes.item}
        activeClassName={classes.activeItem}
        onClick={withScrollToTop(onClick)}
      />
    </div>
  );
});
NavSection.displayName = "NavSection";

const GamesSection = memo<INavSectionProps>(({ onClick }) => {
  const [t] = useTranslation();

  return (
    <div className={classes.navSection}>
      {
        GAMES_LINKS.map(({ path, tKey, icon }) => (
          <LinkLocalized
            {...path}
            className={classes.gameItem}
            onClick={withScrollToTop(onClick)}
            key={path.to}
          >
            {createElement(icon)}

            <div className={classes.linkTitle}>
              <Ellipsis>
                {t(tKey)}
              </Ellipsis>
            </div>
          </LinkLocalized>
        ))
      }
    </div>
  );
});
GamesSection.displayName = "GamesSection";

const BottomSection = memo(() => {
  const socialLinkList = useSelector(CMSFooterSocialLinkListSelector);

  return (
    <div className={classes.bottom}>
      {
        isNotNil(socialLinkList)
          ? (
            <div className={classes.socialLinksWrapper}>
              {
                socialLinkList.map((el, index) => (
                  <ImageSimpleLink
                    imageClassName={classes.socialLinkImg}
                    imageLink={el}
                    linkWrapperClassName={classes.socialLink}
                    key={index}
                  />
                ))
              }
            </div>
          )
          : null
      }

      <Language direction={"top"} />
    </div>
  );
});
BottomSection.displayName = "BottomSection";

interface INavBarProps {
  active?: boolean;
  onClick: TVoidFn;
}

const MobileHeader = memo<INavSectionProps>(({ onClick }) => (
  <div className={classes.mobileHeader}>
    <div className={classes.logo} />

    <div onClick={onClick}>
      <CloseIcon size={"xs"} color={"text"} />
    </div>
  </div>
));
MobileHeader.displayName = "MobileHeader";

const NavBar = memo<INavBarProps>(({ onClick, active }) => {
  const closeHandler = () => {
    onClick();
    scrollToTop();
  };

  return (
    <div className={clsx(classes.navbar, active && classes.navbarActive)} onClick={stopPropagation}>
      <When condition={IS_MOBILE_CLIENT_SIDE}>
        <MobileHeader onClick={closeHandler} />
      </When>

      <NavSection onClick={onClick} />

      <GamesSection onClick={onClick} />

      <BottomSection />
    </div>
  );
});
NavBar.displayName = "NavBar";

export { NavBar };
