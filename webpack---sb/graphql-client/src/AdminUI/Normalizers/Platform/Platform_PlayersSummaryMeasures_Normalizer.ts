import { hasOwnProperty } from "@sb/utils";
import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { EPlatform_Typename } from "../../../Core/Generated/Services/Platform/Models/EPlatform_Typename";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import {
  type TPlatform_PlayersSummaryMeasures_Fragment,
} from "../../Generated/Services/Platform/Types/TPlatform_PlayersSummaryMeasures_Fragment";

type TPlatform_PlayersSummaryMeasures_AdditionalData = { id: string; }

type TPlatform_PlayersSummaryMeasures_Record = TRecord & Partial<{
  registersCount: number | null;
  attractedByAffiliatesCount: number | null;
  affiliatesWithLinkedPlayerAccountCount: number | null;
  conversionRatePct: number | null;
}>

const Platform_PlayersSummaryMeasures_Normalizer = normalizerCreator<
  TPlatform_PlayersSummaryMeasures_Fragment,
  TPlatform_PlayersSummaryMeasures_Record,
  TPlatform_PlayersSummaryMeasures_AdditionalData
  >(
    EPlatform_Typename.platformPlayersSummaryMeasures,
    ERecordName.platformPlayersSummaryMeasures,
    (recordsManager, fragment, additionalData) => {
      const playersSummaryMeasures: TPlatform_PlayersSummaryMeasures_Record = {
        id: additionalData.id,
      };

      if(hasOwnProperty(fragment, "registersCount")) {
        playersSummaryMeasures.registersCount = fragment.registersCount;
      }

      if(hasOwnProperty(fragment, "attractedByAffiliatesCount")) {
        playersSummaryMeasures.attractedByAffiliatesCount = fragment.attractedByAffiliatesCount;
      }

      if(hasOwnProperty(fragment, "affiliatesWithLinkedPlayerAccountCount")) {
        playersSummaryMeasures.affiliatesWithLinkedPlayerAccountCount = fragment.affiliatesWithLinkedPlayerAccountCount;
      }

      if(hasOwnProperty(fragment, "conversionRatePct")) {
        playersSummaryMeasures.conversionRatePct = fragment.conversionRatePct;
      }

      return playersSummaryMeasures;
    },
  );

export type { TPlatform_PlayersSummaryMeasures_Record };
export { Platform_PlayersSummaryMeasures_Normalizer };
