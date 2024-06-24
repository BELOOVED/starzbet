import { type ComponentType, createElement, memo } from "react";
import { useSelector } from "react-redux";
import { useParamSelector } from "@sb/utils";
import { useTranslation } from "@sb/translator";
import {
  platformui_starzbet_button_login,
  platformui_starzbet_vipClubSelfPlace_lastPlacePoints,
  platformui_starzbet_vipClubSelfPlace_makeDeposit,
  platformui_starzbet_vipClubSelfPlace_notLogged,
  platformui_starzbet_vipClubSelfPlace_notVipClubMember,
  platformui_starzbet_vipClubSelfPlace_yourAreNotInLeaderboard,
  platformui_starzbet_vipClubSelfPlace_yourPlace,
  platformui_starzbet_vipClubSelfPlace_yourPoints,
  platformui_starzbet_vipClubSelfPlace_yourPotentialReward,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import classes from "./VipClubLeaderBoardSelfPlace.module.css";
import { LinkToTop } from "../../../../../../../common/Components/LinkToTop/LinkToTop";
import { useLogin } from "../../../../../../../common/Hooks/UseAuth";
import { EVipClubLeaderBoardSelfPlaceState } from "../../../../../../Store/VipClub/VipClubModels";
import { vipClubLeaderBoardSelfPlaceStateSelector } from "../../../../../../Store/VipClub/Selectors/VipClubLeaderBoardSelfPlaceSelectors";
import { routeMap } from "../../../../../../RouteMap/RouteMap";
import {
  vipClubLeaderBoardNotNilPlayerPlaceSelector,
  vipClubLeaderBoardNotNilPlayerPointsSelector,
  vipClubLeaderBoardSelectors,
} from "../../../../../../Store/VipClub/Selectors/VipClubLeaderBoardSelectors";
import { vipClubActiveTournamentFormattedPrizeByPlaceSelector, vipClubFormatPoints } from "../../../../../../Utils/VipClubPointsFormatter";

const NotLogged = memo(() => {
  const login = useLogin();
  const [t] = useTranslation();

  return (
    <div className={classes.content}>
      {t(platformui_starzbet_vipClubSelfPlace_notLogged)}

      <button className={classes.vipClubLeaderBoardSelfPlaceButton} onClick={login}>
        {t(platformui_starzbet_button_login)}
      </button>
    </div>
  );
});
NotLogged.displayName = "NotLogged";

const NotVipClubMember = memo(() => {
  const [t] = useTranslation();

  return (
    <div className={classes.content}>
      {t(platformui_starzbet_vipClubSelfPlace_notVipClubMember)}

      <LinkToTop to={routeMap.depositRoute} className={classes.vipClubLeaderBoardSelfPlaceButton}>
        {t(platformui_starzbet_vipClubSelfPlace_makeDeposit)}
      </LinkToTop>
    </div>
  );
});
NotVipClubMember.displayName = "NotVipClubMember";

const NotInLeaderBoard = memo(() => {
  const [t] = useTranslation();

  const lastPlacePoints = useSelector(vipClubLeaderBoardSelectors.minPoint);

  return (
    <div>
      <span>{t(platformui_starzbet_vipClubSelfPlace_yourAreNotInLeaderboard)}</span>

      {
        lastPlacePoints
          ? (
            <>
              <span>{t(platformui_starzbet_vipClubSelfPlace_lastPlacePoints)}</span>

              <span className={classes.mark}>{vipClubFormatPoints(lastPlacePoints)}</span>
            </>
          )
          : null
      }
    </div>
  );
});
NotInLeaderBoard.displayName = "NotInLeaderBoard";

const InLeaderBoard = memo(() => {
  const points = useSelector(vipClubLeaderBoardNotNilPlayerPointsSelector);
  const place = useSelector(vipClubLeaderBoardNotNilPlayerPlaceSelector);
  const [t] = useTranslation();

  return (
    <div>
      <span>{t(platformui_starzbet_vipClubSelfPlace_yourPoints)}</span>

      <span className={classes.mark}>{vipClubFormatPoints(points)}</span>

      <span>{t(platformui_starzbet_vipClubSelfPlace_yourPlace)}</span>

      <span className={classes.mark}>{place}</span>
    </div>
  );
});
InLeaderBoard.displayName = "InLeaderBoard";

const InLeaderBoardWithTournamentPrize = memo(() => {
  const [t] = useTranslation();
  const points = useSelector(vipClubLeaderBoardNotNilPlayerPointsSelector);
  const place = useSelector(vipClubLeaderBoardNotNilPlayerPlaceSelector);
  const tournamentPrize = useParamSelector(vipClubActiveTournamentFormattedPrizeByPlaceSelector, [place]);

  return (
    <div>
      <span>{t(platformui_starzbet_vipClubSelfPlace_yourPoints)}</span>

      <span className={classes.mark}>{vipClubFormatPoints(points)}</span>

      <span>{t(platformui_starzbet_vipClubSelfPlace_yourPlace)}</span>

      <span className={classes.mark}>{place}</span>

      <span>{t(platformui_starzbet_vipClubSelfPlace_yourPotentialReward)}</span>

      <span className={classes.mark}>{tournamentPrize}</span>
    </div>
  );
});
InLeaderBoardWithTournamentPrize.displayName = "InLeaderBoardWithTournamentPrize";

const SELF_PLACE_STATE_TO_COMPONENT_TYPE_MAP: Record<EVipClubLeaderBoardSelfPlaceState, ComponentType> = {
  [EVipClubLeaderBoardSelfPlaceState.notLogged]: NotLogged,
  [EVipClubLeaderBoardSelfPlaceState.notVipClubMember]: NotVipClubMember,
  [EVipClubLeaderBoardSelfPlaceState.loading]: () => "...",
  [EVipClubLeaderBoardSelfPlaceState.notInLeaderBoard]: NotInLeaderBoard,
  [EVipClubLeaderBoardSelfPlaceState.inLeaderBoard]: InLeaderBoard,
  [EVipClubLeaderBoardSelfPlaceState.inLeaderBoardWithTournamentPrize]: InLeaderBoardWithTournamentPrize,
};

const VipClubLeaderBoardSelfPlace = memo(() => {
  const state = useSelector(vipClubLeaderBoardSelfPlaceStateSelector);

  return (
    <div className={classes.vipClubLeaderBoardSelfPlace}>
      {createElement(SELF_PLACE_STATE_TO_COMPONENT_TYPE_MAP[state])}
    </div>
  );
});
VipClubLeaderBoardSelfPlace.displayName = "VipClubLeaderBoardSelfPlace";

export { VipClubLeaderBoardSelfPlace };
