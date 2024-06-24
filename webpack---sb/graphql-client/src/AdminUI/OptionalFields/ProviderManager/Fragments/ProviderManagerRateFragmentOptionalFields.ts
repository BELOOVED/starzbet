import {
  type TProviderManager_Rate_FragmentOptionalFields,
} from "../../../Generated/Services/ProviderManager/Types/TProviderManager_Rate_FragmentOptionalFields";

const providerManagerRateFragmentOptionalFieldsNoRef: TProviderManager_Rate_FragmentOptionalFields = {
  note: false,
  noteToAction: false,
  operator: false,
  gameTypeRates: false,
};

const providerManagerRateFragmentOptionalFieldsWithGameTypeRates: TProviderManager_Rate_FragmentOptionalFields = {
  ...providerManagerRateFragmentOptionalFieldsNoRef,
  gameTypeRates: { tiers: true, gameType: false },
};

export { providerManagerRateFragmentOptionalFieldsWithGameTypeRates };
