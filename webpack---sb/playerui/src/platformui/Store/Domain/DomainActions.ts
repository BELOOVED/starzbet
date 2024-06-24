const currentDomainReceiveAction = (currentDomain: string | null) => ({
  type: "@PLATFORM/CURRENT_DOMAIN_RECEIVE_DEVICE",
  payload: currentDomain,
});

const closeDomainLabelAction = () => ({
  type: "@PLATFORM/CLOSE_DOMAIN_LABEL",
});

export { currentDomainReceiveAction, closeDomainLabelAction };
