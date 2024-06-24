import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { type TMoney_Fragment } from "../../../Core/Generated/Services/Common/Types/TMoney_Fragment";
import { EPlatform_Typename } from "../../../Core/Generated/Services/Platform/Models/EPlatform_Typename";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import {
  type TPlatform_OpenWithdrawalsSummaryMeasures_Fragment,
} from "../../Generated/Services/Platform/Types/TPlatform_OpenWithdrawalsSummaryMeasures_Fragment";

type TPlatform_OpenWithdrawalsSummaryMeasures_AdditionalData = { parentId: string; };

type TPlatform_OpenWithdrawalsSummaryMeasures_Record = TRecord & {
  openWithdrawalsCount: null | number;
  openWithdrawalsSum: null | TMoney_Fragment;
}

const Platform_OpenWithdrawalsSummaryMeasures_Normalizer = normalizerCreator<
  TPlatform_OpenWithdrawalsSummaryMeasures_Fragment,
  TPlatform_OpenWithdrawalsSummaryMeasures_Record,
  TPlatform_OpenWithdrawalsSummaryMeasures_AdditionalData
>(
  EPlatform_Typename.platformOpenWithdrawalsSummaryMeasures,
  ERecordName.platformOpenWithdrawalsSummaryMeasures,
  (recordsManager, fragment, additionalData) => ({
    id: additionalData.parentId,
    openWithdrawalsCount: fragment.openWithdrawalsCount,
    openWithdrawalsSum: fragment.openWithdrawalsSum,
  }),
);

export type { TPlatform_OpenWithdrawalsSummaryMeasures_Record };
export { Platform_OpenWithdrawalsSummaryMeasures_Normalizer };
