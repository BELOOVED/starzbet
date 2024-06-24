import { combineEpics } from "redux-observable";
import { rootPageEpic } from "../../CMSPageLayout/Epics/RootPageEpic";
import { rootBlockEpic } from "../../CMSContentLayout/Epics/RootBlockEpic";
import { changeCurrentFormEpic } from "./CMSMountEpic";
import { loadCouponsEpic } from "./LoadCouponsEpic";
import { loadBonusesEpic } from "./LoadBonusesEpic";
import { loadShowedGamesEpic } from "./LoadShowedGamesEpic";

const onStartWithCMSDeps = combineEpics(
  rootPageEpic,
  rootBlockEpic,
  changeCurrentFormEpic,
  loadCouponsEpic,
  loadBonusesEpic,
  loadShowedGamesEpic,
);

export { onStartWithCMSDeps };
