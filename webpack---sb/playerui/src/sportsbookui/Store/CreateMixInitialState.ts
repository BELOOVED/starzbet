import { authInitialState } from "@sb/auth";
import { getRouterInitialState } from "@sb/router";
import { type History } from "@sb/react-router-compat";
import { type TWithCallManagerState, withCallManagerDefaultState } from "@sb/call-manager";
import { getPlatformInitialState, type TPlatformAppPreloadedState } from "../../platformui/Store/PlatformInitialState";
import { type TContent } from "../../platformui/Store/CMS/Model/CmsModel";
import { initialState } from "./InitialState";

type TPreloadedState<CmsContent extends TContent = TContent> = Partial<
  TPlatformAppPreloadedState<CmsContent> &
  TWithCallManagerState
>

const createMixInitialState = <CmsContent extends TContent>(history: History, preloadedState: TPreloadedState<CmsContent> = {}) => ({
  ...initialState,
  ...getPlatformInitialState<CmsContent>(preloadedState),
  callManager: preloadedState.callManager ?? withCallManagerDefaultState.callManager,
  auth: authInitialState,
  router: getRouterInitialState(history),
});

type TMixAppState = ReturnType<typeof createMixInitialState>;

export { createMixInitialState };

export type { TPreloadedState, TMixAppState };
