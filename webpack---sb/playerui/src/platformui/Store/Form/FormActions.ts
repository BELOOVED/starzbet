const platformCPFSendAction = (cpf: string) => ({
  type: "@PLATFORM/CPF_SEND",
  payload: { cpf },
});

const platformCPFClearAction = () => ({
  type: "@PLATFORM/CPF_CLEAR",
  payload: {},
});

export {
  platformCPFSendAction,
  platformCPFClearAction,
};
