import clsx from "clsx";
import { memo, useReducer, useRef } from "react";
import { keyToComponent, type TArrayNotEmpty, type TVoidFn, useParamSelector, withProps, not } from "@sb/utils";
import { EMarketGroup } from "@sb/betting-core/EMarketGroup";
import classes from "./MarketGroup.module.css";
import { When } from "../../../../../../../common/Components/When";
import { ArrowIcon } from "../../../../../../../common/Themes/Starzbet/Components/Icons/ArrowIcon/ArrowIcon";
import { scopeByMarketIdSelector, sportIdByScopeIdSelector } from "../../../../../../Store/Feed/Selectors/FeedSelectors";
import { MarketName } from "../../../../../../Components/MarketName/MarketName";
import { OutcomeContainer } from "../../../../../../Containers/OutcomeContainer/OutcomeContainer";
import { FullScopeName } from "../../../../../../Components/ScopeName/ScopeName";
import { Ellipsis } from "../../../../../../Components/Ellipsis/Ellipsis";
import { CorrectScoreOutcomeList, NamedOutcomeList, PropOutcomeList } from "../../../Components/OutcomeList/OutcomeList";
import { ShowMore } from "../../../Components/ShowMore/ShowMore";

const viewMap = {
  [EMarketGroup.cs]: CorrectScoreOutcomeList,

  [EMarketGroup.ah]: PropOutcomeList,
  [EMarketGroup.interval_ah]: PropOutcomeList,
  [EMarketGroup.ou]: PropOutcomeList,
  [EMarketGroup.ou_team]: PropOutcomeList,
  [EMarketGroup.o_win_team]: PropOutcomeList,
  [EMarketGroup.o_win_draw_team]: PropOutcomeList,
  [EMarketGroup.u_win_team]: PropOutcomeList,
  [EMarketGroup.u_win_draw_team]: PropOutcomeList,
  [EMarketGroup.o_draw]: PropOutcomeList,
  [EMarketGroup.u_draw]: PropOutcomeList,
  [EMarketGroup.both_to_score_and_o_yes_no]: PropOutcomeList,
  [EMarketGroup.both_to_score_and_u_yes_no]: PropOutcomeList,
  [EMarketGroup.interval_ou]: PropOutcomeList,
  [EMarketGroup.interval_ou_team]: PropOutcomeList,

  base: NamedOutcomeList,
};

const CurrentOutcomeContainer = withProps(OutcomeContainer)({ viewMap });

interface IMarketHead extends IWithId {
  handleToggle: TVoidFn;
  expanded: boolean;
}

const MarketHead = memo<IMarketHead>(({
  id,
  handleToggle,
  expanded,
}) => {
  const scope = useParamSelector(scopeByMarketIdSelector, [id]);
  const sportId = useParamSelector(sportIdByScopeIdSelector, [scope.id]);

  return (
    <div className={classes.head} onClick={handleToggle}>
      <div className={classes.marketName}>
        <Ellipsis>
          <MarketName id={id} />

          <FullScopeName
            scope={scope}
            sportId={sportId}
            pattern={" (@)"}
          />
        </Ellipsis>
      </div>

      <div>
        <ArrowIcon expanded={expanded} />
      </div>
    </div>
  );
});
MarketHead.displayName = "MarketHead";

interface IMarketGroup {
  handleToggle: TVoidFn;
  expanded: boolean;
  marketGroup: TArrayNotEmpty<string>;
  imbedded: boolean;
}

const MarketGroup = memo<IMarketGroup>(({
  marketGroup,
  expanded,
  handleToggle,
  imbedded,
}) => {
  const [sliced, toggle] = useReducer(not<boolean>, true);
  const ref = useRef<HTMLDivElement>(null);

  const longList = marketGroup.length > 10;
  const handleClick = () => {
    if (!sliced && longList && ref.current) {
      ref.current.scrollIntoView();
    }

    toggle();
  };

  const currentList = marketGroup.length > 5 && sliced
    ? marketGroup.slice(0, 5)
    : marketGroup;

  return (
    <div className={clsx(classes.market, imbedded && classes.imbedded)} ref={ref}>
      <MarketHead
        id={marketGroup[0]}
        expanded={expanded}
        handleToggle={handleToggle}
      />

      {
        expanded && (
          <div className={classes.block}>
            {currentList.map(keyToComponent("marketId", {})(CurrentOutcomeContainer))}

            <When condition={marketGroup.length > 5}>
              <ShowMore onClick={handleClick} less={!sliced} />
            </When>
          </div>
        )
      }
    </div>
  );
});
MarketGroup.displayName = "MarketGroup";

export { MarketGroup };
