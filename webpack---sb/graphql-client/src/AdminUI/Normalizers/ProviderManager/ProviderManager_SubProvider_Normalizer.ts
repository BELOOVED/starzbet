import { type EProviderCode } from "@sb/betting-core/EProviderCode";
import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { type TTimeRange_Fragment } from "../../../Core/Generated/Services/Common/Types/TTimeRange_Fragment";
import {
  type EProviderManager_ProviderStatus,
} from "../../../Core/Generated/Services/ProviderManager/Models/EProviderManager_ProviderStatus";
import {
  type EProviderManager_IntegrationType,
} from "../../../Core/Generated/Services/ProviderManager/Models/EProviderManager_IntegrationType";
import {
  type EProviderManager_PaymentType,
} from "../../../Core/Generated/Services/ProviderManager/Models/EProviderManager_PaymentType";
import { recordNormalizer } from "../../../Core/Helpers/QueryNormalizer";
import { EProviderManager_Typename } from "../../../Core/Generated/Services/ProviderManager/Models/EProviderManager_Typename";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import {
  type TProviderManager_SubProvider_Fragment,
} from "../../Generated/Services/ProviderManager/Types/TProviderManager_SubProvider_Fragment";
import {
  ProviderManager_SubProvider_To_ProviderManager_Product_Normalizer,
} from "./ProviderManager_SubProvider_To_ProviderManager_Product_Normalizer";
import { ProviderManager_SettingsByEnv_Normalizer } from "./ProviderManager_SettingsByEnv_Normalizer";
import { ProviderManager_SettingDefinitions_Normalizer } from "./ProviderManager_SettingDefinitions_Normalizer";

type TProviderManager_SubProvider_Record = TRecord & {
  name: string;
  code: EProviderCode;
  activityTime: TTimeRange_Fragment;
  active: boolean;
  status: EProviderManager_ProviderStatus;
  integrationType: EProviderManager_IntegrationType;
  paymentType: EProviderManager_PaymentType;
  settingsId: string;
  createdAt: string;
  updatedAt: string;
  productsId: string;
  parentCode: null | EProviderCode;
  baseRateId: null | string;
  paymentMethod: null | string;
  operatorId: null | string;
  noteId: null | string;
  lastInvoiceId: string | null;
  removedAt: string | null;
}

const ProviderManager_SubProvider_Normalizer = normalizerCreator<
  TProviderManager_SubProvider_Fragment,
  TProviderManager_SubProvider_Record
>(
  EProviderManager_Typename.providerManagerProvider,
  ERecordName.providerManagerProvider,
  // @ts-ignore FIXME @strong-ts
  (recordsManager, fragment) => {
    if (fragment.operator) {
      recordNormalizer(recordsManager, fragment.operator, null);
    }

    if (fragment.note) {
      recordNormalizer(recordsManager, fragment.note, null);
    }

    if (fragment.settings) {
      ProviderManager_SettingsByEnv_Normalizer(recordsManager, fragment.settings, null);
    }

    if (fragment.baseRate) {
      recordNormalizer(recordsManager, fragment.baseRate, null);
    }

    if (fragment.products) {
      ProviderManager_SubProvider_To_ProviderManager_Product_Normalizer(recordsManager, fragment, { id: fragment.id });
    }

    if (fragment.lastInvoice) {
      recordNormalizer(recordsManager, fragment.lastInvoice, null);
    }

    if (fragment.settingDefinitions) {
      ProviderManager_SettingDefinitions_Normalizer(recordsManager, fragment.settingDefinitions, null);
    }

    return {
      id: fragment.id,
      name: fragment.name,
      code: fragment.code,
      activityTime: fragment.activityTime,
      active: fragment.active,
      status: fragment.status,
      integrationType: fragment.integrationType,
      paymentType: fragment.paymentType,
      settingsId: fragment.settingsId,
      createdAt: fragment.createdAt,
      updatedAt: fragment.updatedAt,
      parentCode: fragment.parentCode,
      baseRateId: fragment.baseRateId,
      paymentMethod: fragment.paymentMethod,
      productsId: fragment.id,
      operatorId: fragment.operatorId,
      noteId: fragment.noteId,
      lastInvoiceId: fragment.lastInvoiceId,
      removedAt: fragment.removedAt,
    };
  },
);

export type { TProviderManager_SubProvider_Record };
export { ProviderManager_SubProvider_Normalizer };
