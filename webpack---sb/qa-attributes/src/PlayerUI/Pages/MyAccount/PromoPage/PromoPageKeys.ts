import { withAttrPrefixFactory } from "../../../../Utils/WithAttrPrefixFactory";

const withAttr = withAttrPrefixFactory("player_ui__promo_page");

class PromoPageKeys {
  static PromoWrapper = withAttr("promo", "wrapper");

  //modal
  static AllBonusesButton = withAttr("button", "all_bonuses");
  static GoToBonusesButton = withAttr("button", "go_to_bonuses");
  static PromoModalContent = withAttr("modal", "promo_wrapper_content");
  static PromoTextContent = withAttr("modal", "promo_text_content");
}

export { PromoPageKeys };
