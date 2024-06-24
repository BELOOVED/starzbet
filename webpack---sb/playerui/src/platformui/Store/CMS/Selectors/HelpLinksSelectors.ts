import { type ComponentType } from "react";
import { combineSelectors, createMemoSelector, isNotNil } from "@sb/utils";
import { PlayerUIQaAttributes } from "@sb/qa-attributes";
import { routeMap } from "../../../RouteMap/RouteMap";
import { cmsContactUsConditionSelector } from "./CMSContactUsSelectors";

const HelpLinksSelector = createMemoSelector(
  combineSelectors(
    [
      cmsContactUsConditionSelector,
      (_, callRequestLink: string) => callRequestLink,
      (_, contactUsLink: string) => contactUsLink,
      (_, callRequestIcon?: ComponentType) => callRequestIcon,
      (_, contactUsIcon?: ComponentType) => contactUsIcon,
    ],
    (callRequestLink: string, contactUsLink: string, callRequestIcon?: ComponentType, contactUsIcon?: ComponentType) => [
      [],
      [callRequestLink],
      [contactUsLink],
      [callRequestIcon],
      [contactUsIcon],
    ] as const,
  ),
  (isContactUs, callRequestLink, contactUsLink, callRequestIcon, contactUsIcon) => {
    const requestACallBack = {
      link: callRequestLink,
      to: routeMap.callRequestsRoute,
      qaAttribute: PlayerUIQaAttributes.MyAccountMenu.RequestCallBackMenuElement,
      icon: isNotNil(callRequestIcon) ? callRequestIcon : null,
    };

    const contactUs = {
      link: contactUsLink,
      to: routeMap.contactUs,
      qaAttribute: PlayerUIQaAttributes.MyAccountMenu.ContactUsMenuElement,
      alwaysShow: true,
      icon: isNotNil(contactUsIcon) ? contactUsIcon : null,
    };

    return isContactUs ? [contactUs, requestACallBack] : [requestACallBack];
  },
);
const HelpCenterRoutesSelector = createMemoSelector(
  [cmsContactUsConditionSelector],
  (isContactUs) => isContactUs ? [routeMap.contactUs, routeMap.callRequestsRoute] : [routeMap.callRequestsRoute],
);
export { HelpCenterRoutesSelector, HelpLinksSelector };
