import { omit } from "@sb/utils";
import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { EProviderManager_Typename } from "../../../Core/Generated/Services/ProviderManager/Models/EProviderManager_Typename";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import { type TProviderManager_Provider_Fragment } from "../../Generated/Services/ProviderManager/Types/TProviderManager_Provider_Fragment";
import {
  ProviderManager_Provider_To_ProviderManager_SubProvider_Normalizer,
} from "./ProviderManager_Provider_To_ProviderManager_SubProvider_Normalizer";
import { ProviderManager_SubProvider_Normalizer, type TProviderManager_SubProvider_Record } from "./ProviderManager_SubProvider_Normalizer";

type TProviderManager_Provider_Record = TRecord & TProviderManager_SubProvider_Record & {
  subProvidersId: string;
}

const ProviderManager_Provider_Normalizer = normalizerCreator<
  TProviderManager_Provider_Fragment,
  TProviderManager_Provider_Record
>(
  EProviderManager_Typename.providerManagerProvider,
  ERecordName.providerManagerProvider,
  (recordsManager, fragment) => {
    const subProvider = ProviderManager_SubProvider_Normalizer(
      recordsManager,
      omit(["subProviders"], fragment),
      null,
    );

    if(fragment.subProviders) {
      ProviderManager_Provider_To_ProviderManager_SubProvider_Normalizer(recordsManager, fragment, { id: fragment.id });
    }

    return {
      ...subProvider,
      subProvidersId: fragment.id,
    };
  },
);

export type { TProviderManager_Provider_Record };
export { ProviderManager_Provider_Normalizer };
