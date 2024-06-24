import { type ComponentType, createElement, memo } from "react";
import { useSelector } from "react-redux";
import { useParamSelector, withParamCondition } from "@sb/utils";
import {
  platformui_starzbet_vipClub_bonus_birthday_title,
  platformui_starzbet_vipClub_bonus_daily_title,
  platformui_starzbet_vipClub_bonus_extra_title,
  platformui_starzbet_vipClub_bonus_monthly_title,
  platformui_starzbet_vipClub_bonus_weekly_title,
  type TTKeys,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import classes from "./VipClubBonus.module.css";
import { Loader } from "../../../../../../common/Themes/Starzbet/Components/Loader/Loader";
import {
  vipClubBonusesByTypeSelector,
  vipClubBonusesStateSelector,
  vipClubIsNotEmptyBonusesByTypeSelector,
} from "../../../../../Store/VipClub/Selectors/VipClubBonusSelectors";
import { EVipClubBonusesState, EVipClubBonusType } from "../../../../../Store/VipClub/VipClubModels";
import { useVipClubRefetchBonuses } from "../../../../../Store/VipClub/Hooks/UseVipClubRefetchBonuses";
import { Ellipsis } from "../../../../../Components/Ellipsis/Ellipsis";
import { VipClubEmptyBonuses } from "../VipClubEmpty/VipClubEmpty";
import { VipClubErrorBonuses } from "../VipClubError/VipClubError";
import { VipClubBonusCard } from "./VipClubBonusCard";

interface IVipClubBonusBaseProps {
  type: EVipClubBonusType;
}

const BONUS_TYPE_TO_TITLE_TKEY: Record<EVipClubBonusType, TTKeys> = {
  [EVipClubBonusType.daily]: platformui_starzbet_vipClub_bonus_daily_title,
  [EVipClubBonusType.weekly]: platformui_starzbet_vipClub_bonus_weekly_title,
  [EVipClubBonusType.monthly]: platformui_starzbet_vipClub_bonus_monthly_title,
  [EVipClubBonusType.birthday]: platformui_starzbet_vipClub_bonus_birthday_title,
  [EVipClubBonusType.extra]: platformui_starzbet_vipClub_bonus_extra_title,
};

const VipClubBonusBase = withParamCondition(
  vipClubIsNotEmptyBonusesByTypeSelector,
  ["type"],
  memo<IVipClubBonusBaseProps>(({ type }) => {
    const [t] = useTranslation();

    const bonuses = useParamSelector(vipClubBonusesByTypeSelector, [type]);

    return (
      <div className={classes.vipClubBonus}>
        <div className={classes.vipClubBonusHead}>
          <div className={classes.vipClubBonusTitle}>
            <Ellipsis>{t(BONUS_TYPE_TO_TITLE_TKEY[type])}</Ellipsis>
          </div>
        </div>

        <div className={classes.vipClubBonusBody}>
          {
            bonuses.map((bonus) => (
              <VipClubBonusCard {...bonus} type={type} key={bonus.id} />
            ))
          }
        </div>
      </div>
    );
  }),
);
VipClubBonusBase.displayName = "VipClubBonusBase";

const VipClubBonusFull = memo(() => {
  useVipClubRefetchBonuses();

  return (
    <div className={classes.vipClubBonuses}>
      {
        Object.values(EVipClubBonusType).map((value) => (
          <VipClubBonusBase type={value} key={value} />
        ))
      }
    </div>
  );
});
VipClubBonusFull.displayName = "VipClubBonusFull";

const BONUSES_STATE_TO_COMPONENT_TYPE_MAP: Record<EVipClubBonusesState, ComponentType> = {
  [EVipClubBonusesState.full]: VipClubBonusFull,
  [EVipClubBonusesState.loading]: Loader,
  [EVipClubBonusesState.empty]: VipClubEmptyBonuses,
  [EVipClubBonusesState.failed]: VipClubErrorBonuses,
};

const VipClubBonus = memo(() => {
  const state = useSelector(vipClubBonusesStateSelector);

  return createElement(BONUSES_STATE_TO_COMPONENT_TYPE_MAP[state]);
});
VipClubBonus.displayName = "VipClubBonus";

export { VipClubBonus };
