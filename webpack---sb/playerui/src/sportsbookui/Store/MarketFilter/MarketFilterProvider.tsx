/* eslint-disable rulesdir/jsx-no-reference-prop */
import React, { createContext, type FC, useContext } from "react";
import { useParamSelector } from "@sb/utils";
import { type EMarketType } from "@sb/betting-core/MarketType";
import { getMarketTypeListBySportId } from "../Feed/Model/Market/Market";
import { useMarketFilterChangeAction } from "./Hooks/UseMarketFilterChangeAction";
import { marketFilterCurrentTypeListBySportIdSelector } from "./Selectors/MarketFilterSelectors";

const AllMarketFilterTypeListContext = createContext<EMarketType | EMarketType[] | undefined>(void 0);
const CurrentMarketFilterTypeListContext = createContext<EMarketType[] | undefined>(void 0);
const MarketFilterHandlerContext = createContext<ReturnType<typeof useMarketFilterChangeAction> | undefined>(void 0);

const useCurrentMarketFilterTypeList = () => {
  const context = useContext(CurrentMarketFilterTypeListContext);

  if (context === void 0) {
    throw new Error("useCurrentMarketFilterTypeList must be used within a CurrentMarketFilterTypeListContext.Provider");
  }

  return context;
};

interface IProps {
  sportId: string;
  children: React.ReactNode;
  count: number;
}

const MarketFilterProvider: FC<IProps> = ({
  sportId,
  children,
  count = 2,
}) => {
  const list = useParamSelector(marketFilterCurrentTypeListBySportIdSelector, [sportId]);

  const currentList = list.slice(0, count);

  const handler = useMarketFilterChangeAction(sportId, currentList);

  return (
    <AllMarketFilterTypeListContext.Provider value={getMarketTypeListBySportId(sportId)}>
      <CurrentMarketFilterTypeListContext.Provider value={currentList}>
        <MarketFilterHandlerContext.Provider value={handler}>
          {children}
        </MarketFilterHandlerContext.Provider>
      </CurrentMarketFilterTypeListContext.Provider>
    </AllMarketFilterTypeListContext.Provider>
  );
};
MarketFilterProvider.displayName = "MarketFilterProvider";

interface IProviderProps {
  marketType: EMarketType | undefined;
  children: React.ReactNode;
}

const StubMarketFilterProvider: FC<IProviderProps> = ({ marketType, children }) => (
  <AllMarketFilterTypeListContext.Provider value={marketType}>
    <CurrentMarketFilterTypeListContext.Provider value={[marketType]}>
      {children}
    </CurrentMarketFilterTypeListContext.Provider>
  </AllMarketFilterTypeListContext.Provider>
);
StubMarketFilterProvider.displayName = "StubMarketFilterProvider";

export {
  useCurrentMarketFilterTypeList,
  StubMarketFilterProvider,
};
