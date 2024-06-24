/**
 * This is normalizer for platform service entity
 * But it is impossible to locate it inside Platform directory due to lack of service prefix
 * TODO Gateway type must be renamed with prefix Platform_
 */
import type { TRecord } from "../../../Core/Generated/Helpers/Types";
import type { EPlatform_CallRequestDepartment } from "../../../Core/Generated/Services/Platform/Models/EPlatform_CallRequestDepartment";
import { dataNormalizer } from "../../../Core/Helpers/QueryNormalizer";
import { ETypename } from "../../../Core/Generated/Services/Common/Models/ETypename";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import type {
  TPlatform_CountCallRequestsDto_Fragment,
} from "../../Generated/Services/Platform/Types/TPlatform_CountCallRequestsDto_Fragment";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import type { TPlatform_CallCount_Fragment } from "../../Generated/Services/Platform/Types/TPlatform_CallCount_Fragment";

type TCountCallRequestsDto_Record = TRecord & {
  department: EPlatform_CallRequestDepartment;
  endTime: number;
  startTime: number;
  callCount: null | TPlatform_CallCount_Fragment;
};

const CountCallRequestsDto_Normalizer = normalizerCreator<TPlatform_CountCallRequestsDto_Fragment, TCountCallRequestsDto_Record>(
  ETypename.countCallRequestsDto,
  ERecordName.countCallRequestsDto,
  (recordsManager, fragment) => {
    const idParts = [
      fragment.department,
      fragment.endTime,
      fragment.startTime,
      fragment.callCount?.actual ?? "callCountActual",
      fragment.callCount?.max ?? "callCountMax",
    ];

    return {
      id: idParts.join("-"),
      department: fragment.department,
      endTime: +fragment.endTime,
      startTime: +fragment.startTime,
      callCount: dataNormalizer(recordsManager, fragment.callCount),
    };
  },
);

export type { TCountCallRequestsDto_Record };
export { CountCallRequestsDto_Normalizer };
