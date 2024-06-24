import { type ComponentType, createElement, memo } from "react";
import { useSelector } from "react-redux";
import classes from "./VipClubPlayerState.module.css";
import { Loader } from "../../../../../../common/Themes/Starzbet/Components/Loader/Loader";
import { EVipClubPlayerState } from "../../../../../Store/VipClub/VipClubModels";
import { vipClubPlayerStateTabStateSelector } from "../../../../../Store/VipClub/Selectors/VipClubLevelRulesSelectors";
import { VipClubLifetimeDepositsProgress, VipClubPointsProgress } from "../VipClubProgress/VipClubProgress";
import {
  VipClubPlayerStateNoLevelRules,
  VipClubPlayerStateNoPlayer,
  VipClubPlayerStateNoPlayerLevelRule,
} from "../VipClubEmpty/VipClubEmpty";
import { VipClubCurrentAndNextLevels } from "../VipClubLevels/VipClubLevels";

const VipClubPlayerStateFull = memo(() => (
  <div className={classes.vipClubPlayerState}>
    <VipClubPointsProgress />

    <VipClubLifetimeDepositsProgress />

    <VipClubCurrentAndNextLevels />
  </div>
));
VipClubPlayerStateFull.displayName = "VipClubPlayerStateFull";

const PLAYER_STATE_TO_COMPONENT_TYPE_MAP: Record<EVipClubPlayerState, ComponentType> = {
  [EVipClubPlayerState.loading]: Loader,
  [EVipClubPlayerState.noPlayer]: VipClubPlayerStateNoPlayer,
  [EVipClubPlayerState.noLevelRules]: VipClubPlayerStateNoLevelRules,
  [EVipClubPlayerState.noPlayerLevelRule]: VipClubPlayerStateNoPlayerLevelRule,
  [EVipClubPlayerState.noPlayerNextLevelRule]: VipClubPlayerStateFull,
  [EVipClubPlayerState.full]: VipClubPlayerStateFull,
};

const VipClubPlayerState = memo(() => {
  const state = useSelector(vipClubPlayerStateTabStateSelector);

  return createElement(PLAYER_STATE_TO_COMPONENT_TYPE_MAP[state]);
});
VipClubPlayerState.displayName = "VipClubPlayerState";

const VipClubPlayerStateWidget = memo(() => (
  <div className={classes.vipClubPlayerState}>
    <VipClubPointsProgress />

    <VipClubLifetimeDepositsProgress />

    <VipClubCurrentAndNextLevels />
  </div>
));
VipClubPlayerStateWidget.displayName = "VipClubPlayerStateWidget";

export { VipClubPlayerState, VipClubPlayerStateWidget };
