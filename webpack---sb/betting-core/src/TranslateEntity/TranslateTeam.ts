import { IParticipant } from "../Feed/Types";
import { getTeamTranslate } from "./LineTranslates";
import { isDev, TExplicitAny } from "@sb/utils";
import { TFuncOrPlainLocal } from "./LocalTFunction";
import { trimTranslated } from "./Helpers";
import { Logger } from "../Utils/Logger";

export const translateTeam = <T extends TFuncOrPlainLocal>(
  t: T,
  participant: Omit<IParticipant, "shortId">,
  throwError = isDev,
): ReturnType<T> => {
  try {
    return trimTranslated(t(getTeamTranslate(participant.teamId), { fallback: participant.name }));
  } catch (e: TExplicitAny) {
    if (throwError) {
      throw e;
    }

    Logger.error.app("Unable to translate team", e.message);

    return "-" as ReturnType<T>;
  }
}
