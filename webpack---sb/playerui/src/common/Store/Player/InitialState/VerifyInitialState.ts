interface IWithVerifyInitialState {
  verify: {
    start: boolean;
    confirm: boolean;
    error: null | string;
    phoneModal: boolean;
    optimisticVerifiedPhone: boolean;
  };
}

const verifyInitialState: IWithVerifyInitialState = {
  verify: {
    start: false,
    confirm: false,
    error: null,
    phoneModal: false,
    optimisticVerifiedPhone: false, //TODO remove after sync with backend
  },
};

export { verifyInitialState, type IWithVerifyInitialState };
