import type { TPageInfo_Fragment } from "@sb/graphql-client";
import type { TPlatform_UserMessage_Fragment } from "@sb/graphql-client/PlayerUI";
import { type TNullable } from "@sb/utils";

interface IUserMessageState {
  unseenCount: number;
  unseenId: null | string;
  detailedId: TNullable<string>;
  messageIds: string[];
  messages: Record<string, TPlatform_UserMessage_Fragment>;
  pageInfo: null | TPageInfo_Fragment;
}

interface IWithUserMessageState {
  userMessage: IUserMessageState;
}

const userMessageInitialState: IWithUserMessageState = {
  userMessage: {
    unseenCount: 0,
    unseenId: null,
    messageIds: [],
    messages: {},
    pageInfo: null,
    detailedId: null,
  },
};

export {
  userMessageInitialState,
  type IUserMessageState,
  type IWithUserMessageState,
};
