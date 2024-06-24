import { hasOwnProperty } from "@sb/utils";
import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { type TMoney_Fragment } from "../../../Core/Generated/Services/Common/Types/TMoney_Fragment";
import { EPlatform_Typename } from "../../../Core/Generated/Services/Platform/Models/EPlatform_Typename";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import {
  type TPlatform_BonusSummaryMeasuresDto_Fragment,
} from "../../Generated/Services/Platform/Types/TPlatform_BonusSummaryMeasuresDto_Fragment";

type TPlatform_BonusSummaryMeasuresDto_AdditionalData = { parentId: string; };

type TPlatform_BonusSummaryMeasuresDto_Record = TRecord & Partial<{
  bonusActivated: TMoney_Fragment | null;
  bonusActivatedRatePct: number | null;
  bonusConverted: TMoney_Fragment | null;
  bonusConvertedRatePct: number | null;
  bonusCost: TMoney_Fragment | null;
  bonusCostRatePct: number | null;
  freeBetActivated: TMoney_Fragment | null;
  freeBetCost: TMoney_Fragment | null;
  ngr: TMoney_Fragment | null;
  promotionalCost: TMoney_Fragment | null;
  netMarginPct: number | null;
}>

const Platform_BonusSummaryMeasuresDto_Normalizer = normalizerCreator<
  TPlatform_BonusSummaryMeasuresDto_Fragment,
  TPlatform_BonusSummaryMeasuresDto_Record,
  TPlatform_BonusSummaryMeasuresDto_AdditionalData
>(
  EPlatform_Typename.platformBonusSummaryMeasuresDto,
  ERecordName.platformBonusSummaryMeasuresDto,
  (recordsManager, fragment, additionalData) => {
    const bonusSummaryMeasuresDto: TPlatform_BonusSummaryMeasuresDto_Record = {
      id: additionalData.parentId,
    };

    if(hasOwnProperty(fragment, "bonusActivated")) {
      bonusSummaryMeasuresDto.bonusActivated = fragment.bonusActivated;
    }

    if(hasOwnProperty(fragment, "bonusActivatedRatePct")) {
      bonusSummaryMeasuresDto.bonusActivatedRatePct = fragment.bonusActivatedRatePct;
    }

    if(hasOwnProperty(fragment, "bonusConverted")) {
      bonusSummaryMeasuresDto.bonusConverted = fragment.bonusConverted;
    }

    if(hasOwnProperty(fragment, "bonusConvertedRatePct")) {
      bonusSummaryMeasuresDto.bonusConvertedRatePct = fragment.bonusConvertedRatePct;
    }

    if(hasOwnProperty(fragment, "bonusCost")) {
      bonusSummaryMeasuresDto.bonusCost = fragment.bonusCost;
    }

    if(hasOwnProperty(fragment, "bonusCostRatePct")) {
      bonusSummaryMeasuresDto.bonusCostRatePct = fragment.bonusCostRatePct;
    }

    if(hasOwnProperty(fragment, "freeBetActivated")) {
      bonusSummaryMeasuresDto.freeBetActivated = fragment.freeBetActivated;
    }

    if(hasOwnProperty(fragment, "freeBetCost")) {
      bonusSummaryMeasuresDto.freeBetCost = fragment.freeBetCost;
    }

    if(hasOwnProperty(fragment, "ngr")) {
      bonusSummaryMeasuresDto.ngr = fragment.ngr;
    }

    if(hasOwnProperty(fragment, "promotionalCost")) {
      bonusSummaryMeasuresDto.promotionalCost = fragment.promotionalCost;
    }

    if(hasOwnProperty(fragment, "netMarginPct")) {
      bonusSummaryMeasuresDto.netMarginPct = fragment.netMarginPct;
    }

    return bonusSummaryMeasuresDto;
  },
);

export type { TPlatform_BonusSummaryMeasuresDto_Record };
export { Platform_BonusSummaryMeasuresDto_Normalizer };
