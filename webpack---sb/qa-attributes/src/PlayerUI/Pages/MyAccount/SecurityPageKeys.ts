import { withAttrPrefixFactory } from "../../../Utils/WithAttrPrefixFactory";

const withAttr = withAttrPrefixFactory("player_ui__security");

class SecurityPageKeys {
  static FormContainer = withAttr("container", "form");

  static CurrentPasswordInput = withAttr("input", "current_password");
  static NewPasswordInput = withAttr("input", "new_password");
  static ConfirmNewPasswordInput = withAttr("input", "confirm_new_password");

  static ChangePasswordButton = withAttr("button", "change_password");
}

export { SecurityPageKeys };
