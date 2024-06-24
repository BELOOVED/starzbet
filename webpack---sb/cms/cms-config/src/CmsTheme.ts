import { EEnvironmentCode, ESportsbookUiTheme, getNotNil } from "@sb/utils";

const DEFAULT_CMS_THEME_POSTFIX = "default_cms_theme";
type TCmsTheme = ESportsbookUiTheme | typeof DEFAULT_CMS_THEME_POSTFIX;

enum ECmsPuiThemes {
  themeOne = "ThemeOne",
  themeTwo = "ThemeTwo",
  themeThree = "ThemeThree",
  themeFour = "ThemeFour",
  themeFive = "ThemeFive",
  themeSix = "ThemeSix",
}

const DEFAULT_AFFILIATE_ENV_THEME = ECmsPuiThemes.themeOne;

const CMS_PUI_THEMES: Record<ECmsPuiThemes, ESportsbookUiTheme[]> = {
  [ECmsPuiThemes.themeOne]: [
    ESportsbookUiTheme.BETWIZ,
    ESportsbookUiTheme.BETORSPIN,
    ESportsbookUiTheme.OTOBET,
    //
    ESportsbookUiTheme.DODOBET,
    ESportsbookUiTheme.LUXSLOT,
    ESportsbookUiTheme.BANKOBET,
    ESportsbookUiTheme.WINOVER,
    ESportsbookUiTheme.SLOTTOTO,
    ESportsbookUiTheme.CASINODA,
    ESportsbookUiTheme.ONWIN,
    ESportsbookUiTheme.TIPO,
    ESportsbookUiTheme.BAHIS,
    ESportsbookUiTheme.SAHABET,
    ESportsbookUiTheme.SAHABET2,
    ESportsbookUiTheme.MATADORBET,
    ESportsbookUiTheme.BETTURKEY,
    ESportsbookUiTheme.BETVAMOS,
    ESportsbookUiTheme.FIXBET,
    ESportsbookUiTheme.ZBAHIS,
    ESportsbookUiTheme.LIGOBET,
  ],
  [ECmsPuiThemes.themeTwo]: [
    ESportsbookUiTheme.STARZBET,
    ESportsbookUiTheme.STARZBET_IN,
  ],
  [ECmsPuiThemes.themeThree]: [ESportsbookUiTheme.BAYWIN],
  [ECmsPuiThemes.themeFour]: [ESportsbookUiTheme.BETPUBLIC],
  [ECmsPuiThemes.themeFive]: [ESportsbookUiTheme.BYCASINO],
  [ECmsPuiThemes.themeSix]: [ESportsbookUiTheme.ZLOT],
};

const cmsThemeByEnvOrPUITheme = (cmsTheme: TCmsTheme | undefined, env:EEnvironmentCode) =>
  cmsTheme === DEFAULT_CMS_THEME_POSTFIX || cmsTheme === undefined
    ? getNotNil(findCmsPuiThemeByEnvCode(env), ["cmsThemeByEnvOrPUITheme"], "theme")
    : findCmsPuiThemeBySbTheme(cmsTheme);

// Функция для нахождения EPuiThemes по ESportsbookUiTheme
const findCmsPuiThemeBySbTheme = (sbTheme: ESportsbookUiTheme): ECmsPuiThemes | undefined => {
  for (const key in CMS_PUI_THEMES) {
    const themes = CMS_PUI_THEMES[key as ECmsPuiThemes] as ESportsbookUiTheme[];
    if (themes.includes(sbTheme)) {
      return key as ECmsPuiThemes;
    }
  }

  return undefined;
};

const findCmsPuiThemeByEnvCode = (env: EEnvironmentCode): ECmsPuiThemes | undefined => {
  //now only for affiliate
  if (
    env === EEnvironmentCode.LOCAL_DEVELOPMENT ||
    env === EEnvironmentCode.DEV_0__DEV__PL_SB ||
    env === EEnvironmentCode.DEV_1__DEV__PL_SB ||
    env === EEnvironmentCode.DEMO__DEV__PL_SB) {
    return DEFAULT_AFFILIATE_ENV_THEME;
  }

  for (const key in CMS_PUI_THEMES) {
    const themes = CMS_PUI_THEMES[key as ECmsPuiThemes] as ESportsbookUiTheme[];

    for (const theme of themes) {
      if (env.includes(theme.toUpperCase())) {
        return key as ECmsPuiThemes;
      }
    }
  }

  return undefined;
};

// Функция для проверки уникальности ESportsbookUiTheme в CMS_PUI_THEMES
const isUniqueSbTheme = () => {
  const allThemes: ESportsbookUiTheme[] = Object.values(CMS_PUI_THEMES)
    .reduce<ESportsbookUiTheme[]>(
      (acc, val) => acc.concat(val),
      [],
    );
  const uniqueThemes = new Set(allThemes);

  const uniq = allThemes.length === uniqueThemes.size;

  if (!uniq) {
    throw Error("CMS - isUniqueSbTheme() = false");
  }
};

isUniqueSbTheme();

export {
  ECmsPuiThemes,
  cmsThemeByEnvOrPUITheme,
  findCmsPuiThemeBySbTheme,
  DEFAULT_CMS_THEME_POSTFIX,
  type TCmsTheme,
  findCmsPuiThemeByEnvCode,
};
