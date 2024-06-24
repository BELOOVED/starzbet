import { hasOwnProperty } from "@sb/utils";
import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { EPlatform_Typename } from "../../../Core/Generated/Services/Platform/Models/EPlatform_Typename";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import {
  type TPlatform_PlayerActivitySummaryMeasures_Fragment,
} from "../../Generated/Services/Platform/Types/TPlatform_PlayerActivitySummaryMeasures_Fragment";

type TPlatform_PlayerActivitySummaryMeasures_AdditionalData = { id: string; }

type TPlatform_PlayerActivitySummaryMeasures_Record = TRecord & Partial<{
  activePlayersCount: number | null;
  activeDepositorsCount: number | null;
  activeWithdrawalersCount: number | null;
  realPlayersCount: number | null;
}>

const Platform_PlayerActivitySummaryMeasures_Normalizer = normalizerCreator<
  TPlatform_PlayerActivitySummaryMeasures_Fragment,
  TPlatform_PlayerActivitySummaryMeasures_Record,
  TPlatform_PlayerActivitySummaryMeasures_AdditionalData
>(
  EPlatform_Typename.platformPlayerActivitySummaryMeasures,
  ERecordName.platformPlayerActivitySummaryMeasures,
  (recordsManager, fragment, additionalData) => {
    const playerActivitySummaryMeasures: TPlatform_PlayerActivitySummaryMeasures_Record = {
      id: additionalData.id,
    };

    if(hasOwnProperty(fragment, "activePlayersCount")) {
      playerActivitySummaryMeasures.activePlayersCount = fragment.activePlayersCount;
    }

    if(hasOwnProperty(fragment, "activeDepositorsCount")) {
      playerActivitySummaryMeasures.activeDepositorsCount = fragment.activeDepositorsCount;
    }

    if(hasOwnProperty(fragment, "activeWithdrawalersCount")) {
      playerActivitySummaryMeasures.activeWithdrawalersCount = fragment.activeWithdrawalersCount;
    }

    if(hasOwnProperty(fragment, "realPlayersCount")) {
      playerActivitySummaryMeasures.realPlayersCount = fragment.realPlayersCount;
    }

    return playerActivitySummaryMeasures;
  },
);

export type { TPlatform_PlayerActivitySummaryMeasures_Record };
export { Platform_PlayerActivitySummaryMeasures_Normalizer };
