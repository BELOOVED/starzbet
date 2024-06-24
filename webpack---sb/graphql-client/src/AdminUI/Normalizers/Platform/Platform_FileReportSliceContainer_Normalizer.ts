import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { EPlatform_Typename } from "../../../Core/Generated/Services/Platform/Models/EPlatform_Typename";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import {
  type TPlatform_FileReportSliceContainer_Fragment,
} from "../../Generated/Services/Platform/Types/TPlatform_FileReportSliceContainer_Fragment";
import { Platform_FileReportSlice_Normalizer } from "./Platform_FileReportSlice_Normalizer";

type TPlatform_FileReportSliceContainer_Record = TRecord & {
  name: string;
  parentId: null | string;
  description: null | string;
  sliceId: null | string;
};

const Platform_FileReportSliceContainer_Normalizer = normalizerCreator<
  TPlatform_FileReportSliceContainer_Fragment,
  TPlatform_FileReportSliceContainer_Record,
  null
>(
  EPlatform_Typename.platformFileReportSliceContainer,
  ERecordName.platformFileReportSliceContainer,
  (recordsManager, fragment) => {
    let sliceId: null | string = null;

    if (fragment.slice) {
      sliceId = Platform_FileReportSlice_Normalizer(recordsManager, fragment.slice, { key: fragment.id }).id;
    }

    return {
      id: fragment.id,
      name: fragment.name,
      parentId: fragment.parentId,
      description: fragment.description,
      sliceId,
    };
  },
);

export type { TPlatform_FileReportSliceContainer_Record };
export { Platform_FileReportSliceContainer_Normalizer };
