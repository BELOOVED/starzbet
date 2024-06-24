import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { ESportsbook_Typename } from "../../../Core/Generated/Services/Sportsbook/Models/ESportsbook_Typename";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import { type TSportsbook_BetRequestErrorLog_Fragment } from "../../Generated/Services/Sportsbook/Types/TSportsbook_BetRequestErrorLog_Fragment";

interface IErrorPayload {
  code: string;
}

type TSportsbook_BetRequestErrorLog_Record = TRecord & {
  id: string;
  errorMessage: string;
  errorPayload: IErrorPayload;
  createdAt: string;
  betRequestId: string;
}

const Sportsbook_BetRequestErrorLog_Normalizer = normalizerCreator<TSportsbook_BetRequestErrorLog_Fragment,
  TSportsbook_BetRequestErrorLog_Record>(
    ESportsbook_Typename.sportsbookBetRequestErrorLog,
    ERecordName.sportsbookBetRequestErrorLog,
    (recordsManager, fragment) => ({
      id: fragment.id,
      errorMessage: fragment.errorMessage,
      errorPayload: JSON.parse(fragment.errorPayload) as IErrorPayload,
      createdAt: fragment.createdAt,
      betRequestId: fragment.betRequestId,
    }),
  );

export type { TSportsbook_BetRequestErrorLog_Record };
export { Sportsbook_BetRequestErrorLog_Normalizer };
