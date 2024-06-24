import { dataNormalizer } from "../../../Core/Helpers/QueryNormalizer";
import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { EPlatform_Typename } from "../../../Core/Generated/Services/Platform/Models/EPlatform_Typename";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { type TPlatform_FileReportSlice_Fragment } from "../../Generated/Services/Platform/Types/TPlatform_FileReportSlice_Fragment";
import { type TPlatform_FileReportSliceFile_Fragment } from "../../Generated/Services/Platform/Types/TPlatform_FileReportSliceFile_Fragment";

/**
 * Slice could be inside
 *  - report query->report->sliceContainer
 *  - history query->pageInfo->edges->nodes
 *
 * In result of report query slice container could pass its code in additional data to create unique key
 * In result of history query it is not possible (for now) to pass anything to additional data
 *
 * History query now executed only in one place so fallback will do the work but such case must be handled properly
 */
type TPlatform_FileReportSlice_AdditionalData = { key: string; };

type TPlatform_FileReportSlice_Record = TRecord & {
  createdAt: string;
  buildTime: number;
  rows: number;
  files: TPlatform_FileReportSliceFile_Fragment[];
};

const Platform_FileReportSlice_Normalizer = normalizerCreator<
  TPlatform_FileReportSlice_Fragment,
  TPlatform_FileReportSlice_Record,
  null | TPlatform_FileReportSlice_AdditionalData
>(
  EPlatform_Typename.platformFileReportSlice,
  ERecordName.platformFileReportSlice,
  (recordsManager, fragment, additionalData) => {
    const key = additionalData ? additionalData.key : "fallbackKey";

    const id = `${key}_${fragment.createdAt}_${fragment.buildTime}_${fragment.rows}_${fragment.files.length}`;

    return {
      id,
      createdAt: fragment.createdAt,
      buildTime: fragment.buildTime,
      rows: fragment.rows,
      files: dataNormalizer(recordsManager, fragment.files),
    };
  },
);

export type { TPlatform_FileReportSlice_Record };
export { Platform_FileReportSlice_Normalizer };
