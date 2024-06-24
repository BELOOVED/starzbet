import { combineEpics } from "redux-observable";
import { routerEpic } from "@sb/router";
import { getMatch } from "../../../../common/Utils/RouterUtils/GetMatch";
import { type TMixAppEpic } from "../../../../common/Store/Root/Epics/TMixAppEpic";
import { ladingMathOptions } from "../../PlatformMatchOptions";
import { cmsLoadGamesByLabelAndGameIdsEpic } from "../../CMS/Epic/CmsLoadGamesByLabelAndGameIdsEpic";

const landingVariant2Epic: TMixAppEpic = routerEpic({
  name: "landingPage",
  match: getMatch(ladingMathOptions),
  onStart: () => combineEpics(cmsLoadGamesByLabelAndGameIdsEpic),
});

export { landingVariant2Epic };
