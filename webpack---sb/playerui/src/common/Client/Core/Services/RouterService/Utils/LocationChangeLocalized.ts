import { push, replace, type TPush, type TReplace } from "@sb/router";
import { type TLocalizedRouteParamsWithDescriptor } from "../Model/RoutesTypes";
import { generateLocalizedPathByRoute } from "./GenerateLocalizedPathByRoute";

const locationChangeLocalized = (method: TReplace | TPush) =>
  <R extends string, U = string | number | boolean, S = unknown>(...args: TLocalizedRouteParamsWithDescriptor<R, U, S>) => {
    const [
      locale,
      route,
      params,
      convertTo,
      descriptor,
    ] = args;

    const pathname = generateLocalizedPathByRoute<R, U>(
      locale,
      route,
      params,
      convertTo,
    );

    return method(
      descriptor
        ? {
          pathname,
          ...descriptor,
        }
        : pathname,
    );
  };

const pushLocalized = locationChangeLocalized(push);
const replaceLocalized = locationChangeLocalized(replace);

type TPushLocalized = typeof replaceLocalized
type TReplaceLocalized = typeof pushLocalized

export type {
  TPushLocalized,
  TReplaceLocalized,
};
export {
  pushLocalized,
  replaceLocalized,
};
