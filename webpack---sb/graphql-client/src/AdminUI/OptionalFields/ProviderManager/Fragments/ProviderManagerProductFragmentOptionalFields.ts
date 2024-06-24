import {
  type TProviderManager_Product_FragmentOptionalFields,
} from "../../../Generated/Services/ProviderManager/Types/TProviderManager_Product_FragmentOptionalFields";
import {
  providerManagerRateFragmentOptionalFieldsWithGameTypeRates,
} from "./ProviderManagerRateFragmentOptionalFields";

const providerManagerProductFragmentOptionalFieldsNoRef: TProviderManager_Product_FragmentOptionalFields = {
  rate: false,
  gameCount: false,
};

const providerManagerProductFragmentOptionalFieldsWithReportForProviderPage: TProviderManager_Product_FragmentOptionalFields = {
  ...providerManagerProductFragmentOptionalFieldsNoRef,
  // todo @Siarhei fix on backend
  // report: platformProductSummaryMeasuresFragmentOptionalFieldsProviderPage,
};

const providerManagerProductFragmentOptionalFieldsWithRateAndGamesCount: TProviderManager_Product_FragmentOptionalFields = {
  ...providerManagerProductFragmentOptionalFieldsNoRef,
  rate: providerManagerRateFragmentOptionalFieldsWithGameTypeRates,
  gameCount: true,
};

export {
  providerManagerProductFragmentOptionalFieldsNoRef,
  providerManagerProductFragmentOptionalFieldsWithReportForProviderPage,
  providerManagerProductFragmentOptionalFieldsWithRateAndGamesCount,
};
