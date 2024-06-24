import { withAttrPrefixFactory } from "../../../Utils/WithAttrPrefixFactory";

const withAttr = withAttrPrefixFactory("player_ui__sign_up");

class SignUpPageKeys {
  static RegularMembershipButton = withAttr("button", "regular_membership");
  static PrivateMembershipButton = withAttr("button", "private_membership");

  static UsernameInput = withAttr("input", "username");
  static UsernameInputValidation = withAttr("input_validation", "username");

  static FirstNameInput = withAttr("input", "first_name");
  static FirstNameInputValidation = withAttr("input_validation", "first_name");

  static LastNameInput = withAttr("input", "last_name");
  static LastNameInputValidation = withAttr("input_validation", "last_name");

  static EmailInput = withAttr("input", "email");
  static EmailInputValidation = withAttr("input_validation", "email");

  static CountryCodeSelect = withAttr("select", "country_code");
  static CountryCodeOption = withAttr("option", "country_code");

  static PhoneNumberInput = withAttr("input", "phone_number");
  static PhoneNumberInputValidation = withAttr("input_validation", "phone_number");

  static PasswordContainer = withAttr("container", "password");
  static PasswordInput = withAttr("input", "password");
  static PasswordInputValidation = withAttr("input_validation", "password");
  static ShowHidePasswordButton = withAttr("button", "show_hide_password");

  static CountrySelect = withAttr("select", "country");
  static CountryList = withAttr("list", "country");
  static CountryOption = withAttr("option", "country");

  static DateOfBirthInput = withAttr("input", "date_of_birth");
  static DateOfBirthInputValidation = withAttr("input_validation", "date_of_birth");

  static VerificationCodeInput = withAttr("input", "verification_code");

  static GetWelcomeBonusCheckbox = withAttr("checkbox", "get_welcome_bonus");
  static TermsOfUseAgreementCheckbox = withAttr("checkbox", "terms_of_use_agreement");
  static NotificationsSubscriptionCheckbox = withAttr("checkbox", "notifications_subscription");
}

export { SignUpPageKeys };
