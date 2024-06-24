import { withProps } from "@sb/utils";
import { Loader } from "../../../../../common/Themes/Starzbet/Components/Loader/Loader";
import { PlayGameFrameFactory } from "../../../../Components/PlayGame/PlayGameFrameFactory";
import { PlayGamePageFactory } from "../../../../Components/PlayGame/PlayGamePageFactory";
import { SwitchWithPlayGameRoutesFactory } from "../../../../Components/PlayGame/SwitchWithPlayGameRoutesFactory";
import { GAME_WINDOW_HEADER_HEIGHT_V1 } from "../../../../Utils/GameWindowUtils";
import { BonusGameWindowModals } from "../GameWindowsHeader/BonusGameWindowModals";
import { BonusGameWindowHeader } from "../GameWindowsHeader/BonusGameWindowHeader/BonusGameWindowHeader";
import { RealMoneyGameWindowHeader } from "../GameWindowsHeader/RealMoneyGameWindowHeader/RealMoneyGameWindowHeader";
import { LoadFailed } from "./LoadFailed/LoadFailed";

const PlayGameFrame = withProps(PlayGameFrameFactory)({
  bonusHeader: BonusGameWindowHeader,
  realMoneyHeader: RealMoneyGameWindowHeader,
  bonusModals: BonusGameWindowModals,
  headerHeight: GAME_WINDOW_HEADER_HEIGHT_V1,
});

const PlayGamePage = withProps(PlayGamePageFactory)({
  playGameFrame: PlayGameFrame,
  loader: Loader,
  loadFailed: LoadFailed,
});

const SwitchWithPlayGameRoutes = withProps(SwitchWithPlayGameRoutesFactory)({
  playGamePage: PlayGamePage,
});

export { SwitchWithPlayGameRoutes };
