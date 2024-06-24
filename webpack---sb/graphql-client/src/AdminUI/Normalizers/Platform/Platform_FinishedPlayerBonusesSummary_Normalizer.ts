import { hasOwnProperty, type IMoney } from "@sb/utils";
import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { EPlatform_Typename } from "../../../Core/Generated/Services/Platform/Models/EPlatform_Typename";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import {
  type TPlatform_FinishedPlayerBonusesSummary_Fragment,
} from "../../Generated/Services/Platform/Types/TPlatform_FinishedPlayerBonusesSummary_Fragment";

type TPlatform_FinishedPlayerBonusesSummary_Record = TRecord & Partial<{
    wageredBonusesSum: null | IMoney;
    wageredBonusesToHeldDepositsPct: null | number;
    heldDepositsSum: null | IMoney;
    winnersCount: null | number;
}>

type TPlatform_FinishedPlayerBonusesSummary_AdditionalData = { key: string; }

const Platform_FinishedPlayerBonusesSummary_Normalizer = normalizerCreator<
    TPlatform_FinishedPlayerBonusesSummary_Fragment,
    TPlatform_FinishedPlayerBonusesSummary_Record,
    TPlatform_FinishedPlayerBonusesSummary_AdditionalData
>(
  EPlatform_Typename.platformFinishedPlayerBonusesSummary,
  ERecordName.platformFinishedPlayerBonusesSummary,
  (_, fragment, additionalData) => {
    const finishedPlayerBonusesSummary: TPlatform_FinishedPlayerBonusesSummary_Record = { id: additionalData.key };

    if(hasOwnProperty(fragment, "wageredBonusesSum")) {
      finishedPlayerBonusesSummary.wageredBonusesSum = fragment.wageredBonusesSum;
    }

    if(hasOwnProperty(fragment, "wageredBonusesToHeldDepositsPct")) {
      finishedPlayerBonusesSummary.wageredBonusesToHeldDepositsPct = fragment.wageredBonusesToHeldDepositsPct;
    }

    if(hasOwnProperty(fragment, "heldDepositsSum")) {
      finishedPlayerBonusesSummary.heldDepositsSum = fragment.heldDepositsSum;
    }

    if(hasOwnProperty(fragment, "winnersCount")) {
      finishedPlayerBonusesSummary.winnersCount = fragment.winnersCount;
    }

    return finishedPlayerBonusesSummary;
  },
);

export type { TPlatform_FinishedPlayerBonusesSummary_Record };
export { Platform_FinishedPlayerBonusesSummary_Normalizer };
