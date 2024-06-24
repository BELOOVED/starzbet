import type { LocationDescriptorObject, TExtractRouteParams } from "@sb/react-router-compat";
import { isNotNil, type TAnyObject } from "@sb/utils";
import { type IWithQaAttribute } from "@sb/qa-attributes";
import { type generateLocalizedPathByRoute } from "../Utils/GenerateLocalizedPathByRoute";
import { type TLocalizedRoutePath } from "./LocalizedRoute";

type TLocalizedLocationDescriptor<S = unknown> = Omit<LocationDescriptorObject<S>, "pathname">

type TLocalizedRouteParams<R extends string, U = string | number | boolean, S = unknown> = {
  to: TLocalizedRoutePath<R>;
  params?: TExtractRouteParams<`${R}`, U>;
  convertTo?: (value: string) => string;
  locationDescriptor?: TLocalizedLocationDescriptor<S>;
} & IWithQaAttribute;

type TRelativeRouteParams<R extends string> = {
  relativePath: R extends TLocalizedRoutePath<string> ? never : R;
}

type TGenerateLocalizedPathParameters<R extends string, U = string | number | boolean> =
  Parameters<typeof generateLocalizedPathByRoute<R, U>>

type TLocalizedRouteParamsWithDescriptor<R extends string, U = string | number | boolean, S = unknown> =
  [
    ...TGenerateLocalizedPathParameters<R, U>,
    locationDescriptor?: TLocalizedLocationDescriptor<S>
  ]

type TLocalizedPathParameters<R extends string, U = string | number | boolean> =
  TGenerateLocalizedPathParameters<R, U> extends [unknown, ...infer L] ? L : never

type TNeverObject<T extends TAnyObject> = {
  [K in keyof T]?: never
}

type TAvailableOnlyOne<T extends TAnyObject, U extends TAnyObject> =
  (T & TNeverObject<U>)
  | (U & TNeverObject<T>)

type TRouteParams<R extends string, U = string | number | boolean, S = unknown> =
  TAvailableOnlyOne<TRelativeRouteParams<R>, TLocalizedRouteParams<R, U, S>>

const isRelativeRouteParams = <R extends string, U = string | number | boolean, S = unknown>(
  candidate: TRouteParams<R, U, S>,
): candidate is TRelativeRouteParams<R> =>
    "relativePath" in candidate && isNotNil(candidate.relativePath);

export type {
  TLocalizedRouteParams,
  TLocalizedRouteParamsWithDescriptor,
  TLocalizedPathParameters,
  TRouteParams,
};
export { isRelativeRouteParams };
