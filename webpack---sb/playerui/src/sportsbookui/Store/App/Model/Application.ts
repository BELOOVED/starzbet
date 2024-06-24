// @ts-nocheck
import { getCurrentSubDomainL3 } from "../../../Utils/getMainHost";

const applicationEnum = {
  iframe: "iframe",
  bet: "bet",
  mix: "mix",
};

const getApplicationType = () => {
  if (getCurrentSubDomainL3().match(/^bet-.*?/)) {
    return applicationEnum.bet;
  }

  if (getCurrentSubDomainL3().match(/^translations.*?/)) {
    return applicationEnum.bet;
  }

  if (getCurrentSubDomainL3().match(/^iframe.*?/)) {
    return applicationEnum.iframe;
  }

  return applicationEnum.mix;
};

export { applicationEnum, getApplicationType };
