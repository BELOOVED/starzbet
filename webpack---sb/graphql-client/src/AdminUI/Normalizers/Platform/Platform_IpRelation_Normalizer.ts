import { isNil, isNotNil } from "@sb/utils";
import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { recordNormalizer } from "../../../Core/Helpers/QueryNormalizer";
import { EPlatform_Typename } from "../../../Core/Generated/Services/Platform/Models/EPlatform_Typename";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { type TPlatform_IpRelation_Fragment } from "../../Generated/Services/Platform/Types/TPlatform_IpRelation_Fragment";

interface IIpRelationPlayer {
  playerId: string;
  lastLoginByIpDate: string;
  login: string;
}

type TPlatform_IpRelation_Record = TRecord & {
  ip: string;
  playerLogins: IIpRelationPlayer[];
  noteId: string | null;
  country: string | null;
};

const Platform_IpRelation_Normalizer = normalizerCreator<
  TPlatform_IpRelation_Fragment,
  TPlatform_IpRelation_Record,
  null
  >(
    EPlatform_Typename.platformIpRelation,
    ERecordName.platformIpRelation,
    (recordsManager, fragment) => {
      fragment.playerLogins.forEach((item) => {
        if (isNil(item.player)) {
          return;
        }

        recordNormalizer(recordsManager, item.player, null);
      });

      if (isNotNil(fragment.note)) {
        recordNormalizer(recordsManager, fragment.note, null);
      }

      return {
        id: fragment.ip,
        noteId: fragment.note?.id ?? null,
        ip: fragment.ip,
        country: fragment.country,
        playerLogins: fragment.playerLogins.map(
          (item) => ({
            playerId: item.playerId,
            lastLoginByIpDate: item.lastLoginByIpDate,
            login: item.playerLogin,
          }),
        ),
      };
    },
  );

export type { TPlatform_IpRelation_Record };
export { Platform_IpRelation_Normalizer };
