import {
  type TProviderManager_SubProvider_FragmentOptionalFields,
} from "../../../Generated/Services/ProviderManager/Types/TProviderManager_SubProvider_FragmentOptionalFields";
import {
  type TProviderManager_Provider_FragmentOptionalFields,
} from "../../../Generated/Services/ProviderManager/Types/TProviderManager_Provider_FragmentOptionalFields";
import {
  authOperatorFragmentOptionalFieldsWithAvatarWithProfiles,
} from "../../Auth/Fragments/AuthOperatorFragmentOptionalFields";
import {
  providerManagerBaseRateFragmentOptionalFieldsWithData,
} from "./ProviderManagerBaseRateFragmentOptionalFieldsNoRef";
import {
  providerManagerProductFragmentOptionalFieldsNoRef,
  providerManagerProductFragmentOptionalFieldsWithRateAndGamesCount,
} from "./ProviderManagerProductFragmentOptionalFields";

const providerManagerSubProviderFragmentOptionalFieldsNoRef: TProviderManager_SubProvider_FragmentOptionalFields = {
  note: false,
  products: false,
  baseRate: false,
  settings: false,
  operator: false,
  lastInvoice: false,
  settingDefinitions: false,
};

const providerManagerProviderFragmentOptionalFieldsNoRef: TProviderManager_Provider_FragmentOptionalFields = {
  ...providerManagerSubProviderFragmentOptionalFieldsNoRef,
  subProviders: false,
};

const providerManagerProviderFragmentOptionalFieldsWithNoRefProducts: TProviderManager_Provider_FragmentOptionalFields = {
  ...providerManagerProviderFragmentOptionalFieldsNoRef,
  products: providerManagerProductFragmentOptionalFieldsNoRef,
};

const providerManagerProviderFragmentOptionalFieldsForProviderDependentFields: TProviderManager_Provider_FragmentOptionalFields = {
  ...providerManagerProviderFragmentOptionalFieldsNoRef,
  products: providerManagerProductFragmentOptionalFieldsNoRef,
  subProviders: {
    ...providerManagerSubProviderFragmentOptionalFieldsNoRef,
    products: providerManagerProductFragmentOptionalFieldsNoRef,
  },
};

const providerManagerProviderFragmentOptionalFieldsForProvidersPage: TProviderManager_Provider_FragmentOptionalFields = {
  ...providerManagerProviderFragmentOptionalFieldsNoRef,
  operator: authOperatorFragmentOptionalFieldsWithAvatarWithProfiles,
  baseRate: providerManagerBaseRateFragmentOptionalFieldsWithData,
  products: providerManagerProductFragmentOptionalFieldsWithRateAndGamesCount,
  subProviders: providerManagerSubProviderFragmentOptionalFieldsNoRef,
};

export {
  providerManagerSubProviderFragmentOptionalFieldsNoRef,
  providerManagerProviderFragmentOptionalFieldsNoRef,
  providerManagerProviderFragmentOptionalFieldsWithNoRefProducts,
  providerManagerProviderFragmentOptionalFieldsForProviderDependentFields,
  providerManagerProviderFragmentOptionalFieldsForProvidersPage,
};
