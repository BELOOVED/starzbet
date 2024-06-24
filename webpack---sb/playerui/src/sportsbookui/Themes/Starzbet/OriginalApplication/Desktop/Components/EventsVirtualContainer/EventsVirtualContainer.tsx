// @ts-nocheck
import { memo } from "react";
import { withProps } from "@sb/utils";
import { sportsbookui_starzbet_empty_thereAreNoEventsForTheSelectedParameter } from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import { Empty } from "../../../../../../../common/Themes/Starzbet/Components/Empty/Empty";
import { getNextEntriesBySport } from "../../../../../../Containers/AbstractContainer/AbstractContainer";
import { VirtualContainer } from "../../../../../../Components/VirtualContainer/VirtualContainer";
import { SportHeader } from "../../../Components/SportHeader/SportHeader";
import { TournamentTable } from "../TournamentTable/TournamentTable";
import { LoadMore } from "../LoadMore/LoadMore";

const LoadMoreFit = withProps(LoadMore)({ fit: true });

const EventsVirtualContainer = memo<Record<string, unknown>>((props) => (
  <VirtualContainer
    groupComponent={SportHeader}
    itemComponent={TournamentTable}
    groupSize={48}
    minItemSize={51}
    itemSize={51}
    entrySize={60}
    buttonSize={84}
    emptyComponent={withProps(Empty)({ messageTKey: sportsbookui_starzbet_empty_thereAreNoEventsForTheSelectedParameter })}
    button={LoadMoreFit}
    entryWalker={getNextEntriesBySport}
    autoExpandedItemSize={true}
    {...props}
  />
));
EventsVirtualContainer.displayName = "EventsVirtualContainer";

export { EventsVirtualContainer };
