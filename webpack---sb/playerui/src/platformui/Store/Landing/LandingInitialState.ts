import type { TPlatform_GameLabel_Fragment, TPlatform_GamePageInfo_Fragment } from "@sb/graphql-client/PlayerUI";

type TLandingState = {
  games: {
    gamesIds: string[];
    labelIds: Record<string, string[]>;
    pageInfo: TPlatform_GamePageInfo_Fragment | null;
  };
  labels: TPlatform_GameLabel_Fragment[];
}

type TWithLandingState = {
  landing: TLandingState;
}

const landingInitialState: TWithLandingState = {
  landing: {
    games: {
      gamesIds: [],
      labelIds: {},
      pageInfo: null,
    },
    labels: [],
  },

};

export { landingInitialState };
export type { TWithLandingState };
