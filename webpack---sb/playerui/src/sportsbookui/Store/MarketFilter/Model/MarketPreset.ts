import { EMarketType } from "@sb/betting-core/MarketType";
import {
  sportsbookui_marketPreset_doubleChance,
  sportsbookui_marketPreset_fullTimeResult,
  sportsbookui_marketPreset_handicap,
  sportsbookui_marketPreset_oddEven,
  sportsbookui_marketPreset_overUnder,
} from "@sb/translates/sportsbookui/CommonTKeys";
import { mainLineSchema } from "@sb/betting-core/MainLineSchema";

enum EMarketPreset {
  FULL_TIME_RESULT = "fullTimeResult",
  HANDICAP = "handicap",
  OVER_UNDER = "overUnder",
  DOUBLE_CHANCE = "doubleChance",
  ODD_EVEN = "oddEven",
}

type TSportId = keyof typeof mainLineSchema;

const marketTypes = {
  [EMarketPreset.FULL_TIME_RESULT]: EMarketType.score_1x2,
  [EMarketPreset.HANDICAP]: EMarketType.score_ah,
  [EMarketPreset.OVER_UNDER]: EMarketType.score_ou,
  [EMarketPreset.DOUBLE_CHANCE]: EMarketType.score_dc,
  [EMarketPreset.ODD_EVEN]: EMarketType.score_odd_even,
};

const marketPresetTkeys: Record<EMarketPreset, string> = {
  [EMarketPreset.FULL_TIME_RESULT]: sportsbookui_marketPreset_fullTimeResult,
  [EMarketPreset.HANDICAP]: sportsbookui_marketPreset_handicap,
  [EMarketPreset.OVER_UNDER]: sportsbookui_marketPreset_overUnder,
  [EMarketPreset.DOUBLE_CHANCE]: sportsbookui_marketPreset_doubleChance,
  [EMarketPreset.ODD_EVEN]: sportsbookui_marketPreset_oddEven,
};

const getMarketTypeByPreset = (preset: EMarketPreset, sportId: TSportId): EMarketType | undefined => {
  if (!marketTypes[preset]) {
    return void 0;
  }

  if (preset === EMarketPreset.FULL_TIME_RESULT) {
    const [schema = []]: string[][] = Object.values(mainLineSchema[sportId]);

    if (schema.includes(EMarketType.score_12)) {
      return EMarketType.score_12;
    }
  }

  return marketTypes[preset];
};

export {
  marketPresetTkeys,
  getMarketTypeByPreset,
  EMarketPreset,
  type TSportId,
};
