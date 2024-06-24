import { EMPTY, merge, of } from "rxjs";
import { combineEpics } from "redux-observable";
import type { TPlatform_Bonus_Fragment } from "@sb/graphql-client/PlayerUI";
import { createConnectedEpic } from "../../../../common/Utils/EpicUtils/CreateConnectedByRouteEpic";
import { createSubscribe } from "../../../../common/Utils/EpicUtils/CreateSubscribe";
import { modalOpenAction } from "../../../../common/Store/Modal/ModalActions";
import { EModal } from "../../../../common/Store/Modal/Model/EModal";
import { playerIdNotNilSelector } from "../../../../common/Store/Player/Selectors/PlayerSelectors";
import { type TMixAppEpic } from "../../../../common/Store/Root/Epics/TMixAppEpic";
import { reloadGameLinkAction } from "../../PlayGamePage/Actions/PlayGameActions";
import { vipClubLevelProgressAction } from "../VipClubActions";
import { type IVipClubLevelProgressPayload } from "../VipClubModels";
import {
  vipClubLoadContributionTableEpic,
  vipClubLoadLevelRulesEpic,
  vipClubLoadPlayerStateEpic,
} from "./VipClubLoadEpics";

const vipClubContributionTableUpdateConnectedEpic: TMixAppEpic = createConnectedEpic(
  createSubscribe(
    "sumstats.vip_club.contribution_table_updated",
    () => vipClubLoadContributionTableEpic,
  ),
);

const vipClubLevelRulesUpdateConnectedEpic: TMixAppEpic = createConnectedEpic(
  createSubscribe(
    "sumstats.vip_club.level_rules_updated",
    () => vipClubLoadLevelRulesEpic,
  ),
);

interface ILevelUpPayload {
  nextLevel: number;
  playerBonuses: TPlatform_Bonus_Fragment[];
}

const vipClubLevelUpSubscribeEpic = (playerId: string): TMixAppEpic => (action$, state$, deps) => createSubscribe(
  `sumstats.vip_club.level_up.${playerId}`,
  ({ nextLevel }: ILevelUpPayload) => () => merge(
    of(modalOpenAction(nextLevel === 1 ? EModal.vipClubWelcome : EModal.vipClubLevelUp, nextLevel)),
    vipClubLoadPlayerStateEpic(action$, state$, deps),
    nextLevel === 1 ? of(reloadGameLinkAction()) : EMPTY,
  ),
)(action$, state$, deps);

const vipClubPassivatedSubscribeEpic = (playerId: string): TMixAppEpic => createSubscribe(
  `sumstats.vip_club.passivated.${playerId}`,
  () => () => EMPTY,
);

const vipClubLevelProgressSubscribeEpic = (playerId: string): TMixAppEpic => createSubscribe(
  `sumstats.vip_club.level_progress.${playerId}`,
  (payload: IVipClubLevelProgressPayload) =>
    () => of(vipClubLevelProgressAction(payload)),
);

const vipClubRequireWSAuthConnectedEpic: TMixAppEpic = createConnectedEpic(
  (action$, state$, deps) => {
    const playerId = playerIdNotNilSelector(state$.value);

    return combineEpics(
      vipClubPassivatedSubscribeEpic(playerId),
      vipClubLevelProgressSubscribeEpic(playerId),
      vipClubLevelUpSubscribeEpic(playerId),
    )(action$, state$, deps);
  },
);

export {
  vipClubLevelRulesUpdateConnectedEpic,
  vipClubContributionTableUpdateConnectedEpic,
  vipClubRequireWSAuthConnectedEpic,
};
