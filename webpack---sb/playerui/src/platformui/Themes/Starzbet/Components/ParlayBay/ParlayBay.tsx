import { withProps } from "@sb/utils";
import classes from "./ParlayBay.module.css";
import { EExternalGameId } from "../../../../Store/Games/GamesModels";
import { GamePage } from "../GamePage/GamePage";

const ParlayBay = withProps(GamePage)({
  gameId: EExternalGameId.STREAK,
  containerClassName: classes.container,
  iframeClassName: classes.iframe,
});

export { ParlayBay };
