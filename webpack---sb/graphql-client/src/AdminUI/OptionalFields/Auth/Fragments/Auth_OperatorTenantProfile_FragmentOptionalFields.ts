import type {
  TAuth_OperatorTenantProfile_FragmentOptionalFields,
} from "../../../Generated/Services/Auth/Types/TAuth_OperatorTenantProfile_FragmentOptionalFields";
import {
  authOperatorAclGroupInfoFragmentOptionalFields,
  authOperatorAclGroupInfoFragmentOptionalFieldsForAclGroup,
} from "./AuthOperatorAclGroupInfoFragmentOptionalFields";

const authOperatorTenantProfileFragmentOptionalFieldsNoRef: TAuth_OperatorTenantProfile_FragmentOptionalFields = {
  assignedPlayersCount: false,
  ban: false,
  acl: false,
  operatorAclGroupsInfo: false,
};

const authOperatorTenantProfileFragmentOptionalFieldsForOwnProfile: TAuth_OperatorTenantProfile_FragmentOptionalFields = {
  ...authOperatorTenantProfileFragmentOptionalFieldsNoRef,
  acl: true,
  operatorAclGroupsInfo: authOperatorAclGroupInfoFragmentOptionalFields,
};

const authOperatorTenantProfileFragmentOptionalFieldsWithAssignedPlayersCount: TAuth_OperatorTenantProfile_FragmentOptionalFields = {
  ...authOperatorTenantProfileFragmentOptionalFieldsNoRef,
  assignedPlayersCount: true,
};

const authOperatorTenantProfileFragmentOptionalFieldsForOperatorsTable: TAuth_OperatorTenantProfile_FragmentOptionalFields = {
  ...authOperatorTenantProfileFragmentOptionalFieldsNoRef,
  ban: { operator: { avatar: true } },
  acl: true,
  operatorAclGroupsInfo: authOperatorAclGroupInfoFragmentOptionalFields,
};

const authOperatorTenantProfileFragmentOptionalFieldsForAclGroupOperatorsTable: TAuth_OperatorTenantProfile_FragmentOptionalFields = {
  ...authOperatorTenantProfileFragmentOptionalFieldsNoRef,
  ban: { operator: { avatar: true } },
  acl: true,
  operatorAclGroupsInfo: authOperatorAclGroupInfoFragmentOptionalFieldsForAclGroup,
};

const authOperatorTenantProfileFragmentOptionalFieldsForOperator: TAuth_OperatorTenantProfile_FragmentOptionalFields = {
  ...authOperatorTenantProfileFragmentOptionalFieldsNoRef,
  ban: { operator: { avatar: true } },
  assignedPlayersCount: true,
  acl: true,
  operatorAclGroupsInfo: authOperatorAclGroupInfoFragmentOptionalFields,
};

const authOperatorTenantProfileFragmentOptionalFieldsForHomePage: TAuth_OperatorTenantProfile_FragmentOptionalFields = {
  ...authOperatorTenantProfileFragmentOptionalFieldsNoRef,
  ban: { operator: false },
  acl: true,
};

export {
  authOperatorTenantProfileFragmentOptionalFieldsNoRef,
  authOperatorTenantProfileFragmentOptionalFieldsForOwnProfile,
  authOperatorTenantProfileFragmentOptionalFieldsWithAssignedPlayersCount,
  authOperatorTenantProfileFragmentOptionalFieldsForOperatorsTable,
  authOperatorTenantProfileFragmentOptionalFieldsForAclGroupOperatorsTable,
  authOperatorTenantProfileFragmentOptionalFieldsForOperator,
  authOperatorTenantProfileFragmentOptionalFieldsForHomePage,
};
