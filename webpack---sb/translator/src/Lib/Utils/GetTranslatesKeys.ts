import { isNotNil } from "@sb/utils";
import { type TLocaleResource } from "../../@types/TLocaleResource";
import { contextDelimiter } from "../Model/Context/Context";

const getAffectedKeys = (uncommitted: TLocaleResource): string[] => {
  const allAffectedKeysWithValues = Object.values(uncommitted).reduce((acc, keys) => ({ ...acc, ...keys }), {});

  return Object
    .keys(allAffectedKeysWithValues)
    .map((key) => key.split(contextDelimiter)[0])
    .filter(isNotNil);
};

export { getAffectedKeys };
