import clsx from "clsx";
import { type ComponentType, createElement, memo, useReducer } from "react";
import { not, useParamSelector, withProps } from "@sb/utils";
import type { TPlatform_VipClubFile_Fragment, TPlatform_VipClubLevelRule_Fragment } from "@sb/graphql-client/PlayerUI";
import { useTranslation } from "@sb/translator";
import { platformui_starzbet_vipClub_levelRules_showAll } from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import classes from "./VipClubLevelRules.module.css";
import { IS_MOBILE_CLIENT_SIDE } from "../../../../../../common/Store/DeviceInfo/DeviceInfoConstant";
import { When } from "../../../../../../common/Components/When";
import { Loader } from "../../../../../../common/Themes/Starzbet/Components/Loader/Loader";
import { TickIcon } from "../../../../../../common/Themes/Starzbet/Components/Icons/TickIcon/TickIcon";
import { type TIconProps } from "../../../../../../common/Components/Icon/Icon";
import { PublicImage } from "../../../../../../common/Components/PublicImage";
import { Noop } from "../../../../../../common/Components/Noop/Noop";
import { EVipClubLevelRuleState, type IWithVipClubLevels } from "../../../../../Store/VipClub/VipClubModels";
import { vipClubLevelRuleStateByPlayerLevelSelector } from "../../../../../Store/VipClub/Selectors/VipClubPlayerStateSelectors";
import { VipClubLevelRuleNameRange } from "../../../../../Components/VipClub/VipClubLevelRuleNameRange";
import { vipClubAnalyzeLevelRule } from "../../../../../Store/VipClub/Util/VipClubAnalyzeLevelRule";
import { VipClubLevelRulesBase } from "../../../../../Components/VipClub/VipClubLevelRules/VipClubLevelRulesBase";
import { ChevronThinIcon } from "../../Icons/ChevronThinIcon";
import { CrownIconV1 } from "../../Icons/CrownIcon/CrownIcon";
import { TimeIcon } from "../../Icons/TimeIcon/TimeIcon";
import { ThemedTranslateRecordHTML } from "../../ThemedTranslateRecordHTML/ThemedTranslateRecordHTML";
import { VipClubLevelRulesRewards } from "./VipClubLevelRulesRewards";
import { VipClubLevelRulesExtraMedias } from "./VipClubLevelRulesExtraMedias/VipClubLevelRulesExtraMedias";
import { VipClubLevelRuleNameFallback } from "./VipClubLevelRuleNameFallback";

const LEVEL_STATE_TO_ICON_COMPONENT_TYPE: Record<EVipClubLevelRuleState, ComponentType<TIconProps>> = {
  [EVipClubLevelRuleState.completed]: TickIcon,
  [EVipClubLevelRuleState.current]: withProps(CrownIconV1)({ color: "active" }),
  [EVipClubLevelRuleState.next]: withProps(TimeIcon)({ color: "brand" }),
  [EVipClubLevelRuleState.notCompleted]: withProps(TimeIcon)({ color: "brand" }),
  [EVipClubLevelRuleState.notDefined]: withProps(TimeIcon)({ color: "brand" }),
};

const LEVEL_STATE_TO_CLASS_NAME_MAP: Record<EVipClubLevelRuleState, string | undefined> = {
  [EVipClubLevelRuleState.completed]: classes.completed,
  [EVipClubLevelRuleState.current]: classes.current,
  [EVipClubLevelRuleState.next]: classes.next,
  [EVipClubLevelRuleState.notCompleted]: classes.notCompleted,
  [EVipClubLevelRuleState.notDefined]: classes.notDefined,
};

interface IVipClubLevelRuleIconProps {
  pathToFile: TPlatform_VipClubFile_Fragment["pathToFile"];
}

const VipClubLevelRuleIcon = memo<IVipClubLevelRuleIconProps>(({ pathToFile }) => (
  <div className={classes.vipClubLevelRuleImage}>
    <PublicImage pathToFile={pathToFile} />
  </div>
));
VipClubLevelRuleIcon.displayName = "VipClubLevelRuleIcon";

const VipClubLevelRuleLabel = memo<IWithVipClubLevels>(({ levels }) => {
  const levelRuleState = useParamSelector(vipClubLevelRuleStateByPlayerLevelSelector, [levels]);

  return (
    <div className={clsx(classes.vipClubLevelRuleLabel, LEVEL_STATE_TO_CLASS_NAME_MAP[levelRuleState])}>
      {createElement(LEVEL_STATE_TO_ICON_COMPONENT_TYPE[levelRuleState], { width: 18, height: 18 })}
    </div>
  );
});
VipClubLevelRuleLabel.displayName = "VipClubLevelRuleLabel";

const VipClubLevelShowAll = memo(() => {
  const [t] = useTranslation();

  return (
    <div className={classes.vipClubLevelRuleShowAll}>
      {t(platformui_starzbet_vipClub_levelRules_showAll)}
    </div>
  );
});
VipClubLevelShowAll.displayName = "VipClubLevelShowAll";

const VipClubLevelRule = memo<TPlatform_VipClubLevelRule_Fragment>((levelRule) => {
  const [expanded, toggle] = useReducer(not<boolean>, false);

  const {
    description,
    levels,
    name,
    icon,
    rewards,
    extraMedias,
  } = levelRule;

  const { hasSomeReward, hasExtraMedias, expandable } = vipClubAnalyzeLevelRule(levelRule);

  return (
    <div className={classes.vipClubLevelRule}>
      <div className={clsx(classes.vipClubLevelRuleHead, expandable && classes.clickable)} onClick={toggle}>
        {icon ? <VipClubLevelRuleIcon pathToFile={icon.pathToFile} /> : null}

        <div className={classes.vipClubLevelRuleName}>
          {name ? <VipClubLevelRuleNameRange name={name} levels={levels} /> : <VipClubLevelRuleNameFallback levels={levels} />}
        </div>

        <VipClubLevelRuleLabel levels={levels} />

        {!IS_MOBILE_CLIENT_SIDE && expandable ? <VipClubLevelShowAll /> : null}

        {expandable ? <ChevronThinIcon className={clsx(classes.chevronIcon, expanded && classes.expanded)} /> : null}
      </div>

      <When condition={expandable && expanded}>
        <div className={classes.vipClubLevelRuleBody}>
          {description ? <ThemedTranslateRecordHTML record={description} className={classes.vipClubLevelRuleDescription} /> : null}

          {hasSomeReward ? <VipClubLevelRulesRewards rewards={rewards} /> : null}

          {hasExtraMedias ? <VipClubLevelRulesExtraMedias extraMedias={extraMedias} /> : null}
        </div>
      </When>
    </div>
  );
});
VipClubLevelRule.displayName = "VipClubLevelRule";

const VipClubLevelRules = withProps(VipClubLevelRulesBase)({
  className: classes.vipClubLevelRules,
  LevelRule: VipClubLevelRule,
  Loader,
  Empty: Noop,
  Failed: Noop,
});
VipClubLevelRules.displayName = "VipClubLevelRules";

export { VipClubLevelRules };
