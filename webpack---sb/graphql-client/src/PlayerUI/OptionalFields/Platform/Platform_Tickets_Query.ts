import { type TPlatform_Tickets_QueryOptionalFields } from "../../Generated/Services/Platform/Types/TPlatform_Tickets_QueryOptionalFields";

const platformTicketsQueryOptionalFields: TPlatform_Tickets_QueryOptionalFields = {
  pageInfo: { total: false },
  edges: {
    node: {
      messages: {
        author: false,
        parent: false,
        parentId: false,
      },
    },
  },
};

export {
  platformTicketsQueryOptionalFields,
};
