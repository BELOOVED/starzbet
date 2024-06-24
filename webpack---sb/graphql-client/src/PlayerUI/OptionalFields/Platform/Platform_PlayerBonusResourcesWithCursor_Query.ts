import {
  type TPlatform_PlayerBonusResourcesWithCursor_QueryOptionalFields,
} from "../../Generated/Services/Platform/Types/TPlatform_PlayerBonusResourcesWithCursor_QueryOptionalFields";

const playerBonusResourcesWithoutTransactionRequestQueryOptionalFields: TPlatform_PlayerBonusResourcesWithCursor_QueryOptionalFields = {
  pageInfo: { total: false },
  edges: {
    node: {
      transactionRequests: false,
    },
  },
};

const platformPlayerBonusResourcesWithCursorQueryOptionalFields: TPlatform_PlayerBonusResourcesWithCursor_QueryOptionalFields = {
  pageInfo: { total: false },
  edges: {
    node: {
      transactionRequests: true,
    },
  },
};

export {
  playerBonusResourcesWithoutTransactionRequestQueryOptionalFields,
  platformPlayerBonusResourcesWithCursorQueryOptionalFields,
};
