import { type TExplicitAny } from "@sb/utils";
import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { type TMoney_Fragment } from "../../../Core/Generated/Services/Common/Types/TMoney_Fragment";
import { type ESportsbook_TransactionType } from "../../../Core/Generated/Services/Sportsbook/Models/ESportsbook_TransactionType";
import { ESportsbook_Typename } from "../../../Core/Generated/Services/Sportsbook/Models/ESportsbook_Typename";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import { type TSportsbook_Transaction_Fragment } from "../../Generated/Services/Sportsbook/Types/TSportsbook_Transaction_Fragment";

interface ISportsbookTransactionLogsPayload {
  request: string;
  response: string;
}

interface ISportsbookTransactionLogs {
  payload: ISportsbookTransactionLogsPayload | null;
}

type TSportsbook_Transaction_Record = TRecord & {
  order: number;
  type: ESportsbook_TransactionType;
  createdAt: string;
  closedAt: string | null;
  sum: TMoney_Fragment;
  metadata: Record<string, TExplicitAny>;
  payload: Record<string, TExplicitAny>;
  logs: ISportsbookTransactionLogs;
}

const Sportsbook_Transaction_Normalizer = normalizerCreator<TSportsbook_Transaction_Fragment, TSportsbook_Transaction_Record>(
  ESportsbook_Typename.sportsbookTransaction,
  ERecordName.sportsbookTransaction,
  (recordsManager, fragment) => ({
    id: fragment.id,
    order: fragment.order,
    type: fragment.type,
    createdAt: fragment.createdAt,
    closedAt: fragment.closedAt,
    sum: fragment.sum,
    // @ts-ignore FIXME @strong-ts
    metadata: JSON.parse(fragment.metadata ?? ""),
    // @ts-ignore FIXME @strong-ts
    payload: JSON.parse(fragment.payload ?? ""),
    // @ts-ignore FIXME @strong-ts
    logs: JSON.parse(fragment.logs ?? ""),
  }),
);

export type { TSportsbook_Transaction_Record };
export { Sportsbook_Transaction_Normalizer };
