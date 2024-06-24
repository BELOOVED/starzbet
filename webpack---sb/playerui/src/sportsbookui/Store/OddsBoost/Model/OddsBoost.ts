import { type IMoney, Money } from "@sb/utils";
import type { TCallResponsePayload } from "@sb/sdk";
import type { call_GetActiveBoostsForPlayerQuery, call_GetBoostsForGroupQuery } from "@sb/sdk/SDKClient/sportsbookread";
import {
  assertMonetaryBoostSize,
  assertPercentageBoostSize,
  type TBetBoostSize,
  type TBetBoostSizeMonetary,
  type TBetBoostSizePercentage,
} from "../../MyBets/Model/TBet";

const applyBoundary = (min: IMoney, max: IMoney, v: IMoney) => Money.min(max, Money.max(min, v));

const addPtc = (pct: number, v: IMoney) => Money.multiply(v, pct / 100);

const applyPercent = (profit: IMoney, size: TBetBoostSizePercentage) => applyBoundary(
  size.minBoostWinLimit,
  size.maxBoostWinLimit,
  addPtc(size.percent, profit),
);

const applyMoney = ({ money }: TBetBoostSizeMonetary) => money;

const getOddsBoostSize = (profit: IMoney, size: TBetBoostSize): IMoney => {
  switch (size.type) {
    case "percentage": {
      assertPercentageBoostSize(size, "getOddsBoostSize");

      return applyPercent(profit, size);
    }
    case "monetary": {
      assertMonetaryBoostSize(size, "getOddsBoostSize");

      return applyMoney(size);
    }
    default:
      throw new Error(`invalid size type ${size.type}`);
  }
};

type TActiveBoostsForPlayerPayload = TCallResponsePayload<typeof call_GetActiveBoostsForPlayerQuery>;
type TBoostsForGroupPayload = TCallResponsePayload<typeof call_GetBoostsForGroupQuery>;

export {
  getOddsBoostSize,
  type TActiveBoostsForPlayerPayload,
  type TBoostsForGroupPayload,
};
