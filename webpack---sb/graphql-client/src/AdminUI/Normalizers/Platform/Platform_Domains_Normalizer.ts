import type { TRecord } from "../../../Core/Generated/Helpers/Types";
import { EPlatform_Typename } from "../../../Core/Generated/Services/Platform/Models/EPlatform_Typename";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import type {
  TPlatform_Domains_QueryNormalizationData,
} from "../../Generated/Services/Platform/Types/TPlatform_Domains_QueryNormalizationData";
import { type TPlatform_Domains_Fragment } from "../../Generated/Services/Platform/Types/TPlatform_Domains_Fragment";
import type { TPlatform_Domain_AdditionalData, TPlatform_Domain_Record } from "./Platform_Domain_Normalizer";
import { Platform_Domain_Normalizer } from "./Platform_Domain_Normalizer";

type TPlatform_Domains_Record = TRecord & {
  current: string | null;
  ids: string[];
}

const sortDomains = (domains: TPlatform_Domain_Record[]) => {
  let deleted = false;

  domains.sort((a, b) => {
    if (a.removedAt || b.removedAt) {
      deleted = true;
    }

    if (a.isCurrent) {
      return -1;
    }

    if (b.isCurrent) {
      return 1;
    }

    if (deleted) {
      if ((a.removedAt ?? 0) < (b.removedAt ?? 0)) {
        return 1;
      }

      if ((a.removedAt ?? 0) > (b.removedAt ?? 0)) {
        return -1;
      }
    }

    if (a.createdAt < b.createdAt) {
      return -1;
    }

    if (a.createdAt > b.createdAt) {
      return 1;
    }

    return 0;
  });
};

const Platform_Domains_Normalizer = normalizerCreator<TPlatform_Domains_Fragment,
  TPlatform_Domains_Record,
  TPlatform_Domains_QueryNormalizationData>(
    EPlatform_Typename.platformDomains,
    ERecordName.platformDomains,
    (recordsManager, fragment, additionalData) => {
      const domainAdditionalData: TPlatform_Domain_AdditionalData = {
        current: fragment.mainDomain,
      };

      const domainRecords = fragment.domains.map((domainFragment) => Platform_Domain_Normalizer(
        recordsManager,
        domainFragment,
        domainAdditionalData,
      ));

      sortDomains(domainRecords);

      return {
        id: additionalData.resultId,
        current: fragment.mainDomain,
        ids: domainRecords.map((domainRecord) => domainRecord.id),
      };
    },
  );

export type { TPlatform_Domains_Record };
export { Platform_Domains_Normalizer };
