import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { EAffiliate_Typename } from "../../../Core/Generated/Services/Affiliate/Models/EAffiliate_Typename";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import { type TAffiliate_UrlShorteners_Fragment } from "../../Generated/Services/Affiliate/Types/TAffiliate_UrlShorteners_Fragment";
import {
  type TAffiliate_UrlShorteners_QueryNormalizationData,
} from "../../Generated/Services/Affiliate/Types/TAffiliate_UrlShorteners_QueryNormalizationData";

type TAffiliate_UrlShorteners_Record = TRecord & {
  shorteners: string[];
};

const Affiliate_UrlShorteners_Normalizer = normalizerCreator<
  TAffiliate_UrlShorteners_Fragment,
  TAffiliate_UrlShorteners_Record,
  TAffiliate_UrlShorteners_QueryNormalizationData
>(
  EAffiliate_Typename.affiliateUrlShorteners,
  ERecordName.affiliateUrlShorteners,
  (recordsManager, data, additionalData) => ({
    id: additionalData.resultId,
    shorteners: data.shorteners,
  }),
);

export type { TAffiliate_UrlShorteners_Record };
export { Affiliate_UrlShorteners_Normalizer };
