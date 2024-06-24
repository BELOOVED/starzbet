import { entries, isArray, isPrimitive, isUnknownObject, isVoid, type TExplicitAny } from "@sb/utils";

const isAllFieldNilOrEmpty = (
  content: TExplicitAny,
  exceptionFields: string[] = ["__typename", "updatedAt", "_DISABLED_"],
): boolean => {
  if (isVoid(content)) {
    return true;
  }

  if (isUnknownObject(content)) {
    return entries(content).every(([key, value]) => {
      if (isUnknownObject(value)) {
        return isAllFieldNilOrEmpty(value, exceptionFields);
      }

      if (isArray(value)) {
        return value.every((it) => isAllFieldNilOrEmpty(it, exceptionFields));
      }

      if (isPrimitive(value)) {
        return exceptionFields.includes(key) || isVoid(value);
      }

      return true;
    });
  }

  if (isArray(content)) {
    return content.every((it) => isAllFieldNilOrEmpty(it, exceptionFields));
  }

  return true;
};

export { isAllFieldNilOrEmpty };
