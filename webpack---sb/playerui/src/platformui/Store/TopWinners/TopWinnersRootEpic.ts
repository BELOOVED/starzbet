import { routerEpic } from "@sb/router";
import { extractExport } from "@sb/utils";
import { getMatch } from "../../../common/Utils/RouterUtils/GetMatch";
import { type TPlatformEpic } from "../Root/Epic/TPlatformEpic";
import { gamesMathOptions, ladingMathOptions } from "../PlatformMatchOptions";

const topWinnersRootEpic: TPlatformEpic = routerEpic({
  name: "topWinners",
  match: getMatch(ladingMathOptions),
  onStart: () => import("./Epics/TopWinnersLoadEpic")
    .then(extractExport("topWinnersLoadEpic")),
});

const topWinnersOnGamePageRootEpic: TPlatformEpic = routerEpic({
  name: "topWinnersOnGamePage",
  match: getMatch(gamesMathOptions),
  onStart: () => import("./Epics/TopWinnersLoadEpic")
    .then(extractExport("topWinnersLoadEpic")),
});

export { topWinnersRootEpic, topWinnersOnGamePageRootEpic };
