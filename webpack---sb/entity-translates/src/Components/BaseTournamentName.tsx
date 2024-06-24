import { memo } from "react";
import { useTranslation } from "@sb/translator";
import { getTournamentTranslate } from "@sb/betting-core/TranslateEntity/LineTranslates";
import { capitalizeFirstLetter } from "@sb/utils";

interface IBaseTournamentNameProps {
  id: string;
  name: string;
}

const BaseTournamentName = memo<IBaseTournamentNameProps>(({ id, name }) => {
  const [t] = useTranslation();

  return t(getTournamentTranslate(id), { fallback: capitalizeFirstLetter(name) });
});
BaseTournamentName.displayName = "BaseTournamentName";

export { BaseTournamentName };
