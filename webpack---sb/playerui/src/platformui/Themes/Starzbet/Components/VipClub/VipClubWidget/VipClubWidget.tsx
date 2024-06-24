import { memo, useState } from "react";
import { useClickOutside, usePersistCallback, withCondition } from "@sb/utils";
import { platformui_starzbet_vipClub_widget_openVipClub } from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import classes from "./VipClubWidget.module.css";
import { When } from "../../../../../../common/Components/When";
import { LinkToTop } from "../../../../../../common/Components/LinkToTop/LinkToTop";
import { FadeIn } from "../../../../../../common/Components/Animations/FadeIn/FadeIn";
import { routeMap } from "../../../../../RouteMap/RouteMap";
import { vipClubPlayerStateLevelSelector } from "../../../../../Store/VipClub/Selectors/VipClubPlayerStateSelectors";
import { vipClubWidgetVisibleSelector } from "../../../../../Store/VipClub/Selectors/VipClubLevelRulesSelectors";
import { vipClubGameWindowWidgetVisibleSelector } from "../../../../../Store/VipClub/Selectors/VipClubGameWindowSelectors";
import { ArrowRightIcon } from "../../../../Bycasino/Components/Icons/ArrowRightIcon/ArrowRightIcon";
import { CrownIconV2 } from "../../Icons/CrownIcon/CrownIcon";
import { Counter } from "../../Counter/Counter";
import { VipClubPlayerStateWidget } from "../VipClubPlayerState/VipClubPlayerState";

const VipClubWidget = withCondition(
  vipClubWidgetVisibleSelector,
  memo(() => {
    const [visible, setVisible] = useState(false);
    const hide = usePersistCallback(() => setVisible(false));
    const toggle = usePersistCallback(() => setVisible((s) => !s));

    const ref = useClickOutside<HTMLDivElement>(hide);
    const [t] = useTranslation();

    return (

      <div className={classes.vipClubWidgetWrapper} ref={ref}>
        <button className={classes.vipClubWidget} onClick={toggle}>
          <CrownIconV2 width={20} height={20} />

          <Counter selector={vipClubPlayerStateLevelSelector} className={classes.vipClubWidgetLevel} />
        </button>

        <When condition={visible}>
          <div
            className={classes.vipClubWidgetDropdown}
            data-widget={"true"}
          >
            <LinkToTop className={classes.vipClubWidgetLink} to={routeMap.vipClubRoute} onClick={hide}>
              {t(platformui_starzbet_vipClub_widget_openVipClub)}

              <ArrowRightIcon width={10} height={10} color={"brand"} />
            </LinkToTop>

            <VipClubPlayerStateWidget />
          </div>
        </When>
      </div>
    );
  }),
);
VipClubWidget.displayName = "VipClubWidget";

const VipClubWidgetMobile = memo(() => (
  <LinkToTop className={classes.vipClubWidget} to={routeMap.vipClubRoute}>
    <Counter selector={vipClubPlayerStateLevelSelector} className={classes.vipClubWidgetLevel} />

    <CrownIconV2 width={20} height={20} />
  </LinkToTop>
));
VipClubWidgetMobile.displayName = "VipClubWidgetMobile";

const VipClubGameWindowWidget = withCondition(
  vipClubGameWindowWidgetVisibleSelector,
  memo(() => (
    <FadeIn className={classes.vipClubWidget}>
      <Counter selector={vipClubPlayerStateLevelSelector} className={classes.vipClubWidgetLevel} />

      <CrownIconV2 width={20} height={20} />
    </FadeIn>
  )),
);
VipClubGameWindowWidget.displayName = "VipClubGameWindowWidget";

export { VipClubWidget, VipClubWidgetMobile, VipClubGameWindowWidget };
