import type {
  TPlatform_FirstTimeDeposit_Fragment,
  TPlatform_Player_Fragment,
  TPlatform_PlayerProfile_Fragment,
} from "@sb/graphql-client/PlayerUI";
import { type EPlatform_WalletType } from "@sb/graphql-client";
import { type IMoney } from "@sb/utils";
import { type IWithKycState, kycInitialState } from "../../../../platformui/Store/Kyc/KycInitialState";
import { type IPlayerMinimal } from "../Model/IPlayerMinimal";
import { stubPermissions, type TPermissions } from "../Model/Permissions";

interface IWallet {
  id: string;
  type: EPlatform_WalletType;
  balance: IMoney;
}

type TOmitPlatformPlayer = Partial<Omit<
  TPlatform_Player_Fragment, "__typename"
  | "kyc"
  | "wallet"
  | "bonusWallet"
  | "freeBetWallet"
  | "profile"
  | "phoneVerificationToken"
  | "emailVerificationToken"
  | "firstTimeDeposit"
  | "permissions"
>> & Partial<Omit<IPlayerMinimal, "profile">>;

interface IDetailsState extends TOmitPlatformPlayer {
  wallet: null | IWallet;
  bonusWallet: null | IWallet;
  freeBetWallet: null | IWallet;
  kyc: IWithKycState["kyc"];
  kycLoader: IWithKycState["kycLoader"];
  profile?: TPlatform_PlayerProfile_Fragment;
  firstTimeDeposit: null | TPlatform_FirstTimeDeposit_Fragment;
  permissions: TPermissions;
  isLoaded: boolean;
}

interface IWithDetailsState {
  details: IDetailsState & TOmitPlatformPlayer;
}

const detailsInitialState: IWithDetailsState = {
  details: {
    wallet: null,
    bonusWallet: null,
    freeBetWallet: null,
    firstTimeDeposit: null,
    kyc: kycInitialState.kyc,
    kycLoader: kycInitialState.kycLoader,
    permissions: stubPermissions,
    isLoaded: false,
  },
};

export { detailsInitialState, type IWithDetailsState, type IWallet };
