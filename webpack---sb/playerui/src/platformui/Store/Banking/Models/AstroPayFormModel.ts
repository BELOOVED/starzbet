import { type AstroPayEnvs } from "@astropay/astropay-sdk";
import { type TAnyObject } from "@sb/utils";
import { platformui_title_phoneNumber, platformui_title_previousAccount } from "@sb/translates/platformui/CommonTKeys";

enum EAstroPaySetting {
  sdk_key = "sdk_key",
  sdk_environment = "sdk_environment",
  sdk_url = "sdk_url",
}

const ASTROPAY_SETTINGS = Object.values(EAstroPaySetting);

interface IAstroPaySetting {
  [EAstroPaySetting.sdk_key]: string;
  [EAstroPaySetting.sdk_url]: string;
  [EAstroPaySetting.sdk_environment]: AstroPayEnvs;
}

const isAstroPaySettings = (settings: TAnyObject): settings is IAstroPaySetting =>
  ASTROPAY_SETTINGS.every((setting) => Object.hasOwn(settings, setting));

enum EAstroPayTab {
  bankAccount = "bankAccount",
  phoneNumber = "phoneNumber",
}

const astroPayTabTranslateMap: Record<EAstroPayTab, string> = {
  [EAstroPayTab.bankAccount]: platformui_title_previousAccount,
  [EAstroPayTab.phoneNumber]: platformui_title_phoneNumber,
};

const ASTRO_PAY_TAB_LIST = Object.values(EAstroPayTab);

export {
  isAstroPaySettings,
  ASTROPAY_SETTINGS,

  EAstroPayTab,
  astroPayTabTranslateMap,
  ASTRO_PAY_TAB_LIST,
};
