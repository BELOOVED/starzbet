import { memo } from "react";
import classes from "./Search.module.css";
import { type IWithGamePage } from "../../../../../../../Store/Games/Model/Games";
import { StaticGame } from "./StaticGame";

interface IGameListProps extends IWithGamePage {
  gameIds: string[];
}

const StaticGameList = memo<IGameListProps>(({ gameIds, page }) => (
  <div className={classes.games}>
    {
      gameIds.map((gameId, index) => (
        <div key={index}>
          <div className={classes.divider} />

          <StaticGame
            page={page}
            gameId={gameId}
            key={gameId}
          />
        </div>
      ))
    }

    <div className={classes.divider} />
  </div>
));
StaticGameList.displayName = "StaticGameList";

export { StaticGameList };
