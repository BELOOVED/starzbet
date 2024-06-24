import { type Context, createContext, useContext } from "react";
import { type EWidgetThemes } from "@sb/widget-controller/EWidgetThemes";
import { type TRecordOfString } from "@sb/utils";
import { type TRouteProps } from "@sb/react-router-compat";
import { type TMixAppEpic } from "../Store/Root/Epics/TMixAppEpic";
import { type TSupportedInternalLocale } from "../Store/Locale/Model/TSupportedLocale";
import { type ETheme } from "../Store/Theme/ThemeState";

interface IThemeContextVariant1 {
  name: string;
  logoSrc: string;
  loaderClass: string;
  logoClass: string;
  logoMobileClass: string;
  widgetTheme: EWidgetThemes;
  locales: TSupportedInternalLocale[];
  defaultThemeMode?: ETheme;
}

interface IThemeContextVariant2 {
  name: string;
  notOnPlayGameRouteThemeEpics: TMixAppEpic[];
  variables: TRecordOfString;
  themeEpics: TMixAppEpic[];
  defaultThemeMode?: ETheme;
  withInnerScroll?: boolean;
}

interface IThemeContextVariant3 extends IThemeContextVariant1, IThemeContextVariant2 {
}

//Starzbet
interface IThemeContextVariant5 extends IThemeContextVariant2 {
  sportsbookConnectedEpicAdditionalRoutes: string[] | TRouteProps[];
}

//Bycasino
interface IThemeContextVariant7 extends IThemeContextVariant2 {
  sportsbookConnectedEpicAdditionalRoutes: string[] | TRouteProps[];
  allProvidersPageRowsCountPerLabel: number;
}

//Betpublic
interface IThemeContextVariant8 extends IThemeContextVariant2 {
  sportsbookConnectedEpicAdditionalRoutes: string[] | TRouteProps[];
}

// Zlot
interface IThemeContextVariant9 extends IThemeContextVariant2, IThemeContextVariant1 {
  sportsbookConnectedEpicAdditionalRoutes: string[] | TRouteProps[];
}

//Fixbet
interface IThemeContextVariant10 {
  name: string;
  variables: TRecordOfString;
  alwaysShowBonusCreatedModal: boolean;
}

type TThemeContextVariantsUnion =
  IThemeContextVariant1
  | IThemeContextVariant2
  | IThemeContextVariant3
  | IThemeContextVariant5
  | IThemeContextVariant7
  | IThemeContextVariant8
  | IThemeContextVariant9
  | IThemeContextVariant10

type TThemeContextVariantsIntersection =
  IThemeContextVariant1
  & IThemeContextVariant2
  & IThemeContextVariant3
  & IThemeContextVariant5
  & IThemeContextVariant7
  & IThemeContextVariant8
  & IThemeContextVariant9
  & IThemeContextVariant10

let themeStaticContext = {} as TThemeContextVariantsUnion;
let themeReactContext = {} as Context<TThemeContextVariantsUnion>;

const gainThemeContext = <T extends TThemeContextVariantsUnion>() => ({
  static: {
    get: <K extends keyof T>(key: K) => {
      if (key in themeStaticContext) {
        return (themeStaticContext as T)[key];
      }

      throw new Error(`[domainThemeContext]: key - ${String(key)} does not exist`);
    },
    find: <K extends keyof TThemeContextVariantsIntersection>(key: K): TThemeContextVariantsIntersection[K] | null =>
      (themeStaticContext as TThemeContextVariantsIntersection)[key] ?? null,
  },
  react: {
    useGet: <K extends keyof T>(key: K) => {
      const context = useContext(themeReactContext);

      if (key in context) {
        return (context as T)[key];
      }

      throw new Error(`[domainThemeContext]: key - ${String(key)} does not exist`);
    },
    useFind: <K extends keyof TThemeContextVariantsIntersection>(key: K): TThemeContextVariantsIntersection[K] | null => {
      const context = useContext(themeReactContext);

      return (context as TThemeContextVariantsIntersection)[key] ?? null;
    },

  },
});

const createThemeContext = <T extends TThemeContextVariantsUnion>(context: T) => {
  themeStaticContext = context;
  themeReactContext = createContext<TThemeContextVariantsUnion>(context);
};

export { gainThemeContext, createThemeContext };

export type {
  IThemeContextVariant2,
  IThemeContextVariant3,
  IThemeContextVariant5,
  IThemeContextVariant7,
  IThemeContextVariant8,
  IThemeContextVariant9,
  IThemeContextVariant10,
};
