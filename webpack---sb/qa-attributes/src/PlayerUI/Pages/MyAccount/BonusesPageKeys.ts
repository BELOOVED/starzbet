import { withAttrPrefixFactory } from "../../../Utils/WithAttrPrefixFactory";

const withAttr = withAttrPrefixFactory("player_ui__bonuses");

class BonusesPageKeys {
  static AvailableTab = withAttr("availableTab");
  static PlayerTab = withAttr("playerTab");
  static HistoryTab = withAttr("historyTab");
  static ProductSelect = withAttr("productSelect");
  static PromoInput = withAttr("promoInput");
  static ApplyPromo = withAttr("applyPromo");
  static CompletedToggle = withAttr("completedToggle");
  static BonusList = withAttr("bonusList");
  static ActionButton = withAttr("actionButton");
  static DetailsButton = withAttr("detailsButton");
  static BonusName = withAttr("bonusName");
  static BonusExpire = withAttr("bonusExpire");
}

export { BonusesPageKeys };
