import { hasOwnProperty } from "@sb/utils";
import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { type TMoney_Fragment } from "../../../Core/Generated/Services/Common/Types/TMoney_Fragment";
import { EPlatform_Typename } from "../../../Core/Generated/Services/Platform/Models/EPlatform_Typename";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import {
  type TPlatform_FirstTimeWithdrawalsSummaryMeasures_Fragment,
} from "../../Generated/Services/Platform/Types/TPlatform_FirstTimeWithdrawalsSummaryMeasures_Fragment";

type TPlatform_FirstTimeWithdrawalsSummaryMeasures_Record = TRecord & Partial<{
  ftWithdrawals: null | TMoney_Fragment;
  ftWithdrawalsCount: null | number;
}>

type TPlatform_FirstTimeWithdrawalsSummaryMeasures_AdditionalData = { id: string; }

const Platform_FirstTimeWithdrawalsSummaryMeasures_Normalizer = normalizerCreator<
  TPlatform_FirstTimeWithdrawalsSummaryMeasures_Fragment,
  TPlatform_FirstTimeWithdrawalsSummaryMeasures_Record,
  TPlatform_FirstTimeWithdrawalsSummaryMeasures_AdditionalData
>(
  EPlatform_Typename.platformFirstTimeWithdrawalsSummaryMeasures,
  ERecordName.platformFirstTimeWithdrawalsSummaryMeasures,
  (recordsManager, fragment, additionalData) => {
    const id = additionalData.id;
    const firstTimeWithdrawalsSummaryMeasures: TPlatform_FirstTimeWithdrawalsSummaryMeasures_Record = { id };

    if(hasOwnProperty(fragment, "ftWithdrawals")) {
      firstTimeWithdrawalsSummaryMeasures.ftWithdrawals = fragment.ftWithdrawals;
    }

    if(hasOwnProperty(fragment, "ftWithdrawalsCount")) {
      firstTimeWithdrawalsSummaryMeasures.ftWithdrawalsCount = fragment.ftWithdrawalsCount;
    }

    return firstTimeWithdrawalsSummaryMeasures;
  },
);

export type { TPlatform_FirstTimeWithdrawalsSummaryMeasures_Record };
export { Platform_FirstTimeWithdrawalsSummaryMeasures_Normalizer };
