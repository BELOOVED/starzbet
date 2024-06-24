import { createContext } from "react";
import { type Store } from "redux";
import { ELocale } from "@sb/utils/ELocale";
import { type IControl, type IControlState } from "../Store/CreateControlFactory";

const defaultState: IControlState = {
  translateListeners: [],
  predefinedTranslates: [],
  currentLocale: ELocale.en_US,
  fallbackLocale: ELocale.en_US,
  locales: [ELocale.en_US, ELocale.tr_TR, ELocale.el_EL],
  predefinedContext: {},
  keyExpressions: {},
};

const defaultControl: IControl = {
  translateMode: {
    enabled: false,
    addListener: () => void 0,
  },
  addTranslateListener: () => void 0,
  store: {} as Store,
  changeLanguage: () => void 0,
  state: defaultState,
  plain: () => "",
  providers: {},
  configure: () => void 0,
  addAllTsRequests: () => void 0,
  addPredefinedTranslates: () => void 0,
};

const TranslatableContext = createContext<IControl>(defaultControl);

export { TranslatableContext };
