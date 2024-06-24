// @ts-nocheck
import {
  platformui_2fa_error_alreadyDisable,
  platformui_2fa_error_alreadyEnabled,
  platformui_2fa_error_expiredOrLos,
  platformui_2fa_error_notValidCode,
  platformui_button_tryAgain,
  platformui_chat_error_usernameAlreadyExist,
  platformui_depositLimit_error_alreadyHaveSuchDepositLimit,
  platformui_depositLimit_error_commonErrorMessage,
  platformui_depositLimit_error_doNotHaveSuchDepositLimit,
  platformui_depositLimit_error_invalidPassword,
  platformui_forgotPassword_error_incorrectCredentials,
  platformui_forgotPassword_error_incorrectEmail,
  platformui_forgotPassword_error_incorrectSecurityAnswer,
  platformui_login_error_incorrectUsernameOrPassword,
  platformui_login_error_pleaseContact,
  platformui_login_error_tooManyRequests,
  platformui_realityChecks_error_alreadyHaveRealityCheck,
  platformui_realityChecks_error_doNotHaveRealityCheck,
  platformui_register_error_emailAlreadyInUse,
  platformui_selfExclusion_error_commonErrorMessage,
  platformui_selfExclusion_error_doNotHaveSelfExclusion,
  platformui_selfExclusion_error_earlierCancel,
  platformui_selfExclusion_error_invalidPassword,
  platformui_selfExclusion_error_youHaveSelfExclusion,
  platformui_selfProtection_error_tryLetLooseSelfProtection,
  platformui_ticket_error_fileTypeIsNotSupported,
  platformui_ticket_error_openedTicketAlreadyExists,
  platformui_timeOut_error_alreadyHaveTimeOut,
  platformui_timeOut_error_attemptLetLooseEarlier,
  platformui_timeOut_error_commonErrorMessage,
  platformui_timeOut_error_invalidPassword,
  platformui_updatePassword_error_expiredToken,
  platformui_updatePassword_error_invalidToken,
  platformui_updatePassword_error_newPasswordCanNotBeEqualToOldPassword,
  platformui_updatePassword_error_tokenHasAlreadyBeenUsed,
  platformui_verifyDevice_error_attemptsExpired,
  platformui_verifyDevice_error_codeIsStillValid,
  platformui_verifyDevice_error_deviceAlreadyVerified,
  platformui_verifyDevice_error_invalidToken,
  platformui_verifyDevice_error_tokenExpired,
  platformui_verifyPlayer_error_accountVerificationTokenHasAlreadyBeenUsed,
  platformui_verifyPlayer_error_expiredAccountVerificationToken,
  platformui_verifyPlayer_error_invalidAccountVerificationToken,
  platformui_verifySmsCode_error_invalidCode,
  type TCommonTKeys,
} from "@sb/translates/platformui/CommonTKeys";
import { BANKING_ERROR_CODES_ARR } from "../../Banking/Utils/BankingFormErrorFunction";
import { DEPOSIT_LIMIT_FORM } from "../../SelfProtection/Form/DepositLimit/DepositLimitFormModel";
import { PLAY_LIMIT_FORM } from "../../SelfProtection/Form/PlayLimit/PlayLimitFormModel";
import { LOGIN_FORM_NAME } from "../../Auth/Forms/Login/Model";
import { FORGOT_PASSWORD_FORM_NAME } from "../../Auth/Forms/ForgetPassword/Model";
import { UPDATE_PASSWORD_FORM_NAME } from "../../Auth/Forms/UpdatePasswordByEmail/Model";
import { VERIFY_CODE_FORM_NAME } from "../../VerifyCode/Model";
import { VERIFY_DEVICE_FORM_NAME } from "../../VerifyDevice/SubmitForm/Model";
import { TIME_OUT_FORM } from "../../SelfProtection/Form/TimeOut/TimeOutFormModel";
import { SELF_EXCLUSION_FORM } from "../../SelfProtection/Form/SelfExclusion/SelfExclusionFormModel";
import { ACCOUNT_CLOSURE_FORM } from "../../SelfProtection/Form/AccountClosure/AccountClosureFormModel";
import { REALITY_CHECK_FORM } from "../../SelfProtection/Form/RealityCheck/RealityCheckFormModel";
import { PRIVATE_REGISTRATION_FORM_NAME, REGISTRATION_FORM_NAME } from "../../Auth/Forms/Registration/Model";
import { CHAT_NAME_FORM_NAME } from "../../Chat/ChatNameForm/FormName";
import {
  TWO_FACTOR_AUTH_ACTIVATE_FORM_NAME,
  TWO_FACTOR_AUTH_CONFIRM_FORM_NAME,
  TWO_FACTOR_AUTH_DEACTIVATE_FORM_NAME,
} from "../../TwoFactorAuth/SubmitForm/Model";
import { TICKET_SEND_FORM_NAME } from "../../Ticket/Forms/TicketSendForm/Model";
import { OPEN_TICKET_FORM_NAME } from "../../Ticket/Forms/OpenTicketForm/Model";
import { EFormTypes } from "./EFormTypes";

const errorCodes = {
  username_already_exists: "player.username_already_exists",
  username_equals_password: "player.username_equals_password",
  weak_password_complexity: "player.weak_password_complexity",
  player_already_exists: "player.player_already_exists",
  email_already_exists: "player.email_already_exists",
  phone_already_exists: "player.phone_already_exists",
  country_not_found: "player.country_not_found",
  player_not_found: "player.player_not_found",
  invalid_credentials: "security.invalid_credentials",
  user_is_banned: "security.user_is_banned",
  invalid_token: "player.invalid_token",
  invalid_email: "player.invalid_email",
  invalid_security_answer: "security.invalid_security_answer",
  token_expired: "player.token_expired",
  token_token_expired: "token.token_expired",
  token_used: "player.token_used",
  token_token_used: "token.token_used",
  identical_password: "security.identical_password",
  invalid_code: "player.invalid_code",
  invalid_password: "security.invalid_password",
  type_not_found: "self_protection_bag.exception.type_not_found",
  add_equals_bags: "selfprotection.add_equal_bags",
  already_have_such_limit: "self_protection_bag.exception.already_have_such_limit",
  already_have_a_timeout: "self_protection_bag.exception.already_have_a_timeout",
  do_not_have_self_exclusion: "self_protection_bag.exception.do_not_have_self_exclusion",
  attempt_let_loose_earlier: "selfprotection.attempt_let_loose_earlier",
  earlier_cancel: "selfprotection.earlier_cancel",
  cancel_non_exist_rule: "selfprotection.cancel_non_exist_rule",
  ticket_not_found_or_closed: "ticket.ticket_not_found_or_closed",
  invalid_author_for_message: "ticket.invalid_author_for_message",
  message_author_not_found: "ticket.message_author_not_found",
  parent_message_not_found: "ticket.parent_message_not_found",
  related_player_not_found: "ticket.related_player_not_found",
  ticket_message_not_found: "ticket.ticket_message_not_found",
  self_protection_exception: "selfprotection.exception",
  user_not_found: "security.user_not_found",
  user_not_found_by_email: "security.user_not_found_by_email",
  token_invalid_code: "token.invalid_code",
  security_email_already_exists: "security.email_already_exists",
  security_update_verification_code_not_valid: "security.update_verification_code_not_valid",
  security_update_verification_code_still_valid: "security.update_request_token_still_valid",
  phone_verification_token_used: "phone_verification.phone_verification_token_used",
  not_valid_command: "sumstats.not_valid_command",
  ticket_opened_ticket_already_exists: "ticket.opened_ticket_already_exists",
  verification_token_expired: "security.device_verification_code_expired",
  verification_token_invalid_code: "security.device_verification_code_invalid",
  verification_token_attempts_exceeded: "security.device_verification_attempts_exceeded",
  session_closed: "session.session_closed",
  device_already_verified: "security.device_already_verified",
  device_verification_strategy_not_selected: "security.device_verification_strategy_not_selected",
  username_already_exists: "chat.username_already_exists",
  device_verification_code_is_still_valid: "security.device_verification_code_is_still_valid",
  phone_number_invalid: "phone_number.invalid",
  one_time_password_not_valid: "security.one_time_password_not_valid",
  two_factor_authentication_already_enabled: "security.two_factor_authentication_already_enabled",
  secret_expired_or_lost: "security.secret_expired_or_lost",
  two_factor_authentication_not_enabled: "security.two_factor_authentication_not_enabled",
  too_many_login_requests: "security.too_many_login_requests",
  verification_token_expired: "token.verification_token_expired",
  file_system_invalid_mime_type: "file_system.invalid_mime_type",
  phone_verification_token_expired: "phone_verification.phone_verification_token_expired",
};

const ERROR_CODES_ARR = Object.values(errorCodes);

const errorMessages: Record<string, Record<string, TCommonTKeys>> = {
  [LOGIN_FORM_NAME]: {
    [errorCodes.player_not_found]: platformui_login_error_incorrectUsernameOrPassword,
    [errorCodes.invalid_credentials]: platformui_login_error_incorrectUsernameOrPassword,
    [errorCodes.user_not_found]: platformui_login_error_incorrectUsernameOrPassword,
    [errorCodes.user_is_banned]: platformui_login_error_pleaseContact,
    [errorCodes.too_many_login_requests]: platformui_login_error_tooManyRequests,
  },
  [CHAT_NAME_FORM_NAME]: {
    [errorCodes.username_already_exists]: platformui_chat_error_usernameAlreadyExist,
  },
  [FORGOT_PASSWORD_FORM_NAME]: {
    [errorCodes.invalid_security_answer]: platformui_forgotPassword_error_incorrectSecurityAnswer,
    [errorCodes.invalid_email]: platformui_forgotPassword_error_incorrectCredentials,
    [errorCodes.user_not_found]: platformui_forgotPassword_error_incorrectEmail,
    [errorCodes.user_not_found_by_email]: platformui_forgotPassword_error_incorrectEmail,
  },
  verifyPlayer: {
    [errorCodes.invalid_token]: platformui_verifyPlayer_error_invalidAccountVerificationToken,
    [errorCodes.token_expired]: platformui_verifyPlayer_error_expiredAccountVerificationToken,
    [errorCodes.token_used]: platformui_verifyPlayer_error_accountVerificationTokenHasAlreadyBeenUsed,
  },
  [UPDATE_PASSWORD_FORM_NAME]: {
    [errorCodes.invalid_token]: platformui_updatePassword_error_invalidToken,
    [errorCodes.token_expired]: platformui_updatePassword_error_expiredToken,
    [errorCodes.verification_token_expired]: platformui_updatePassword_error_expiredToken,
    [errorCodes.token_used]: platformui_updatePassword_error_tokenHasAlreadyBeenUsed,
    [errorCodes.token_token_used]: platformui_updatePassword_error_tokenHasAlreadyBeenUsed,
    [errorCodes.identical_password]: platformui_updatePassword_error_newPasswordCanNotBeEqualToOldPassword,
    [errorCodes.user_not_found]: platformui_updatePassword_error_invalidToken,
  },
  [VERIFY_CODE_FORM_NAME]: {
    [errorCodes.token_invalid_code]: platformui_verifySmsCode_error_invalidCode,
    [errorCodes.user_not_found]: platformui_verifySmsCode_error_invalidCode,
    [errorCodes.phone_verification_token_used]: platformui_verifySmsCode_error_invalidCode,
    [errorCodes.phone_verification_token_expired]: platformui_verifyDevice_error_tokenExpired,
  },
  [DEPOSIT_LIMIT_FORM]: {
    [errorCodes.type_not_found]: platformui_depositLimit_error_commonErrorMessage,
    [errorCodes.add_equals_bags]: platformui_depositLimit_error_alreadyHaveSuchDepositLimit,
    [errorCodes.already_have_such_limit]: platformui_depositLimit_error_alreadyHaveSuchDepositLimit,
    [errorCodes.cancel_non_exist_rule]: platformui_depositLimit_error_doNotHaveSuchDepositLimit,
    [errorCodes.invalid_password]: platformui_depositLimit_error_invalidPassword,
  },
  [PLAY_LIMIT_FORM]: {
    [errorCodes.type_not_found]: platformui_depositLimit_error_commonErrorMessage,
    [errorCodes.add_equals_bags]: platformui_depositLimit_error_alreadyHaveSuchDepositLimit,
    [errorCodes.already_have_such_limit]: platformui_depositLimit_error_alreadyHaveSuchDepositLimit,
    [errorCodes.cancel_non_exist_rule]: platformui_depositLimit_error_doNotHaveSuchDepositLimit,
    [errorCodes.invalid_password]: platformui_depositLimit_error_invalidPassword,
  },
  [TIME_OUT_FORM]: {
    [errorCodes.type_not_found]: platformui_timeOut_error_commonErrorMessage,
    [errorCodes.add_equals_bags]: platformui_timeOut_error_alreadyHaveTimeOut,
    [errorCodes.already_have_a_timeout]: platformui_timeOut_error_alreadyHaveTimeOut,
    [errorCodes.invalid_password]: platformui_timeOut_error_invalidPassword,
    [errorCodes.attempt_let_loose_earlier]: platformui_timeOut_error_attemptLetLooseEarlier,
  },
  [SELF_EXCLUSION_FORM]: {
    [errorCodes.type_not_found]: platformui_selfExclusion_error_commonErrorMessage,
    [errorCodes.add_equals_bags]: platformui_selfExclusion_error_youHaveSelfExclusion,
    [errorCodes.do_not_have_self_exclusion]: platformui_selfExclusion_error_doNotHaveSelfExclusion,
    [errorCodes.cancel_non_exist_rule]: platformui_selfExclusion_error_doNotHaveSelfExclusion,
    [errorCodes.invalid_password]: platformui_selfExclusion_error_invalidPassword,
    [errorCodes.attempt_let_loose_earlier]: platformui_selfProtection_error_tryLetLooseSelfProtection,
    [errorCodes.earlier_cancel]: platformui_selfExclusion_error_earlierCancel,
  },
  [ACCOUNT_CLOSURE_FORM]: {
    [errorCodes.attempt_let_loose_earlier]: platformui_selfProtection_error_tryLetLooseSelfProtection,
  },
  [REALITY_CHECK_FORM]: {
    [errorCodes.add_equals_bags]: platformui_realityChecks_error_alreadyHaveRealityCheck,
    [errorCodes.cancel_non_exist_rule]: platformui_realityChecks_error_doNotHaveRealityCheck,
  },
  [EFormTypes.addTicketMessage]: {
    [errorCodes.ticket_not_found_or_closed]: "ticket_not_found_or_closed",
    [errorCodes.invalid_author_for_message]: "invalid_author_for_message",
    [errorCodes.message_author_not_found]: "message_author_not_found",
    [errorCodes.parent_message_not_found]: "parent_message_not_found",
  },
  closeTicket: {
    [errorCodes.ticket_not_found_or_closed]: "ticket_not_found_or_closed",
  },
  reOpenTicket: {
    [errorCodes.ticket_not_found_or_closed]: "ticket_not_found_or_closed",
    [errorCodes.related_player_not_found]: "related_player_not_found",
  },
  updateTicketMessageFiles: {
    [errorCodes.ticket_message_not_found]: "ticket_message_not_found",
  },
  [OPEN_TICKET_FORM_NAME]: {
    [errorCodes.message_author_not_found]: platformui_button_tryAgain,
    [errorCodes.related_player_not_found]: platformui_button_tryAgain,
    [errorCodes.ticket_opened_ticket_already_exists]: platformui_ticket_error_openedTicketAlreadyExists,
  },
  [TICKET_SEND_FORM_NAME]: {
    [errorCodes.file_system_invalid_mime_type]: platformui_ticket_error_fileTypeIsNotSupported,
  },
  [REGISTRATION_FORM_NAME]: {
    [errorCodes.security_email_already_exists]: platformui_register_error_emailAlreadyInUse,
  },
  [PRIVATE_REGISTRATION_FORM_NAME]: {
    [errorCodes.security_email_already_exists]: platformui_register_error_emailAlreadyInUse,
  },
  [VERIFY_DEVICE_FORM_NAME]: {
    [errorCodes.verification_token_expired]: platformui_verifyDevice_error_tokenExpired,
    [errorCodes.verification_token_invalid_code]: platformui_verifyDevice_error_invalidToken,
    [errorCodes.verification_token_attempts_exceeded]: platformui_verifyDevice_error_attemptsExpired,
    [errorCodes.session_closed]: platformui_verifyDevice_error_invalidToken,
    [errorCodes.device_already_verified]: platformui_verifyDevice_error_deviceAlreadyVerified,
    [errorCodes.device_verification_strategy_not_selected]: platformui_login_error_pleaseContact,
    [errorCodes.device_verification_code_is_still_valid]: platformui_verifyDevice_error_codeIsStillValid,
  },
  [TWO_FACTOR_AUTH_ACTIVATE_FORM_NAME]: {
    [errorCodes.one_time_password_not_valid]: platformui_2fa_error_notValidCode,
    [errorCodes.two_factor_authentication_already_enabled]: platformui_2fa_error_alreadyEnabled,
    [errorCodes.secret_expired_or_lost]: platformui_2fa_error_expiredOrLos,
  },
  [TWO_FACTOR_AUTH_DEACTIVATE_FORM_NAME]: {
    [errorCodes.one_time_password_not_valid]: platformui_2fa_error_notValidCode,
    [errorCodes.two_factor_authentication_not_enabled]: platformui_2fa_error_alreadyDisable,
  },
  [TWO_FACTOR_AUTH_CONFIRM_FORM_NAME]: {
    [errorCodes.one_time_password_not_valid]: platformui_2fa_error_notValidCode,
  },
};

const isExpectedErrorCode = (code: string) => [...ERROR_CODES_ARR, ...BANKING_ERROR_CODES_ARR].includes(code);

export { errorCodes, errorMessages, isExpectedErrorCode };
