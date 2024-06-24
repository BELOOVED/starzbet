import { isDev, isE2E } from "@sb/utils";
import { isPlayPage } from "../../sportsbookui/Constants/IsPlayPage";

type TPushEngageItem = [string, { appId: string; }];

declare global {
  interface Window {
    PushEngage: TPushEngageItem[];
    _peq: [];
  }
}

const integratePushEngage = (appId: string) => {
  if(isDev || isE2E || isPlayPage){
    return;
  }

  window.PushEngage = window.PushEngage  || [];
  window._peq = window._peq || [];

  window.PushEngage.push(["init", {
    appId,
  }]);

  const e = document.createElement("script");

  e.src = "https://clientcdn.pushengage.com/sdks/pushengage-web-sdk.js";
  e.async = true;
  e.type = "text/javascript";

  document.head.appendChild(e);
};

export { integratePushEngage };
