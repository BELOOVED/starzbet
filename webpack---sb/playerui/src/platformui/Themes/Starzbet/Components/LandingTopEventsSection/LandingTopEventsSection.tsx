import { memo } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { withCondition, withProps } from "@sb/utils";
import { useTranslation } from "@sb/translator";
import { platformui_starzbet_landing_topEvents_sectionTitle } from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import classes from "./LandingTopEventsSection.module.css";
import { IS_MOBILE_CLIENT_SIDE } from "../../../../../common/Store/DeviceInfo/DeviceInfoConstant";
import {
  isNotEmptyWithoutEsportEventIdListByEventCouponSelector,
  withoutEsportEventIdListByEventCouponSelector,
} from "../../../../../sportsbookui/Store/Coupon/Selectors/EventIdListByEventCouponSelector";
import { EventCoupon } from "../../../../../sportsbookui/Themes/Starzbet/OriginalApplication/Components/EventCoupon/EventCoupon";
import { NativeHorizontalScroll } from "../../../../../common/Components/NativeHorizontalScroll/NativeHorizontalScroll";
import { When } from "../../../../../common/Components/When";
import { SectionTitle } from "../SectionTitle/SectionTitle";
import { SectionControls, SectionNextButton, SectionPrevButton } from "../SectionControls/SectionControls";
import { SoccerIcon } from "../Icons/SoccerIcon/SoccerIcon";

const LandingTopEventsSection = withCondition(
  isNotEmptyWithoutEsportEventIdListByEventCouponSelector,
  memo(() => {
    const eventIdList = useSelector(withoutEsportEventIdListByEventCouponSelector, shallowEqual);
    const [t] = useTranslation();

    return (
      <div className={classes.landingTopEventsSection} data-location={"landing"}>
        <div className={classes.sectionWrapper}>
          <div className={classes.sectionHeader}>
            <SectionTitle markerColor={"0 240 8"} icon={withProps(SoccerIcon)({ size: "m" })}>
              {t(platformui_starzbet_landing_topEvents_sectionTitle)}
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
            {eventIdList.map((eventId) => <EventCoupon eventId={eventId} key={eventId} withoutLazy />)}
          </NativeHorizontalScroll>
        </div>
      </div>
    );
  }),
);
LandingTopEventsSection.displayName = "LandingTopEventsSection";

export { LandingTopEventsSection };
