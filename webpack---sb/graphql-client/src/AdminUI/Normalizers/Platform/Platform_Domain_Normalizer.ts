import type { TRecord } from "../../../Core/Generated/Helpers/Types";
import type { EPlatform_DomainStatus } from "../../../Core/Generated/Services/Platform/Models/EPlatform_DomainStatus";
import { EPlatform_Typename } from "../../../Core/Generated/Services/Platform/Models/EPlatform_Typename";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import type { TPlatform_Domain_Fragment } from "../../Generated/Services/Platform/Types/TPlatform_Domain_Fragment";

type TPlatform_Domain_Record = TRecord & {
  name: string;
  status: EPlatform_DomainStatus;
  nameservers: [] | [string, string];
  isCurrent: boolean;
  createdAt: number;
  removedAt: null | number;
}

type TPlatform_Domain_AdditionalData = {
  current: string | null;
};

const Platform_Domain_Normalizer = normalizerCreator<TPlatform_Domain_Fragment, TPlatform_Domain_Record, TPlatform_Domain_AdditionalData>(
  EPlatform_Typename.platformDomain,
  ERecordName.platformDomain,
  (_, fragment, additionalData) => ({
    id: fragment.id,
    name: fragment.name,
    status: fragment.status,
    nameservers: fragment.nameservers as TPlatform_Domain_Record["nameservers"],
    isCurrent: fragment.name === additionalData.current,
    createdAt: Number(fragment.createdAt),
    removedAt: fragment.removedAt ? Number(fragment.removedAt) : null,
  }),
);

export type { TPlatform_Domain_Record, TPlatform_Domain_AdditionalData };
export { Platform_Domain_Normalizer };
