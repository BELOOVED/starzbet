import { EMPTY, filter, map, switchMap } from "rxjs";
import { distinctUntilChanged } from "rxjs/operators";
import { BLOCK_CONTENT, EPlatformBlockMap, EComponentsType, getIdByPath } from "@sb/cms-core";
import { selectFieldValue } from "@sb/form-new";
import { isNotNil } from "@sb/utils";
import { type TCallManagerSymbol } from "@sb/call-manager";
import { query_Platform_ActiveGames, type TPlatform_ActiveGames_QueryVariables } from "@sb/graphql-client/AdminUI";
import { platformActiveGamesQueryOptionalFields } from "@sb/graphql-client/AdminUI/OptionalFields/Platform/Platform_ActiveGames_Query";
import { cmsui_block_error_loadGames } from "@sb/translates/cmsui/Keys";
import { blockSucceededSelector, landingNormalizedGamesIdsSelector } from "../../CMSContentLayout/Selectors/CMSLayoutSelectors";
import { type TCmsAppEpic } from "../../Model/TCmsAppEpic";
import { getCMSContext, getFormName } from "../../EpicUtils/EpicUtils";
import { LANDING_GAMES_CALL_SYMBOL, LANDING_GAMES_REF_SYMBOL } from "../Model/CMSSymbol";
import { CMS_LANDING_GAMES_PAGINATOR } from "../Model/PaginatorNames";
import { queryNormalizeEpic } from "../Utils/QueryNormalizeEpic";

const loadShowedGamesEpicFactory = (
  pageRef: string,
  loadSymbol: TCallManagerSymbol,
  resultId: string,
  variables: TPlatform_ActiveGames_QueryVariables,
): TCmsAppEpic => (action$, state$, deps) => queryNormalizeEpic(
  pageRef,
  loadSymbol,
  query_Platform_ActiveGames,
  {
    variables,
    optionalFields: platformActiveGamesQueryOptionalFields,
    normalizationData: { resultId },
  },
  cmsui_block_error_loadGames,
)(action$, state$, deps);

const loadShowedGamesEpic: TCmsAppEpic = (action$, state$, deps) => {
  const { pathSelector, componentMap } = getCMSContext(deps);

  if (!componentMap?.[EComponentsType.gamesField]) {
    return EMPTY;
  }

  const formName = getFormName(deps);

  return state$.pipe(
    map((state) => pathSelector(state)),
    map((path) => {
      const content = selectFieldValue(state$.value, formName, path);

      return blockSucceededSelector(state$.value, getIdByPath(path)) && path.at(-1) === EPlatformBlockMap.LANDING && isNotNil(content);
    }),
    distinctUntilChanged(),
    filter(Boolean),
    switchMap(() => {
      const path = pathSelector(state$.value);

      const ids = landingNormalizedGamesIdsSelector(state$.value, formName, path.concat(BLOCK_CONTENT));

      return loadShowedGamesEpicFactory(
        LANDING_GAMES_REF_SYMBOL,
        LANDING_GAMES_CALL_SYMBOL,
        CMS_LANDING_GAMES_PAGINATOR,
        { ids },
      )(action$, state$, deps);
    }),
  );
};

export { loadShowedGamesEpic };
