import { type TLoginForm } from "../Auth/Forms/Login/Model";

interface IWithSecretAndUri {
  secret: string;
  uri: string;
}

interface ITwoFactorAuth {
  twoFactorAuth: {
    activateData: IWithSecretAndUri | null;
    backupCodes: string[] | null;
    player: TLoginForm | null;
  };
  isTwoFactorAuthStep: boolean;
}

const twoFactorAuthInitialState: ITwoFactorAuth = {
  twoFactorAuth: {
    activateData: null,
    backupCodes: null,
    player: null,
  },
  isTwoFactorAuthStep: false,
};

export { twoFactorAuthInitialState };
export type { ITwoFactorAuth };
