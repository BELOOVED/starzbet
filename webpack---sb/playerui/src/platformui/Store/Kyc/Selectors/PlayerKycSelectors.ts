import { type EPlatform_KycDocumentTypeEnum } from "@sb/graphql-client";
import {
  getNotNil,
  createMemoSelector,
  createSimpleSelector,
  isNil,
  isNotEmpty,
  isNotNil,
  sort,
  withParams,
} from "@sb/utils";
import { playerDetailsSelectors } from "../../../../common/Store/Player/Selectors/PlayerSelectors";
import { type TPlatformAppState } from "../../PlatformInitialState";

const isKycNotNilSelector = createSimpleSelector([playerDetailsSelectors.kyc], isNotNil);
const isKycNilSelector = createSimpleSelector([playerDetailsSelectors.kyc], isNil);

const kycSelector = (state: TPlatformAppState, ...ctx: string[]) =>
  getNotNil(playerDetailsSelectors.kyc(state), ["kycSelector", ...ctx], "kyc");

const kycDocumentsSelector = (state: TPlatformAppState, ...ctx: string[]) =>
  kycSelector(state, "kycDocumentsSelector", ...ctx).documents;

const kycRequiredDocumentsSelector = (state: TPlatformAppState, ...ctx: string[]) =>
  kycSelector(state, "kycRequiredDocumentsSelector", ...ctx).requiredDocuments;

const kycStatusCodeSelector = (state: TPlatformAppState) => kycSelector(state, "kycStatusCodeSelector").status.code;

const kycDocumentsSortedSelector = createMemoSelector(
  [withParams(kycDocumentsSelector, "kycDocumentsSortedSelector")],
  (docs) => sort(
    (a, b) => Number(b.createdAt) - Number(a.createdAt),
    docs,
  ),
);

const isKycDocumentsRequiredOrAlreadySentSelector = (state: TPlatformAppState, ...ctx: string[]) => {
  if (isKycNotNilSelector(state)) {
    return isNotEmpty(kycRequiredDocumentsSelector(state, "isKycDocumentsRequiredOrAlreadySentSelector", ...ctx)) ||
      isNotEmpty(kycDocumentsSelector(state, "isKycDocumentsRequiredOrAlreadySentSelector", ...ctx));
  }

  return false;
};

const isKycDocumentsNotEmptySelector = (state: TPlatformAppState) => {
  if (isKycNotNilSelector(state)) {
    return isNotEmpty(kycDocumentsSelector(state, "isKycDocumentsNotEmptySelector"));
  }

  return false;
};

const isKycRequiredDocumentsNotEmptySelector = (state: TPlatformAppState) => {
  if (isKycNotNilSelector(state)) {
    return isNotEmpty(kycRequiredDocumentsSelector(state, "isKycRequiredDocumentsNotEmptySelector"));
  }

  return false;
};

const isKycDocumentRequiredSelector = createSimpleSelector(
  [
    withParams(kycRequiredDocumentsSelector, "isKycDocumentRequiredSelector"),
    (_, type: EPlatform_KycDocumentTypeEnum) => type,
  ],
  (req, type) => req.includes(type),
);

export {
  isKycNotNilSelector,
  isKycNilSelector,
  kycDocumentsSelector,
  kycDocumentsSortedSelector,
  kycStatusCodeSelector,
  isKycDocumentsRequiredOrAlreadySentSelector,
  isKycRequiredDocumentsNotEmptySelector,
  isKycDocumentRequiredSelector,
  isKycDocumentsNotEmptySelector,
};
