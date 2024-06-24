import { type ComponentType, memo } from "react";
import { useTranslation } from "@sb/translator";
import { withProps } from "@sb/utils";
import {
  platformui_starzbet_vipClub_tabs_benefits_title,
  platformui_starzbet_vipClub_tabs_bonus_title,
  platformui_starzbet_vipClub_tabs_commissionRefund_title,
  platformui_starzbet_vipClub_tabs_levelRules_title,
  platformui_starzbet_vipClub_tabs_playerState_title,
  platformui_starzbet_vipClubLeaders_leaderBoard_tab_allTime,
  platformui_starzbet_vipClubLeaders_leaderBoard_tab_daily,
  platformui_starzbet_vipClubLeaders_leaderBoard_tab_monthly,
  platformui_starzbet_vipClubLeaders_leaderBoard_tab_weekly,
  type TTKeys,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import classes from "./VipClubTabs.module.css";
import { Ellipsis } from "../../../../../Components/Ellipsis/Ellipsis";
import type { TVipClubLinkProps } from "../../../../../Components/VipClub/VipClubLinks/TVipClubLinkProps";
import {
  VipClubOverviewBenefitsLink,
  VipClubOverviewBonusLink,
  VipClubOverviewCommissionRefundLink,
  VipClubOverviewLevelRulesLink,
  VipClubOverviewPlayerStateLink,
} from "../../../../../Components/VipClub/VipClubLinks/VipClubOverviewLinks";
import {
  VipClubLeadersAllTimeLink,
  VipClubLeadersDailyLink,
  VipClubLeadersMonthlyLink,
  VipClubLeadersWeeklyLink,
} from "../../../../../Components/VipClub/VipClubLinks/VipClubLeadersLinks";

interface IVipClubTab {
  titleTKey: TTKeys;
  Component: ComponentType<TVipClubLinkProps>;
}

const VIP_CLUB_TABS: IVipClubTab[] = [
  { titleTKey: platformui_starzbet_vipClub_tabs_playerState_title, Component: VipClubOverviewPlayerStateLink },
  { titleTKey: platformui_starzbet_vipClub_tabs_levelRules_title, Component: VipClubOverviewLevelRulesLink },
  { titleTKey: platformui_starzbet_vipClub_tabs_bonus_title, Component: VipClubOverviewBonusLink },
  { titleTKey: platformui_starzbet_vipClub_tabs_commissionRefund_title, Component: VipClubOverviewCommissionRefundLink },
  { titleTKey: platformui_starzbet_vipClub_tabs_benefits_title, Component: VipClubOverviewBenefitsLink },
];

const VIP_CLUB_LEADERS_TABS: IVipClubTab[] = [
  {
    titleTKey: platformui_starzbet_vipClubLeaders_leaderBoard_tab_daily,
    Component: VipClubLeadersDailyLink,
  },
  {
    titleTKey: platformui_starzbet_vipClubLeaders_leaderBoard_tab_weekly,
    Component: VipClubLeadersWeeklyLink,
  },
  {
    titleTKey: platformui_starzbet_vipClubLeaders_leaderBoard_tab_monthly,
    Component: VipClubLeadersMonthlyLink,
  },
  {
    titleTKey: platformui_starzbet_vipClubLeaders_leaderBoard_tab_allTime,
    Component: VipClubLeadersAllTimeLink,
  },
];

const VipClubTab = memo<IVipClubTab>(({ titleTKey, Component }) => {
  const [t] = useTranslation();

  return (
    <Component className={classes.vipClubTab}>
      <Ellipsis>{t(titleTKey)}</Ellipsis>
    </Component>
  );
});
VipClubTab.displayName = "VipClubTab";

interface IVipClubTabsBaseProps {
  tabs: IVipClubTab[];
}

const VipClubTabsBase = memo<IVipClubTabsBaseProps>(({ tabs }) => (
  <div className={classes.vipClubTabs}>
    {tabs.map((tab) => <VipClubTab {...tab} key={tab.titleTKey} />)}
  </div>
));
VipClubTabsBase.displayName = "VipClubTabsBase";

const VipClubTabs = withProps(VipClubTabsBase)({ tabs: VIP_CLUB_TABS });
const VipClubLeadersTabs = withProps(VipClubTabsBase)({ tabs: VIP_CLUB_LEADERS_TABS });

export { VipClubTabs, VipClubLeadersTabs };
