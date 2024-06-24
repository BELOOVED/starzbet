interface IInnerAppState {
  restartNumber: number;
  pathNamespace: string;
  isAdminuiFrame: boolean;
}

interface IWithAppState {
  app: IInnerAppState;
}

const appState: IWithAppState = {
  app: {
    restartNumber: 0,
    pathNamespace: "",
    isAdminuiFrame: false,
  },
};

export { appState };
