import { withAttrPrefixFactory } from "../../../Utils/WithAttrPrefixFactory";

const withAttr = withAttrPrefixFactory("player_ui__details");

class DetailsPageKeys {
  static FormContainer = withAttr("container", "form");

  static UsernameInput = withAttr("input", "username");

  static EmailInput = withAttr("input", "email");
  static EditEmailButton = withAttr("button", "change_email");
  static ResendEmailVerificationButton = withAttr("button", "resend_email_verification");

  static MobileNumberInput = withAttr("input", "mobile_number");
  static EditMobileNumberButton = withAttr("button", "change_mobile_number");
  static ResendMobileNumberVerificationButton = withAttr("button", "resend_mobile_number_verification");

  static VerifyMobileNumberNowButton = withAttr("button", "verify_mobile_number_now");

  static VerificationCodeInput = withAttr("input", "verification_code");
}

export { DetailsPageKeys };
