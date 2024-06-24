import { type TPlatform_Banks_QueryOptionalFields } from "../../Generated/Services/Platform/Types/TPlatform_Banks_QueryOptionalFields";

const platformBanksQueryOptionalFields: TPlatform_Banks_QueryOptionalFields = {
  pageInfo: { total: false },
  edges: { node: { accounts: false } },
};

export {
  platformBanksQueryOptionalFields,
};
