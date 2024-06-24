import { type ComponentType, createElement, memo } from "react";
import { useSelector } from "react-redux";
import classes from "./VipClubLeaderBoard.module.css";
import { Loader } from "../../../../../../common/Themes/Starzbet/Components/Loader/Loader";
import { vipClubLeaderBoardStateSelector } from "../../../../../Store/VipClub/Selectors/VipClubLeaderBoardSelectors";
import { EVipClubLeaderBoardState } from "../../../../../Store/VipClub/VipClubModels";
import { VipClubEmptyLeaderBoard } from "../VipClubEmpty/VipClubEmpty";
import { VipClubErrorLeaderBoard } from "../VipClubError/VipClubError";
import { VipClubPagination } from "../VipClubPagination/VipClubPagination";
import { VipClubLeaderBoardContent } from "./VipClubLeaderBoardContent";
import { VipClubLeaderBoardSelfPlace } from "./VipClubLeaderBoardSelfPlace/VipClubLeaderBoardSelfPlace";

const VipClubLeaderBoardFull = memo(() => (
  <div className={classes.vipClubLeaderBoard}>
    <VipClubLeaderBoardSelfPlace />

    <div className={classes.vipClubLeaderBoardBody}>
      <VipClubLeaderBoardContent />

      <VipClubPagination />
    </div>
  </div>
));
VipClubLeaderBoardFull.displayName = "VipClubLeaderBoardFull";

const LEADER_BOARD_STATE_TO_COMPONENT_TYPE_MAP: Record<EVipClubLeaderBoardState, ComponentType> = {
  [EVipClubLeaderBoardState.full]: VipClubLeaderBoardFull,
  [EVipClubLeaderBoardState.loading]: Loader,
  [EVipClubLeaderBoardState.failed]: VipClubErrorLeaderBoard,
  [EVipClubLeaderBoardState.empty]: VipClubEmptyLeaderBoard,
};

const VipClubLeaderBoard = memo(() => {
  const state = useSelector(vipClubLeaderBoardStateSelector);

  return createElement(LEADER_BOARD_STATE_TO_COMPONENT_TYPE_MAP[state]);
});
VipClubLeaderBoard.displayName = "VipClubLeaderBoard";

export { VipClubLeaderBoard };
