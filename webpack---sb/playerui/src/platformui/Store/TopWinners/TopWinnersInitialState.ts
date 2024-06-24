import type { TPlatform_TopWinner_Fragment } from "@sb/graphql-client/PlayerUI";
import { isNotNil } from "@sb/utils";
import { type TWithIsServerLoaded } from "../../../common/IWith";

interface IWithTopWinnersPreloadedState {
  topWinners: {
    nodes: TPlatform_TopWinner_Fragment[];
  };
}

type TWithTopWinnersInitialState = TWithIsServerLoaded<IWithTopWinnersPreloadedState, "topWinners">

const getTopWinnersInitialState = (preloadedState?: IWithTopWinnersPreloadedState["topWinners"]): TWithTopWinnersInitialState => ({
  topWinners: {
    nodes: preloadedState?.nodes ?? [],
    isServerLoaded: isNotNil(preloadedState),
  },
});

export type { IWithTopWinnersPreloadedState };
export { getTopWinnersInitialState };
