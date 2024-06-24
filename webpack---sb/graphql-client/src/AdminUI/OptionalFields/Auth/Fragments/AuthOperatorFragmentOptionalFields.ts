import {
  type TAuth_Operator_FragmentOptionalFields,
} from "../../../Generated/Services/Auth/Types/TAuth_Operator_FragmentOptionalFields";
import {
  authOperatorTenantProfileFragmentOptionalFieldsNoRef,
} from "./Auth_OperatorTenantProfile_FragmentOptionalFields";

const authOperatorFragmentOptionalFieldsNoRef: TAuth_Operator_FragmentOptionalFields = {
  tenantProfiles: false,
  avatar: false,
  hasActiveSession: false,
};

const authOperatorFragmentOptionalFieldsWithAvatarWithProfiles: TAuth_Operator_FragmentOptionalFields = {
  ...authOperatorFragmentOptionalFieldsNoRef,
  avatar: true,
  tenantProfiles: authOperatorTenantProfileFragmentOptionalFieldsNoRef,
};

const authOperatorFragmentOptionalFieldsWithTenantProfiles: TAuth_Operator_FragmentOptionalFields = {
  ...authOperatorFragmentOptionalFieldsNoRef,
  tenantProfiles: authOperatorTenantProfileFragmentOptionalFieldsNoRef,
};

const authOperatorFragmentOptionalFieldsWithAvatar: TAuth_Operator_FragmentOptionalFields = {
  ...authOperatorFragmentOptionalFieldsNoRef,
  avatar: true,
};

export {
  authOperatorFragmentOptionalFieldsNoRef,
  authOperatorFragmentOptionalFieldsWithTenantProfiles,
  authOperatorFragmentOptionalFieldsWithAvatar,
  authOperatorFragmentOptionalFieldsWithAvatarWithProfiles,
};
