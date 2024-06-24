import { withAttrPrefixFactory } from "../../../Utils/WithAttrPrefixFactory";

const withAttr = withAttrPrefixFactory("player_ui__sign_in");

class SignInPageKeys {
  static UsernameInput = withAttr("input", "username");
  static PasswordInput = withAttr("input", "password");
  static ShowHidePasswordButton = withAttr("button", "show_hide_password");
  static PasswordContainer = withAttr("container", "password");
}

export { SignInPageKeys };
