import { type TPlatform_Game_FragmentOptionalFields } from "../../../Generated/Services/Platform/Types/TPlatform_Game_FragmentOptionalFields";

const platformGameFragmentOptionalFieldsNoRef: TPlatform_Game_FragmentOptionalFields = {
  gameTags: false,
  backgroundImage: false,
  previewImages: false,
  labelPositionSettings: false,
  positionSettings: false,
  viewRule: false,
  selectedLabels: false,
  providerInfo: false,
  providerPositionSettings: false,
};

const platformGameFragmentOptionalFields: TPlatform_Game_FragmentOptionalFields = {
  gameTags: { tagGroup: false },
  backgroundImage: true,
  previewImages: true,
  labelPositionSettings: true,
  positionSettings: true,
  selectedLabels: true,
  viewRule: {
    gamesCount: false,
  },
  providerInfo: false,
  providerPositionSettings: true,
};

const platformGameFragmentOptionalFieldsWithProviderInfo: TPlatform_Game_FragmentOptionalFields = {
  ...platformGameFragmentOptionalFields,
  providerInfo: true,
};

export { platformGameFragmentOptionalFieldsNoRef, platformGameFragmentOptionalFieldsWithProviderInfo, platformGameFragmentOptionalFields };
