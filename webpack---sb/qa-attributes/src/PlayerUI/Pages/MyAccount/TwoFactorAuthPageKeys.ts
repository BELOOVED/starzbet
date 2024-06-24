import { withAttrPrefixFactory } from "../../../Utils/WithAttrPrefixFactory";

const withAttr = withAttrPrefixFactory("player_ui__2fa");

class TwoFactorAuthPageKeys {
  static PageContainer = withAttr("container", "page");

  static QRCode = withAttr("element", "QR");
  static CopyRow = withAttr("element", "copy_row");

  static CodeInput = withAttr("input", "code");
  static CodeInputValidation = withAttr("input", "code_validation");

  static SubmitButton = withAttr("button", "submit");
}

export { TwoFactorAuthPageKeys };
