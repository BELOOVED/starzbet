import { type ComponentType, createElement, memo } from "react";
import { type TExplicitAny, useParamSelector } from "@sb/utils";
import { isLive, isPreLive } from "@sb/betting-core/EEventStatusUtils";
import { sportMenuTournamentActiveSelector } from "../../Store/SportMenu/Selectors/SportMenuTournamentActiveSelector";
import { tournamentByIdSelector } from "../../Store/Feed/Selectors/FeedSelectors";
import { useSportMenuTournamentActions } from "../../Store/SportMenu/Hooks/UseSportMenuTournamentActions";
import { eventCountByTournamentIdSelector } from "../../Store/Feed/Selectors/EventCountByTournamentIdSelector";

interface IProps {
  live?: boolean;
  tournamentId: string;
  child: ComponentType<TExplicitAny>;
}

const SportMenuTournamentContainer = memo<IProps>(({ live = false, tournamentId, child }) => {
  const active = useParamSelector(sportMenuTournamentActiveSelector, [tournamentId]);

  const toggleActive = useSportMenuTournamentActions(tournamentId, active);

  const tournament = useParamSelector(tournamentByIdSelector, [tournamentId]);
  const eventCount = useParamSelector(eventCountByTournamentIdSelector, [tournamentId, live ? isLive : isPreLive]);

  return createElement(
    child,
    {
      active,
      toggleActive,
      tournamentId,
      eventCount,
      ...tournament,
    },
  );
});
SportMenuTournamentContainer.displayName = "SportMenuTournamentContainer";

export { SportMenuTournamentContainer };
