import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { type TRecordNormalizerAdditionalData } from "../../../Core/Helpers/QueryNormalizer";
import { type TMoney_Fragment } from "../../../Core/Generated/Services/Common/Types/TMoney_Fragment";
import { ETypename } from "../../../Core/Generated/Services/Common/Models/ETypename";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import { type TSportsbook_EventBetDetails_Fragment } from "../../Generated/Services/Sportsbook/Types/TSportsbook_EventBetDetails_Fragment";

type TSportsbook_EventBetDetails_Record = TRecord & {
  preLiveBetCount: number;
  liveBetCount: number;
  preLiveStakeSum: TMoney_Fragment;
  liveStakeSum: TMoney_Fragment;
}

const createSportsbookEventBetDetailsId = (eventId: string) => `eventId::${eventId}`;

const Sportsbook_EventBetDetails_Normalizer = normalizerCreator<TSportsbook_EventBetDetails_Fragment,
  TSportsbook_EventBetDetails_Record,
  TRecordNormalizerAdditionalData>(
    ETypename.eventBetDetails,
    ERecordName.sportsbookEventBetDetails,
    (recordsManager, fragment, additionalData) => ({
      id: createSportsbookEventBetDetailsId(additionalData.parentId),
      preLiveBetCount: fragment.preLiveBetCount,
      liveBetCount: fragment.liveBetCount,
      preLiveStakeSum: fragment.preLiveStakeSum,
      liveStakeSum: fragment.liveStakeSum,
    }),
  );

export type { TSportsbook_EventBetDetails_Record };
export { Sportsbook_EventBetDetails_Normalizer };
