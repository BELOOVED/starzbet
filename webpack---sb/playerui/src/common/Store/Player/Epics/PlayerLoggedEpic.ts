import { switchMap } from "rxjs";
import { combineEpics } from "redux-observable";
import { isCreator } from "@sb/utils";
import { realityChecksByTimeOnLoggedEpic } from "../../../../platformui/Store/SelfProtection/Epics/RealityChecksByTimeOnLoggedEpic";
import { watchAccountVerificationRouteEpic } from "../../../../platformui/Store/Kyc/Epics/PlayerKycRootEpic";
import { callRequestsRootEpic } from "../../../../platformui/Store/CallRequests/Epics/CallRequestsRootEpic";
import { type TPlatformEpic } from "../../../../platformui/Store/Root/Epic/TPlatformEpic";
import { requestSelfProtectionBagsEpic } from "../../../../platformui/Store/SelfProtection/Epics/RequestSelfProtectionBagsEpic";
import { selfProtectionRootEpic } from "../../../../platformui/Store/SelfProtection/Epics/SelfProtectionRootEpic";
import { playerMinimalReceivedAction } from "../PlayerActions";
import { permissionsEpic } from "./PermissionsEpic";

const loggedEpics: TPlatformEpic = combineEpics(
  watchAccountVerificationRouteEpic,
  realityChecksByTimeOnLoggedEpic,
  callRequestsRootEpic,
  selfProtectionRootEpic,
  permissionsEpic,
);

const requestSelfProtectionBagsByActionEpic: TPlatformEpic = (
  action$,
  state$,
  deps,
) => action$.pipe(
  isCreator(playerMinimalReceivedAction),
  switchMap(() => requestSelfProtectionBagsEpic(action$, state$, deps)),
);

const playerLoggedEpic = combineEpics(
  requestSelfProtectionBagsByActionEpic,
  loggedEpics,
);

export {
  playerLoggedEpic,
};
