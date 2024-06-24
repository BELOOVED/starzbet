import { createElement, memo } from "react";
import { type TComponent, type TExplicitAny, useParamSelector } from "@sb/utils";
import { tournamentByIdSelector } from "../../Store/Feed/Selectors/FeedSelectors";

type TTournamentContainer = {
  id: string;
  contentView: TComponent<TExplicitAny>;
  emptyView?: TComponent<TExplicitAny>;
} & Record<string, TExplicitAny>

const TournamentContainer = memo<TTournamentContainer>(({
  id,
  contentView,
  emptyView,
  ...rest
}) => {
  const tournament = useParamSelector(tournamentByIdSelector, [id]);

  if (!tournament) {
    return emptyView
      ? createElement(emptyView)
      : null;
  }

  return createElement(contentView, { tournament, ...rest });
});
TournamentContainer.displayName = "TournamentContainer";

export { TournamentContainer };
