import { memo } from "react";
import { type EOutcomeResult } from "@sb/betting-core/EOutcomeResult";
import { isOutcomeLoss, isOutcomeWin } from "../../../../../../../../Store/BetSlip/Model/OutcomeResult";
import { CircleCheck } from "../../../CircleCheck/CircleCheck";

type TWithOutcomeResult = {
  result: EOutcomeResult;
}
const PickStatus = memo<TWithOutcomeResult>(
  ({ result }) => <CircleCheck checked={isOutcomeWin(result)} failed={isOutcomeLoss(result)} />,
);
PickStatus.displayName = "PickStatus";

export { PickStatus };
