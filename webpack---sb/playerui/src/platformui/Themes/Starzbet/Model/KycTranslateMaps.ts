import { EPlatform_KycDocumentTypeEnum, EPlatform_KycStatusCodeEnum } from "@sb/graphql-client";
import {
  platformui_starzbet_accVerification_proofOfAddress,
  platformui_starzbet_accVerification_proofOfAddressIsRequired,
  platformui_starzbet_accVerification_proofOfId,
  platformui_starzbet_accVerification_proofOfIdIsRequired,
  platformui_starzbet_docVerification_approved,
  platformui_starzbet_docVerification_declined,
  platformui_starzbet_docVerification_pending,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";

const kycStatusTranslateMap: Record<EPlatform_KycStatusCodeEnum, string> = {
  [EPlatform_KycStatusCodeEnum.approved]: platformui_starzbet_docVerification_approved,
  [EPlatform_KycStatusCodeEnum.declined]: platformui_starzbet_docVerification_declined,
  [EPlatform_KycStatusCodeEnum.pending]: platformui_starzbet_docVerification_pending,
};
const proofIsRequiredTranslateMap: Record<EPlatform_KycDocumentTypeEnum, string> = {
  [EPlatform_KycDocumentTypeEnum.id]: platformui_starzbet_accVerification_proofOfIdIsRequired,
  [EPlatform_KycDocumentTypeEnum.proofOfAddress]: platformui_starzbet_accVerification_proofOfAddressIsRequired,
};

const proofTranslateMap: Record<EPlatform_KycDocumentTypeEnum, string> = {
  [EPlatform_KycDocumentTypeEnum.id]: platformui_starzbet_accVerification_proofOfId,
  [EPlatform_KycDocumentTypeEnum.proofOfAddress]: platformui_starzbet_accVerification_proofOfAddress,
};

export {
  kycStatusTranslateMap,
  proofIsRequiredTranslateMap,
  proofTranslateMap,
};
