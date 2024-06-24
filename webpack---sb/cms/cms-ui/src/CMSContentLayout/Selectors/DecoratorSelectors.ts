import { type IWithFormsState, selectFieldValue, type TFieldPath } from "@sb/form-new";
import { getParentPath } from "@sb/cms-core";
import { isArray } from "@sb/utils";

const newTagsListSelector = (state: IWithFormsState, formName: string, fieldPath: TFieldPath, isIncrement: boolean) => {
  const path = isIncrement ? fieldPath : getParentPath(fieldPath);
  const tags = selectFieldValue(state, formName, path) ?? [];

  if (!isArray(tags)) {
    return null;
  }

  const stringifyFieldPath = path.join(".");

  const arrayLength = isIncrement ? tags.length + 1 : tags.length - 1;

  return Array.from(Array(arrayLength)).map((_, index) => stringifyFieldPath.concat(`.${index}`));
};

export { newTagsListSelector };
