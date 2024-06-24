import { createOptionalPropertySelector, createSimpleSelector, getNotNil, isNotNil } from "@sb/utils";
import { type IWithPragmaticDgaState } from "../PragmaticDgaInitialState";

const dgaInfoSelector = ({ dgaInfo }: IWithPragmaticDgaState) => dgaInfo;

const dgaInfoByTableIdSelector = (state: IWithPragmaticDgaState, tableId: string) => createOptionalPropertySelector(
  dgaInfoSelector,
  tableId,
)(state);

const isNotNilDgaInfoByTableIdSelector = createSimpleSelector([dgaInfoByTableIdSelector], isNotNil);
const getNotNilDgaInfoByTableIdSelector = createSimpleSelector(
  [dgaInfoByTableIdSelector],
  (pragmaticInfo) =>
    getNotNil(pragmaticInfo, ["PragmaticDgaSelectors", "getNotNilDgaInfoByTableIdSelector"], "pragmaticInfo"),
);

export { dgaInfoByTableIdSelector, isNotNilDgaInfoByTableIdSelector, getNotNilDgaInfoByTableIdSelector };
