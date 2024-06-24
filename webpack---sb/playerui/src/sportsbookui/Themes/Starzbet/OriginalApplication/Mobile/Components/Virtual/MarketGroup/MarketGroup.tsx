// @ts-nocheck
import clsx from "clsx";
import { memo, useEffect, useReducer, useState } from "react";
import { keyToComponent, useParamSelector, withProps, not } from "@sb/utils";
import { EMarketGroup } from "@sb/betting-core/EMarketGroup";
import {
  sportsbookui_starzbet_emptyMarkets_message_noResultsFoundPleaseTryADifferentFilterTerm,
  sportsbookui_starzbet_marketsWithFilters_button_collapseAll,
  sportsbookui_starzbet_marketsWithFilters_button_expandAll,
} from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import classes from "./MarketGroup.module.css";
import { scopeByMarketIdSelector, sportIdByScopeIdSelector } from "../../../../../../../Store/Feed/Selectors/FeedSelectors";
import { MarketName } from "../../../../../../../Components/MarketName/MarketName";
import { OutcomeContainer } from "../../../../../../../Containers/OutcomeContainer/OutcomeContainer";
import { FullScopeName } from "../../../../../../../Components/ScopeName/ScopeName";
import { Ellipsis } from "../../../../../../../Components/Ellipsis/Ellipsis";
import { useMarketIdGroupByEventIdSelector } from "../../../../../../../Store/Feed/Hooks/UseMarketIdGroupByEventIdSelector";
import { DropdownIcon } from "../../../../Components/Icons/DropdownIcon/DropdownIcon";
import { Empty } from "../../Empty/Empty";
import { BaseOutcomeList, CorrectScoreOutcomeList, ExpandOutcomeList, LargeOutcomeList } from "../OutcomeList/OutcomeList";

const viewMap = {
  [EMarketGroup.ah]: ExpandOutcomeList,
  [EMarketGroup._1x2_ou]: ExpandOutcomeList,
  [EMarketGroup._1x2_teams_to_score]: LargeOutcomeList,
  [EMarketGroup.interval_ah]: ExpandOutcomeList,
  [EMarketGroup.ou]: ExpandOutcomeList,
  [EMarketGroup.ou_team]: ExpandOutcomeList,
  [EMarketGroup.o_win_team]: ExpandOutcomeList,
  [EMarketGroup.o_win_draw_team]: ExpandOutcomeList,
  [EMarketGroup.u_win_team]: ExpandOutcomeList,
  [EMarketGroup.u_win_draw_team]: ExpandOutcomeList,
  [EMarketGroup.o_draw]: ExpandOutcomeList,
  [EMarketGroup.u_draw]: ExpandOutcomeList,
  [EMarketGroup.both_to_score_and_o_yes_no]: ExpandOutcomeList,
  [EMarketGroup.both_to_score_and_u_yes_no]: ExpandOutcomeList,
  [EMarketGroup.interval_ou]: ExpandOutcomeList,
  [EMarketGroup.interval_ou_team]: ExpandOutcomeList,

  [EMarketGroup.exact_number]: LargeOutcomeList,
  [EMarketGroup.exact_number_team]: LargeOutcomeList,
  [EMarketGroup.range_number]: LargeOutcomeList,
  [EMarketGroup.range_number_team]: LargeOutcomeList,
  [EMarketGroup.to_score_x_in_range]: LargeOutcomeList,
  [EMarketGroup.ht_ft]: LargeOutcomeList,

  [EMarketGroup.cs]: CorrectScoreOutcomeList,

  [EMarketGroup._12_score]: LargeOutcomeList,
  [EMarketGroup.race_odd_even_high_low]: LargeOutcomeList,
  [EMarketGroup.odd_even_high_low]: LargeOutcomeList,
  [EMarketGroup.to_score_race]: LargeOutcomeList,

  base: BaseOutcomeList,
};

const CurrentOutcomeContainer = withProps(OutcomeContainer)({ viewMap });

CurrentOutcomeContainer.displayName = "CurrentOutcomeContainer";

const MarketHead = memo(({
  id,
  expanded,
  toggle,
}) => {
  const scope = useParamSelector(scopeByMarketIdSelector, [id]);
  const sportId = useParamSelector(sportIdByScopeIdSelector, [scope.id]);

  return (
    <div className={clsx(classes.head, expanded && classes.expended)} onClick={toggle}>
      <div className={classes.marketTitle}>
        <Ellipsis>
          <MarketName id={id} />
        </Ellipsis>

        <div className={classes.marketTitleScope}>
          <FullScopeName
            scope={scope}
            sportId={sportId}
            pattern={" (@)"}
          />
        </div>
      </div>

      <DropdownIcon color={"darkText"} size={"m"} expanded={expanded} />
    </div>
  );
});
MarketHead.displayName = "MarketHead";

const Button = memo(({ collapsed, onClick }) => {
  const [t] = useTranslation();

  return (
    <div className={classes.btn} onClick={onClick}>
      <div className={classes.btnText}>
        <Ellipsis>
          {
            t(
              collapsed
                ? sportsbookui_starzbet_marketsWithFilters_button_expandAll
                : sportsbookui_starzbet_marketsWithFilters_button_collapseAll,
            )
          }
        </Ellipsis>
      </div>

      <div className={classes.btnIcon}>
        {collapsed ? "+" : "-"}
      </div>
    </div>
  );
});
Button.displayName = "Button";

const MarketGroup = memo(({
  idList,
  collapsed,
}) => {
  const [expanded, setExpanded] = useState(true);

  useEffect(
    () => {
      setExpanded(!collapsed);
    },
    [collapsed],
  );

  const toggle = () => setExpanded(not);

  return (
    <div className={classes.marketGroup}>
      <MarketHead
        id={idList[0]}
        toggle={toggle}
        expanded={expanded}
      />

      {
        expanded && (
          <div className={classes.outcomeList}>
            {idList.map(keyToComponent("marketId")(CurrentOutcomeContainer))}
          </div>
        )
      }
    </div>
  );
});
MarketGroup.displayName = "MarketGroup";

const MarketGroups = memo(({ eventId, marketTab }) => {
  const marketGroups = useMarketIdGroupByEventIdSelector(eventId, marketTab);

  const [collapsed, toggle] = useReducer(not<boolean>, false);

  if (marketGroups.length === 0) {
    return <Empty text={sportsbookui_starzbet_emptyMarkets_message_noResultsFoundPleaseTryADifferentFilterTerm} />;
  }

  return (
    <div className={classes.marketGroups}>
      <div className={classes.buttons}>
        <Button onClick={toggle} />
      </div>

      <div className={clsx(classes.groups, collapsed && classes.collapsed)}>
        {
          marketGroups.map((idList, i) => (
            <MarketGroup
              key={i}
              idList={idList}
              collapsed={collapsed}
            />
          ))
        }
      </div>
    </div>
  );
});
MarketGroups.displayName = "MarketGroups";

export { MarketGroups };
