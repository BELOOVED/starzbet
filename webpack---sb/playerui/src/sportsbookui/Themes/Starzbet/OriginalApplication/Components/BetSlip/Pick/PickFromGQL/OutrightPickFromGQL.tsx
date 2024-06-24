import { createElement, memo } from "react";
import { withRegistry } from "@bem-react/di";
import { type INormalizedOutrightPick } from "../../../../../../../../common/Utils/NormalizePick";
import { OutrightOutcomeNameByParameters } from "../../../../../../../Components/OutrightOutcomeName/OutrightOutcomeName";
import { outrightPickRegistry } from "../PickRegistry";
import { BaseOutrightPick } from "../BasePick/BaseOutrightPick";

type TOutrightOutcomeNameProps = Pick<INormalizedOutrightPick, "outcome">;

const OutrightOutcomeName = memo<TOutrightOutcomeNameProps>(({ outcome }) => (
  createElement(
    OutrightOutcomeNameByParameters,
    { parameters: outcome.parameters, translatesForManuallyCreated: outcome.translatesForManuallyCreated },
  )
));
OutrightOutcomeName.displayName = "OutrightOutcomeName";

const fulfilledOutrightPickRegistry = outrightPickRegistry().fill({ OutrightOutcomeName });

const OutrightPickFromGQL = withRegistry(fulfilledOutrightPickRegistry)(BaseOutrightPick);
OutrightPickFromGQL.displayName = "OutrightPickFromGQL";

export { OutrightPickFromGQL };
