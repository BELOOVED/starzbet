import "../../../polyfills/Polyfills";
import "../../../common/Themes/Starzbet/ThemeContext/ThemeContext";
import { setupGlobalLazyWithRetry } from "../../../common/Utils/LazyWithRetry";
import { IS_STARZBET_KG } from "../../../ServerEnvironment";
import { integrateComm100 } from "../../../common/Integrations/Comm100API/IntegrateComm100";
import { integratePushEngage } from "../../../common/Integrations/IntegratePushEngage";
import { applicationEnum, getApplicationType } from "../../Store/App/Model/Application";

setupGlobalLazyWithRetry();

const integrationId = IS_STARZBET_KG
  ? "0a79b74f-1bac-4bff-8569-cf7227d55753"
  : "1b050682-cde5-4176-8236-3bb94c891197";

const siteId = IS_STARZBET_KG ? 90005838 : 90005302;

integrateComm100(integrationId, siteId);

const appId = IS_STARZBET_KG
  ? "caae362f-c50c-4ed8-b94b-4bf7fd8d5c3a"
  : "4564c0eb-671f-4985-8bd3-d189a0a529f1";

integratePushEngage(appId);

const type = getApplicationType();

IS_STARZBET_KG ? void import("./Fonts/RalewayFont.css") : void import("./Fonts/AxiformaFont.css");

switch (type) {
  case applicationEnum.bet:
    void import("./OriginalApplication/CreateOriginalApplication");
    break;

  default: {
    void import("./MixApplication/CreateMixApplication");
  }
}
