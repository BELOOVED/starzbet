import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { type EPlatform_CallRequestDepartment } from "../../../Core/Generated/Services/Platform/Models/EPlatform_CallRequestDepartment";
import { recordNormalizer } from "../../../Core/Helpers/QueryNormalizer";
import { EPlatform_Typename } from "../../../Core/Generated/Services/Platform/Models/EPlatform_Typename";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { type TPlatform_Slot_Fragment } from "../../Generated/Services/Platform/Types/TPlatform_Slot_Fragment";
import { type TPlatform_SlotNoRef_Fragment } from "../../Generated/Services/Platform/Types/TPlatform_SlotNoRef_Fragment";

type TPlatform_Slot_Record = TRecord & {
  id: string;
  startTime: number;
  endTime: number;
  maxCallCount: number;
  active: boolean;
  department: EPlatform_CallRequestDepartment;
  callRequestIds?: string[];
};

const isBaseFragment = (fragment: TPlatform_Slot_Fragment | TPlatform_SlotNoRef_Fragment): fragment is TPlatform_Slot_Fragment =>
  fragment.hasOwnProperty("callRequests");

const Platform_Slot_Normalizer = normalizerCreator<TPlatform_Slot_Fragment | TPlatform_SlotNoRef_Fragment, TPlatform_Slot_Record>(
  EPlatform_Typename.platformSlot,
  ERecordName.platformSlot,
  (recordsManager, fragment) => {
    const record: TPlatform_Slot_Record = {
      id: fragment.id,
      startTime: +fragment.startTime,
      endTime: +fragment.endTime,
      maxCallCount: fragment.maxCallCount,
      active: fragment.active,
      department: fragment.department,
    };

    if (isBaseFragment(fragment)) {
      record.callRequestsCount = fragment.callRequests.length;

      // Sort to prevent different order after data reloading
      record.callRequestIds = fragment.callRequests
        .map((callRequestFragment) =>
          recordNormalizer(recordsManager, callRequestFragment, null).id)
        .sort();
    }

    return record;
  },
);

export type { TPlatform_Slot_Record };
export { Platform_Slot_Normalizer };
