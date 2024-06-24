import { memo } from "react";
import { useSelector } from "react-redux";
import classes from "./VipClubLeaderBoard.module.css";
import { vipClubLeaderBoardRowsSelector } from "../../../../../Store/VipClub/Selectors/VipClubLeaderBoardSelectors";
import { VipClubLeaderRow } from "./VipClubLeaderRow/VipClubLeaderRow";

const VipClubLeaderBoardContent = memo(() => {
  const rows = useSelector(vipClubLeaderBoardRowsSelector);

  return (
    <div className={classes.vipClubLeaderRows}>
      {rows.map((row) => <VipClubLeaderRow {...row} key={row.playerId} />)}
    </div>
  );
});
VipClubLeaderBoardContent.displayName = "VipClubLeaderBoardContent";

export { VipClubLeaderBoardContent };
