import type { TRecord } from "../../../Core/Generated/Helpers/Types";
import { recordNormalizer } from "../../../Core/Helpers/QueryNormalizer";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";

type TPlatform_NoteType_Record = TRecord & {}

// todo hack normalizer for union type (Platform_NoteType)
const Platform_NoteType_Normalizer = normalizerCreator<any, any, any>(
  "Platform_NoteType",
  ERecordName.platformNoteType,
  recordNormalizer,
);

export type { TPlatform_NoteType_Record };
export { Platform_NoteType_Normalizer };
