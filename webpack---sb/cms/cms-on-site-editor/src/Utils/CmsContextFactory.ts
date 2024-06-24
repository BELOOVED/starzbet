import type { ICMSContext } from "@sb/cms-ui";
import { pushAction } from "../Store/Actions";
import { cmsUISelectors } from "../Store/Selectors";

const cmsContextFactory = ({
  appServiceLocaleSelector,
  appServiceScaleSelector,
  configServiceSystemLocaleSelector,
  configServiceSupportedLocalesSelector,
  cmsThemeSelector,
}:Pick<
  ICMSContext,
  "appServiceLocaleSelector"
  | "appServiceScaleSelector"
  | "configServiceSystemLocaleSelector"
  | "configServiceSupportedLocalesSelector"
  | "cmsThemeSelector"
>):ICMSContext => ({
  appServiceLocaleSelector,
  appServiceScaleSelector,
  configServiceSystemLocaleSelector,
  configServiceSupportedLocalesSelector,
  pathSelector: cmsUISelectors.path,
  openedStructureSelector: cmsUISelectors.openedStructure,
  folderPathSelector: cmsUISelectors.folderPath,
  activeTabSelector: cmsUISelectors.activeTab,
  themeSelector: cmsUISelectors.theme,
  searchFilterValueSelector: cmsUISelectors.searchFilterValue,
  filteredPathSelector: cmsUISelectors.filteredPaths,
  parentPath: [],
  pushAction: pushAction,
  zoomSelector: () => 1,
  cmsThemeSelector,
});

export {
  cmsContextFactory,
};
