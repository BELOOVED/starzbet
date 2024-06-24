import { type TCallManagerSymbol } from "@sb/call-manager";
import {
  platformPlayerBonusResourcesQueryOptionalFields,
  query_Platform_PlayerBonusResources,
  type TPlatform_PlayerBonusResourceRead_Fragment,
  type TPlatform_PlayerBonusResources_QueryVariables,
} from "@sb/graphql-client/PlayerUI";
import {
  EOrderDirection,
  EPlatform_PlayerBonusResourceOrderByPaths,
  type TPageInfo_Fragment,
  type TPlatform_PlayerBonusResourceOrderBy,
} from "@sb/graphql-client";
import { type TActionWithPayload, type TExplicitAny, type TSelector } from "@sb/utils";
import { type TAppEpicWithBonuses, type TAppStateWithBonuses } from "../../../../../common/Store/Root/Epics/TAppEpic";
import { gqlLoadingFactory } from "../../../../../common/Utils/EpicUtils/GqlLoadingFactory";
import { graphQlNodeSelector, graphQlPageInfoSelector } from "../../../Root/Selectors/GraphQlSelectors";

type TVariablesSelector = TSelector<TAppStateWithBonuses, TPlatform_PlayerBonusResources_QueryVariables>

const orderBy: TPlatform_PlayerBonusResourceOrderBy[] = [{
  fieldPath: EPlatform_PlayerBonusResourceOrderByPaths.playerBonusResourceId,
  direction: EOrderDirection.desc,
}];

type TSucceedAction = (
  resources: TPlatform_PlayerBonusResourceRead_Fragment[],
  pageInfo: TPageInfo_Fragment,
) => TActionWithPayload<TExplicitAny>

/**
 * should be called after 'player.details' will be loaded
 */
const loadPlayerBonusResourcesEpicFactory = (
  callSymbol: TCallManagerSymbol,
  succeedActionCreator: TSucceedAction,
  variablesSelector: TVariablesSelector,
): TAppEpicWithBonuses => gqlLoadingFactory(
  callSymbol,
  query_Platform_PlayerBonusResources,
  (state: TAppStateWithBonuses) => ({
    optionalFields: platformPlayerBonusResourcesQueryOptionalFields,
    variables: {
      orderBy,
      ...variablesSelector(state),
    },
  }),
  succeedActionCreator,
  (response) => ([
    graphQlNodeSelector(response.platform.PlayerBonusResourcesRead),
    graphQlPageInfoSelector(response.platform.PlayerBonusResourcesRead),
  ]),
);

export { loadPlayerBonusResourcesEpicFactory };
