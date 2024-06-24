import { useSelector } from "react-redux";
import { type ComponentType, createElement, memo } from "react";
import { withProps } from "@sb/utils";
import { type TPlatform_VipClubLevelRule_Fragment } from "@sb/graphql-client/PlayerUI";
import { PlayerUIQaAttributes, qaAttr } from "@sb/qa-attributes";
import { FadeIn } from "../../../../common/Components/Animations/FadeIn/FadeIn";
import { vipClubLevelRulesStateSelector } from "../../../Store/VipClub/Selectors/VipClubLevelRulesSelectors";
import { EVipClubLevelRulesState } from "../../../Store/VipClub/VipClubModels";
import { vipClubSelectors } from "../../../Store/VipClub/Selectors/VipClubSelectors";

interface IFullProps extends IWithClassName {
  LevelRule: ComponentType<TPlatform_VipClubLevelRule_Fragment>;
}

const Full = memo<IFullProps>(({ LevelRule, className }) => {
  const rules = useSelector(vipClubSelectors.levelRules);

  return (
    <FadeIn className={className} {...qaAttr(PlayerUIQaAttributes.VipClubPage.LevelRules_Container)}>
      {rules.map((rule, i) => <LevelRule {...rule} key={i} />)}
    </FadeIn>
  );
});
Full.displayName = "Full";

interface IVipClubLevelRulesProps extends IWithClassName {
  LevelRule: ComponentType<TPlatform_VipClubLevelRule_Fragment>;
  Empty: ComponentType;
  Failed: ComponentType;
  Loader: ComponentType;
}

const VipClubLevelRulesBase = memo<IVipClubLevelRulesProps>(({
  LevelRule,
  Empty,
  Failed,
  Loader,
  className,
}) => {
  const state = useSelector(vipClubLevelRulesStateSelector);

  const componentMap: Record<EVipClubLevelRulesState, ComponentType> = {
    [EVipClubLevelRulesState.empty]: Empty,
    [EVipClubLevelRulesState.failed]: Failed,
    [EVipClubLevelRulesState.loading]: Loader,
    [EVipClubLevelRulesState.full]: withProps(Full)({ LevelRule, className }),
  };

  return createElement(componentMap[state]);
});
VipClubLevelRulesBase.displayName = "VipClubLevelRulesBase";

export { VipClubLevelRulesBase };
