import { merge, of, switchMap } from "rxjs";
import { catchError } from "rxjs/operators";
import { callManagerFailedAction, callManagerStartAction, callManagerSucceededAction } from "@sb/call-manager";
import { isCreator } from "@sb/utils";
import { type TAppEpicWithBonuses } from "../../../../common/Store/Root/Epics/TAppEpic";
import { Logger } from "../../../../common/Utils/Logger";
import { callWithAbort } from "../../../../common/Utils/EpicUtils/CallWithAbort";
import { unsettledBonusResourcesCountMountedAction, unsettledBonusResourcesFetchedAction } from "../BonusesActions";
import { GET_NOT_SETTLED_RESOURCES_CALL_SYMBOL } from "../BonusVariables";

const handleUnsettledBonusResourcesCountMountedEpic: TAppEpicWithBonuses = (action$, state$, deps) => action$.pipe(
  isCreator(unsettledBonusResourcesCountMountedAction),
  switchMap(
    ({ payload: { playerBonusId } }) => merge(
      of(callManagerStartAction(GET_NOT_SETTLED_RESOURCES_CALL_SYMBOL, playerBonusId)),
      callWithAbort(deps.platformHttpApi.callGetNotSettledResourceCountQuery, playerBonusId).pipe(
        switchMap((response) => merge(
          of(callManagerSucceededAction(GET_NOT_SETTLED_RESOURCES_CALL_SYMBOL, playerBonusId)),
          of(
            unsettledBonusResourcesFetchedAction(
              playerBonusId,
              response.reduce((acc, { count }) => acc + count, 0),
            ),
          ),
        )),
        catchError((error) => {
          Logger.warn.epic("[handleUnsettledBonusResourcesCountMountedEpic] callGetNotSettledResourceCountQuery failed.", error);

          return of(callManagerFailedAction(GET_NOT_SETTLED_RESOURCES_CALL_SYMBOL, error, playerBonusId));
        }),
      ),
    ),
  ),
);

export {
  handleUnsettledBonusResourcesCountMountedEpic as unsettledBonusResourcesCountEpic,
};
