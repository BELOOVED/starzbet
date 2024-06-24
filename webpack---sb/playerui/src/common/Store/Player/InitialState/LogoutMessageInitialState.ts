interface IWithLogoutMessage {
  logoutMessage: {
    display: boolean;
  };
}

const logoutMessageInitialState: IWithLogoutMessage = {
  logoutMessage: {
    display: false,
  },
};

export { logoutMessageInitialState, type IWithLogoutMessage };
