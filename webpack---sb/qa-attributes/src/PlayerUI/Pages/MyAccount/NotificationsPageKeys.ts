import { withAttrPrefixFactory } from "../../../Utils/WithAttrPrefixFactory";

const withAttr = withAttrPrefixFactory("player_ui__notifications");

class NotificationsPageKeys {
  static Subject = withAttr("subject");
  static Message = withAttr("message");
  static Published = withAttr("published");
  static Image = withAttr("image");
}

export { NotificationsPageKeys };
