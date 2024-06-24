// @ts-nocheck
import clsx from "clsx";
import { memo, type MouseEvent, useCallback, useEffect, useState } from "react";
import { useTranslation } from "@sb/translator";
import {
  sportsbookui_starzbet_emptyMarkets_message_noResultsFoundPleaseTryADifferentFilterTerm,
} from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import { getNotNil, objToComponent, useParamSelector } from "@sb/utils";
import classes from "./MarketsWithTabs.module.css";
import { NativeHorizontalScroll } from "../../../../../../../common/Components/NativeHorizontalScroll/NativeHorizontalScroll";
import { useMarketTabs } from "../../../../../../Store/Feed/Hooks/UseMarketTabs";
import {
  totalOutcomesPerMarketTabSelector,
  useMarketIdGroupByEventIdSelector,
} from "../../../../../../Store/Feed/Hooks/UseMarketIdGroupByEventIdSelector";
import { Ellipsis } from "../../../../../../Components/Ellipsis/Ellipsis";
import { ExpandTabs } from "../../../Components/ExpandTabs/ExpandTabs";
import { MarketGroup } from "../MarketGroup/MarketGroup";
import { Empty } from "../Empty/Empty";

const Filter = memo(({
  id,
  name,
  filterEnum,
  filterHandle,
  eventId,
  fixed,
  isMenu,
}) => {
  const [t] = useTranslation();
  const totalOutcomes = useParamSelector(totalOutcomesPerMarketTabSelector, [eventId, id]);
  const active = filterEnum === id;

  const className = clsx(isMenu ? classes.filterMenuItem : classes.filterItem, active && classes.active, fixed && classes.fixed);

  if (!totalOutcomes) {
    return null;
  }

  return (
    <div
      className={className}
      data-id={id}
      onClick={filterHandle}
    >
      <div className={classes.filterNameText}>
        <Ellipsis>
          {t(name)}
        </Ellipsis>
      </div>

      {(totalOutcomes > 0) && <div className={classes.count}>{totalOutcomes}</div>}
    </div>
  );
});
Filter.displayName = "Filter";

const FilterList = memo(({
  filters,
  filterEnum,
  setFilter,
  eventId,
  fixed,
}) => {
  const filterHandle = useCallback(
    (e: MouseEvent) => setFilter(getNotNil(e.currentTarget.dataset, ["MarketWithTabs"], "FilterList").id),
    [setFilter],
  );

  if (!filters) {
    return null;
  }

  return (
    <div className={classes.filter}>
      <NativeHorizontalScroll arrowsContainerClassName={classes.container} className={classes.container}>
        {
          filters.map(
            objToComponent(
              "id",
              {
                filterHandle,
                filterEnum,
                eventId,
                fixed,
              },
            )(Filter),
          )
        }
      </NativeHorizontalScroll>
    </div>
  );
});
FilterList.displayName = "FilterList";

const MarketGroups = memo(({
  marketGroups,
  expandState,
  getToggleHandle,
  imbedded,
}) => {
  if (marketGroups.length === 0) {
    return <Empty text={sportsbookui_starzbet_emptyMarkets_message_noResultsFoundPleaseTryADifferentFilterTerm} />;
  }

  return (
    <div className={classes.marketGroups}>
      {
        marketGroups.map((marketGroup, i) => (
          <MarketGroup
            key={i}
            marketGroup={marketGroup}
            expanded={expandState[i]}
            handleToggle={getToggleHandle(i)}
            imbedded={imbedded}
          />
        ))
      }
    </div>
  );
});
MarketGroups.displayName = "MarketGroups";

const toState = (list) => (prevState = {}) => (
  list.reduce((acc, index) => ({ ...acc, [index]: prevState[index] ?? true }), {})
);

interface IMarketsWithTabsProps {
  eventId: string;
  sportId: string;
  imbedded?: boolean;
  fixedTab?: boolean;
}

const MarketsWithTabs = memo<IMarketsWithTabsProps>(({
  eventId,
  sportId,
  imbedded,
  fixedTab,
}) => {
  const [tabs, marketTab, setMarketTab] = useMarketTabs(sportId, eventId);

  const marketGroups = useMarketIdGroupByEventIdSelector(eventId, marketTab);

  const [expandState, setExpandState] = useState(toState(Object.keys(marketGroups)));

  useEffect(
    () => {
      setExpandState(toState(Object.keys(marketGroups)));
    },
    [marketGroups],
  );

  const getToggleHandle = useCallback(
    (index: any) => () => setExpandState((prev) => ({ ...prev, [index]: !prev[index] })),
    [],
  );

  return (
    <div className={clsx(imbedded && classes.dark)}>
      <FilterList
        filters={tabs}
        filterEnum={marketTab}
        setFilter={setMarketTab}
        marketGroups={marketGroups}
        eventId={eventId}
        fixed={fixedTab}
      />

      <div>
        <ExpandTabs setTabs={setExpandState} eventId={eventId} />

        <MarketGroups
          marketGroups={marketGroups}
          expandState={expandState}
          getToggleHandle={getToggleHandle}
          imbedded={imbedded}
        />
      </div>
    </div>
  );
});
MarketsWithTabs.displayName = "MarketsWithTabs";

export { MarketsWithTabs };
