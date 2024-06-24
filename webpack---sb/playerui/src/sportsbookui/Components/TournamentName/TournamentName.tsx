// @ts-nocheck
import { memo } from "react";
import { useParamSelector } from "@sb/utils";
import { useTranslation } from "@sb/translator";
import { BaseTournamentName } from "@sb/entity-translates";
import { tournamentByIdSelector } from "../../Store/Feed/Selectors/FeedSelectors";

interface ITournamentName {
  id: string;
}

const TournamentName = memo<ITournamentName>(({ id }) => {
  const tournament = useParamSelector(tournamentByIdSelector, [id]);

  return (
    <BaseTournamentName name={tournament.name} id={id} />
  );
});
TournamentName.displayName = "TournamentName";

const OutrightTournamentName = memo(({ id, tKey }) => {
  const [t] = useTranslation();

  return (
    <>
      <TournamentName id={id} />

      {", "}

      {t(tKey)}
    </>
  );
});
OutrightTournamentName.displayName = "OutrightTournamentName";

export { TournamentName, OutrightTournamentName };
