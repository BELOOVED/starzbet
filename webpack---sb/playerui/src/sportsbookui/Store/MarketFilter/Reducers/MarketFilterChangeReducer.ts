import { type EMarketType } from "@sb/betting-core/MarketType";
import { getNotNil, type TReducer } from "@sb/utils";
import { update } from "../../../Utils/Update";
import { getMarketTypeListBySportId } from "../../Feed/Model/Market/Market";
import { type IWithMarketFilterState } from "../MarketFilterState";
import { type marketFilterChangeAction } from "../MarketFilterActions";

const updateCurrentTypeList = (currentList: EMarketType[], allList: EMarketType[], prevType: EMarketType, nextType: EMarketType) => {
  const duplicateIndex = currentList.indexOf(nextType);

  return update<EMarketType>(
    currentList.indexOf(prevType),
    nextType,
    duplicateIndex === -1
      ? currentList
      : update<EMarketType>(
        duplicateIndex,
        getNotNil(allList.find((h) => h !== nextType), ["MarketFilterChangeReducer"], "update"),
        currentList,
      ),
  );
};

const marketFilterChangeReducer: TReducer<IWithMarketFilterState, typeof marketFilterChangeAction> = (
  state,
  {
    payload: {
      sportId,
      currentList,
      prev,
      next,
    },
  },
) => ({
  ...state,
  marketFilter: {
    ...state.marketFilter,
    typeList: {
      ...state.marketFilter.typeList,
      [sportId]: updateCurrentTypeList(currentList, getMarketTypeListBySportId(sportId), prev, next),
    },
  },
});

export { marketFilterChangeReducer };
