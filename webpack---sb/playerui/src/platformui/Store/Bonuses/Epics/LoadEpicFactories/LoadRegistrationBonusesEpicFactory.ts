import type { TCallManagerSymbol } from "@sb/call-manager";
import {
  platformRegistrationBonusesQueryOptionalFields,
  query_Platform_RegistrationBonuses,
  type TPlatform_Bonus_Registration_Fragment,
} from "@sb/graphql-client/PlayerUI";
import { type TExplicitAny } from "@sb/utils";
import { type TMixAppEpic } from "../../../../../common/Store/Root/Epics/TMixAppEpic";
import { gqlLoadingFactory } from "../../../../../common/Utils/EpicUtils/GqlLoadingFactory";

const loadRegistrationBonusesEpicFactory = (
  callSymbol: TCallManagerSymbol,
  succeedActionCreator: (registrationBonuses: TPlatform_Bonus_Registration_Fragment[]) => TExplicitAny,
): TMixAppEpic => gqlLoadingFactory(
  callSymbol,
  query_Platform_RegistrationBonuses,
  { optionalFields: platformRegistrationBonusesQueryOptionalFields, variables: {} },
  succeedActionCreator,
  (response) => [response.platform.RegistrationBonuses],
);

export { loadRegistrationBonusesEpicFactory };
