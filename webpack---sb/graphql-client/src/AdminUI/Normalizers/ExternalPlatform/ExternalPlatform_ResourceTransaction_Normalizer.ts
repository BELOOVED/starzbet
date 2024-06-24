import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import {
  type EExternalPlatform_TransactionType,
} from "../../../Core/Generated/Services/ExternalPlatform/Models/EExternalPlatform_TransactionType";
import { type TMoney_Fragment } from "../../../Core/Generated/Services/Common/Types/TMoney_Fragment";
import { type TRecordNormalizerAdditionalData } from "../../../Core/Helpers/QueryNormalizer";
import { EExternalPlatform_Typename } from "../../../Core/Generated/Services/ExternalPlatform/Models/EExternalPlatform_Typename";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import {
  type TExternalPlatform_ResourceTransaction_Fragment,
} from "../../Generated/Services/ExternalPlatform/Types/TExternalPlatform_ResourceTransaction_Fragment";

type TExternalPlatform_ResourceTransaction_AdditionalData = TRecordNormalizerAdditionalData & { requestId: string; }

type TExternalPlatform_ResourceTransaction_Record = TRecord & TExternalPlatform_ResourceTransaction_AdditionalData & {
  type: EExternalPlatform_TransactionType;
  amount: TMoney_Fragment;
  target: string;
  order: number;
  createdAt: string;
  rolledTransactionId: string | null;
}

const ExternalPlatform_ResourceTransaction_Normalizer = normalizerCreator<
    TExternalPlatform_ResourceTransaction_Fragment,
  TExternalPlatform_ResourceTransaction_Record,
  TExternalPlatform_ResourceTransaction_AdditionalData
>(
  EExternalPlatform_Typename.externalPlatformResourceTransaction,
  ERecordName.externalPlatformResourceTransaction,
  (recordsManager, fragment, additionalData) => ({
    id: fragment.id,
    type: fragment.type,
    amount: fragment.amount,
    target: fragment.target,
    order: fragment.order,
    createdAt: fragment.createdAt,
    rolledTransactionId: fragment.rolledTransactionId,
    ...additionalData,
  }),
);

export type { TExternalPlatform_ResourceTransaction_Record };
export { ExternalPlatform_ResourceTransaction_Normalizer };
