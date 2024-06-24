import { combineEpics } from "redux-observable";
import { catchError, distinctUntilChanged, filter, ignoreElements, map, switchMap, tap } from "rxjs/operators";
import { type BehaviorSubject, EMPTY, Observable, zip } from "rxjs";
import { type AnyAction, type Dispatch } from "redux";
import { formsRootEpic } from "@sb/form-new";
import { finalizeHandlers, type ICMSContext, rootEpicWithDeps } from "@sb/cms-ui";
import { CMS_PLATFORM_FORM_NAME } from "@sb/cms-core";
import { fileServiceEpicFactory } from "@sb/file-service";
import { createHeadersWithMetadata } from "@sb/network-bus/Utils";
import { createAdminPanelRootEpic } from "@sb/adminui-panel";
import { type EEnvironmentCode, isNotNil, type TAnyObject } from "@sb/utils";
import { epicWithFinalizeFactory } from "@sb/utils/EpicUtils/CombineParamEpics";
import { Logger } from "../../Utils/Logger";
import { cmsOnSiteEditorEventBus } from "../../Services/CmsOnSiteEditorEventBus";
import { type TCMSEditorEpic } from "../Model";
import { cmsEditorSelectors } from "../Selectors";
import { panelLocalStorage } from "../PanelLocalStorage";
import { openCmsBlockAction } from "../Actions";
import { editModeCheatCodesEpic } from "./EditModeCheatCodesEpic";

const whenCmsEditorConfigured = (...epics:TCMSEditorEpic[]):TCMSEditorEpic =>
  (action$, state$, dependencies) => state$.pipe(
    map(cmsEditorSelectors.configured),
    distinctUntilChanged(),
    filter(Boolean),
    switchMap(() => combineEpics(
      ...epics,
    )(action$, state$, dependencies)),
  );

const inspectEpic:TCMSEditorEpic = (_, state$) => state$.pipe(
  map(cmsEditorSelectors.inspectMode),
  distinctUntilChanged(),
  tap((val:boolean) => {
    cmsOnSiteEditorEventBus.publish("INSPECT_MODE", val);
  }),
  ignoreElements(),
);

const cmsModeEpic:TCMSEditorEpic = (_, state$) =>
  zip(
    state$.pipe(map(cmsEditorSelectors.configured)),
    state$.pipe(map(cmsEditorSelectors.cmsEditorMode)),
  ).pipe(
    map(([configured, cmsEditorMode]) => configured !== null && cmsEditorMode),
    distinctUntilChanged(),
    tap((val:boolean) => {
      cmsOnSiteEditorEventBus.publish("EDITOR_MODE", val);
    }),
    ignoreElements(),
  );

const openItemObservable$ = new Observable<string[]>((val) => {
  cmsOnSiteEditorEventBus.subscribe("OPEN_ITEM", (path) => val.next(path));
});

const openCmsBlockEpic = openItemObservable$.pipe(
  filter(isNotNil),
  map((path) => openCmsBlockAction(path)),
);

const createRootEpic = (
  context:ICMSContext,
  metadataSubject: BehaviorSubject<TAnyObject>,
  getDispatch: () => Dispatch<AnyAction>,
  env: EEnvironmentCode,
): TCMSEditorEpic => (action$, state$, deps) => {
  const header$ = metadataSubject.asObservable()
    .pipe(map((meta) => createHeadersWithMetadata(meta)));
  const epicWithFinalize = epicWithFinalizeFactory(getDispatch);

  const cmsEpic = epicWithFinalize(
    rootEpicWithDeps(
      CMS_PLATFORM_FORM_NAME,
      deps.getRpcClient,
      context,
      env,
    ),
  )(
    ...finalizeHandlers(CMS_PLATFORM_FORM_NAME),
  );

  return combineEpics(
    editModeCheatCodesEpic,
    inspectEpic,
    cmsModeEpic,
    whenCmsEditorConfigured(
      createAdminPanelRootEpic(panelLocalStorage),
      fileServiceEpicFactory(header$),
      formsRootEpic,
      cmsEpic as TCMSEditorEpic,
      () => openCmsBlockEpic,
    ),
  )(action$, state$, deps).pipe(
    catchError(
      (error) => {
        Logger.error.epic("rootEpic", error);

        return EMPTY;
      },
    ),
  );
};

export {
  createRootEpic,
};
