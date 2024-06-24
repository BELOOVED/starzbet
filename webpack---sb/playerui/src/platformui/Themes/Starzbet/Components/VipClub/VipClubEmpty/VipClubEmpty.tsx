import { type ComponentType, createElement, memo } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "@sb/translator";
import {
  platformui_starzbet_vipClub_bonus_empty_text,
  platformui_starzbet_vipClub_bonus_empty_title,
  platformui_starzbet_vipClub_commissionRefund_empty_text,
  platformui_starzbet_vipClub_commissionRefund_empty_title,
  platformui_starzbet_vipClub_playerState_empty_goToDeposits,
  platformui_starzbet_vipClub_playerState_empty_noLevelRules_subtitle,
  platformui_starzbet_vipClub_playerState_empty_noLevelRules_title,
  platformui_starzbet_vipClub_playerState_empty_noPlayerLevelRule_subtitle,
  platformui_starzbet_vipClub_playerState_empty_noPlayerLevelRule_title,
  platformui_starzbet_vipClub_playerState_empty_text,
  platformui_starzbet_vipClub_playerState_empty_title,
  platformui_starzbet_vipClubBenefits_empty_subtitle,
  platformui_starzbet_vipClubBenefits_empty_title,
  platformui_starzbet_vipClubLeaders_leaderBoard_empty_subtitle,
  platformui_starzbet_vipClubLeaders_leaderBoard_empty_title,
  platformui_starzbet_vipClubTournaments_noActiveTournaments_subtitle,
  platformui_starzbet_vipClubTournaments_noActiveTournaments_title,
  type TTKeys,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { isNotEmpty, withProps } from "@sb/utils";
import classes from "./VipClubEmpty.module.css";
import { LoaderImg } from "../../../../../../common/Themes/Starzbet/Components/LoaderImg/LoaderImg";
import { Button } from "../../../../../../common/Themes/Starzbet/Components/Button/Button";
import { LinkToTop } from "../../../../../../common/Components/LinkToTop/LinkToTop";
import { When } from "../../../../../../common/Components/When";
import { routeMap } from "../../../../../RouteMap/RouteMap";
import { Ellipsis } from "../../../../../Components/Ellipsis/Ellipsis";
import { vipClubLevelRulesListWithExtraMediasSelector } from "../../../../../Store/VipClub/Selectors/VipClubLevelRulesSelectors";
import { VipClubLevelRuleNameRange } from "../../../../../Components/VipClub/VipClubLevelRuleNameRange";
import { VipClubLevelRuleNameFallback } from "../../../../Baywin/Components/VipClub/VipClubLevelRules/VipClubLevelRuleNameFallback";

interface IVipClubEmptyBaseProps {
  titleTKey: TTKeys;
  subtitleTKey: TTKeys;
  componentTypeAfterText?: ComponentType;
}

const VipClubEmptyBase = memo<IVipClubEmptyBaseProps>(({ titleTKey, subtitleTKey, componentTypeAfterText }) => {
  const [t] = useTranslation();

  return (
    <div className={classes.vipClubEmpty}>
      <LoaderImg className={classes.vipClubEmptyLogo} />

      <h3 className={classes.vipClubEmptyTitle}>{t(titleTKey)}</h3>

      <p className={classes.vipClubEmptyText}>{t(subtitleTKey)}</p>

      {componentTypeAfterText ? createElement(componentTypeAfterText) : null}
    </div>
  );
});
VipClubEmptyBase.displayName = "VipClubEmptyBase";

const GoToDepositsButton = memo(() => {
  const [t] = useTranslation();

  return (
    <LinkToTop to={routeMap.depositRoute}>
      <Button capitalize colorScheme={"orange-gradient"}>
        <Ellipsis>
          {t(platformui_starzbet_vipClub_playerState_empty_goToDeposits)}
        </Ellipsis>
      </Button>
    </LinkToTop>
  );
});
GoToDepositsButton.displayName = "GoToDepositsButton";

const VipClubEmptyBenefits = memo(() => {
  const levelsWithExtraMedias = useSelector(vipClubLevelRulesListWithExtraMediasSelector);
  const [t] = useTranslation();

  return (
    <div className={classes.vipClubEmpty}>
      <LoaderImg className={classes.vipClubEmptyLogo} />

      <h3 className={classes.vipClubEmptyTitle}>{t(platformui_starzbet_vipClubBenefits_empty_title)}</h3>

      <When condition={isNotEmpty(levelsWithExtraMedias)}>
        <p className={classes.vipClubEmptyText}>
          {t(platformui_starzbet_vipClubBenefits_empty_subtitle)}

          {
            levelsWithExtraMedias.map(({ name, levels }, i) => name
              ? <VipClubLevelRuleNameRange name={name} levels={levels} key={i} />
              : <VipClubLevelRuleNameFallback levels={levels} key={i} />)
          }
        </p>
      </When>
    </div>
  );
});
VipClubEmptyBenefits.displayName = "VipClubEmptyBenefits";

const VipClubPlayerStateNoPlayer = withProps(VipClubEmptyBase)({
  titleTKey: platformui_starzbet_vipClub_playerState_empty_title,
  subtitleTKey: platformui_starzbet_vipClub_playerState_empty_text,
  componentTypeAfterText: GoToDepositsButton,
});

const VipClubPlayerStateNoLevelRules = withProps(VipClubEmptyBase)({
  titleTKey: platformui_starzbet_vipClub_playerState_empty_noLevelRules_title,
  subtitleTKey: platformui_starzbet_vipClub_playerState_empty_noLevelRules_subtitle,
});

const VipClubPlayerStateNoPlayerLevelRule = withProps(VipClubEmptyBase)({
  titleTKey: platformui_starzbet_vipClub_playerState_empty_noPlayerLevelRule_title,
  subtitleTKey: platformui_starzbet_vipClub_playerState_empty_noPlayerLevelRule_subtitle,
});

const VipClubEmptyBonuses = withProps(VipClubEmptyBase)({
  titleTKey: platformui_starzbet_vipClub_bonus_empty_title,
  subtitleTKey: platformui_starzbet_vipClub_bonus_empty_text,
});

const VipClubCommissionRefundEmpty = withProps(VipClubEmptyBase)({
  titleTKey: platformui_starzbet_vipClub_commissionRefund_empty_title,
  subtitleTKey: platformui_starzbet_vipClub_commissionRefund_empty_text,
});

const VipClubEmptyLeaderBoard = withProps(VipClubEmptyBase)({
  titleTKey: platformui_starzbet_vipClubLeaders_leaderBoard_empty_title,
  subtitleTKey: platformui_starzbet_vipClubLeaders_leaderBoard_empty_subtitle,
});

const VipClubEmptyNoActiveTournaments = withProps(VipClubEmptyBase)({
  titleTKey: platformui_starzbet_vipClubTournaments_noActiveTournaments_title,
  subtitleTKey: platformui_starzbet_vipClubTournaments_noActiveTournaments_subtitle,
});

export {
  VipClubPlayerStateNoPlayer,
  VipClubPlayerStateNoLevelRules,
  VipClubPlayerStateNoPlayerLevelRule,
  VipClubCommissionRefundEmpty,
  VipClubEmptyBonuses,
  VipClubEmptyLeaderBoard,
  VipClubEmptyNoActiveTournaments,
  VipClubEmptyBenefits,
};
