import type { TPlatform_Kyc_Fragment, TPlatform_KycDocument_Fragment } from "@sb/graphql-client/PlayerUI";
import { type TImplicitAny } from "@sb/utils";

interface IKycLoaderState {
  pending: boolean;
  successfulUploads: null | boolean;
  failedUploads: null | boolean;
}

type TDocument = Omit<TPlatform_KycDocument_Fragment, "__typename"> & { base64?: TImplicitAny; }

type TNormalizedKyc = Omit<TPlatform_Kyc_Fragment, "documents" | "__typename"> & {
  documents: TDocument[];
}

interface IWithKycState {
  kyc?: TNormalizedKyc | null;
  kycLoader: IKycLoaderState;
}

const kycInitialState: IWithKycState = {
  kyc: null,
  kycLoader: {
    pending: false,
    successfulUploads: null,
    failedUploads: null,
  },
};

export { kycInitialState };
export type { IWithKycState };
