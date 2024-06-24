import {
  affiliateCMSFormDefinitions,
  bayWinPlatformCMSFormDefinitions,
  betOrSpinPlatformCMSFormDefinitions,
  betPublicPlatformCMSFormDefinitions,
  byCasinoPlatformCMSFormDefinitions,
  starzBetPlatformCMSFormDefinitions,
  zlotPlatformCMSFormDefinitions,
} from "@sb/cms-core";
import { getNotNil } from "@sb/utils";
import type { EEnvironmentCode } from "@sb/utils/EEnvironmentCode";
import { cmsThemeByEnvOrPUITheme, ECmsPuiThemes, type TCmsTheme } from "@sb/cms-config";

type TCmsDefinitionParam =  EEnvironmentCode | "affiliate";

const getCmsDefinition = (cmsTheme: TCmsTheme, param: TCmsDefinitionParam) => {
  if (param === "affiliate") {
    return affiliateCMSFormDefinitions;
  }

  const theme = getNotNil(
    cmsThemeByEnvOrPUITheme(cmsTheme, param),
    ["getDefinitionByEnvCode"],
    param,
  );

  //todo mr create Record<ECmsPuiThemes, [type???]>
  switch (theme){
    case ECmsPuiThemes.themeOne: {
      return betOrSpinPlatformCMSFormDefinitions;
    }

    case ECmsPuiThemes.themeTwo: {
      return starzBetPlatformCMSFormDefinitions;
    }

    case ECmsPuiThemes.themeThree: {
      return bayWinPlatformCMSFormDefinitions;
    }

    case ECmsPuiThemes.themeFour: {
      return betPublicPlatformCMSFormDefinitions;
    }

    case ECmsPuiThemes.themeFive: {
      return byCasinoPlatformCMSFormDefinitions;
    }

    case ECmsPuiThemes.themeSix: {
      return zlotPlatformCMSFormDefinitions;
    }

    default: {
      throw new Error("getDefinitionByEnvCode: theme incorrect");
    }
  }
};

export { getCmsDefinition, type TCmsDefinitionParam };
