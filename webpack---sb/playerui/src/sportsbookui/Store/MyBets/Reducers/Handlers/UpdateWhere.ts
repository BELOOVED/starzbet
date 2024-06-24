import unionWith from "lodash/fp/unionWith";
import isEqual from "lodash/fp/isEqual";
import { getNotNil } from "@sb/utils";
import { whereMyBetsSelector } from "../../Selectors/MyBetsSelectors";
import { type IWithMyBetsState } from "../../MyBetsState";
import { type TBetWhereExtension } from "../../Model/BetWhereExtension";
import { type TWhere } from "../../Model/TBet";

const updateWhere = (whereExtension: TBetWhereExtension, newOperands: TWhere[], state: IWithMyBetsState) => {
  const where = getNotNil(whereMyBetsSelector(state), ["updateWhere"], "where");

  return {
    ...where,
    operands: unionWith(
      isEqual,
      where.operands?.filter(({ fieldPath }) => fieldPath !== whereExtension),
      newOperands,
    ),
  };
};

export { updateWhere };
