
interface IWsAuthState{
  authenticated: boolean;
}

interface IWithWsAuthState {
  wsAuth: IWsAuthState;
}

const wsAuthState: IWithWsAuthState = {
  wsAuth: {
    authenticated: false,
  },
};

export { wsAuthState };
export type { IWithWsAuthState };
