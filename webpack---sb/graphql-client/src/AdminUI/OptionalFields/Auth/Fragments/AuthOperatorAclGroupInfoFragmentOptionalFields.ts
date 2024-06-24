import {
  type TAuth_OperatorAclGroupInfo_FragmentOptionalFields,
} from "../../../Generated/Services/Auth/Types/TAuth_OperatorAclGroupInfo_FragmentOptionalFields";
import {
  authOperatorAclGroupFragmentOptionalFieldsNoRef,
  authOperatorAclGroupFragmentOptionalFieldsWithOperatorsCount,
} from "./AuthOperatorAclGroupFragmentOptionalFields";

const authOperatorAclGroupInfoFragmentOptionalFields: TAuth_OperatorAclGroupInfo_FragmentOptionalFields = {
  aclGroup: authOperatorAclGroupFragmentOptionalFieldsNoRef,
};

const authOperatorAclGroupInfoFragmentOptionalFieldsForAclGroup: TAuth_OperatorAclGroupInfo_FragmentOptionalFields = {
  aclGroup: authOperatorAclGroupFragmentOptionalFieldsWithOperatorsCount,
};

export {
  authOperatorAclGroupInfoFragmentOptionalFields,
  authOperatorAclGroupInfoFragmentOptionalFieldsForAclGroup,
};
