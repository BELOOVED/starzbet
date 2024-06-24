import { withAttrPrefixFactory } from "../../../Utils/WithAttrPrefixFactory";

const withAttr = withAttrPrefixFactory("player_ui__vip_club");

class VipClubPageKeys {
  static Switcher_Container = withAttr("switcher", "container");

  static Switcher_OverviewLink = withAttr("switcher", "overviewLink");
  static Switcher_LeadersLink = withAttr("switcher", "leadersLink");
  static Switcher_TournamentsLink = withAttr("switcher", "tournamentsLink");

  static LevelRules_Container = withAttr("levelRules", "container");
  static LevelRule_Container = withAttr("levelRule", "container");
  static LevelRule_ExpandButton = withAttr("levelRule", "expandButton");

  static LeadersTabs_Container = withAttr("leadersTabs", "container");
  static LeadersTabs_DailyTab = withAttr("leadersTabs", "dailyTab");
  static LeadersTabs_WeeklyTab = withAttr("leadersTabs", "weeklyTab");
  static LeadersTabs_MonthlyTab = withAttr("leadersTabs", "monthlyTab");
  static LeadersTabs_AllTimeTab = withAttr("leadersTabs", "allTime");

  static OverviewTabs_Container = withAttr("overviewTabs", "container");
  static OverviewTabs_PlayerStateTab = withAttr("overviewTabs", "playerStateTab");
  static OverviewTabs_LevelRulesTab = withAttr("overviewTabs", "levelRulesTab");
  static OverviewTabs_BonusTab = withAttr("overviewTabs", "bonusTab");
  static OverviewTabs_CommissionRefundTab = withAttr("overviewTabs", "commissionRefundTab");
  static OverviewTabs_BenefitsTab = withAttr("overviewTabs", "benefitsTab");
  static OverviewTabs_ContributionTableTab = withAttr("overviewTabs", "contributionTableTab");

  static Leaderboard_Container = withAttr("leaderboard", "container");
  static Leaderboard_Row = withAttr("leaderboard", "row");

  static Tournaments_Container = withAttr("tournaments", "container");
  static Tournament_Timer = withAttr("tournament", "timer");
  static Tournament_Container = withAttr("tournament", "container");

  static PointsProgress_Container = withAttr("pointsProgress", "container");
  static DepositsProgress_Container = withAttr("depositsProgress", "container");

  static CurrentLevel_Container = withAttr("currentLevel", "container");
  static NextLevel_Container = withAttr("nextLevel", "container");

  static Bonuses_Container = withAttr("bonuses", "container");
  static Bonuses_Empty = withAttr("bonuses", "empty");

  static BonusCard_Container = withAttr("bonusCard", "container");
  static BonusCard_ClaimButton = withAttr("bonusCard", "claimButton");
  static BonusCard_CountDown = withAttr("bonusCard", "countDown");

  static CommissionRefund_Container = withAttr("commissionRefund", "container");
  static CommissionRefund_Empty = withAttr("commissionRefund", "empty");
  static CommissionRefund_Success = withAttr("commissionRefund", "success");
  static CommissionRefund_Button = withAttr("commissionRefund", "button");

  static Benefits_Container = withAttr("benefits", "container");
  static Benefits_Empty = withAttr("benefits", "empty");

  static ContributionTable_Container = withAttr("contributionTable", "container");
  static ContributionTable_Empty = withAttr("contributionTable", "empty");
}

export { VipClubPageKeys };
