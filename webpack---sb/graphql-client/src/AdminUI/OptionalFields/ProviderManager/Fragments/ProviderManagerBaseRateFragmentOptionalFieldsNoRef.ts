import {
  type TProviderManager_BaseRate_FragmentOptionalFields,
} from "../../../Generated/Services/ProviderManager/Types/TProviderManager_BaseRate_FragmentOptionalFields";

const providerManagerBaseRateFragmentOptionalFieldsNoRef: TProviderManager_BaseRate_FragmentOptionalFields = {
  note: false,
  noteToAction: false,
  operator: false,
  data: false,
};

const providerManagerBaseRateFragmentOptionalFieldsWithData: TProviderManager_BaseRate_FragmentOptionalFields = {
  ...providerManagerBaseRateFragmentOptionalFieldsNoRef,
  data: true,
};

export { providerManagerBaseRateFragmentOptionalFieldsWithData };
