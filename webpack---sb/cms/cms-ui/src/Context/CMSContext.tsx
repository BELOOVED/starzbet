import type { ComponentType, PropsWithChildren } from "react";
import { createNullContext, type TExplicitAny, type TSelector } from "@sb/utils";
import type { TComponentMap } from "../Model/DecoratorModel";
import type {
  TActiveTabSelector,
  TCmsThemeSelector,
  TFilteredPathSelector,
  TLocaleSelector,
  TOpenedStructureSelector,
  TPathSelector,
  TPushAction,
  TScaleSelector,
  TSearchFilterValueSelector,
  TSupportedLocalesSelector,
  TThemeSelector,
} from "./Model";

interface ICMSContext {
  appServiceLocaleSelector: TLocaleSelector;
  configServiceSystemLocaleSelector: TLocaleSelector;
  appServiceScaleSelector: TScaleSelector;
  configServiceSupportedLocalesSelector: TSupportedLocalesSelector;
  parentPath: string[];
  pathSelector: TPathSelector;
  filteredPathSelector: TFilteredPathSelector;
  folderPathSelector: TPathSelector;
  themeSelector: TThemeSelector;
  activeTabSelector: TActiveTabSelector;
  openedStructureSelector: TOpenedStructureSelector;
  searchFilterValueSelector: TSearchFilterValueSelector;
  pushAction: TPushAction;
  VariableEditDrawer?: ComponentType;
  VariableCreateDrawer?: ComponentType;
  VariableCreateButton?: ComponentType;
  moveModeSelector?: (_:TExplicitAny) => boolean;
  expandPagesSelector?: (_:TExplicitAny) => boolean;
  componentMap?: TComponentMap;
  zoomSelector: TSelector<TExplicitAny, number>;
  cmsThemeSelector: TCmsThemeSelector;
}

const [CMSContext, useCMSContext] = createNullContext<ICMSContext>();

interface ICMSContextProvider extends PropsWithChildren {
  value: ICMSContext;
}

const CMSContextProvider = ({ value, children }: ICMSContextProvider) => (
  <CMSContext.Provider value={value}>
    {children}
  </CMSContext.Provider>
);

export { CMSContextProvider, useCMSContext, type ICMSContext };
