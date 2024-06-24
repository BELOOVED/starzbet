import { keys } from "@sb/utils/Keys";
import { type IWithFormsState, type TFieldPath } from "../Types/Types";
import { type TFieldDefs } from "../Types";

const createFormFieldPaths = <K extends string, S extends IWithFormsState = IWithFormsState>(fields: TFieldDefs<K, S>) => keys(fields)
  .reduce(
    (acc, cur) => {
      acc[cur] = [cur];

      return acc;
    },
    {} as Record<K, TFieldPath>,
  );

export { createFormFieldPaths };

