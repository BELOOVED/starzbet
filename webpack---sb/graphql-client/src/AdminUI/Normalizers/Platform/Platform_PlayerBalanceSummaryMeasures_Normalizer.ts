import { hasOwnProperty } from "@sb/utils";
import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { type TMoney_Fragment } from "../../../Core/Generated/Services/Common/Types/TMoney_Fragment";
import { EPlatform_Typename } from "../../../Core/Generated/Services/Platform/Models/EPlatform_Typename";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import {
  type TPlatform_PlayerBalanceSummaryMeasures_Fragment,
} from "../../Generated/Services/Platform/Types/TPlatform_PlayerBalanceSummaryMeasures_Fragment";

type TPlatform_PlayerBalanceSummaryMeasures_AdditionalData = { id: string; }

type TPlatform_PlayerBalanceSummaryMeasures_Record = TRecord & Partial<{
  balanceStart: TMoney_Fragment | null;
  balanceEnd: TMoney_Fragment | null;
}>

const Platform_PlayerBalanceSummaryMeasures_Normalizer = normalizerCreator<
  TPlatform_PlayerBalanceSummaryMeasures_Fragment,
  TPlatform_PlayerBalanceSummaryMeasures_Record,
  TPlatform_PlayerBalanceSummaryMeasures_AdditionalData
>(
  EPlatform_Typename.platformPlayerBalanceSummaryMeasures,
  ERecordName.platformPlayerBalanceSummaryMeasures,
  (recordsManager, fragment, additionalData) => {
    const playerBalanceSummaryMeasures: TPlatform_PlayerBalanceSummaryMeasures_Record = {
      id: additionalData.id,
    };

    if(hasOwnProperty(fragment, "balanceStart")) {
      playerBalanceSummaryMeasures.balanceStart = fragment.balanceStart;
    }

    if(hasOwnProperty(fragment, "balanceEnd")) {
      playerBalanceSummaryMeasures.balanceEnd = fragment.balanceEnd;
    }

    return playerBalanceSummaryMeasures;
  },
);

export type { TPlatform_PlayerBalanceSummaryMeasures_Record };
export { Platform_PlayerBalanceSummaryMeasures_Normalizer };
