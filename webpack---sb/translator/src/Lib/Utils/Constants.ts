import { type IArrowParams, type ICustomModalConfig, type IModalParams } from "../CustomTypes";
import { type IFilters } from "../Store/CreateInitialState";

const panelColors = {
  grey: "grey",
  white: "white",
  green: "green",
};

const filterTypes = {
  onPageFilter: "onPageFilter",
  notSavedFilter: "notSavedFilter",
  firstLocaleFilter: "firstLocaleFilter",
  secondLocaleFilter: "secondLocaleFilter",
};

const modalTypes = {
  editBox: "editBox",
  panelRow: "panelRow",
};

const localeTypes = {
  current: "current",
  fallback: "fallback",
  panelFirst: "panelFirst",
  panelSecond: "panelSecond",
};

const translatesSwitcherTooltipText = "Is there a translation or not";

const initialFiltersState: IFilters = {
  [filterTypes.onPageFilter]: false,
  [filterTypes.notSavedFilter]: false,
  [filterTypes.firstLocaleFilter]: true,
  [filterTypes.secondLocaleFilter]: true,
};

const modalLocations = {
  underTarget: "underTarget",
  overTarget: "overTarget",
  leftOfTarget: "leftOfTarget",
  rightOfTarget: "rightOfTarget",
  horizontallyMiddle: "horizontallyMiddle",
  verticallyMiddle: "verticallyMiddle",
};

const popUpFirstRenderParams: [IModalParams, IArrowParams] = [
  {
    x: -1000,
    y: -1000,
  },
  {
    x: 0,
    y: 0,
    size: 4,
  },
];

const contentModalConfig: ICustomModalConfig = {
  modalConfig: {
    offsetX: 0,
    offsetY: 10,
  },
  arrowConfig: {
    offsetX: 12,
    offsetY: 0,
    size: 4,
  },
};

const panelModalConfig: ICustomModalConfig = {
  modalConfig: {
    offsetX: 0,
    offsetY: 0,
  },
  arrowConfig: {
    offsetX: 12,
    offsetY: 0,
    size: 4,
  },
};

export {
  panelColors,
  filterTypes,
  modalTypes,
  localeTypes,
  translatesSwitcherTooltipText,
  initialFiltersState,
  modalLocations,
  popUpFirstRenderParams,
  contentModalConfig,
  panelModalConfig,
};
