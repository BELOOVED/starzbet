import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { EProviderManager_Typename } from "../../../Core/Generated/Services/ProviderManager/Models/EProviderManager_Typename";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import { type TProviderManager_Provider_Fragment } from "../../Generated/Services/ProviderManager/Types/TProviderManager_Provider_Fragment";
import { ProviderManager_SubProvider_Normalizer } from "./ProviderManager_SubProvider_Normalizer";

type TProviderManager_Provider_To_ProviderManager_SubProvider_Record = TRecord & {
  ids: string[];
};

type TProviderManager_Provider_To_ProviderManager_SubProvider_AdditionalData = { id: string; };

const ProviderManager_Provider_To_ProviderManager_SubProvider_Normalizer = normalizerCreator<
  TProviderManager_Provider_Fragment,
  TProviderManager_Provider_To_ProviderManager_SubProvider_Record,
  TProviderManager_Provider_To_ProviderManager_SubProvider_AdditionalData>(
    EProviderManager_Typename.providerManagerProvider,
    ERecordName.providerManagerProviderToProviderManagerSubProvider,
    (recordsManager, fragment, additionalData) => ({
      id: additionalData.id,
      ids: (fragment.subProviders ?? []).map((subProvider) => {
        ProviderManager_SubProvider_Normalizer(recordsManager, subProvider, null);

        return subProvider.id;
      }),
    }),
  );

export type { TProviderManager_Provider_To_ProviderManager_SubProvider_Record };
export { ProviderManager_Provider_To_ProviderManager_SubProvider_Normalizer };
