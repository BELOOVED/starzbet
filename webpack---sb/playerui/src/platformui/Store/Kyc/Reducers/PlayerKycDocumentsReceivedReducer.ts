import { assocPath } from "@sb/utils/AssocPath";
import { type TReducer } from "@sb/utils";
import { type TPlatformAppState } from "../../PlatformInitialState";
import { type playerKycDocumentsReceivedAction } from "../KycActions";
import { isKycNilSelector, kycDocumentsSelector } from "../Selectors/PlayerKycSelectors";

const playerKycDocumentsReceivedReducer: TReducer<
  TPlatformAppState,
  typeof playerKycDocumentsReceivedAction
> = (state, { payload: { data } }) => {
  if (isKycNilSelector(state)) {
    return state;
  }

  return assocPath<TPlatformAppState>(
    ["player", "details", "kyc", "documents"],
    kycDocumentsSelector(state).map((it) => (
      data[it.file.hash]
        ? { ...it, base64: data[it.file.hash] }
        : it
    )),
    state,
  );
};

export { playerKycDocumentsReceivedReducer };
