import { isDev, isE2E } from "@sb/utils";
import { isPlayPage } from "../../../sportsbookui/Constants/IsPlayPage";

const integrateComm100 = (integrationId: string, siteId: number) => {
  if (isDev || isE2E || isPlayPage) {
    return;
  }

  document.body.appendChild(document.createComment("<!--Begin Comm100 Live Chat Code-->"));

  const div = document.createElement("div");

  const divId = `comm100-button-${integrationId}`;

  div.id = divId;

  document.body.appendChild(div);

  const script = document.createElement("script");
  script.type = "text/javascript";
  script.innerText = `var Comm100API=Comm100API||{};(function(t){function e(e){var a=document.createElement("script"),c=document.getElementsByTagName("script")[0];a.type="text/javascript",a.async=!0,a.src=e+t.site_id,c.parentNode.insertBefore(a,c)}t.chat_buttons=t.chat_buttons||[],t.chat_buttons.push({code_plan:"${integrationId}",div_id:"${divId}"}),t.site_id=${siteId},t.main_code_plan="${integrationId}",e("https://vue.comm100.com/livechat.ashx?siteId="),setTimeout(function(){t.loaded||e("https://standby.comm100vue.com/livechat.ashx?siteId=")},5e3)})(Comm100API||{})`;

  document.body.appendChild(script);

  document.body.appendChild(document.createComment("<!--End Comm100 Live Chat Code-->"));
};

export { integrateComm100 };
