import { type FC, memo, type PropsWithChildren } from "react";
import { useSelector } from "react-redux";
import { withCondition, withProps } from "@sb/utils";
import { useTranslation } from "@sb/translator";
import { platformui_starzbet_landing_topLeagues_sectionTitle } from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { type TSportsbook_NewCoupon_Fragment } from "@sb/graphql-client/PlayerUI";
import classes from "./LandingTopLeaguesSection.module.css";
import { IS_MOBILE_CLIENT_SIDE } from "../../../../../common/Store/DeviceInfo/DeviceInfoConstant";
import { When } from "../../../../../common/Components/When";
import { NativeHorizontalScroll } from "../../../../../common/Components/NativeHorizontalScroll/NativeHorizontalScroll";
import {
  isNotEmptyTopLeaguesCouponsSelector,
  topLeaguesCouponsBatchSelector,
  topLeaguesCouponsSelector,
} from "../../../../../sportsbookui/Store/Coupon/Selectors/CouponsByViewSelector";
import { Ellipsis } from "../../../../../sportsbookui/Components/Ellipsis/Ellipsis";
import { NavLinkToTop } from "../../../../../common/Components/LinkToTop/LinkToTop";
import { routeMap } from "../../../../../sportsbookui/RouteMap/RouteMap";
import { AntiPhishingCatcher } from "../../../../../common/Components/Protection/AntiPhisingCatcher";
import { SectionTitle } from "../SectionTitle/SectionTitle";
import { SectionControls, SectionNextButton, SectionPrevButton } from "../SectionControls/SectionControls";
import { TrophyIcon } from "../Icons/TrophyIcon/TrophyIcon";

const TopLeague = memo<TSportsbook_NewCoupon_Fragment>(({ id, image, name }) => {
  const params = { couponId: id };

  return (
    <article>
      <NavLinkToTop className={classes.topLeague} to={routeMap.preLive.coupon} params={params}>
        <div className={classes.topLeagueImgContainer}>
          {image ? <img className={classes.topLeagueImg} alt={"league"} src={image} /> : name}
        </div>

        <div className={classes.topLeagueName}>
          <Ellipsis>
            {name}
          </Ellipsis>
        </div>
      </NavLinkToTop>
    </article>
  );
});
TopLeague.displayName = "TopLeague";

interface ITopLeagueMobileProps {
  batch: TSportsbook_NewCoupon_Fragment[];
}

const TopLeagueMobile = memo<ITopLeagueMobileProps>(({ batch }) => (
  <div className={classes.topLeagueBatch}>
    {batch.map((coupon) => <TopLeague {...coupon} key={coupon.id} />)}
  </div>
));
TopLeagueMobile.displayName = "TopLeagueMobile";

const LandingTopLeaguesSectionWrapper: FC<PropsWithChildren> = withCondition(
  isNotEmptyTopLeaguesCouponsSelector,
  ({ children }) => {
    const [t] = useTranslation();

    return (
      <div className={classes.landingTopLeaguesSection} data-location={"landing"}>
        <div className={classes.sectionWrapper}>
          <div className={classes.sectionHeader}>
            <SectionTitle markerColor={"255 158 0"} icon={withProps(TrophyIcon)({ size: "m", color: "active" })}>
              {t(platformui_starzbet_landing_topLeagues_sectionTitle)}

              <AntiPhishingCatcher />
            </SectionTitle>

            <When condition={!IS_MOBILE_CLIENT_SIDE}>
              <SectionControls />
            </When>
          </div>

          <NativeHorizontalScroll
            className={classes.sectionScroll}
            trackClassName={classes.sectionTrack}
            prevArrow={SectionPrevButton}
            nextArrow={SectionNextButton}
          >
            {children}
          </NativeHorizontalScroll>
        </div>
      </div>
    );
  },
);
LandingTopLeaguesSectionWrapper.displayName = "LandingTopLeaguesSectionWrapper";

const LandingTopLeaguesSectionDesktop = memo(() => {
  const coupons = useSelector(topLeaguesCouponsSelector);

  return (
    <LandingTopLeaguesSectionWrapper>
      {coupons.map((coupon) => <TopLeague {...coupon} key={coupon.id} />)}
    </LandingTopLeaguesSectionWrapper>
  );
});
LandingTopLeaguesSectionDesktop.displayName = "LandingTopLeaguesSectionDesktop";

const LandingTopLeaguesSectionMobile = memo(() => {
  const coupons = useSelector(topLeaguesCouponsBatchSelector);

  return (
    <LandingTopLeaguesSectionWrapper>
      {coupons.map((batch, i) => <TopLeagueMobile batch={batch} key={i} />)}
    </LandingTopLeaguesSectionWrapper>
  );
});
LandingTopLeaguesSectionMobile.displayName = "LandingTopLeaguesSectionMobile";

export { LandingTopLeaguesSectionDesktop, LandingTopLeaguesSectionMobile };
