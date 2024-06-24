import { hasOwnProperty } from "@sb/utils";
import { recordNormalizer } from "../../../Core/Helpers/QueryNormalizer";
import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { EPlatform_Typename } from "../../../Core/Generated/Services/Platform/Models/EPlatform_Typename";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import { type TPlatform_BusinessKPIMeasures_Fragment } from "../../Generated/Services/Platform/Types/TPlatform_BusinessKPIMeasures_Fragment";
import { Platform_PlayersSummaryMeasures_Normalizer } from "./Platform_PlayersSummaryMeasures_Normalizer";
import { Platform_PlayerFinancialsSummaryMeasures_Normalizer } from "./Platform_PlayerFinancialsSummaryMeasures_Normalizer";
import { Platform_PlayerBalanceSummaryMeasures_Normalizer } from "./Platform_PlayerBalanceSummaryMeasures_Normalizer";
import { Platform_PlayerActivitySummaryMeasures_Normalizer } from "./Platform_PlayerActivitySummaryMeasures_Normalizer";
import { Platform_BonusSummaryMeasuresDto_Normalizer } from "./Platform_BonusSummaryMeasuresDto_Normalizer";
import { Platform_FirstTimeWithdrawalsSummaryMeasures_Normalizer } from "./Platform_FirstTimeWithdrawalsSummaryMeasures_Normalizer";
import { Platform_FirstTimeDepositsSummaryMeasures_Normalizer } from "./Platform_FirstTimeDepositsSummaryMeasures_Normalizer";
import {
  Platform_DepositsWithdrawalsSummaryMeasures_Normalizer,
} from "./Platform_DepositsWithdrawalsSummaryMeasures_Normalizer";

type TPlatform_BusinessKPIMeasures_Record = TRecord & Partial<{
  playersSummaryId: string | null;
  playerFinancialsSummaryId: string | null;
  productsSummaryId: string | null;
  playerBalanceSummaryId: string | null;
  playerActivitySummaryId: string | null;
  bonusSummaryId: string | null;
  ftDepositsSummaryId: string | null;
  ftWithdrawalsSummaryId: string | null;
  depositsWithdrawalsSummaryId: string | null;
}>

type TPlatform_BusinessKPIMeasures_AdditionalData = { key: string; }

const Platform_BusinessKPIMeasures_Normalizer = normalizerCreator<
  TPlatform_BusinessKPIMeasures_Fragment,
  TPlatform_BusinessKPIMeasures_Record,
  TPlatform_BusinessKPIMeasures_AdditionalData
>(
  EPlatform_Typename.platformBusinessKPIMeasures,
  ERecordName.platformBusinessKPIMeasures,
  (recordsManager, fragment, additionalData) => {
    const id = additionalData.key;
    const businessKPIMeasures: TPlatform_BusinessKPIMeasures_Record = { id };

    if(hasOwnProperty(fragment, "playersSummary")) {
      businessKPIMeasures.playersSummaryId = fragment.playersSummary
        ? Platform_PlayersSummaryMeasures_Normalizer(recordsManager, fragment.playersSummary, { id }).id
        : null;
    }

    if(hasOwnProperty(fragment, "playerFinancialsSummary")) {
      businessKPIMeasures.playerFinancialsSummaryId = fragment.playerFinancialsSummary
        ? Platform_PlayerFinancialsSummaryMeasures_Normalizer(recordsManager, fragment.playerFinancialsSummary, { parentId: id }).id
        : null;
    }

    if(hasOwnProperty(fragment, "productsSummary")) {
      businessKPIMeasures.productsSummaryId = fragment.productsSummary
        ? recordNormalizer(recordsManager, fragment.productsSummary, null).id
        : null;
    }

    if(hasOwnProperty(fragment, "playerBalanceSummary")) {
      businessKPIMeasures.playerBalanceSummaryId = fragment.playerBalanceSummary
        ? Platform_PlayerBalanceSummaryMeasures_Normalizer(recordsManager, fragment.playerBalanceSummary, { id }).id
        : null;
    }

    if(hasOwnProperty(fragment, "playerActivitySummary")) {
      businessKPIMeasures.playerActivitySummaryId = fragment.playerActivitySummary
        ? Platform_PlayerActivitySummaryMeasures_Normalizer(recordsManager, fragment.playerActivitySummary, { id }).id
        : null;
    }

    if(hasOwnProperty(fragment, "bonusSummary")) {
      businessKPIMeasures.bonusSummaryId = fragment.bonusSummary
        ? Platform_BonusSummaryMeasuresDto_Normalizer(recordsManager, fragment.bonusSummary, { parentId: id }).id
        : null;
    }

    if(hasOwnProperty(fragment, "ftDepositsSummary")) {
      businessKPIMeasures.ftDepositsSummaryId = fragment.ftDepositsSummary
        ? Platform_FirstTimeDepositsSummaryMeasures_Normalizer(recordsManager, fragment.ftDepositsSummary, { id }).id
        : null;
    }

    if(hasOwnProperty(fragment, "ftWithdrawalsSummary")) {
      businessKPIMeasures.ftWithdrawalsSummaryId = fragment.ftWithdrawalsSummary
        ? Platform_FirstTimeWithdrawalsSummaryMeasures_Normalizer(recordsManager, fragment.ftWithdrawalsSummary, { id }).id
        : null;
    }

    if (hasOwnProperty(fragment, "depositsWithdrawalsSummary")) {
      businessKPIMeasures.depositsWithdrawalsSummaryId = fragment.depositsWithdrawalsSummary
        ? Platform_DepositsWithdrawalsSummaryMeasures_Normalizer(
          recordsManager,
          fragment.depositsWithdrawalsSummary,
          { id },
        ).id
        : null;
    }

    return businessKPIMeasures;
  },
);

export type { TPlatform_BusinessKPIMeasures_Record };
export { Platform_BusinessKPIMeasures_Normalizer };
