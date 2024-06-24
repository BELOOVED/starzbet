import { withProps } from "@sb/utils";
import classes from "./Bingo.module.css";
import { EExternalGameId } from "../../../../Store/Games/GamesModels";
import { GamePage } from "../GamePage/GamePage";

const Bingo = withProps(GamePage)({
  gameId: EExternalGameId.FALCON_TOMBALA,
  containerClassName: classes.container,
  iframeClassName: classes.iframe,
});

export { Bingo };
