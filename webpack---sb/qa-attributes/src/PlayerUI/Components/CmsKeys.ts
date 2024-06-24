import { withAttrPrefixFactory } from "../../Utils/WithAttrPrefixFactory";

const withAttr = withAttrPrefixFactory("player_ui__cms");

class CmsKeys {
  public static Footer = withAttr("footer");
  public static EternalPageLink = withAttr("eternal-page-link");
  public static SimplePageContent = withAttr("simple-page-content");
  public static PromoButton = withAttr("promo-button");
  public static PromoContent = withAttr("promo-content");
}

export { CmsKeys };
