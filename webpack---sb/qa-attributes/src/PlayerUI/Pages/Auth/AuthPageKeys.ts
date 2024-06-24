import { withAttrPrefixFactory } from "../../../Utils/WithAttrPrefixFactory";

const withAttr = withAttrPrefixFactory("player_ui__auth");

class AuthPageKeys {
  static Container = withAttr("page", "container");
  static Form = withAttr("page", "form");

  static Title = withAttr("page", "title");
  static Banner = withAttr("page", "banner");

  static CloseButton = withAttr("button", "close");

  static AccountLogo = withAttr("link", "account_logo");

  static SignInButton = withAttr("button", "sign_in");
  static SignUpButton = withAttr("button", "sign_up");
  static ForgotPasswordButton = withAttr("button", "forgot_password");
}

export { AuthPageKeys };
