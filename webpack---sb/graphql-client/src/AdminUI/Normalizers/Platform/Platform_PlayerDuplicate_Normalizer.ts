import { type EAlpha3Code, isNotNil, type TNullable } from "@sb/utils";
import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { recordNormalizer } from "../../../Core/Helpers/QueryNormalizer";
import { EPlatform_Typename } from "../../../Core/Generated/Services/Platform/Models/EPlatform_Typename";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { type TPlatform_PlayerDuplicate_Fragment } from "../../Generated/Services/Platform/Types/TPlatform_PlayerDuplicate_Fragment";

type TPlatform_PlayerDuplicate_Record = TRecord & {
  matchId: string;
  playersIds: string[];
  noteId: string | null;
  country: TNullable<EAlpha3Code>;
};

const Platform_PlayerDuplicate_Normalizer = normalizerCreator<
  TPlatform_PlayerDuplicate_Fragment,
  TPlatform_PlayerDuplicate_Record
  >(
    EPlatform_Typename.platformPlayerDuplicate,
    ERecordName.platformPlayerDuplicate,
    (recordsManager, fragment) => {
      fragment.players.forEach((item) => {
        recordNormalizer(recordsManager, item, null);
      });

      if (isNotNil(fragment.note)) {
        recordNormalizer(recordsManager, fragment.note, null);
      }

      return {
        id: fragment.matchId,
        matchId: fragment.matchId,
        noteId: fragment.note?.id ?? null,
        playersIds: fragment.players.map((player) => player.id),
        country: fragment.ipInfo?.countryIso,
      };
    },
  );

export type { TPlatform_PlayerDuplicate_Record };
export { Platform_PlayerDuplicate_Normalizer };
