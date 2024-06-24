import { TExplicitAny } from "./TAny";
import { isNil } from "./IsNil";
import { isEmpty } from "./IsEmpty";
import { isVoid } from "./IsVoid";

type TTarget = Record<string, TExplicitAny>;

type TNonNullableProperties<T> = {
  [P in keyof T]: NonNullable<T[P]>;
};

type TNonNilProperties<T> = Required<TNonNullableProperties<T>>;

const removeProperties = <T extends TTarget>(target: T, operator: (value: TExplicitAny) => boolean) => {
  const copy = { ...target };

  Object.entries(target).forEach(([key, value]) => {
    if (operator(value)) {
      delete copy[key];
    }
  });

  return copy as T;
};

const removeUndefinedProperties = <T extends TTarget>(target: T) => removeProperties<Required<T>>(target as TExplicitAny, (value) => value === undefined);

const removeNullProperties = <T extends TTarget>(target: T) => removeProperties<TNonNullableProperties<T>>(target as TExplicitAny, (value) => value === null);

const removeNilProperties = <T extends TTarget>(target: T) => removeProperties<TNonNilProperties<T>>(target as TExplicitAny, isNil);

const removeEmptyProperties = <T extends TTarget>(target: T) => removeProperties(target, isEmpty);

const removeVoidProperties = <T extends TTarget>(target: T) => removeProperties<TNonNilProperties<T>>(target as TExplicitAny, isVoid);

export {
  removeProperties,
  removeUndefinedProperties,
  removeNullProperties,
  removeNilProperties,
  removeEmptyProperties,
  removeVoidProperties,
};
