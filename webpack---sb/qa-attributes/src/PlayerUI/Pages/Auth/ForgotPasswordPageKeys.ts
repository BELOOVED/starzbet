import { withAttrPrefixFactory } from "../../../Utils/WithAttrPrefixFactory";

const withAttr = withAttrPrefixFactory("player_ui__forgot_password");

class ForgotPasswordPageKeys {
  static EmailInput = withAttr("input", "email");
  static EmailInputValidation = withAttr("input_validation", "email");

  static RecoverPasswordButton = withAttr("button", "recover_password");
}

export { ForgotPasswordPageKeys };
