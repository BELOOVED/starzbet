import { memo, useMemo } from "react";
import { useParamSelector } from "@sb/utils";
import { EPlatform_ImageSize } from "@sb/graphql-client";
import { assertNotNilGameByIdSelector, isFavEnabledForPageSelector } from "../../../../Store/Games/Selectors/GamesSelectors";
import { gameView } from "../../../../Utils/GetGamesViewParams";
import { BaseGame } from "../../Desktop/Components/GameLayout/Game/BaseGame";
import { assertGamePage } from "../../Utils/LandingPageUtils";

interface ILandingGameProps {
  gameId: string;
  imgSize: number;
}

const SectionGame = memo<ILandingGameProps>(({ gameId, imgSize }) => {
  const game = useParamSelector(assertNotNilGameByIdSelector, [gameId]);
  const productCode = assertGamePage(game.product);

  const options = gameView[productCode];

  const isFavEnabled = useParamSelector(isFavEnabledForPageSelector, [productCode]);

  const wrapperStyles = useMemo(
    () => ({
      width: imgSize,
      minWidth: imgSize,
      margin: 0,
      marginBottom: "24px",
    }),
    [],
  );

  return (
    <BaseGame
      gameWidth={imgSize}
      gameHeight={imgSize}
      game={game}
      imageSize={EPlatform_ImageSize.size1}
      isFavEnabled={isFavEnabled}
      wrapperStyles={wrapperStyles}
      {...options}
    />
  );
});
SectionGame.displayName = "SectionGame";

export { SectionGame };
