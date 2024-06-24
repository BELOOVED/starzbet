import isIp from "is-ip";

const getMainHost = (currentHost: string) => {
  if (isIp(currentHost)) {
    return currentHost;
  }

  const parts = currentHost.replace(/www./, "").split(".");

  if (parts[parts.length - 1] === "localhost") {
    return "localhost";
  }

  return `${parts[parts.length - 2]}.${parts[parts.length - 1]}`;
};

const getSubDomainL3 = (currentHost: string) => currentHost.replace(getMainHost(currentHost), "").replace(".", "");

const getCurrentSubDomainL3 = () => getSubDomainL3(window.location.hostname);

export {
  getMainHost,
  getSubDomainL3,
  getCurrentSubDomainL3,
};
