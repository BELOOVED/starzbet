import { AllTranslatesProvider, controlFactory, LineTranslatesProvider } from "@sb/translator";
import { ELocale } from "@sb/utils/ELocale";
import { translates as sharedMessages } from "@sb/translates/shared/Translates";
import { HttpRpcClient } from "@sb/network-bus/RpcClient";
import { call_GetCurrentTranslatesCommand, call_GetTranslatesGapCommand } from "@sb/sdk/SDKClient/frontserver";
import { IS_SERVER } from "@sb/utils";
import { clientUrl, sharedProxyUrl } from "../../../common/Urls";
import { getTranslateTheme } from "../../../common/GetTranslateTheme";
import { getProtectionToken } from "../../../common/Protection";
import { type TSupportedInternalLocale } from "../../../common/Store/Locale/Model/TSupportedLocale";
import { preLoadedTranslates } from "../../Translator/PreLoadedTranslates";
import { initialLocale } from "./InitialLocale";

const locales = [
  ELocale.en_US,
  ELocale.tr_TR,
  ELocale.el_EL,
  ELocale.es_ES,
  ELocale.pt_PT,
  ELocale.ar_AR,
  ELocale.it_IT,
  ELocale.fr_FR,
  ELocale.de_DE,
  ELocale.fa_IR,
  ELocale.ru_RU,
];

type TPredefinedTranslates = Partial<Record<TSupportedInternalLocale, Record<string, string>>>;

const getCurrentTranslatesCommandWithProtectionDecorated: typeof call_GetCurrentTranslatesCommand =
  async (client, payload, metadata = {}, settings) => {
    const secret = await getProtectionToken();

    return call_GetCurrentTranslatesCommand(client, payload, { ...metadata, secret }, settings);
  };

const createTranslateControl = (
  messages: TPredefinedTranslates[],
  clientNsList: string[] = [],
  currentLocale = initialLocale,
) => {
  const sharedClient = new HttpRpcClient(sharedProxyUrl);
  const commonClient = new HttpRpcClient(clientUrl);

  return controlFactory({
    currentLocale,
    fallbackLocale: ELocale.en_US,
    locales,
    predefinedTranslates: [
      ...messages,
      sharedMessages,
      preLoadedTranslates,
    ],
    commitClient: sharedClient,
    providers: IS_SERVER
      ? {}
      : {
        allTranslates: new AllTranslatesProvider(sharedClient, clientNsList.map((clientNs) => ({
          clientNs,
          keys: [clientNs],
        }))),
        lineTranslates: new LineTranslatesProvider(
          commonClient,
          "sumstats.frontserver.translates.line",
          getCurrentTranslatesCommandWithProtectionDecorated,
          call_GetTranslatesGapCommand,
        ),
      },
    keyExpressions: {
      theme: getTranslateTheme(),
    },
  });
};

export type { TPredefinedTranslates };
export { createTranslateControl };
