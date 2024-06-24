import { getNotNil, isAnyObject, isNotNil, isString } from "@sb/utils";
import { type ILiveSpinsClient, type ILiveSpinsSDK, type IServerConfig, type TConfigurationParameters } from "../Store/LiveSpins/Model/Types";

class LiveSpinsApi {
  #language: undefined | string = undefined;

  #tenant: null | string = null;

  #serverConfig: null | IServerConfig = null;

  #liveSpinsClient: Promise<ILiveSpinsClient> | null  = null;

  static liveSpinsSDK: ILiveSpinsSDK | null  = null;

  constructor(language: string, tenant: string, serverConfig: IServerConfig) {
    this.#language = language;

    this.#tenant = tenant;

    this.#serverConfig = serverConfig;
  }

  #createLiveSpinsSDK = () => {
    if (isString(this.#tenant) && isNotNil(this.#serverConfig)) {
      const liveSpinsSDK: TConfigurationParameters = {
        language: this.#language,
        tenant: this.#tenant,
      };

      liveSpinsSDK.serverConfig = this.#serverConfig;
      if ("livespins" in window && isAnyObject(window.livespins)) {
        LiveSpinsApi.liveSpinsSDK = window.livespins.sdk(liveSpinsSDK);
      }
    }
  };

  init = () => {
    this.#createLiveSpinsSDK();
    if (isNotNil(LiveSpinsApi.liveSpinsSDK)) {
      this.#liveSpinsClient = LiveSpinsApi.liveSpinsSDK.Client();
    }
  };

  getLiveSpinsClient = () =>
    getNotNil(this.#liveSpinsClient, ["LiveSpinsApi", "getLiveSpinsClient"], "call LiveSpinsApi.getLiveSpinsClient before LiveSpinsApi.init");
}

export { LiveSpinsApi };
