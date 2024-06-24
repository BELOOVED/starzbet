import clsx from "clsx";
import { memo } from "react";
import { useSelector } from "react-redux";
import {
  sportsbookui_starzbet_myBets_tab_cashOut,
  sportsbookui_starzbet_myBets_tab_open,
  sportsbookui_starzbet_myBets_tab_settled,
} from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import { useAction } from "@sb/utils";
import { useTranslation } from "@sb/translator";
import classes from "./BetSlipSecondLineTabs.module.css";
import { filterMyBetsSelector } from "../../../../../../../Store/MyBets/Selectors/MyBetsSelectors";
import { betTypeFilter, type TBetTypeFilter } from "../../../../../../../Store/MyBets/Model/BetTypeFilter";
import { changeFilterMyBetsAction } from "../../../../../../../Store/MyBets/MyBetsActions";
import { Ellipsis } from "../../../../../../../Components/Ellipsis/Ellipsis";

const betTypeFilters = [betTypeFilter.OPENED, betTypeFilter.SETTLED, betTypeFilter.AVAILABLE_FOR_CASH_OUT];

const betTypeFilterNames = {
  [betTypeFilter.OPENED]: sportsbookui_starzbet_myBets_tab_open,
  [betTypeFilter.SETTLED]: sportsbookui_starzbet_myBets_tab_settled,
  [betTypeFilter.AVAILABLE_FOR_CASH_OUT]: sportsbookui_starzbet_myBets_tab_cashOut,
};

const BetTypeTabs = memo(() => {
  const [t] = useTranslation();
  const activeFilter = useSelector(filterMyBetsSelector);
  const changeFilter = useAction(changeFilterMyBetsAction);
  const onClick = (filter: TBetTypeFilter) => () => changeFilter(filter);

  return (
    <div className={classes.secondLineTabs}>
      {
        betTypeFilters.map((typeFilter) => (
          <button
            data-tab={typeFilter}
            key={typeFilter}
            className={clsx(classes.tab, activeFilter === typeFilter && classes.active)}
            onClick={onClick(typeFilter)}
          >
            <Ellipsis>{t(betTypeFilterNames[typeFilter])}</Ellipsis>
          </button>
        ))
      }
    </div>
  );
});
BetTypeTabs.displayName = "BetTypeTabs";

export { BetTypeTabs };
