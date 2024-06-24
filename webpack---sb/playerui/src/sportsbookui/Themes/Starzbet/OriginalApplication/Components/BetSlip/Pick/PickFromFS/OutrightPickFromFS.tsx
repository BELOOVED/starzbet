import { createElement, memo } from "react";
import { withRegistry } from "@bem-react/di";
import { OutrightOutcomeNameByParameters } from "../../../../../../../Components/OutrightOutcomeName/OutrightOutcomeName";
import { outrightPickRegistry } from "../PickRegistry";
import { BaseOutrightPick } from "../BasePick/BaseOutrightPick";

// @ts-ignore
const OutrightOutcomeName = memo(({ outcome }) => (
  createElement(
    OutrightOutcomeNameByParameters,
    { parameters: outcome.parameters, translatesForManuallyCreated: outcome.translatesForManuallyCreated  },
  )
));
OutrightOutcomeName.displayName = "OutrightOutcomeName";

const fulfilledOutrightPickRegistry = outrightPickRegistry().fill({ OutrightOutcomeName });

const OutrightPickFromFS = withRegistry(fulfilledOutrightPickRegistry)(BaseOutrightPick);
OutrightPickFromFS.displayName = "OutrightPickFromFS";

export { OutrightPickFromFS };
