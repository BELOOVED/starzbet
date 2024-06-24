import { hasOwnProperty } from "@sb/utils";
import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { type TMoney_Fragment } from "../../../Core/Generated/Services/Common/Types/TMoney_Fragment";
import { EPlatform_Typename } from "../../../Core/Generated/Services/Platform/Models/EPlatform_Typename";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import {
  type TPlatform_FirstTimeDepositsSummaryMeasures_Fragment,
} from "../../Generated/Services/Platform/Types/TPlatform_FirstTimeDepositsSummaryMeasures_Fragment";

type TPlatform_FirstTimeDepositsSummaryMeasures_Record = TRecord & Partial<{
  ftDeposits: null | TMoney_Fragment;
  ftDepositsCount: null | number;
}>

type TPlatform_FirstTimeDepositsSummaryMeasures_AdditionalData = { id: string; }

const Platform_FirstTimeDepositsSummaryMeasures_Normalizer = normalizerCreator<
  TPlatform_FirstTimeDepositsSummaryMeasures_Fragment,
  TPlatform_FirstTimeDepositsSummaryMeasures_Record,
  TPlatform_FirstTimeDepositsSummaryMeasures_AdditionalData
>(
  EPlatform_Typename.platformFirstTimeDepositsSummaryMeasures,
  ERecordName.platformFirstTimeDepositsSummaryMeasures,
  (recordsManager, fragment, additionalData) => {
    const id = additionalData.id;
    const firstTimeDepositsSummaryMeasures: TPlatform_FirstTimeDepositsSummaryMeasures_Record = { id };

    if(hasOwnProperty(fragment, "ftDeposits")) {
      firstTimeDepositsSummaryMeasures.ftDeposits = fragment.ftDeposits;
    }

    if(hasOwnProperty(fragment, "ftDepositsCount")) {
      firstTimeDepositsSummaryMeasures.ftDepositsCount = fragment.ftDepositsCount;
    }

    return firstTimeDepositsSummaryMeasures;
  },
);

export type { TPlatform_FirstTimeDepositsSummaryMeasures_Record };
export { Platform_FirstTimeDepositsSummaryMeasures_Normalizer };
