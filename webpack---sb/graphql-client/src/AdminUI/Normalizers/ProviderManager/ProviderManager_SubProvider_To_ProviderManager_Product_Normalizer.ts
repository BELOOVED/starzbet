import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { recordNormalizer } from "../../../Core/Helpers/QueryNormalizer";
import { EProviderManager_Typename } from "../../../Core/Generated/Services/ProviderManager/Models/EProviderManager_Typename";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import {
  type TProviderManager_SubProvider_Fragment,
} from "../../Generated/Services/ProviderManager/Types/TProviderManager_SubProvider_Fragment";

type TProviderManager_SubProvider_To_ProviderManager_Product_Record = TRecord & {
  ids: string[];
};

type TProviderManager_SubProvider_To_ProviderManager_Product_AdditionalData = { id: string; };

const ProviderManager_SubProvider_To_ProviderManager_Product_Normalizer = normalizerCreator<
  TProviderManager_SubProvider_Fragment,
  TProviderManager_SubProvider_To_ProviderManager_Product_Record,
  TProviderManager_SubProvider_To_ProviderManager_Product_AdditionalData>(
    EProviderManager_Typename.providerManagerProvider,
    ERecordName.providerManagerSubProviderToProviderManagerProduct,
    (recordsManager, fragment, additionalData) => ({
      id: additionalData.id,
      ids: (fragment.products ?? []).map((product) => {
        recordNormalizer(recordsManager, product, null);

        return product.id;
      }),
    }),
  );

export type { TProviderManager_SubProvider_To_ProviderManager_Product_Record };
export { ProviderManager_SubProvider_To_ProviderManager_Product_Normalizer };
