import { EMPTY } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { isNil } from "@sb/utils";
import { Logger } from "../../../../common/Utils/Logger";
import { playerIdNotNilSelector } from "../../../../common/Store/Player/Selectors/PlayerSelectors";
import { callWithAbort } from "../../../../common/Utils/EpicUtils/CallWithAbort";
import type { HttpApi } from "../../../Api/HttpApi";
import { type TAppState } from "../../InitialState";
import { type TGetPlayerBetHistoryResponse, type TWhere } from "../Model/TBet";
import { cursorMyBetsSelector, orderByMyBetsSelector } from "../Selectors/MyBetsSelectors";
import { getPlayerIdWhereExtension } from "../Model/BetWhereExtension";

const selectBetHistory = ({ edges, pageInfo }: TGetPlayerBetHistoryResponse) => ({
  bets: edges.map(({ node }) => node),
  pageInfo,
});

const prepareWhereToFetch = (where: TWhere, playerId: string) => {
  const operands = where.operands || [];

  return {
    ...where,
    operands: [
      ...operands,
      getPlayerIdWhereExtension(playerId),
    ],
  };
};

const fetchPlayerBetHistory = (where: TWhere | null, state: TAppState, sportsbookHttpApi: HttpApi) => {
  const externalPlayerId = playerIdNotNilSelector(state);
  const orderBy = orderByMyBetsSelector(state);
  const cursor = cursorMyBetsSelector(state);
  const guaranteedPayload = {
    cursor,
    orderBy,
  };

  const payload = isNil(where)
    ? guaranteedPayload
    : {
      ...guaranteedPayload,
      where: prepareWhereToFetch(where, externalPlayerId),
    };

  return callWithAbort(sportsbookHttpApi.callPlayerBetHistory, payload).pipe(
    map(selectBetHistory),
    catchError((e) => {
      Logger.warn.epic("[MyBets]", "Fetch Player Bet History Failed", e);

      return EMPTY;
    }),
  );
};

export { fetchPlayerBetHistory };
