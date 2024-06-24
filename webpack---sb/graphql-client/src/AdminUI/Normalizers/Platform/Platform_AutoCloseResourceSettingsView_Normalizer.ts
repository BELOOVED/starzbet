import {
  type EPlatform_AutoCloseResourceTimeUnit,
} from "../../../Core/Generated/Services/Platform/Models/EPlatform_AutoCloseResourceTimeUnit";
import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { type TMoney_Fragment } from "../../../Core/Generated/Services/Common/Types/TMoney_Fragment";
import { EPlatform_Typename } from "../../../Core/Generated/Services/Platform/Models/EPlatform_Typename";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import {
  type TPlatform_AutoCloseResourceSettingsView_Fragment,
} from "../../Generated/Services/Platform/Types/TPlatform_AutoCloseResourceSettingsView_Fragment";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { type TPlatform_GetAutoClosePendingResourceSettings_QueryNormalizationData } from "../../Generated/Services/Platform/Types/TPlatform_GetAutoClosePendingResourceSettings_QueryNormalizationData";

type TPlatform_AutoCloseResourceSettingsView_Record = TRecord & {
  data: {
    closeAfterUnit: EPlatform_AutoCloseResourceTimeUnit;
    closeAfterValue: number;
    maxStake: null | Omit<TMoney_Fragment, "__typename">; };
};

const Platform_AutoCloseResourceSettingsView_Normalizer =  normalizerCreator<
  TPlatform_AutoCloseResourceSettingsView_Fragment,
  TPlatform_AutoCloseResourceSettingsView_Record,
  TPlatform_GetAutoClosePendingResourceSettings_QueryNormalizationData>(
    EPlatform_Typename.platformAutoCloseResourceSettingsView,
    ERecordName.platformAutoCloseResourceSettingsView,
    (_, result, { resultId }) => {
      const record: TPlatform_AutoCloseResourceSettingsView_Record = {
        id: resultId,
        data: {
          closeAfterUnit: result.closeAfterUnit,
          closeAfterValue: result.closeAfterValue,
          maxStake: result.maxStake
            ? {
              amount: result.maxStake.amount,
              currency: result.maxStake.currency,
            }
            : null,
        },
      };

      return record;
    },
  );

export type { TPlatform_AutoCloseResourceSettingsView_Record };
export { Platform_AutoCloseResourceSettingsView_Normalizer };
