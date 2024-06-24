import { withAttrPrefixFactory } from "../../../Utils/WithAttrPrefixFactory";

const withAttr = withAttrPrefixFactory("player_ui__sportsbook");

class SportsbookKeys {
  static AppContainer = withAttr("app_container");

  static ContentWithEllipsis = withAttr("content_with_ellipsis");
  static PreLiveStatus = withAttr("pre_live", "status");
  static PreLiveDate = withAttr("pre_live", "date");
  static PreLiveTime = withAttr("pre_live", "time");
  static LiveStatus = withAttr("live", "status");
  static LiveScoreContainer = withAttr("live", "score", "container");
  static LiveScoreFirst = withAttr("live", "score", "first");
  static LiveScoreSecond = withAttr("live", "score", "second");
}

export { SportsbookKeys };
