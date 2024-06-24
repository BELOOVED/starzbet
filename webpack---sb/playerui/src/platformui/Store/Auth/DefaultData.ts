import type { TLocalizedRoutePath } from "../../../common/Client/Core/Services/RouterService/Model/LocalizedRoute";

interface IAuthNavigationDefaultData {
  goToRoot?: boolean;
  goToRoute?: TLocalizedRoutePath<string>;
}

const authNavigationDefaultData: IAuthNavigationDefaultData = {};

export { authNavigationDefaultData };
