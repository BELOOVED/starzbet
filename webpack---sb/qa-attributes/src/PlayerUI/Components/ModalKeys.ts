import { withAttrPrefixFactory } from "../../Utils/WithAttrPrefixFactory";

const withAttr = withAttrPrefixFactory("player_ui__modal");

class ModalKeys {
  public static Container = withAttr("container");
  public static CloseButton = withAttr("button", "close");

  public static Title = withAttr("title");
  public static SubTitle = withAttr("subtitle");
  public static Validation = withAttr("validation");

  public static SubmitButton = withAttr("button", "submit");
  public static RejectButton = withAttr("button", "reject");

  public static OkButton = withAttr("button", "ok"); // 'Got It', 'OK'...
}

export { ModalKeys };
