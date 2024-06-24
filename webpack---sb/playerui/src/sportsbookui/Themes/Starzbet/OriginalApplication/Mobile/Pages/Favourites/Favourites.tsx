// @ts-nocheck
import { memo } from "react";
import { withProps } from "@sb/utils";
import {
  sportsbookui_starzbet_empty_clickOnAStarForTheItemToAppearHere,
} from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import { groupEventsByTournamentId, sortEventIdsByStartTimeAndName } from "../../../../../../Store/Feed/Model/Event";
import {
  liveFavouriteEntriesEsportSelectorFactory,
  liveFavouriteEntriesPerSportWithoutEsportSelectorFactory,
  preLiveFavouriteEntriesEsportSelectorFactory,
  preLiveFavouriteEntriesPerSportWithoutEsportSelectorFactory,
} from "../../../../../../Store/Feed/Selectors/WrappedTournamentEntriesSelectors";
import { EventsVirtualContainer } from "../../Components/EventsVirtualContainer/EventsVirtualContainer";
import { Empty } from "../../Components/Empty/Empty";

const selectorDeps = [sortEventIdsByStartTimeAndName, groupEventsByTournamentId];

const FavEmptyStub = withProps(Empty)({ text: sportsbookui_starzbet_empty_clickOnAStarForTheItemToAppearHere });

const Favourites = withProps(EventsVirtualContainer)({
  emptyView: FavEmptyStub,
  deps: selectorDeps,
});

const LiveFavourites = memo(() => (
  <Favourites
    selectorFactory={liveFavouriteEntriesPerSportWithoutEsportSelectorFactory}
  />
));
LiveFavourites.displayName = "LiveFavourites";

const PreLiveFavourites = memo(() => (
  <Favourites
    selectorFactory={preLiveFavouriteEntriesPerSportWithoutEsportSelectorFactory}
  />
));
PreLiveFavourites.displayName = "PreLiveFavourites";

const EsportLiveFavourites = memo(() => (
  <Favourites
    selectorFactory={liveFavouriteEntriesEsportSelectorFactory}
  />
));
EsportLiveFavourites.displayName = "EsportLiveFavourites";

const EsportPreLiveFavourites = memo(() => (
  <Favourites
    selectorFactory={preLiveFavouriteEntriesEsportSelectorFactory}
  />
));
EsportPreLiveFavourites.displayName = "EsportPreLiveFavourites";

export {
  PreLiveFavourites,
  LiveFavourites,
  EsportLiveFavourites,
  EsportPreLiveFavourites,
};
