import { memo } from "react";
import { EPlatform_ImageSize } from "@sb/graphql-client";
import { useParamSelector } from "@sb/utils";
import classes from "./Search.module.css";
import { type IWithGamePage } from "../../../../../../../Store/Games/Model/Games";
import { assertNotNilGameByIdSelector } from "../../../../../../../Store/Games/Selectors/GamesSelectors";
import { gameView } from "../../../../../../../Utils/GetGamesViewParams";
import { BaseGame } from "./BaseGame";

interface IStaticGameProps extends IWithGamePage {
  gameId: string;
}

const StaticGame = memo<IStaticGameProps>(({
  gameId,
  page,
}) => {
  const game = useParamSelector(assertNotNilGameByIdSelector, [gameId]);

  const option = gameView[page];

  return (
    <div className={classes.static}>
      <BaseGame
        game={game}
        imageSize={EPlatform_ImageSize.size1}
        {...option}
      />
    </div>
  );
});
StaticGame.displayName = "StaticGame";

export { StaticGame };
