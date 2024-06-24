// @ts-nocheck
import { createElement, memo } from "react";
import { EOutcomeEnumValue } from "@sb/betting-core/EOutcomeEnumValue";
import { EOutcomeKind } from "@sb/betting-core/EOutcomeKind";
import { mapBaseNormalizer } from "./MapBaseNormalizer";

const selectHtFtType = (value) => (value === EOutcomeEnumValue.draw
  ? EOutcomeKind.enum
  : EOutcomeKind.id);

const HtftNormalizer = memo(({ outcomeParameters, participants }) => {
  const { ht, ft } = outcomeParameters;

  return (
    <>
      {createElement(mapBaseNormalizer[selectHtFtType(ht)], { outcome: ht, participants })}

      {" / "}

      {createElement(mapBaseNormalizer[selectHtFtType(ft)], { outcome: ft, participants })}
    </>
  );
});
HtftNormalizer.displayName = "HtftNormalizer";

export { HtftNormalizer };
