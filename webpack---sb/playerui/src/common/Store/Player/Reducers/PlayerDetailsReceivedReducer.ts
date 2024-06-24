import { getNotNil, type TReducer } from "@sb/utils";
import { assocPath } from "@sb/utils/AssocPath";
import { selfProtectionReceivedHandler } from "../../../../platformui/Store/SelfProtection/Reducers/Handlers/SelfProtectionReceivedHandler";
import { type TPlatformAppState } from "../../../../platformui/Store/PlatformInitialState";
import { type playerDetailsReceivedAction } from "../PlayerActions";
import { playerDetailsSelectors } from "../Selectors/PlayerSelectors";

const playerDetailsReceivedReducer: TReducer<
  TPlatformAppState,
  typeof playerDetailsReceivedAction
> = (
  state,
  { payload: { player: { selfProtection, profile, ...rest } } },
) => {
  const resultProfile = profile || null;

  const newState = assocPath(
    ["player", "details"],
    {
      ...state.player.details,
      ...assocPath(["permissions"], rest.permissions || playerDetailsSelectors.permissions(state), rest),
      profile: resultProfile,
      isLoaded: true,
    },
    state,
  );

  return selfProtectionReceivedHandler(
    newState,
    getNotNil(selfProtection?.bags, ["playerDetailsReceivedReducer"], "selfProtection?.bags"),
  );
};

export { playerDetailsReceivedReducer };
