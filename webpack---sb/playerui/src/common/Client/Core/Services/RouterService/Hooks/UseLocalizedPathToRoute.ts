import { useSelector } from "react-redux";
import { localeSelector } from "../../../../../../platformui/Store/Locale/Selectors/localeSelector";
import { generateLocalizedPathByRoute } from "../Utils/GenerateLocalizedPathByRoute";
import { type TLocalizedPathParameters } from "../Model/RoutesTypes";

const useLocalizedPathToRoute = <R extends string, U = string | number | boolean>(...args: TLocalizedPathParameters<R, U>) => {
  const locale = useSelector(localeSelector);

  return generateLocalizedPathByRoute<R, U>(locale, ...args);
};

export { useLocalizedPathToRoute };
