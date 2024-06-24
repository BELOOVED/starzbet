import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { recordNormalizer } from "../../../Core/Helpers/QueryNormalizer";
import type { TTranslateRecord_Fragment } from "../../../Core/Generated/Services/Common/Types/TTranslateRecord_Fragment";
import { EPlatform_Typename } from "../../../Core/Generated/Services/Platform/Models/EPlatform_Typename";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import {
  type TPlatform_VipClubLevelExtraMedia_Fragment,
} from "../../Generated/Services/Platform/Types/TPlatform_VipClubLevelExtraMedia_Fragment";

type TPlatform_VipClubLevelExtraMedia_Record = TRecord & {
  name: TTranslateRecord_Fragment[];
  value: TTranslateRecord_Fragment[] | null;
  iconId: string | null;
}

const Platform_VipClubLevelExtraMedia_Normalizer = normalizerCreator<
  TPlatform_VipClubLevelExtraMedia_Fragment,
  TPlatform_VipClubLevelExtraMedia_Record
>(
  EPlatform_Typename.platformVipClubLevelExtraMedia,
  ERecordName.platformVipClubLevelExtraMedia,
  (recordsManager, fragment) => {
    if (fragment.icon) {
      recordNormalizer(recordsManager, fragment.icon, null);
    }

    return {
      id: fragment.id,
      name: fragment.name,
      value: fragment.value,
      iconId: fragment.icon?.id ?? null,
    };
  },
);

export type { TPlatform_VipClubLevelExtraMedia_Record };
export { Platform_VipClubLevelExtraMedia_Normalizer };
