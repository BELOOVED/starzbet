// @ts-nocheck
import { memo } from "react";
import { useParamSelector } from "@sb/utils";
import classes from "./VirtualCategory.module.css";
import { categoryByIdSelector } from "../../../../../../Store/Feed/Selectors/FeedSelectors";
import { AbstractContainer, getNextEntriesByTournament } from "../../../../../../Containers/AbstractContainer/AbstractContainer";
import { groupEventsByTournamentId, sortEventIdsByStartTimeAndName } from "../../../../../../Store/Feed/Model/Event";
import { virtualTournamentEntriesSelector } from "../../../../../../Store/Feed/Selectors/TournamentEntriesSelectors";
import { isLeague } from "../../../../../../Store/Virtual/Common/Model/CategorySlugWithLeague";
import { VirtualContainer } from "../../../../../../Components/VirtualContainer/VirtualContainer";
import { VirtualCustomGroupContent } from "../../../../../../Components/CustomGroupContent/CustomGroupContent";
import { LoadMore } from "../../../Desktop/Components/LoadMore/LoadMore";
import { EmptyStub } from "../../Components/Empty/Empty";
import { SimplyTournamentTable, TournamentTableExpanded } from "../../Components/Virtual/TournamentTable/TournamentTable";
import { EventRowExpanded } from "../../Components/Virtual/Row/Row";

const VirtualCategory = memo(({ match: { params: { categoryId } } }) => {
  const deps = [(it) => it.categoryId === categoryId, sortEventIdsByStartTimeAndName, groupEventsByTournamentId];

  const category = useParamSelector(categoryByIdSelector, [categoryId]);

  const isExpandable = isLeague(category?.slug);

  if (!isExpandable) {
    return (
      <div className={classes.category}>
        <AbstractContainer
          selectorFactory={virtualTournamentEntriesSelector}
          deps={deps}
          listView={SimplyTournamentTable}
        />
      </div>
    );
  }

  return (
    <div className={classes.league}>
      <VirtualContainer
        groupComponent={TournamentTableExpanded}
        itemComponent={EventRowExpanded}
        groupSize={108}
        minItemSize={72}
        minGroupSize={60}
        itemSize={72}
        buttonSize={100}
        defaultItemExpandable={false}
        autoExpandedItemSize={true}
        selectorFactory={virtualTournamentEntriesSelector}
        deps={deps}
        emptyView={EmptyStub}
        button={LoadMore}
        entryWalker={getNextEntriesByTournament}
        customGroupContent={VirtualCustomGroupContent}
      />
    </div>
  );
});
VirtualCategory.displayName = "VirtualCategory";

export { VirtualCategory };
