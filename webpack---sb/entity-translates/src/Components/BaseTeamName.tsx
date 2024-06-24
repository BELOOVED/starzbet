import { memo } from "react";
import { useTranslation } from "@sb/translator";
import { type IParticipant } from "@sb/betting-core/Feed/Types";
import { translateTeam } from "@sb/betting-core/TranslateEntity/TranslateTeam";

interface IBaseTeamNameProps {
  team: Omit<IParticipant, "shortId">;
}

const BaseTeamName = memo<IBaseTeamNameProps>(({ team }) => {
  const [t] = useTranslation();

  return translateTeam(t, team);
});
BaseTeamName.displayName = "BaseTeamName";

export { BaseTeamName };
