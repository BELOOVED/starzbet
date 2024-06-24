import { type TExplicitAny } from "@sb/utils";
import { type TRecord } from "../../../Core/Generated/Helpers/Types";
import { EProviderManager_Typename } from "../../../Core/Generated/Services/ProviderManager/Models/EProviderManager_Typename";
import { normalizerCreator } from "../../Generated/Helpers/NormalizerCreator";
import { ERecordName } from "../../Generated/Services/Common/Models/ERecordName";
import {
  type TProviderManager_SettingDefinitions_Fragment,
} from "../../Generated/Services/ProviderManager/Types/TProviderManager_SettingDefinitions_Fragment";
import {
  type TProviderManager_SettingDefinition_Fragment,
} from "../../Generated/Services/ProviderManager/Types/TProviderManager_SettingDefinition_Fragment";

type TSettingDefinition = Omit<TProviderManager_SettingDefinition_Fragment, "default"> & {
  default: Record<string, TExplicitAny>;
}

type TProviderManager_SettingDefinitions_Record = TRecord & {
  nodes: TSettingDefinition[];
}

const ProviderManager_SettingDefinitions_Normalizer = normalizerCreator<
  TProviderManager_SettingDefinitions_Fragment,
  TProviderManager_SettingDefinitions_Record
>(
  EProviderManager_Typename.providerManagerSettingDefinitions,
  ERecordName.providerManagerSettingDefinitions,
  (_, fragment) => ({
    id: fragment.id,
    nodes: fragment.nodes.map((it) => ({ ...it, default: JSON.parse(it.default) as Record<string, TExplicitAny> })),
  }),
);

export type { TProviderManager_SettingDefinitions_Record };
export { ProviderManager_SettingDefinitions_Normalizer };
