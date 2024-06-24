import { keys } from "@sb/utils/Keys";
import { getNotNil } from "@sb/utils";
import { contextDelimiter, type IContext } from "../../Model/Context/Context";

/**
 * Context keys sorting therefore context words in key must be also sorted
 * If context words in key in wrong order - key will be just translated incorrectly
 * TODO Check keys context to be sorted and throw or log error if not
 * TODO add memoize
 */
const normalizeKeyByContext = (translateKey: string, context: IContext) => {
  const mappedKeys = keys(context)
    .sort()
    .map((key) => `(${key})${getNotNil(context[key], ["normalizeKeyByContext"], `normalizeKeyByContext => context[${key}]`)}`)
    .join("::");

  return `${translateKey}${contextDelimiter}${mappedKeys}`;
};

export { normalizeKeyByContext };
