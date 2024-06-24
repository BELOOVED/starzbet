import { type TPlatform_Player_FragmentOptionalFields } from "../../Generated/Services/Platform/Types/TPlatform_Player_FragmentOptionalFields";

const platformPlayerQueryOptionalFieldsNoRef: TPlatform_Player_FragmentOptionalFields = {
  verified: false,
  login: false,
  verifyStrategy: false,
  emailVerificationTokenId: false,
  emailVerificationToken: false,
  phoneVerificationTokenId: false,
  phoneVerificationToken: false,
  profileId: false,
  profile: false,
  kycId: false,
  kyc: false,
  wallet: false,
  bonusWallet: false,
  freeBetWallet: false,
  selfProtection: false,
  firstTimeDeposit: false,
  permissions: false,
};

const platformPlayerEmailVerificationTokenQueryOptionalFields: TPlatform_Player_FragmentOptionalFields = {
  ...platformPlayerQueryOptionalFieldsNoRef,
  verified: true,
  emailVerificationTokenId: true,
  emailVerificationToken: true,
};

const platformPlayerPhoneVerificationTokenQueryOptionalFields: TPlatform_Player_FragmentOptionalFields = {
  ...platformPlayerQueryOptionalFieldsNoRef,
  verified: true,
  phoneVerificationTokenId: true,
  phoneVerificationToken: true,
};

const platformPlayerKycQueryOptionalFields: TPlatform_Player_FragmentOptionalFields = {
  ...platformPlayerQueryOptionalFieldsNoRef,
  kycId: true,
  kyc: true,
};

const platformPlayerAllQueryOptionalFields: TPlatform_Player_FragmentOptionalFields = {
  ...platformPlayerQueryOptionalFieldsNoRef,
  verified: true,
  login: true,
  verifyStrategy: true,
  emailVerificationTokenId: true,
  emailVerificationToken: true,
  phoneVerificationTokenId: true,
  phoneVerificationToken: true,
  profileId: true,
  profile: {
    id: true,
    name: true,
    surname: true,
    townCity: true,
    address: true,
    honorific: true,
    postcode: true,
    country: true,
  },
  kyc: true,
  kycId: true,
  wallet: true,
  bonusWallet: true,
  freeBetWallet: true,
  selfProtection: true,
  firstTimeDeposit: true,
  permissions: true,
};

const platformPlayerWalletQueryOptionalFields: TPlatform_Player_FragmentOptionalFields = {
  ...platformPlayerQueryOptionalFieldsNoRef,
  wallet: true,
  bonusWallet: true,
  freeBetWallet: true,
  firstTimeDeposit: true,
};

const platformPlayerSelfProtectionQueryOptionalFields: TPlatform_Player_FragmentOptionalFields = {
  ...platformPlayerQueryOptionalFieldsNoRef,
  selfProtection: true,
};

const platformPlayerQueryOptionalFieldsWithLogin: TPlatform_Player_FragmentOptionalFields = {
  ...platformPlayerQueryOptionalFieldsNoRef,
  login: true,
};

export {
  platformPlayerQueryOptionalFieldsNoRef,
  platformPlayerKycQueryOptionalFields,
  platformPlayerAllQueryOptionalFields,
  platformPlayerWalletQueryOptionalFields,
  platformPlayerSelfProtectionQueryOptionalFields,
  platformPlayerQueryOptionalFieldsWithLogin,
  platformPlayerEmailVerificationTokenQueryOptionalFields,
  platformPlayerPhoneVerificationTokenQueryOptionalFields,
};
