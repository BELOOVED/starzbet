import { type TLocalizedRoutePath } from "../../../common/Client/Core/Services/RouterService/Model/LocalizedRoute";

interface IWithLoginLockTime {
  loginLockTime: number | null;
  authInfoModal: boolean;
  authNavigation: IAuthNavigationOptions;
}

const AuthInitialState: IWithLoginLockTime = {
  loginLockTime: null,
  authInfoModal: false,
  authNavigation: {},
};

interface IAuthNavigationOptions {
  goToRoute?: TLocalizedRoutePath<string>;
}

export { AuthInitialState };
export type { IWithLoginLockTime, IAuthNavigationOptions };
